
import React, { useState } from 'react';
import { X, Search, Plus, Users, User, Phone, Mail, Clock, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmailContact } from '../types/email';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ContactsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmailContact[];
  onSelectContact: (contact: EmailContact) => void;
}

const ContactsDrawer = ({ isOpen, onClose, contacts, onSelectContact }: ContactsDrawerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = !filter || contact.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'client-buyer':
        return <Badge className="bg-blue-500">Client acheteur</Badge>;
      case 'client-seller':
        return <Badge className="bg-green-500">Client vendeur</Badge>;
      case 'notary':
        return <Badge className="bg-purple-500">Notaire</Badge>;
      case 'partner':
        return <Badge className="bg-amber-500">Partenaire</Badge>;
      case 'agent':
        return <Badge className="bg-slate-500">Agent</Badge>;
      default:
        return <Badge className="bg-gray-500">Autre</Badge>;
    }
  };
  
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-background shadow-xl z-50 border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <Users size={18} className="mr-2" />
          Contacts
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={18} />
        </Button>
      </div>
      
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-2 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm h-9"
          />
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter(null)}
          >
            Tous
          </Button>
          <Button 
            variant={filter === 'client-buyer' || filter === 'client-seller' ? "default" : "outline"} 
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter(filter === 'client-buyer' || filter === 'client-seller' ? null : 'client-buyer')}
          >
            Clients
          </Button>
          <Button 
            variant={filter === 'notary' ? "default" : "outline"} 
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter(filter === 'notary' ? null : 'notary')}
          >
            Notaires
          </Button>
          <Button 
            variant={filter === 'agent' ? "default" : "outline"} 
            size="sm"
            className="text-xs h-7"
            onClick={() => setFilter(filter === 'agent' ? null : 'agent')}
          >
            Agents
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <User size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Aucun contact trouvé</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => onSelectContact(contact)}
                className="p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center mb-1">
                  <img 
                    src={contact.avatar || `https://ui-avatars.com/api/?name=${contact.firstName}+${contact.lastName}&background=random`} 
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="w-9 h-9 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {contact.firstName} {contact.lastName}
                    </h4>
                    {getStatusBadge(contact.status)}
                  </div>
                </div>
                
                <div className="ml-12 space-y-1 mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Mail size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  
                  {contact.phone && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Phone size={12} className="mr-1 flex-shrink-0" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  
                  {contact.lastContact && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={12} className="mr-1 flex-shrink-0" />
                      <span>Dernier contact: {contact.lastContact}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-border">
        <Button className="w-full flex items-center justify-center text-sm">
          <UserPlus size={16} className="mr-2" />
          Ajouter un contact
        </Button>
      </div>
    </div>
  );
};

export default ContactsDrawer;
