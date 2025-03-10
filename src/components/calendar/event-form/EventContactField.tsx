
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './types';
import { Contact } from '@/types/contact';

interface EventContactFieldProps {
  form: UseFormReturn<EventFormValues>;
  contacts?: Contact[];
}

const EventContactField: React.FC<EventContactFieldProps> = ({ form, contacts }) => {
  return (
    <FormField
      control={form.control}
      name="contactId"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Contact associé</FormLabel>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white dark:bg-gray-950">
                  <SelectValue placeholder="Sélectionner un contact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-gray-950">
                {contacts?.map((contact: Contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.firstName} {contact.lastName} {contact.company ? `(${contact.company})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventContactField;
