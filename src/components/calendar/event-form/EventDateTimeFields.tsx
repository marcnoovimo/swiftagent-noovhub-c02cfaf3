
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './types';

interface EventDateTimeFieldsProps {
  form: UseFormReturn<EventFormValues>;
}

const EventDateTimeFields: React.FC<EventDateTimeFieldsProps> = ({ form }) => {
  return (
    <>
      {/* Date */}
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="white"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent 
                className="w-auto p-0 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg" 
                align="start"
                style={{
                  backdropFilter: "none",
                  backgroundColor: "#FFFFFF",
                  opacity: 1
                }}
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  locale={fr}
                  className="p-3 pointer-events-auto bg-white dark:bg-gray-950 border-0"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Start Time */}
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heure de début</FormLabel>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input type="time" {...field} className="bg-white dark:bg-gray-950" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* End Time */}
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heure de fin</FormLabel>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <FormControl>
                <Input type="time" {...field} className="bg-white dark:bg-gray-950" />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EventDateTimeFields;
