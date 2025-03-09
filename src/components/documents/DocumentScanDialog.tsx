
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {scanMode === 'config' ? 'Scanner un document' : 'Capturer le document'}
            </DialogTitle>
          </DialogHeader>
          
          {scanMode === 'config' ? (
            <ScanConfigForm 
              scanOptions={scanOptions}
              setScanOptions={setScanOptions}
              availableCategories={availableCategories}
              isCompromis={isCompromis}
              onStartScan={handleStartScan}
            />
          ) : (
            <DocumentScanner 
              onCapture={handleCaptureComplete}
              options={scanOptions}
              onClose={() => resetScanState()}
            />
          )}
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
