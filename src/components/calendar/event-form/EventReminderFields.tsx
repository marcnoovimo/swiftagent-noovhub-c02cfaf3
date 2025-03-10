
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './types';

interface EventReminderFieldsProps {
  form: UseFormReturn<EventFormValues>;
}

const EventReminderFields: React.FC<EventReminderFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Reminder */}
      <FormField
        control={form.control}
        name="sendReminder"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <input
                type="checkbox"
                className="h-4 w-4 rounded"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Envoyer un rappel</FormLabel>
          </FormItem>
        )}
      />
      
      {/* Reminder Type - Only show if sendReminder is true */}
      {form.watch('sendReminder') && (
        <FormField
          control={form.control}
          name="reminderType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de rappel</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white dark:bg-gray-950">
                    <SelectValue placeholder="Type de rappel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-gray-950">
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default EventReminderFields;
