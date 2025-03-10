
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './types';
import { EVENT_TYPES } from '@/types/calendar';

interface EventTypeFieldProps {
  form: UseFormReturn<EventFormValues>;
}

const EventTypeField: React.FC<EventTypeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="bg-white dark:bg-gray-950">
                <SelectValue placeholder="Type de rendez-vous" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white dark:bg-gray-950">
              {Object.entries(EVENT_TYPES).map(([type, info]) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-sm", info.color.split(' ')[0])} />
                    <span>{info.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EventTypeField;
