
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import ContractForm from './contract-form/ContractForm';
import { ContractFormValues } from './contract-form/schema';

interface ContractFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (data: ContractFormValues) => void;
  initialData?: Partial<ContractFormValues>;
  fromScannedDocument?: boolean;
}

const ContractFormDialog: React.FC<ContractFormDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  fromScannedDocument = false
}) => {
  const handleFormSubmit = (data: ContractFormValues) => {
    try {
      if (onSuccess) {
        onSuccess(data);
      }
      
      toast.success("Informations de l'avant-contrat sauvegardées");
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde des informations");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {fromScannedDocument 
              ? "Compléter les informations du document numérisé" 
              : "Remplir les informations de l'avant-contrat"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)] overflow-y-auto pr-4">
          <ContractForm 
            initialData={initialData}
            onSubmit={handleFormSubmit}
          />
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContractFormDialog;
