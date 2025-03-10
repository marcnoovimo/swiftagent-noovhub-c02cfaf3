
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Phone, MapPin, User, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ContactFormData } from './types';

interface ContactPersonalInfoProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
  onGenderChange: (value: string) => void;
  onDateOfBirthChange: (date: Date | undefined) => void;
  isMobile?: boolean;
}

const ContactPersonalInfo: React.FC<ContactPersonalInfoProps> = ({
  formData,
  onChangeField,
  onGenderChange,
  onDateOfBirthChange,
  isMobile = false
}) => {
  return (
    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4`}>
      <div className="space-y-2">
        <Label htmlFor="firstName" className="flex items-center gap-2">
          <User size={16} /> Prénom
        </Label>
        <Input 
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onChangeField('firstName', e.target.value)}
          placeholder="Prénom du contact"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName" className="flex items-center gap-2">
          <User size={16} /> Nom
        </Label>
        <Input 
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onChangeField('lastName', e.target.value)}
          placeholder="Nom du contact"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender" className="flex items-center gap-2">
          <User size={16} /> Civilité
        </Label>
        <Select 
          value={formData.gender} 
          onValueChange={onGenderChange}
        >
          <SelectTrigger id="gender" className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm">
            <SelectValue placeholder="Sélectionnez une civilité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Monsieur</SelectItem>
            <SelectItem value="female">Madame</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 contact-form">
        <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
          <CalendarIcon size={16} /> Date de naissance
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="white"
              className="w-full justify-start text-left font-normal bg-white border border-gray-200 shadow-sm"
            >
              {formData.dateOfBirth ? (
                format(formData.dateOfBirth, 'dd MMMM yyyy', { locale: fr })
              ) : (
                <span className="text-muted-foreground">Sélectionnez une date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
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
              selected={formData.dateOfBirth}
              onSelect={onDateOfBirthChange}
              initialFocus
              disabled={(date) => date > new Date()}
              className="bg-white border-0 rounded-lg"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone size={16} /> Téléphone
        </Label>
        <Input 
          id="phone"
          value={formData.phone}
          onChange={(e) => onChangeField('phone', e.target.value)}
          placeholder="Téléphone fixe"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mobile" className="flex items-center gap-2">
          <Phone size={16} /> Mobile
        </Label>
        <Input 
          id="mobile"
          value={formData.mobile}
          onChange={(e) => onChangeField('mobile', e.target.value)}
          placeholder="Téléphone mobile"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail size={16} /> Email personnel
        </Label>
        <Input 
          id="email"
          type="email" 
          value={formData.email}
          onChange={(e) => onChangeField('email', e.target.value)}
          placeholder="email@exemple.com"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin size={16} /> Adresse
        </Label>
        <Input 
          id="address"
          value={formData.address}
          onChange={(e) => onChangeField('address', e.target.value)}
          placeholder="Adresse postale"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city" className="flex items-center gap-2">
          <MapPin size={16} /> Ville
        </Label>
        <Input 
          id="city"
          value={formData.city}
          onChange={(e) => onChangeField('city', e.target.value)}
          placeholder="Ville"
          className="bg-white dark:bg-gray-950 border border-gray-200 shadow-sm"
        />
      </div>
    </div>
  );
};

export default ContactPersonalInfo;
