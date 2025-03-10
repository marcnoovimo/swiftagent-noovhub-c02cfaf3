
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Contact } from '@/types/contact';
import { ContactFormProps } from './form/types';
import { useContactForm } from './form/useContactForm';
import ContactFormTabs from './form/ContactFormTabs';
import ContactFormActions from './form/ContactFormActions';

const ContactForm = ({ open, onOpenChange, onSave, contact }: ContactFormProps) => {
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
      <DialogContent className="sm:max-w-[800px] bg-background max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{contact ? 'Modifier le contact' : 'Nouveau contact'}</DialogTitle>
          <DialogDescription>
            {contact ? 'Modifiez les informations du contact' : 'Ajoutez un nouveau contact à votre répertoire'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
          />
          
          <ContactFormActions 
            onCancel={() => onOpenChange(false)} 
            isEditing={!!contact}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
