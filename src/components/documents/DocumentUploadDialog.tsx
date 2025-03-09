
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileUp, Scan } from 'lucide-react';

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanClick: () => void;
  onImportClick: () => void;
}

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  open,
  onOpenChange,
  onScanClick,
  onImportClick
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
          <DialogDescription>
            Choisissez comment vous souhaitez ajouter votre document.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 p-4 h-auto bg-background"
            onClick={() => {
              onOpenChange(false);
              onScanClick();
            }}
          >
            <Scan className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Numériser un document</span>
              <span className="text-sm text-muted-foreground">Utilisez l'appareil photo pour scanner un document</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 p-4 h-auto bg-background"
            onClick={() => {
              onOpenChange(false);
              onImportClick();
            }}
          >
            <Upload className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Importer un fichier</span>
              <span className="text-sm text-muted-foreground">Sélectionnez un fichier depuis votre appareil</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
