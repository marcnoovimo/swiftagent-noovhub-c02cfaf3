
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  contact?: Contact;
}

const ContactForm = ({ open, onOpenChange, onSave, contact }: ContactFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exemple de données de contact (à remplacer par les données réelles du formulaire)
    const newContact = {
      firstName: "Nouveau",
      lastName: "Contact",
      email: "nouveau@example.com",
      category: 'client' as const,
    };
    
    onSave(newContact);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{contact ? 'Modifier le contact' : 'Nouveau contact'}</DialogTitle>
          <DialogDescription>
            {contact ? 'Modifiez les informations du contact' : 'Ajoutez un nouveau contact à votre répertoire'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Formulaire simplifié pour l'exemple */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
              <input 
                id="firstName"
                type="text" 
                className="w-full p-2 border rounded-md"
                defaultValue={contact?.firstName}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
              <input 
                id="lastName"
                type="text" 
                className="w-full p-2 border rounded-md"
                defaultValue={contact?.lastName}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                id="email"
                type="email" 
                className="w-full p-2 border rounded-md"
                defaultValue={contact?.email}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
              <select 
                id="category"
                className="w-full p-2 border rounded-md"
                defaultValue={contact?.category || 'client'}
              >
                <option value="client">Client</option>
                <option value="prospect">Prospect</option>
                <option value="partner">Partenaire</option>
                <option value="notary">Notaire</option>
                <option value="agent">Agent</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
