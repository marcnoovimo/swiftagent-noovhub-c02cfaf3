
import React from 'react';
import ContractForm from '@/pages/ContractForm';
import { Toaster } from '@/components/ui/sonner';

const ContractFormStandalone = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <ContractForm />
    </div>
  );
};

export default ContractFormStandalone;
