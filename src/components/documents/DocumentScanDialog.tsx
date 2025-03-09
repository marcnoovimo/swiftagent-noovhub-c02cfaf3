
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import DocumentScanner from './DocumentScanner';
import ContractFormDialog from './ContractFormDialog';
import { ScanOptions, AccessLevel, Document } from './types';
import { useAuth } from '@/context/AuthContext';
import { dataURLtoFile } from '@/lib/utils';
import { uploadDocument } from '@/services/documentService';
import { toast } from 'sonner';

interface DocumentScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const DocumentScanDialog: React.FC<DocumentScanDialogProps> = ({ 
  open, 
  onOpenChange,
  onSuccess 
}) => {
  const { user } = useAuth();
  const [scanMode, setScanMode] = useState<'config' | 'scan'>('config');
  const [scanOptions, setScanOptions] = useState<ScanOptions>({
    category: 'Compromis',
    accessLevel: 'agent',
    documentName: '',
    autoClassify: true
  });
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [contractFormOpen, setContractFormOpen] = useState(false);
  const [contractData, setContractData] = useState<any>(null);

  const [availableCategories] = useState([
    'Compromis',
    'Mandats',
    'Factures',
    'Diagnostics',
    'Photos',
    'Autres'
  ]);

  const isCompromis = scanOptions.category === 'Compromis' || 
                      (scanOptions.autoClassify && scanOptions.documentName.toLowerCase().includes('compromis'));

  // Écouter les messages venant des fenêtres d'avant-contrat
  useEffect(() => {
    const handleContractFormMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CONTRACT_FORM_DATA' && event.data?.data) {
        handleContractFormSuccess(event.data.data);
      }
    };
    
    window.addEventListener('message', handleContractFormMessage);
    return () => {
      window.removeEventListener('message', handleContractFormMessage);
    };
  }, [capturedImage, scanOptions]);

  const handleStartScan = () => {
    if (!scanOptions.documentName) {
      toast.error('Veuillez donner un nom au document');
      return;
    }
    setScanMode('scan');
  };

  const handleCaptureComplete = async (imageData: string, options: ScanOptions) => {
    try {
      setCapturedImage(imageData);
      
      // Get document type from name or category if auto-classify is enabled
      let category = options.category;
      if (options.autoClassify) {
        const lowerName = options.documentName.toLowerCase();
        if (lowerName.includes('compromis')) category = 'Compromis';
        else if (lowerName.includes('mandat')) category = 'Mandats';
        else if (lowerName.includes('facture') || lowerName.includes('honoraire')) category = 'Factures';
        else if (lowerName.includes('diagnostic') || lowerName.includes('dpe')) category = 'Diagnostics';
        else if (lowerName.includes('photo')) category = 'Photos';
      }
      
      // Si c'est un compromis, ouvrir le formulaire pour les détails du contrat
      if (category === 'Compromis') {
        openContractFormInNewWindow();
      } else {
        // Pour les autres types de documents, procéder à l'enregistrement direct
        await saveScannedDocument(imageData, options, category);
      }
    } catch (error) {
      console.error('Error processing scanned document:', error);
      toast.error('Erreur lors du traitement du document scanné');
    }
  };

  const openContractFormInNewWindow = () => {
    // Ouvrir une nouvelle fenêtre pour le formulaire d'avant-contrat
    const width = 800;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const contractWindow = window.open(
      '/contract-form', 
      'avant_contrat',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    
    // Si la fenêtre est bloquée par le navigateur
    if (!contractWindow || contractWindow.closed || typeof contractWindow.closed === 'undefined') {
      toast.error("Le navigateur a bloqué l'ouverture de la fenêtre. Veuillez autoriser les pop-ups pour ce site.");
      // Alternative: ouvrir le dialogue dans la même fenêtre
      setContractFormOpen(true);
    }
  };

  const handleContractFormSuccess = async (data: any) => {
    setContractData(data);
    
    if (capturedImage && scanOptions) {
      // Enrichir les options avec les données du contrat
      const enrichedOptions = {
        ...scanOptions,
        contractData: data
      };
      
      // Sauvegarder le document avec les données du contrat
      await saveScannedDocument(capturedImage, enrichedOptions, 'Compromis');
    }
  };

  const saveScannedDocument = async (imageData: string, options: ScanOptions, category: string) => {
    try {
      // Convert data URL to File
      const filename = `scan_${Date.now()}_${options.documentName.replace(/\s+/g, '_')}.jpg`;
      const file = dataURLtoFile(imageData, filename);
      
      // Prepare metadata with contract data if available
      const metadata: any = {
        isScanned: true,
        scanDate: new Date().toISOString()
      };
      
      // Add contract data if available
      if (options.contractData) {
        metadata.contractData = options.contractData;
        metadata.sellerName = options.contractData.sellerName;
        metadata.buyerName = options.contractData.buyerName;
        metadata.propertyAddress = options.contractData.propertyAddress;
        metadata.agentFees = options.contractData.agentFees;
        metadata.preliminaryContractDate = options.contractData.preliminaryContractDate;
        metadata.finalActDate = options.contractData.finalActDate;
      }
      
      // Upload scanned document with appropriate metadata
      const { data, error } = await uploadDocument(
        file, 
        category, 
        options.accessLevel, 
        user,
        metadata
      );
      
      if (error) {
        throw new Error(error);
      }
      
      toast.success('Document scanné et enregistré avec succès');
      
      // Reset state and close dialog
      setScanMode('config');
      setCapturedImage(null);
      setContractData(null);
      setScanOptions({
        category: 'Compromis',
        accessLevel: 'agent',
        documentName: '',
        autoClassify: true
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving scanned document:', error);
      toast.error('Erreur lors de l\'enregistrement du document');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(newOpen) => {
        // Reset when closing
        if (!newOpen) {
          setScanMode('config');
          setCapturedImage(null);
          setContractData(null);
        }
        onOpenChange(newOpen);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {scanMode === 'config' ? 'Scanner un document' : 'Capturer le document'}
            </DialogTitle>
          </DialogHeader>
          
          {scanMode === 'config' ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="documentName">Nom du document</Label>
                <Input 
                  id="documentName" 
                  value={scanOptions.documentName}
                  onChange={(e) => setScanOptions({...scanOptions, documentName: e.target.value})}
                  placeholder="Ex: Compromis - 23 Rue des Lilas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select 
                  value={scanOptions.category}
                  onValueChange={(value) => setScanOptions({...scanOptions, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Niveau d'accès</Label>
                <Select 
                  value={scanOptions.accessLevel}
                  onValueChange={(value) => setScanOptions({...scanOptions, accessLevel: value as AccessLevel})}
                >
                  <SelectTrigger id="accessLevel">
                    <SelectValue placeholder="Sélectionner un niveau d'accès" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Personnel (Agent uniquement)</SelectItem>
                    <SelectItem value="shared">Partagé (Tous les agents)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="autoClassify">Classification automatique</Label>
                <Switch 
                  id="autoClassify" 
                  checked={scanOptions.autoClassify}
                  onCheckedChange={(checked) => setScanOptions({...scanOptions, autoClassify: checked})}
                />
              </div>
              
              {isCompromis && (
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
                  <p>Pour un compromis, vous pourrez remplir les informations supplémentaires après la numérisation (vendeur, acquéreur, dates, etc.).</p>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleStartScan}>
                  Commencer le scan
                </Button>
              </div>
            </div>
          ) : (
            <DocumentScanner 
              onCapture={handleCaptureComplete}
              options={scanOptions}
              onClose={() => setScanMode('config')}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Formulaire pour les informations du compromis (fallback si popup bloquée) */}
      <ContractFormDialog 
        open={contractFormOpen}
        onOpenChange={setContractFormOpen}
        onSuccess={handleContractFormSuccess}
        fromScannedDocument={true}
        initialData={{
          propertyAddress: scanOptions.documentName.includes('-') 
            ? scanOptions.documentName.split('-')[1].trim() 
            : ''
        }}
      />
    </>
  );
};

export default DocumentScanDialog;
