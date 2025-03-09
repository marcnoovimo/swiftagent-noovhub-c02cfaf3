import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Contact } from '@/types/contact';
import { createContact } from '@/services/contactService';
import { Helmet } from 'react-helmet';
import { useContacts } from '@/hooks/useContacts';
import { useContactFiltering } from '@/hooks/useContactFiltering';

// Import the extracted components
import ContactsList from '@/components/contacts/ContactsList';
import ContactScanModal from '@/components/contacts/ContactScanModal';
import ImportExportModal from '@/components/contacts/ImportExportModal';
import ContactForm from '@/components/contacts/ContactForm';
import ContactsHeader from '@/components/contacts/ContactsHeader';
import ContactsSearchFilter from '@/components/contacts/ContactsSearchFilter';

const Contacts = () => {
  const [scanOpen, setScanOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [newContactOpen, setNewContactOpen] = useState(false);
  const { contacts, isLoading, refetch } = useContacts();
  const { toast } = useToast();
  
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredContacts
  } = useContactFiltering(contacts);

  const handleCreateContact = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createContact(contactData);
      refetch();
      toast({
        title: "Contact créé avec succès",
        description: `${contactData.firstName} ${contactData.lastName} a été ajouté à votre répertoire.`,
      });
    } catch (error) {
      toast({
        title: "Erreur lors de la création du contact",
        description: "Une erreur est survenue, veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-noovimo-500 font-bold text-xl">
            Chargement des contacts...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Helmet>
        <title>Contacts | Intranet Noovimo</title>
      </Helmet>
      
      <ContactsHeader 
        onOpenScanModal={() => setScanOpen(true)}
        onOpenImportExportModal={() => setImportExportOpen(true)}
        onOpenNewContactModal={() => setNewContactOpen(true)}
      />
      
      <ContactsSearchFilter 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ContactsList contacts={filteredContacts} />
      
      <ContactScanModal 
        open={scanOpen} 
        onOpenChange={setScanOpen} 
      />
      
      <ImportExportModal 
        open={importExportOpen} 
        onOpenChange={setImportExportOpen} 
      />
      
      <ContactForm 
        open={newContactOpen} 
        onOpenChange={setNewContactOpen} 
        onSave={handleCreateContact}
      />
    </div>
  );
};

export default Contacts;
