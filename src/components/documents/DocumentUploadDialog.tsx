
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Scan } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`sm:max-w-[425px] document-upload-dialog ${isMobile ? 'max-w-[95vw] p-4' : ''}`}
        style={{ 
          backgroundColor: "#FFFFFF", 
          backdropFilter: "none",
          opacity: "1",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
          border: "1px solid hsl(var(--border))",
          borderRadius: "16px",
          overflow: "visible", // Pour s'assurer que le contenu est visible
          width: isMobile ? 'calc(100vw - 32px)' : 'auto'
        }}
      >
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="text-xl font-semibold">Ajouter un document</DialogTitle>
          <DialogDescription className="text-sm mt-1 text-muted-foreground">
            Choisissez comment vous souhaitez ajouter votre document.
          </DialogDescription>
        </DialogHeader>
        
        <div className={`grid grid-cols-1 gap-4 py-4 ${isMobile ? 'px-0' : ''}`}>
          <Button 
            variant="outline" 
            className="w-full flex justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm rounded-lg"
            onClick={() => {
              onOpenChange(false);
              onScanClick();
            }}
          >
            <div className="flex-shrink-0">
              <Scan className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-foreground">Numériser un document</span>
              <span className="text-sm text-muted-foreground">Utilisez l'appareil photo pour scanner un document</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm rounded-lg"
            onClick={() => {
              onOpenChange(false);
              onImportClick();
            }}
          >
            <div className="flex-shrink-0">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-foreground">Importer un fichier</span>
              <span className="text-sm text-muted-foreground">Sélectionnez un fichier depuis votre appareil</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
