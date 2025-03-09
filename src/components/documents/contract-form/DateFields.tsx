
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ContractFormValues } from './schema';
import DatePickerField from './DatePickerField';

interface DateFieldsProps {
  form: UseFormReturn<ContractFormValues>;
}

const DateFields: React.FC<DateFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DatePickerField
        form={form}
        name="preliminaryContractDate"
        label="Date de l'avant-contrat"
      />
      
      <DatePickerField
        form={form}
        name="finalActDate"
        label="Date prévue de l'acte"
        minDate={new Date()}
      />
    </div>
  );
};

export default DateFields;
