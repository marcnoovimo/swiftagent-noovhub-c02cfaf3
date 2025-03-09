import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Upload, Download, ScanLine, Smartphone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Contact } from '@/types/contact';
import { createContact } from '@/services/contactService';
import { Helmet } from 'react-helmet';

// Temporary mock implementation of missing components
const ContactsList = ({ contacts = [] }) => (
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

const ContactScanModal = ({ open, onOpenChange }) => (
  <div className={open ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50" : "hidden"}>
    <div className="bg-background p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Scanner une carte de visite</h2>
      <p className="text-muted-foreground mb-4">Fonctionnalité en cours de développement</p>
      <Button onClick={() => onOpenChange(false)}>Fermer</Button>
    </div>
  </div>
);

const ImportExportModal = ({ open, onOpenChange }) => (
  <div className={open ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50" : "hidden"}>
    <div className="bg-background p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Importer/Exporter</h2>
      <p className="text-muted-foreground mb-4">Fonctionnalité en cours de développement</p>
      <Button onClick={() => onOpenChange(false)}>Fermer</Button>
    </div>
  </div>
);

const ContactForm = ({ open, onOpenChange, onSave }) => (
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

// Mock implementation of useContacts
const useContacts = () => {
  const mockContacts = [
    {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@gmail.com",
      category: "client",
    },
    {
      id: "2",
      firstName: "Marie",
      lastName: "Leroy",
      email: "marie.leroy@outlook.com",
      category: "notary",
    }
  ];
  
  return {
    contacts: mockContacts,
    isLoading: false,
    error: null,
    refetch: () => console.log('Refetching contacts...')
  };
};

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scanOpen, setScanOpen] = useState(false);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [newContactOpen, setNewContactOpen] = useState(false);
  const { contacts, isLoading, refetch } = useContacts();
  const { toast } = useToast();

  const filteredContacts = contacts?.filter((contact) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.city?.toLowerCase().includes(query)
    );
  });

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
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Répertoire des contacts</h1>
          <p className="text-muted-foreground mt-1">
            Gérez tous vos contacts professionnels en un seul endroit
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setScanOpen(true)} variant="outline" className="flex items-center gap-2">
            <ScanLine size={16} />
            <span className="hidden sm:inline">Scanner une carte</span>
          </Button>
          
          <Button onClick={() => setImportExportOpen(true)} variant="outline" className="flex items-center gap-2">
            <Smartphone size={16} />
            <span className="hidden sm:inline">Synchroniser</span>
          </Button>
          
          <Button onClick={() => setNewContactOpen(true)} className="flex items-center gap-2">
            <PlusCircle size={16} />
            <span>Nouveau contact</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Tabs defaultValue="all" className="w-auto">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
            <TabsTrigger value="others">Autres</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ContactsList contacts={filteredContacts || []} />
      
      <ContactScanModal open={scanOpen} onOpenChange={setScanOpen} />
      <ImportExportModal open={importExportOpen} onOpenChange={setImportExportOpen} />
      <ContactForm 
        open={newContactOpen} 
        onOpenChange={setNewContactOpen} 
        onSave={handleCreateContact}
      />
    </div>
  );
};

export default Contacts;
