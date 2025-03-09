
import { useState } from 'react';
import { ScanOptions, AccessLevel } from '@/components/documents/types';
import { useAuth } from '@/context/AuthContext';
import { uploadDocument } from '@/services/documentService';
import { dataURLtoFile } from '@/lib/utils';
import { toast } from 'sonner';

interface UseScanDialogProps {
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useScanDialog = ({ onSuccess, onOpenChange }: UseScanDialogProps) => {
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

  const isCompromis = 
    scanOptions.category === 'Compromis' || 
    scanOptions.category === 'Compromis de vente' || 
    scanOptions.category === 'Promesse de vente' || 
    scanOptions.category === 'Location' ||
    (scanOptions.autoClassify && scanOptions.documentName.toLowerCase().includes('compromis'));

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
        if (lowerName.includes('compromis')) category = 'Compromis de vente';
        else if (lowerName.includes('promesse')) category = 'Promesse de vente';
        else if (lowerName.includes('location')) category = 'Location';
        else if (lowerName.includes('mandat')) category = 'Mandats';
        else if (lowerName.includes('facture') || lowerName.includes('honoraire')) category = 'Factures';
        else if (lowerName.includes('diagnostic') || lowerName.includes('dpe')) category = 'Diagnostics';
        else if (lowerName.includes('photo')) category = 'Photos';
      }
      
      // Si c'est un avant-contrat, ouvrir le formulaire pour les détails du contrat
      if (category === 'Compromis de vente' || category === 'Promesse de vente' || category === 'Location') {
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
      await saveScannedDocument(capturedImage, enrichedOptions, scanOptions.category);
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
        category: 'Compromis de vente',
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

  const resetScanState = () => {
    setScanMode('config');
    setCapturedImage(null);
    setContractData(null);
    setScanOptions({
      category: 'Compromis',
      accessLevel: 'agent',
      documentName: '',
      autoClassify: true
    });
  };

  return {
    scanMode,
    setScanMode,
    scanOptions,
    setScanOptions,
    capturedImage,
    setCapturedImage,
    contractFormOpen,
    setContractFormOpen,
    contractData,
    availableCategories,
    isCompromis,
    handleStartScan,
    handleCaptureComplete,
    handleContractFormSuccess,
    resetScanState
  };
};
