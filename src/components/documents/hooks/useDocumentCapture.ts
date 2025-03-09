
import { useState } from 'react';
import { ScanOptions } from '@/components/documents/types';
import { useAuth } from '@/context/AuthContext';
import { uploadDocument } from '@/services/documentService';
import { dataURLtoFile } from '@/lib/utils';
import { toast } from 'sonner';

export const useDocumentCapture = (onSuccess?: () => void, onOpenChange?: (open: boolean) => void) => {
  const { user } = useAuth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [contractData, setContractData] = useState<any>(null);
  const [options, setOptions] = useState<ScanOptions | null>(null);

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
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onOpenChange) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error saving scanned document:', error);
      toast.error('Erreur lors de l\'enregistrement du document');
    }
  };

  const handleCaptureComplete = async (imageData: string, scanOptions: ScanOptions) => {
    try {
      setCapturedImage(imageData);
      setOptions(scanOptions);
      
      // Get document type from name or category if auto-classify is enabled
      let category = scanOptions.category;
      if (scanOptions.autoClassify) {
        const lowerName = scanOptions.documentName.toLowerCase();
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
        await saveScannedDocument(imageData, scanOptions, category);
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
    
    if (capturedImage && options) {
      // Enrichir les options avec les données du contrat
      const enrichedOptions = {
        ...options,
        contractData: data
      };
      
      // Sauvegarder le document avec les données du contrat
      await saveScannedDocument(capturedImage, enrichedOptions, options.category);
    }
  };

  const [contractFormOpen, setContractFormOpen] = useState(false);

  return {
    capturedImage,
    setCapturedImage,
    contractFormOpen,
    setContractFormOpen,
    contractData,
    setContractData,
    options,
    setOptions,
    handleCaptureComplete,
    handleContractFormSuccess,
    saveScannedDocument
  };
};
