
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
                      "w-full pl-3 text-left font-normal bg-white border border-gray-200 shadow-sm",
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
                className="w-auto p-0" 
                align="start"
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid hsl(var(--border))",
                  opacity: 1,
                  backdropFilter: "none",
                  borderRadius: "0.5rem"
                }}
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  locale={fr}
                  className="bg-white border-0 rounded-lg"
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
                <Input type="time" {...field} className="bg-white border border-gray-200 shadow-sm" />
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
                <Input type="time" {...field} className="bg-white border border-gray-200 shadow-sm" />
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
