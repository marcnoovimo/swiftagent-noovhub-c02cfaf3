
import React from 'react';
import { Building, Briefcase, MapPin } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from './types';

interface ContactProfessionalInfoProps {
  form: UseFormReturn<ContactFormValues>;
}

const ContactProfessionalInfo: React.FC<ContactProfessionalInfoProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Société</FormLabel>
            <FormControl>
              <div className="flex">
                <Building className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="Entreprise SAS" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Poste</FormLabel>
            <FormControl>
              <div className="flex">
                <Briefcase className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="Directeur Commercial" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <div className="flex">
                <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="15 rue de Paris" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ville</FormLabel>
            <FormControl>
              <div className="flex">
                <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="Paris" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie*</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="partner">Partenaire</SelectItem>
                <SelectItem value="notary">Notaire</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactProfessionalInfo;
