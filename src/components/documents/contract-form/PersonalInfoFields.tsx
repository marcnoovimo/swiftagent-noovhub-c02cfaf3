
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ContractFormValues } from './schema';

interface PersonalInfoFieldsProps {
  form: UseFormReturn<ContractFormValues>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="sellerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du vendeur</FormLabel>
            <FormControl>
              <Input placeholder="Nom et prénom du vendeur" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="buyerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'acquéreur</FormLabel>
            <FormControl>
              <Input placeholder="Nom et prénom de l'acquéreur" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
