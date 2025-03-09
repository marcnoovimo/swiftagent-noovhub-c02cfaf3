
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { cn, formatDate } from '@/lib/utils';
import { fr } from "date-fns/locale";
import { ContractFormValues } from './schema';

interface DatePickerFieldProps {
  form: UseFormReturn<ContractFormValues>;
  name: "preliminaryContractDate" | "finalActDate";
  label: string;
  minDate?: Date;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ 
  form, 
  name, 
  label,
  minDate = new Date("1900-01-01")
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    formatDate(field.value)
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < minDate}
                initialFocus
                locale={fr}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerField;
