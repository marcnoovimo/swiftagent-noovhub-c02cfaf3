
import React, { useState } from 'react';
import EmailSidebar from './email/EmailSidebar';
import EmailList from './email/EmailList';
import EmailView from './email/EmailView';
import { Email } from './types/email';

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
      folder: 'inbox',
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
      folder: 'inbox',
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
      folder: 'inbox',
    },
  ]);

  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);
  const [replyContent, setReplyContent] = useState('');

  const handleSendReply = () => {
    if (replyContent.trim() === '') return;
    
    // In a real app, you would send the reply to the server
    console.log('Sending reply:', replyContent);
    
    setReplyContent('');
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 lg:grid-cols-12">
      <EmailSidebar 
        activeFolder={activeFolder} 
        setActiveFolder={setActiveFolder} 
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
      />
    </div>
  );
};

export default EmailClient;
