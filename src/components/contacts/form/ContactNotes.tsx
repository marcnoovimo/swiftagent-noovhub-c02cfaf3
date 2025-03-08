
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from './types';

interface ContactNotesProps {
  form: UseFormReturn<ContactFormValues>;
}

const ContactNotes: React.FC<ContactNotesProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Informations complémentaires sur ce contact..." 
              className="resize-none" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContactNotes;
