
import React, { useEffect } from 'react';
import ContractFormDialog from './ContractFormDialog';
import { ContractFormValues } from './contract-form/schema';

interface ContractFormIntegrationProps {
  contractFormOpen: boolean;
  setContractFormOpen: (open: boolean) => void;
  onContractFormSuccess: (data: any) => void;
  scanOptions: any;
}

const ContractFormIntegration: React.FC<ContractFormIntegrationProps> = ({
  contractFormOpen,
  setContractFormOpen,
  onContractFormSuccess,
  scanOptions
}) => {
  // Écouter les messages venant des fenêtres d'avant-contrat
  useEffect(() => {
    const handleContractFormMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CONTRACT_FORM_DATA' && event.data?.data) {
        onContractFormSuccess(event.data.data);
      }
    };
    
    window.addEventListener('message', handleContractFormMessage);
    return () => {
      window.removeEventListener('message', handleContractFormMessage);
    };
  }, [onContractFormSuccess]);

  return (
    <ContractFormDialog 
      open={contractFormOpen}
      onOpenChange={setContractFormOpen}
      onSuccess={onContractFormSuccess}
      fromScannedDocument={true}
      initialData={{
        propertyAddress: scanOptions.documentName.includes('-') 
          ? scanOptions.documentName.split('-')[1].trim() 
          : ''
      }}
    />
  );
};

export default ContractFormIntegration;
