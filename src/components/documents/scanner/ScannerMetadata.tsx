
import React from 'react';
import { ScanOptions } from '../types';

interface ScannerMetadataProps {
  options: ScanOptions;
}

const ScannerMetadata: React.FC<ScannerMetadataProps> = ({ options }) => {
  return (
    <div className="text-xs text-muted-foreground mt-2">
      <p>Document: <span className="font-medium">{options.documentName}</span></p>
      <p>Catégorie: <span className="font-medium">{options.category}</span></p>
      <p>
        Classification: <span className="font-medium">
          {options.autoClassify ? 'Automatique' : 'Manuelle'}
        </span>
      </p>
    </div>
  );
};

export default ScannerMetadata;
