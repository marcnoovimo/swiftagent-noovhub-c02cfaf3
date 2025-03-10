import React, { useState } from 'react';
import EmailSidebar from './email/EmailSidebar';
import EmailList from './email/EmailList';
import EmailView from './email/EmailView';
import ContactsDrawer from './email/ContactsDrawer';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import NewEmailDialog from './email/NewEmailDialog';
import { Email, EmailContact } from './types/email';
import { toast } from 'sonner';

const EmailClient = () => {
  const [emails] = useState<Email[]>([
    {
      id: '1',
      from: {
        name: 'Service Commercial',
        email: 'commercial@noovimo.fr',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      to: ['agent1@noovimo.fr'],
      subject: 'Mise à jour des conditions de commission',
      content: `Bonjour,\n\nNous souhaitons vous informer de la mise à jour des barèmes de commission applicable à partir du mois prochain.\n\nVous trouverez ci-joint le document détaillant les nouveaux taux.\n\nCordialement,\nLe Service Commercial`,
      timestamp: '10:23',
      isRead: false,
      isStarred: true,
      hasAttachments: true,
      attachments: [
        {
          name: 'baremes_commission_2023.pdf',
          size: '842 KB',
          type: 'application/pdf',
          url: '#'
        }
      ],
      folder: 'inbox',
      status: 'awaiting-reply'
    },
    {
      id: '2',
      from: {
        name: 'Laurent Dubois',
        email: 'l.dubois@noovimo.fr',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      to: ['agent1@noovimo.fr'],
      subject: 'Retour sur l\'estimation du bien à Rezé',
      content: `Bonjour,\n\nSuite à notre visite de la semaine dernière, j'ai finalisé l'estimation du bien à Rezé.\n\nLe rapport complet est joint à ce mail.\n\nBien cordialement,\nLaurent Dubois`,
      timestamp: 'Hier',
      isRead: true,
      isStarred: false,
      hasAttachments: true,
      attachments: [
        {
          name: 'estimation_reze_final.pdf',
          size: '1.2 MB',
          type: 'application/pdf',
          url: '#'
        },
        {
          name: 'photos_bien.zip',
          size: '5.8 MB',
          type: 'application/zip',
          url: '#'
        }
      ],
      folder: 'mandats',
      labels: ['estimation', 'rapport']
    },
    {
      id: '3',
      from: {
        name: 'Formation Noovimo',
        email: 'formation@noovimo.fr',
        avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      },
      to: ['tous@noovimo.fr'],
      subject: 'Nouvelle session de formation disponible',
      content: `Chers collaborateurs,\n\nUne nouvelle session de formation sur les techniques de négociation sera disponible à partir du 15 mars.\n\nInscriptions ouvertes dès maintenant sur l'intranet.\n\nL'équipe Formation`,
      timestamp: 'Mar',
      isRead: true,
      isStarred: false,
      hasAttachments: false,
      folder: 'inbox',
    },
    {
      id: '4',
      from: {
        name: 'Service Juridique',
        email: 'juridique@noovimo.fr',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
      to: ['agent1@noovimo.fr'],
      subject: 'Validation du compromis de vente',
      content: `Bonjour,\n\nNous avons bien reçu le compromis de vente pour le bien situé au 12 avenue des Fleurs.\n\nAprès vérification, nous avons apporté quelques modifications que vous trouverez en pièce jointe.\n\nMerci de les valider dans les plus brefs délais.\n\nCordialement,\nLe Service Juridique`,
      timestamp: 'Lun',
      isRead: false,
      isStarred: true,
      hasAttachments: true,
      attachments: [
        {
          name: 'compromis_vente_modifie.docx',
          size: '567 KB',
          type: 'application/docx',
          url: '#'
        }
      ],
      folder: 'urgent',
      status: 'awaiting-reply',
      labels: ['juridique', 'urgent']
    },
    {
      id: '5',
      from: {
        name: 'Maître Blanc',
        email: 'm.blanc@notaires.fr',
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      },
      to: ['agent1@noovimo.fr'],
      subject: 'Acte de vente - 24 rue des Lilas',
      content: `Bonjour,\n\nSuite à notre entretien téléphonique, je vous confirme que la signature de l'acte authentique est prévue pour le 28 mars à 14h00 en mon étude.\n\nMerci de bien vouloir confirmer votre présence et celle de vos clients.\n\nBien cordialement,\nMaître Blanc`,
      timestamp: '28 Fév',
      isRead: true,
      isStarred: true,
      hasAttachments: false,
      folder: 'clients',
      status: 'awaiting-reply',
      labels: ['notaire', 'signature']
    },
  ]);

  const [contacts] = useState<EmailContact[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@gmail.com',
      phone: '06 12 34 56 78',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'client-buyer',
      lastContact: '2023-03-01',
      notes: 'Recherche appartement 3 pièces à Nantes',
      communicationHistory: [
        {
          type: 'email',
          date: '2023-03-01',
          summary: 'Envoi des dernières annonces correspondant à ses critères'
        },
        {
          type: 'call',
          date: '2023-02-25',
          summary: 'Discussion sur le budget maximum (300K€)'
        }
      ]
    },
    {
      id: '2',
      name: 'Marie Martin',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@outlook.com',
      phone: '07 45 12 36 89',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'client-seller',
      lastContact: '2023-02-28',
      notes: 'Vend maison 5 pièces à Rezé',
      communicationHistory: [
        {
          type: 'meeting',
          date: '2023-02-28',
          summary: 'Signature du mandat de vente'
        }
      ]
    },
    {
      id: '3',
      name: 'Philippe Blanc',
      firstName: 'Philippe',
      lastName: 'Blanc',
      email: 'm.blanc@notaires.fr',
      phone: '02 40 45 67 89',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      company: 'Étude Blanc & Associés',
      role: 'Notaire',
      status: 'notary',
      lastContact: '2023-02-28',
      address: '15 rue de la Paix, 44000 Nantes'
    },
    {
      id: '4',
      name: 'Sophie Leroy',
      firstName: 'Sophie',
      lastName: 'Leroy',
      email: 'sophie.leroy@noovimo.fr',
      phone: '06 78 91 23 45',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      company: 'Noovimo',
      role: 'Responsable Juridique',
      status: 'agent',
      lastContact: '2023-03-02'
    },
    {
      id: '5',
      name: 'Laurent Dubois',
      firstName: 'Laurent',
      lastName: 'Dubois',
      email: 'l.dubois@noovimo.fr',
      phone: '06 23 45 67 89',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      company: 'Noovimo',
      role: 'Agent immobilier',
      status: 'agent',
      lastContact: '2023-03-01'
    }
  ]);

  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);
  const [replyContent, setReplyContent] = useState('');
  const [isContactsDrawerOpen, setIsContactsDrawerOpen] = useState(false);
  const [isNewEmailOpen, setIsNewEmailOpen] = useState(false);

  const handleSendReply = () => {
    if (replyContent.trim() === '') return;
    
    // In a real app, you would send the reply to the server
    console.log('Sending reply:', replyContent);
    
    toast.success("Réponse envoyée avec succès");
    setReplyContent('');
  };

  const createNewEmail = () => {
    setIsNewEmailOpen(true);
  };

  const handleSendEmail = (emailData: Partial<Email>) => {
    console.log('Sending new email:', emailData);
    toast.success("Email envoyé avec succès");
    setIsNewEmailOpen(false);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 lg:grid-cols-12 relative">
      <EmailSidebar 
        activeFolder={activeFolder} 
        setActiveFolder={setActiveFolder} 
        className="col-span-1 lg:col-span-2"
        onCreateEmail={createNewEmail}
      />
      
      <EmailList 
        emails={emails} 
        selectedEmail={selectedEmail} 
        setSelectedEmail={setSelectedEmail} 
        activeFolder={activeFolder} 
      />
      
      <EmailView 
        selectedEmail={selectedEmail} 
        replyContent={replyContent} 
        setReplyContent={setReplyContent} 
        handleSendReply={handleSendReply} 
        contacts={contacts}
      />

      <div className="fixed bottom-24 right-24 flex flex-col gap-2">
        <Button
          onClick={() => setIsContactsDrawerOpen(!isContactsDrawerOpen)}
          className="rounded-full shadow-lg"
          size="icon"
          title="Contacts"
        >
          <Users size={20} />
        </Button>
        
        <Button
          onClick={createNewEmail}
          className="rounded-full shadow-lg"
          size="icon"
          title="Nouveau message"
        >
          <PlusCircle size={20} />
        </Button>
      </div>

      <ContactsDrawer 
        isOpen={isContactsDrawerOpen} 
        onClose={() => setIsContactsDrawerOpen(false)} 
        contacts={contacts}
        onSelectContact={(contact) => {
          setIsContactsDrawerOpen(false);
          setIsNewEmailOpen(true);
        }}
      />

      <NewEmailDialog 
        isOpen={isNewEmailOpen} 
        onClose={() => setIsNewEmailOpen(false)} 
        onSend={handleSendEmail}
        contacts={contacts}
      />
    </div>
  );
};

export default EmailClient;
