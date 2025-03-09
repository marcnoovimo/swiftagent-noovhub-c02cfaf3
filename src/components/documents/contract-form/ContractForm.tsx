import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { contractFormSchema, ContractFormProps, ContractFormValues } from './schema';
import PersonalInfoFields from './PersonalInfoFields';
import PropertyInfoFields from './PropertyInfoFields';
import DateFields from './DateFields';
import '@/styles/forms.css'; // Direct import of form styles
import '@/styles/buttons.css'; // Direct import of button styles

const ContractForm: React.FC<ContractFormProps> = ({ 
  initialData, 
  onSubmit
}) => {
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      sellerName: initialData?.sellerName || '',
      buyerName: initialData?.buyerName || '',
      propertyAddress: initialData?.propertyAddress || '',
      agentFees: initialData?.agentFees || '',
      preliminaryContractDate: initialData?.preliminaryContractDate || new Date(),
      finalActDate: initialData?.finalActDate || new Date(),
    },
  });

  const handleSubmit = (data: ContractFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <PersonalInfoFields form={form} />
        <PropertyInfoFields form={form} />
        <DateFields form={form} />
        
        <div className="flex justify-end space-x-2">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
};

export default ContractForm;
