
import React from 'react';
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';

interface ContactsListProps {
  contacts: Contact[];
}

const ContactsList = ({ contacts }: ContactsListProps) => (
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
            <Button variant="ghost" size="sm">Voir</Button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ContactsList;
