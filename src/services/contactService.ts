
import { Contact } from '@/types/contact';

// Données simulées des contacts pour la démo
const mockContacts: Contact[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@gmail.com",
    emailPro: "j.dupont@entreprise.fr",
    phone: "06 12 34 56 78",
    mobile: "06 12 34 56 78",
    photo: "https://i.pravatar.cc/150?img=3",
    company: "Entreprise SAS",
    position: "Directeur Commercial",
    address: "15 rue de Paris",
    city: "Paris",
    notes: "Client intéressé par un bien sur Paris",
    category: "client",
    tags: ["premium", "acquéreur"],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-20T14:22:00Z",
    lastContact: "2023-06-20T14:22:00Z",
    source: "manual",
    communicationHistory: [
      {
        type: "email",
        date: "2023-06-20T14:22:00Z",
        summary: "Discussion sur les biens disponibles dans le 16ème"
      },
      {
        type: "call",
        date: "2023-06-15T09:15:00Z",
        summary: "Appel pour définir ses critères de recherche"
      }
    ]
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Leroy",
    email: "marie.leroy@outlook.com",
    phone: "07 65 43 21 09",
    photo: "https://i.pravatar.cc/150?img=5",
    company: "Cabinet Juridique Leroy",
    position: "Notaire",
    city: "Lyon",
    category: "notary",
    tags: ["notaire", "partenaire"],
    createdAt: "2023-04-10T08:45:00Z",
    updatedAt: "2023-06-18T11:30:00Z",
    source: "import"
  },
  {
    id: "3",
    firstName: "Thomas",
    lastName: "Martin",
    email: "t.martin@gmail.com",
    emailPro: "thomas.martin@construction.fr",
    phone: "06 98 76 54 32",
    company: "Construction Moderne",
    position: "Architecte",
    city: "Bordeaux",
    category: "partner",
    tags: ["architecte", "rénovation"],
    createdAt: "2023-03-22T15:20:00Z",
    updatedAt: "2023-06-05T10:15:00Z",
    source: "scan"
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Blanc",
    email: "sophie.blanc@hotmail.fr",
    phone: "07 12 34 56 78",
    city: "Nantes",
    category: "prospect",
    tags: ["vendeur"],
    createdAt: "2023-06-01T09:10:00Z",
    updatedAt: "2023-06-01T09:10:00Z",
    source: "manual"
  },
  {
    id: "5",
    firstName: "Pierre",
    lastName: "Dubois",
    email: "p.dubois@banque.fr",
    phone: "06 23 45 67 89",
    photo: "https://i.pravatar.cc/150?img=8",
    company: "Crédit Immobilier",
    position: "Conseiller",
    city: "Toulouse",
    category: "partner",
    tags: ["banque", "financement"],
    createdAt: "2023-02-15T11:25:00Z",
    updatedAt: "2023-05-20T16:40:00Z",
    source: "import"
  }
];

// Fonction pour récupérer tous les contacts
export const fetchContacts = async (): Promise<Contact[]> => {
  // Dans une vraie application, on ferait une requête API ici
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockContacts);
    }, 800); // Simuler un délai réseau
  });
};

// Fonction pour récupérer un contact par son ID
export const fetchContactById = async (id: string): Promise<Contact | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const contact = mockContacts.find(contact => contact.id === id);
      resolve(contact);
    }, 500);
  });
};

// Fonction pour créer un nouveau contact
export const createContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newContact: Contact = {
        ...contact,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockContacts.push(newContact);
      resolve(newContact);
    }, 500);
  });
};

// Fonction pour extraire les informations d'une carte de visite scannée
export const extractBusinessCardInfo = async (imageData: string): Promise<Partial<Contact>> => {
  // Dans une vraie application, on enverrait l'image à une API d'OCR/IA
  console.log("Extracting business card info from image");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simuler une extraction réussie - données plus complètes pour démonstration
      const extractedData: Partial<Contact> = {
        firstName: "Arthur",
        lastName: "Bernard",
        email: "a.bernard@entreprise.fr",
        phone: "06 78 90 12 34",
        company: "Entreprise Exemple",
        position: "Responsable Commercial",
        address: "25 rue des Exemples",
        city: "Paris",
        category: "prospect",
        source: "scan"
      };
      
      console.log("Extracted data:", extractedData);
      resolve(extractedData);
    }, 1500);
  });
};

// Fonction pour importer des contacts
export const importContacts = async (source: 'phone' | 'csv' | 'vcard'): Promise<number> => {
  // Simuler un import de contacts
  return new Promise((resolve) => {
    setTimeout(() => {
      // Retourne le nombre de contacts importés
      resolve(Math.floor(Math.random() * 10) + 3);
    }, 2000);
  });
};

// Fonction pour exporter des contacts
export const exportContacts = async (format: 'csv' | 'vcard'): Promise<string> => {
  // Simuler un export de contacts
  return new Promise((resolve) => {
    setTimeout(() => {
      // Retourne une URL de téléchargement fictive
      resolve("data:text/csv;charset=utf-8,exported_contacts.csv");
    }, 1000);
  });
};
