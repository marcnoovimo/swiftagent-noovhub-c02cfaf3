
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Briefcase, Mail, Tags } from 'lucide-react';
import { ContactFormData } from './types';

interface ContactProfessionalInfoProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
  onCategoryChange: (value: string) => void;
}

const ContactProfessionalInfo: React.FC<ContactProfessionalInfoProps> = ({
  formData,
  onChangeField,
  onCategoryChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="company" className="flex items-center gap-2">
          <Building2 size={16} /> Entreprise
        </Label>
        <Input 
          id="company"
          value={formData.company}
          onChange={(e) => onChangeField('company', e.target.value)}
          placeholder="Nom de l'entreprise"
          className="bg-white dark:bg-gray-950"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="position" className="flex items-center gap-2">
          <Briefcase size={16} /> Fonction
        </Label>
        <Input 
          id="position"
          value={formData.position}
          onChange={(e) => onChangeField('position', e.target.value)}
          placeholder="Fonction / Poste"
          className="bg-white dark:bg-gray-950"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="emailPro" className="flex items-center gap-2">
          <Mail size={16} /> Email professionnel
        </Label>
        <Input 
          id="emailPro"
          type="email"
          value={formData.emailPro}
          onChange={(e) => onChangeField('emailPro', e.target.value)}
          placeholder="email.pro@entreprise.com"
          className="bg-white dark:bg-gray-950"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category" className="flex items-center gap-2">
          <Tags size={16} /> Catégorie
        </Label>
        <Select 
          value={formData.category} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger id="category" className="bg-white dark:bg-gray-950">
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="partner">Partenaire</SelectItem>
            <SelectItem value="notary">Notaire</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ContactProfessionalInfo;
