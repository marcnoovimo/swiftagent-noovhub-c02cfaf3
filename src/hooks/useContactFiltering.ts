
import { useState, useMemo } from 'react';
import { Contact } from '@/types/contact';

export const useContactFiltering = (contacts: Contact[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    
    return contacts.filter((contact) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          contact.firstName.toLowerCase().includes(query) ||
          contact.lastName.toLowerCase().includes(query) ||
          (contact.email && contact.email.toLowerCase().includes(query)) ||
          (contact.company && contact.company.toLowerCase().includes(query)) ||
          (contact.city && contact.city.toLowerCase().includes(query));
          
        if (!matchesSearch) return false;
      }
      
      // Filter by category tab
      if (activeTab !== 'all') {
        switch (activeTab) {
          case 'clients':
            return contact.category === 'client';
          case 'partners':
            return contact.category === 'partner' || contact.category === 'notary';
          case 'others':
            return contact.category !== 'client' && 
                   contact.category !== 'partner' && 
                   contact.category !== 'notary';
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [contacts, searchQuery, activeTab]);

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredContacts
  };
};
