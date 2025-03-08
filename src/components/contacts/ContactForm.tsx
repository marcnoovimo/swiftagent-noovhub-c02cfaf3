
import React from 'react';
import { User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

// Import refactored components
import ContactPersonalInfo from './form/ContactPersonalInfo';
import ContactProfessionalInfo from './form/ContactProfessionalInfo';
import ContactNotes from './form/ContactNotes';
import ContactFormActions from './form/ContactFormActions';
import { useContactForm } from './form/useContactForm';
import { Contact } from '@/types/contact';

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  open, 
  onOpenChange,
  onSave
}) => {
  const { form, onSubmit } = useContactForm({
    onSave,
    onClose: () => onOpenChange(false)
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" /> Nouveau contact
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <ContactPersonalInfo form={form} />
              
              {/* Professional Information */}
              <ContactProfessionalInfo form={form} />
              
              {/* Notes */}
              <ContactNotes form={form} />
            </div>
            
            {/* Form Actions */}
            <ContactFormActions onCancel={() => onOpenChange(false)} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
