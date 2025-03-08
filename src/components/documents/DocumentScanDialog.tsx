
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import DocumentScanner from './DocumentScanner';
import { ScanOptions, AccessLevel } from './types';
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

  const [availableCategories] = useState([
    'Compromis',
    'Mandats',
    'Factures',
    'Diagnostics',
    'Photos',
    'Autres'
  ]);

  const handleStartScan = () => {
    if (!scanOptions.documentName) {
      toast.error('Veuillez donner un nom au document');
      return;
    }
    setScanMode('scan');
  };

  const handleCaptureComplete = async (imageData: string, options: ScanOptions) => {
    try {
      // Convert data URL to File
      const filename = `scan_${Date.now()}_${options.documentName.replace(/\s+/g, '_')}.jpg`;
      const file = dataURLtoFile(imageData, filename);
      
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
      
      // Upload scanned document with appropriate metadata
      const { data, error } = await uploadDocument(
        file, 
        category, 
        options.accessLevel, 
        user,
        {
          isScanned: true,
          scanDate: new Date().toISOString()
        }
      );
      
      if (error) {
        throw new Error(error);
      }
      
      // Reset state and close dialog
      setScanMode('config');
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
      console.error('Error processing scanned document:', error);
      toast.error('Erreur lors du traitement du document scanné');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Reset when closing
      if (!newOpen) {
        setScanMode('config');
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
  );
};

export default DocumentScanDialog;
