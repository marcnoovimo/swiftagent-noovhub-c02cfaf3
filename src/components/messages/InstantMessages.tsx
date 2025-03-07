
import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Video, Send, Paperclip, Mic, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    online: boolean;
  };
  content: string;
  time: string;
  isOwn: boolean;
  unread: boolean;
}

interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
  };
  lastMessage: {
    content: string;
    time: string;
    unread: boolean;
  };
}

const InstantMessages = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      contact: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      lastMessage: {
        content: 'Bonjour, pouvez-vous valider le dernier compromis?',
        time: '10:30',
        unread: true,
      },
    },
    {
      id: '2',
      contact: {
        name: 'Pierre Dupont',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        online: false,
        lastSeen: 'Il y a 1h',
      },
      lastMessage: {
        content: 'J\'ai des questions concernant le bien à Saint-Herblain',
        time: 'Hier',
        unread: true,
      },
    },
    {
      id: '3',
      contact: {
        name: 'Marie Lefevre',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        online: true,
      },
      lastMessage: {
        content: 'Merci pour les informations',
        time: 'Hier',
        unread: false,
      },
    },
    {
      id: '4',
      contact: {
        name: 'Équipe commerciale',
        avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
        online: true,
      },
      lastMessage: {
        content: 'Réunion d\'équipe à 16h aujourd\'hui',
        time: 'Mar',
        unread: false,
      },
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      content: 'Bonjour, comment allez-vous aujourd\'hui?',
      time: '10:00',
      isOwn: false,
      unread: false,
    },
    {
      id: '2',
      sender: {
        name: 'Agent',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        online: true,
      },
      content: 'Bonjour! Très bien, merci. J\'ai une question sur le compromis du 23 Rue des Lilas.',
      time: '10:05',
      isOwn: true,
      unread: false,
    },
    {
      id: '3',
      sender: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      content: 'Bien sûr, qu\'est-ce que vous souhaitez savoir exactement?',
      time: '10:10',
      isOwn: false,
      unread: false,
    },
    {
      id: '4',
      sender: {
        name: 'Agent',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        online: true,
      },
      content: 'J\'ai besoin de savoir si les documents ont été validés par le notaire.',
      time: '10:15',
      isOwn: true,
      unread: false,
    },
    {
      id: '5',
      sender: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      content: 'Je viens de vérifier et oui, le notaire a validé tous les documents hier. Vous pouvez procéder à la signature.',
      time: '10:20',
      isOwn: false,
      unread: false,
    },
    {
      id: '6',
      sender: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      content: 'Avez-vous besoin d\'autre chose?',
      time: '10:25',
      isOwn: false,
      unread: false,
    },
    {
      id: '7',
      sender: {
        name: 'Siège Noovimo',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
      },
      content: 'Bonjour, pouvez-vous valider le dernier compromis?',
      time: '10:30',
      isOwn: false,
      unread: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  
  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send the message to the server
    console.log('Sending message:', newMessage);
    
    setNewMessage('');
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-3">
      {/* Conversation list */}
      <div className="border-r border-border/50 p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="search-bar flex items-center">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeConversation.id === conversation.id
                  ? 'bg-noovimo-50 border-l-2 border-[#d72345]'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img
                    src={conversation.contact.avatar}
                    alt={conversation.contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conversation.contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{conversation.contact.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
                    
                    {conversation.lastMessage.unread && (
                      <span className="w-2 h-2 bg-[#d72345] rounded-full ml-1"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="md:col-span-2 flex flex-col h-[600px]">
        {/* Chat header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3">
              <img
                src={activeConversation.contact.avatar}
                alt={activeConversation.contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {activeConversation.contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div>
              <h3 className="font-medium">{activeConversation.contact.name}</h3>
              <p className="text-xs text-muted-foreground">
                {activeConversation.contact.online ? 'En ligne' : `${activeConversation.contact.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="icon-button">
              <Phone size={18} className="text-muted-foreground" />
            </button>
            <button className="icon-button">
              <Video size={18} className="text-muted-foreground" />
            </button>
            <button className="icon-button">
              <MoreVertical size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                {!message.isOwn && (
                  <div className="flex items-center mb-1">
                    <img
                      src={message.sender.avatar}
                      alt={message.sender.name}
                      className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                    <span className="text-xs font-medium">{message.sender.name}</span>
                  </div>
                )}
                
                <div className={`
                  p-3 rounded-lg 
                  ${message.isOwn 
                    ? 'bg-[#d72345] text-white rounded-tr-none' 
                    : 'bg-secondary/70 rounded-tl-none'
                  }
                `}>
                  <p className="text-sm">{message.content}</p>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {message.time}
                  {message.isOwn && (
                    <span className="ml-1">✓</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center">
            <button className="icon-button mr-2">
              <Paperclip size={18} className="text-muted-foreground" />
            </button>
            
            <div className="flex-1 search-bar">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
            </div>
            
            <button className="icon-button mx-2">
              <Mic size={18} className="text-muted-foreground" />
            </button>
            
            <button
              className="p-2 bg-[#d72345] text-white rounded-full"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantMessages;
