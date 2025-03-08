
import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from './types';

interface ContactPersonalInfoProps {
  form: UseFormReturn<ContactFormValues>;
}

const ContactPersonalInfo: React.FC<ContactPersonalInfoProps> = ({ form }) => {
  return (
    <>
      <div className="md:col-span-2 flex justify-center">
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <User className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prénom*</FormLabel>
            <FormControl>
              <Input placeholder="Jean" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom*</FormLabel>
            <FormControl>
              <Input placeholder="Dupont" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email personnel</FormLabel>
            <FormControl>
              <div className="flex">
                <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="jean.dupont@gmail.com" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="emailPro"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email professionnel</FormLabel>
            <FormControl>
              <div className="flex">
                <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="j.dupont@entreprise.fr" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone fixe</FormLabel>
            <FormControl>
              <div className="flex">
                <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="01 23 45 67 89" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="mobile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone mobile</FormLabel>
            <FormControl>
              <div className="flex">
                <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                <Input placeholder="06 12 34 56 78" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactPersonalInfo;
