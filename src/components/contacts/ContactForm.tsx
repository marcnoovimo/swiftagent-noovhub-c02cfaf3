
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Contact } from '@/types/contact';
import { ContactFormProps } from './form/types';
import { useContactForm } from './form/useContactForm';
import ContactFormTabs from './form/ContactFormTabs';
import ContactFormActions from './form/ContactFormActions';
import { useIsMobile } from '@/hooks/use-mobile';

const ContactForm = ({ open, onOpenChange, onSave, contact }: ContactFormProps) => {
  const isMobile = useIsMobile();
  const {
    formData,
    newTag,
    setNewTag,
    handleChange,
    handleCategoryChange,
    handleGenderChange,
    handleDateOfBirthChange,
    handleAddTag,
    handleRemoveTag,
    prepareDataForSubmission
  } = useContactForm(contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = prepareDataForSubmission();
    onSave(formattedData as any);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content sm:max-w-[800px] max-w-[95vw] bg-background">
        <DialogHeader className={`${isMobile ? 'mb-2 space-y-1' : 'mb-4 space-y-2'}`}>
          <DialogTitle className="text-xl font-semibold text-center sm:text-left">{contact ? 'Modifier le contact' : 'Nouveau contact'}</DialogTitle>
          <DialogDescription className="text-center sm:text-left">
            {contact ? 'Modifiez les informations du contact' : 'Ajoutez un nouveau contact à votre répertoire'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className={`space-y-4 ${isMobile ? 'mt-2' : 'mt-4'}`}>
          <ContactFormTabs 
            formData={formData}
            onChangeField={handleChange}
            onCategoryChange={handleCategoryChange}
            onGenderChange={handleGenderChange}
            onDateOfBirthChange={handleDateOfBirthChange}
            newTag={newTag}
            setNewTag={setNewTag}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            isMobile={isMobile}
          />
          
          <ContactFormActions 
            onCancel={() => onOpenChange(false)} 
            isEditing={!!contact}
            isMobile={isMobile}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
