
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import DocumentScanner from './DocumentScanner';
import { useScanDialog } from './hooks/useScanDialog';
import ScanConfigForm from './ScanConfigForm';
import ContractFormIntegration from './ContractFormIntegration';

interface DocumentScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const DocumentScanDialog: React.FC<DocumentScanDialogProps> = ({ 
  open, 
  onOpenChange,
  onSuccess 
}) => {
  const {
    scanMode,
    scanOptions,
    setScanOptions,
    contractFormOpen,
    setContractFormOpen,
    availableCategories,
    isCompromis,
    handleStartScan,
    handleCaptureComplete,
    handleContractFormSuccess,
    handleFileImport,
    resetScanState
  } = useScanDialog({ onSuccess, onOpenChange });

  return (
    <>
      <Dialog open={open} onOpenChange={(newOpen) => {
        // Reset when closing
        if (!newOpen) {
          resetScanState();
        }
        onOpenChange(newOpen);
      }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-4 sm:p-6">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-lg sm:text-xl">
              {scanMode === 'config' ? 'Scanner un document' : 'Capturer le document'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Configurez les options de scan ou capturez votre document
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-120px)] overflow-y-auto px-0 sm:pr-4">
            {scanMode === 'config' ? (
              <ScanConfigForm 
                scanOptions={scanOptions}
                setScanOptions={setScanOptions}
                availableCategories={availableCategories}
                isCompromis={isCompromis}
                onStartScan={handleStartScan}
                onFileImport={handleFileImport}
              />
            ) : (
              <DocumentScanner 
                onCapture={handleCaptureComplete}
                options={scanOptions}
                onClose={() => resetScanState()}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Formulaire pour les informations du compromis (fallback si popup bloquée) */}
      <ContractFormIntegration
        contractFormOpen={contractFormOpen}
        setContractFormOpen={setContractFormOpen}
        onContractFormSuccess={handleContractFormSuccess}
        scanOptions={scanOptions}
      />
    </>
  );
};

export default DocumentScanDialog;
