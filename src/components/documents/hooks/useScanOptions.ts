
import { useState } from 'react';
import { ScanOptions } from '@/components/documents/types';

export const useScanOptions = () => {
  const [scanOptions, setScanOptions] = useState<ScanOptions>({
    category: 'Avant-contrat',
    accessLevel: 'agent',
    documentName: '',
    autoClassify: true
  });

  const [availableCategories] = useState([
    'Avant-contrat',
    'Mandat',
    'Attestation de propriété',
    'Diagnostics',
    'Avenants',
    'Taxe foncière',
    'Autres'
  ]);

  const isCompromis = 
    scanOptions.category === 'Avant-contrat' || 
    scanOptions.category === 'Compromis de vente' || 
    scanOptions.category === 'Promesse de vente' || 
    scanOptions.category === 'Location' ||
    (scanOptions.autoClassify && scanOptions.documentName.toLowerCase().includes('compromis'));

  const resetScanOptions = () => {
    setScanOptions({
      category: 'Avant-contrat',
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
