
import { useState } from 'react';
import { ScanOptions } from '@/components/documents/types';

export const useScanOptions = () => {
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

  const isCompromis = 
    scanOptions.category === 'Compromis' || 
    scanOptions.category === 'Compromis de vente' || 
    scanOptions.category === 'Promesse de vente' || 
    scanOptions.category === 'Location' ||
    (scanOptions.autoClassify && scanOptions.documentName.toLowerCase().includes('compromis'));

  const resetScanOptions = () => {
    setScanOptions({
      category: 'Compromis',
      accessLevel: 'agent',
      documentName: '',
      autoClassify: true
    });
  };

  return {
    scanOptions,
    setScanOptions,
    availableCategories,
    isCompromis,
    resetScanOptions
  };
};
