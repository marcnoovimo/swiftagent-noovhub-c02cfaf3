
import { useState } from 'react';
import { ScanOptions } from '@/components/documents/types';
import { toast } from 'sonner';
import { useScanOptions } from './useScanOptions';
import { useDocumentCapture } from './useDocumentCapture';
import { detectDocumentType } from '@/lib/utils';

interface UseScanDialogProps {
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useScanDialog = ({ onSuccess, onOpenChange }: UseScanDialogProps) => {
  const [scanMode, setScanMode] = useState<'config' | 'scan'>('config');
  
  const {
    scanOptions,
    setScanOptions,
    availableCategories,
    isCompromis,
    resetScanOptions
  } = useScanOptions();

  const {
    capturedImage,
    setCapturedImage,
    contractFormOpen,
    setContractFormOpen,
    contractData,
    setContractData,
    setOptions,
    handleCaptureComplete,
    handleContractFormSuccess,
    saveScannedDocument
  } = useDocumentCapture(onSuccess, onOpenChange);

  const handleStartScan = () => {
    if (!scanOptions.documentName) {
      toast.error('Veuillez donner un nom au document');
      return;
    }
    setScanMode('scan');
    setOptions(scanOptions);
  };

  const handleFileImport = async (file: File) => {
    if (!scanOptions.documentName) {
      // Use the filename as document name if no name is provided
      const fileName = file.name.split('.')[0];
      setScanOptions({...scanOptions, documentName: fileName});
    }

    try {
      // Auto-detect category if auto-classify is enabled
      let category = scanOptions.category;
      if (scanOptions.autoClassify) {
        category = detectDocumentType(file.name);
        setScanOptions({...scanOptions, category});
      }

      // Create a data URL for the file to use the same flow
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        
        // If it's a contract document, handle it similarly to scanned documents
        if (
          category === 'Compromis de vente' || 
          category === 'Promesse de vente' || 
          category === 'Location'
        ) {
          setCapturedImage(dataUrl);
          setOptions(scanOptions);
          setContractFormOpen(true);
        } else {
          // For other documents, save directly
          await saveScannedDocument(dataUrl, scanOptions, category);
        }
      };
      reader.readAsDataURL(file);

      toast.success('Fichier importé avec succès');
    } catch (error) {
      console.error('Error importing file:', error);
      toast.error('Erreur lors de l\'importation du fichier');
    }
  };

  const resetScanState = () => {
    setScanMode('config');
    setCapturedImage(null);
    setContractData(null);
    resetScanOptions();
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
    handleFileImport,
    resetScanState
  };
};
