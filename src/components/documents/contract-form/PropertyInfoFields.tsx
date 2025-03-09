
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ContractFormValues } from './schema';

interface PropertyInfoFieldsProps {
  form: UseFormReturn<ContractFormValues>;
}

const PropertyInfoFields: React.FC<PropertyInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="propertyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse du bien</FormLabel>
            <FormControl>
              <Input placeholder="Adresse complète du bien" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="agentFees"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Honoraires agent</FormLabel>
            <FormControl>
              <Input placeholder="Montant des honoraires" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PropertyInfoFields;
