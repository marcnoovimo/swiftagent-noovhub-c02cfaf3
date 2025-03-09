
import React, { useState } from 'react';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DocumentUploadDialog from './DocumentUploadDialog';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadButtonProps {
  onClick?: () => void;
}

const DocumentUploadButton = ({ onClick }: DocumentUploadButtonProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleScanClick = () => {
    // This would open the scan interface
    toast({
      title: "Numérisation",
      description: "L'interface de numérisation n'est pas encore implémentée.",
    });
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
    </>
  );
};

export default DocumentUploadButton;
