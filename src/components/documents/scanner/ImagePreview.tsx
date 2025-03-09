
import React from 'react';
import { RotateCw, Check, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScanOptions } from '../types';

interface ImagePreviewProps {
  imageData: string;
  options: ScanOptions;
  isLoading: boolean;
  onRetry: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageData, 
  options, 
  isLoading, 
  onRetry, 
  onSave, 
  onCancel 
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
        <img 
          src={imageData} 
          alt="Document scanné" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onRetry}>
          <RotateCw className="mr-2" size={18} />
          Réessayer
        </Button>
        <Button 
          onClick={onSave}
          disabled={isLoading}
          className="bg-noovimo-500 text-white hover:bg-noovimo-600"
        >
          <Check className="mr-2" size={18} />
          {isLoading ? 'Traitement...' : 'Enregistrer'}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground mt-4">
        <p>Document: <span className="font-medium">{options.documentName}</span></p>
        <p>Catégorie: <span className="font-medium">{options.category}</span></p>
        <p>
          Classification: <span className="font-medium">
            {options.autoClassify ? 'Automatique' : 'Manuelle'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
