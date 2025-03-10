
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactPersonalInfo from './ContactPersonalInfo';
import ContactProfessionalInfo from './ContactProfessionalInfo';
import ContactAdditionalInfo from './ContactAdditionalInfo';
import { ContactFormData } from './types';

interface ContactFormTabsProps {
  formData: ContactFormData;
  onChangeField: (id: string, value: any) => void;
  onCategoryChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onDateOfBirthChange: (date: Date | undefined) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

const ContactFormTabs: React.FC<ContactFormTabsProps> = ({
  formData,
  onChangeField,
  onCategoryChange,
  onGenderChange,
  onDateOfBirthChange,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag
}) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
        <TabsTrigger value="professional">Informations professionnelles</TabsTrigger>
        <TabsTrigger value="additional">Informations complémentaires</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-4">
        <ContactPersonalInfo 
          formData={formData}
          onChangeField={onChangeField}
          onGenderChange={onGenderChange}
          onDateOfBirthChange={onDateOfBirthChange}
        />
      </TabsContent>
      
      <TabsContent value="professional" className="space-y-4">
        <ContactProfessionalInfo 
          formData={formData}
          onChangeField={onChangeField}
          onCategoryChange={onCategoryChange}
        />
      </TabsContent>
      
      <TabsContent value="additional" className="space-y-4">
        <ContactAdditionalInfo 
          formData={formData}
          onChangeField={onChangeField}
          newTag={newTag}
          setNewTag={setNewTag}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContactFormTabs;
