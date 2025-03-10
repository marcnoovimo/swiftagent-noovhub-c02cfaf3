
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './types';

interface EventDetailsFieldsProps {
  form: UseFormReturn<EventFormValues>;
}

const EventDetailsFields: React.FC<EventDetailsFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Titre</FormLabel>
            <FormControl>
              <Input placeholder="Titre du rendez-vous" {...field} className="bg-white dark:bg-gray-950" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Location */}
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Lieu</FormLabel>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input placeholder="Lieu du rendez-vous" {...field} className="bg-white dark:bg-gray-950" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Description du rendez-vous" 
                className="resize-none bg-white dark:bg-gray-950" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EventDetailsFields;
