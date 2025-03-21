
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';
import ContactDetailModal from './ContactDetailModal';

interface ContactsListProps {
  contacts: Contact[];
}

const ContactsList = ({ contacts }: ContactsListProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  return (
    <>
      <div className="bg-card p-4 rounded-lg">
        {contacts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun contact trouvé. Ajoutez votre premier contact.
          </div>
        ) : (
          <div className="divide-y">
            {contacts.map((contact) => (
              <div key={contact.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                    {contact.firstName?.[0]}{contact.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-muted-foreground">{contact.email || 'Pas d\'email'}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewContact(contact)}
                >
                  Voir
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ContactDetailModal 
        contact={selectedContact}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
    </>
  );
};

export default ContactsList;
