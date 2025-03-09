import React, { useState } from 'react';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentUploadDialog from './DocumentUploadDialog';
import DocumentScanForm from './DocumentScanForm';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadButtonProps {
  onClick?: () => void;
}

const DocumentUploadButton = ({ onClick }: DocumentUploadButtonProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [scanFormOpen, setScanFormOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleScanClick = () => {
    // Close the upload dialog and open the scan interface
    setUploadDialogOpen(false);
    setScanFormOpen(true);
    console.log('Scan document clicked');
  };

  const handleImportClick = () => {
    // This would open the file import dialog
    toast({
      title: "Import",
      description: "L'interface d'importation n'est pas encore implémentée.",
    });
    console.log('Import document clicked');
  };

  const handleButtonClick = () => {
    setUploadDialogOpen(true);
    if (onClick) onClick();
  };

  const handleScanComplete = (imageData: string) => {
    // Store the captured image and keep the form open
    setCapturedImage(imageData);
  };

  const handleScanFormClose = () => {
    // Reset state when form is closed
    setScanFormOpen(false);
    setCapturedImage(null);
  };

  return (
    <>
      <Button className="flex items-center gap-2" onClick={handleButtonClick}>
        <FileUp size={16} />
        <span>Ajouter un document</span>
      </Button>
      
      <DocumentUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onScanClick={handleScanClick}
        onImportClick={handleImportClick}
      />

      <DocumentScanForm 
        open={scanFormOpen}
        onOpenChange={setScanFormOpen}
        capturedImage={capturedImage}
        onImageCapture={handleScanComplete}
        onClose={handleScanFormClose}
      />
    </>
  );
};

export default DocumentUploadButton;
