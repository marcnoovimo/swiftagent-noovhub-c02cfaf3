
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
      <DialogContent 
        className="sm:max-w-[425px] bg-white border border-border shadow-xl document-upload-dialog rounded-xl"
        style={{ 
          backgroundColor: "white !important", 
          backdropFilter: "none !important",
          background: "white !important",
          opacity: "1 !important",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle>Ajouter un document</DialogTitle>
          <DialogDescription>
            Choisissez comment vous souhaitez ajouter votre document.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50 transition-colors border-gray-200 shadow-sm rounded-lg"
            onClick={() => {
              onOpenChange(false);
              onScanClick();
            }}
          >
            <Scan className="h-5 w-5 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Numériser un document</span>
              <span className="text-sm text-muted-foreground">Utilisez l'appareil photo pour scanner un document</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50 transition-colors border-gray-200 shadow-sm rounded-lg"
            onClick={() => {
              onOpenChange(false);
              onImportClick();
            }}
          >
            <Upload className="h-5 w-5 text-primary" />
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
