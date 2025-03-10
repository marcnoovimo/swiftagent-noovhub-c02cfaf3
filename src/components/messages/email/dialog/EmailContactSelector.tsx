
import React from 'react';
import { X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmailContact } from '../types/email';

interface EmailContactSelectorProps {
  contacts: EmailContact[];
  contactSearchQuery: string;
  setContactSearchQuery: (query: string) => void;
  onSelectContact: (email: string) => void;
  onClose: () => void;
}

const EmailContactSelector = ({
  contacts,
  contactSearchQuery,
  setContactSearchQuery,
  onSelectContact,
  onClose
}: EmailContactSelectorProps) => {
  const filteredContacts = contacts.filter(contact => {
    const query = contactSearchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-background z-10 flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Sélectionner des contacts</h4>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contact..."
            value={contactSearchQuery}
            onChange={(e) => setContactSearchQuery(e.target.value)}
            className="pl-8 text-sm h-9"
            autoFocus
          />
        </div>
      </div>
      <ScrollArea className="flex-1" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="p-2">
          {filteredContacts.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => onSelectContact(contact.email)}
              className="p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors flex items-center"
            >
              <div className="flex-shrink-0 mr-2">
                {contact.avatar ? (
                  <img 
                    src={contact.avatar} 
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {contact.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EmailContactSelector;
