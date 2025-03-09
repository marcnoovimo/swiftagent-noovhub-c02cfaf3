
import { useState } from 'react';
import { ScanOptions } from '@/components/documents/types';
import { toast } from 'sonner';
import { useScanOptions } from './useScanOptions';
import { useDocumentCapture } from './useDocumentCapture';

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
    handleContractFormSuccess
  } = useDocumentCapture(onSuccess, onOpenChange);

  const handleStartScan = () => {
    if (!scanOptions.documentName) {
      toast.error('Veuillez donner un nom au document');
      return;
    }
    setScanMode('scan');
    setOptions(scanOptions);
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
    resetScanState
  };
};
