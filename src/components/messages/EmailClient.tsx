
import React, { useState } from 'react';
import { Search, Plus, Star, Inbox, Send as SendIcon, FileText, Trash2, MoreVertical, Clock, Flag, Bookmark, Send, Paperclip } from 'lucide-react';

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
}

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

  const folderIcons = {
    inbox: <Inbox size={18} />,
    sent: <SendIcon size={18} />,
    drafts: <FileText size={18} />,
    trash: <Trash2 size={18} />,
  };

  const getFolderEmails = (folder: string) => {
    return emails.filter(email => {
      if (folder === 'inbox') return email.folder === 'inbox';
      if (folder === 'sent') return email.folder === 'sent';
      if (folder === 'drafts') return email.folder === 'drafts';
      if (folder === 'trash') return email.folder === 'trash';
      return true;
    });
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 lg:grid-cols-12">
      {/* Sidebar */}
      <div className="lg:col-span-2 border-r border-border/50 p-4 overflow-y-auto">
        <div className="mb-6">
          <button className="w-full flex items-center justify-center gap-2 p-3 bg-[#d72345] text-white rounded-lg hover:bg-[#c01f3c] transition-colors">
            <Plus size={16} />
            <span>Nouveau mail</span>
          </button>
        </div>
        
        <nav className="space-y-1">
          {['inbox', 'sent', 'drafts', 'trash'].map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                activeFolder === folder
                  ? 'bg-noovimo-50 text-[#d72345]'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {folderIcons[folder as keyof typeof folderIcons]}
                <span className="capitalize">{folder}</span>
              </div>
              
              {folder === 'inbox' && (
                <span className="flex items-center justify-center min-w-5 h-5 bg-[#d72345] text-white text-xs rounded-full px-1.5">
                  2
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">LIBELLÉS</p>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Important</span>
            </button>
            <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Personnel</span>
            </button>
            <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Clients</span>
            </button>
            <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Administratif</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Email list */}
      <div className="lg:col-span-3 border-r border-border/50 overflow-hidden flex flex-col">
        <div className="p-3 border-b border-border/50">
          <div className="search-bar flex items-center">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Rechercher des emails..."
              className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {getFolderEmails(activeFolder).map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`border-b border-border/50 p-3 cursor-pointer transition-colors ${
                selectedEmail?.id === email.id
                  ? 'bg-noovimo-50 border-l-2 border-[#d72345]'
                  : 'hover:bg-secondary/50'
              } ${
                !email.isRead ? 'font-medium' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <img
                    src={email.from.avatar}
                    alt={email.from.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span className="text-sm truncate">{email.from.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {email.hasAttachments && (
                    <Paperclip size={14} className="text-muted-foreground" />
                  )}
                  {email.isStarred && (
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  )}
                  <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                </div>
              </div>
              
              <h4 className="text-sm truncate">{email.subject}</h4>
              <p className="text-xs text-muted-foreground truncate mt-1">
                {email.content.split('\n')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Email content */}
      <div className="lg:col-span-7 flex flex-col h-[600px]">
        {selectedEmail ? (
          <>
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-medium">{selectedEmail.subject}</h3>
              
              <div className="flex items-center space-x-2">
                <button className="icon-button">
                  <Clock size={18} className="text-muted-foreground" />
                </button>
                <button className="icon-button">
                  <Flag size={18} className="text-muted-foreground" />
                </button>
                <button className="icon-button">
                  <Bookmark size={18} className="text-muted-foreground" />
                </button>
                <button className="icon-button">
                  <Trash2 size={18} className="text-muted-foreground" />
                </button>
                <button className="icon-button">
                  <MoreVertical size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-start mb-4">
                <img
                  src={selectedEmail.from.avatar}
                  alt={selectedEmail.from.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{selectedEmail.from.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {selectedEmail.from.email}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedEmail.timestamp}
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    À: {selectedEmail.to.join(', ')}
                  </div>
                  
                  <div className="mt-4 whitespace-pre-line">
                    {selectedEmail.content}
                  </div>
                  
                  {selectedEmail.hasAttachments && (
                    <div className="mt-6 p-3 border border-border/50 rounded-lg">
                      <div className="flex items-center">
                        <FileText size={18} className="text-muted-foreground mr-2" />
                        <span className="text-sm">document_joint.pdf</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <div className="p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium">Répondre</h4>
                  </div>
                  
                  <textarea
                    className="w-full p-3 border border-border/50 rounded-lg bg-secondary/20 focus:outline-none focus:ring-1 focus:ring-[#d72345] resize-none"
                    rows={5}
                    placeholder="Votre réponse..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></textarea>
                  
                  <div className="flex justify-between items-center mt-3">
                    <button className="icon-button">
                      <Paperclip size={18} className="text-muted-foreground" />
                    </button>
                    
                    <button
                      className="px-4 py-2 bg-[#d72345] text-white rounded-lg hover:bg-[#c01f3c] transition-colors flex items-center gap-2"
                      onClick={handleSendReply}
                    >
                      <Send size={16} />
                      <span>Envoyer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary/50 mb-4">
              <MessageCircle size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Aucun email sélectionné</h3>
            <p className="text-muted-foreground mt-1">
              Sélectionnez un email pour afficher son contenu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailClient;
