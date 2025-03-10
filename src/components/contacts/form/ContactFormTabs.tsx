
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
  isMobile?: boolean;
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
  onRemoveTag,
  isMobile = false
}) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className={`grid grid-cols-3 ${isMobile ? 'mb-3 text-xs w-full overflow-x-auto p-1' : 'mb-6'}`}>
        <TabsTrigger value="personal" className={isMobile ? "text-[11px] px-1 py-1 overflow-hidden" : ""}>
          {isMobile ? "Personnel" : "Informations personnelles"}
        </TabsTrigger>
        <TabsTrigger value="professional" className={isMobile ? "text-[11px] px-1 py-1 overflow-hidden" : ""}>
          {isMobile ? "Professionnel" : "Informations professionnelles"}
        </TabsTrigger>
        <TabsTrigger value="additional" className={isMobile ? "text-[11px] px-1 py-1 overflow-hidden" : ""}>
          {isMobile ? "Complémentaire" : "Informations complémentaires"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className={`space-y-4 ${isMobile ? 'px-0' : ''}`}>
        <ContactPersonalInfo 
          formData={formData}
          onChangeField={onChangeField}
          onGenderChange={onGenderChange}
          onDateOfBirthChange={onDateOfBirthChange}
          isMobile={isMobile}
        />
      </TabsContent>
      
      <TabsContent value="professional" className={`space-y-4 ${isMobile ? 'px-0' : ''}`}>
        <ContactProfessionalInfo 
          formData={formData}
          onChangeField={onChangeField}
          onCategoryChange={onCategoryChange}
          isMobile={isMobile}
        />
      </TabsContent>
      
      <TabsContent value="additional" className={`space-y-4 ${isMobile ? 'px-0' : ''}`}>
        <ContactAdditionalInfo 
          formData={formData}
          onChangeField={onChangeField}
          newTag={newTag}
          setNewTag={setNewTag}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          isMobile={isMobile}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContactFormTabs;
