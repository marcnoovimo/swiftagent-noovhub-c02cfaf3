
import React, { useState, useRef } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleScanClick = () => {
    // Close the upload dialog and open the scan interface
    setUploadDialogOpen(false);
    setScanFormOpen(true);
    console.log('Scan document clicked');
  };

  const handleImportClick = () => {
    // Trigger file input click to open file selector
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setUploadDialogOpen(false);
    console.log('Import document clicked');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if file is PDF
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
        setScanFormOpen(true);
        
        toast({
          title: "Fichier sélectionné",
          description: `${file.name} a été sélectionné. Veuillez remplir les métadonnées.`,
        });
      } else {
        toast({
          title: "Format non pris en charge",
          description: "Seuls les fichiers PDF sont acceptés.",
          variant: "destructive"
        });
      }
    }
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
    setSelectedFile(null);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        selectedFile={selectedFile}
        onImageCapture={handleScanComplete}
        onClose={handleScanFormClose}
      />
      
      {/* Hidden file input for importing documents */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,application/pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default DocumentUploadButton;
