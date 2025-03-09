
import React, { useState } from 'react';
import { FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ScanOptions } from './types';
import CameraView from './scanner/CameraView';
import ImagePreview from './scanner/ImagePreview';

interface DocumentScannerProps {
  onCapture: (imageData: string, options: ScanOptions) => Promise<void>;
  options: ScanOptions;
  onClose: () => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({ onCapture, options, onClose }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle image capture
  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  // Retry scan - clear captured image and return to camera view
  const handleRetry = () => {
    setCapturedImage(null);
  };

  // Save the scanned document
  const handleSave = async () => {
    if (!capturedImage) return;
    
    setIsLoading(true);
    try {
      await onCapture(capturedImage, options);
      toast.success('Document scanné et enregistré avec succès');
      onClose();
    } catch (error) {
      console.error('Error saving scanned document:', error);
      toast.error('Erreur lors de l\'enregistrement du document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {!capturedImage ? (
        <CameraView 
          onCapture={handleCapture}
          onCancel={onClose}
        />
      ) : (
        <ImagePreview 
          imageData={capturedImage}
          options={options}
          isLoading={isLoading}
          onRetry={handleRetry}
          onSave={handleSave}
          onCancel={onClose}
        />
      )}
    </div>
  );
};

export default DocumentScanner;
