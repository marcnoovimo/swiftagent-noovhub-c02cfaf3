
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Contact } from '@/types/contact';

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const ContactForm = ({ open, onOpenChange, onSave }: ContactFormProps) => (
  <div className={open ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50" : "hidden"}>
    <div className="bg-background p-6 rounded-lg max-w-xl w-full">
      <h2 className="text-xl font-bold mb-4">Nouveau contact</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input placeholder="Prénom" />
        <Input placeholder="Nom" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
        <Button onClick={() => {
          onSave({
            firstName: 'Nouveau',
            lastName: 'Contact',
            email: 'nouveau@example.com',
            category: 'client'
          });
          onOpenChange(false);
        }}>Enregistrer</Button>
      </div>
    </div>
  </div>
);

export default ContactForm;
