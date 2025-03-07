
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Send, Paperclip, Mic, MessageCircle } from 'lucide-react';

interface GroupMessage {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  isOwn: boolean;
}

interface Group {
  id: string;
  name: string;
  avatar: string;
  members: number;
  lastMessage: {
    sender: string;
    content: string;
    time: string;
  };
  unreadCount: number;
}

const GroupDiscussions = () => {
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Équipe Nantes',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      members: 8,
      lastMessage: {
        sender: 'Marie',
        content: 'La réunion est confirmée pour vendredi',
        time: '11:30',
      },
      unreadCount: 3,
    },
    {
      id: '2',
      name: 'Mandataires Bretagne',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      members: 12,
      lastMessage: {
        sender: 'Thomas',
        content: 'Nouveau bien à Rennes, photos dans le dossier partagé',
        time: 'Hier',
      },
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Formation Janvier',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      members: 25,
      lastMessage: {
        sender: 'Sophie',
        content: 'Tous les supports sont maintenant disponibles',
        time: 'Mer',
      },
      unreadCount: 5,
    },
    {
      id: '4',
      name: 'Nouvelles réglementations',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      members: 42,
      lastMessage: {
        sender: 'Pierre',
        content: 'Webinaire explicatif le 20 mars à 14h',
        time: 'Lun',
      },
      unreadCount: 0,
    },
  ]);

  const [groupMessages] = useState<GroupMessage[]>([
    {
      id: '1',
      sender: {
        name: 'Marie',
        avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      },
      content: 'Bonjour à tous, j\'espère que vous allez bien!',
      time: '09:30',
      isOwn: false,
    },
    {
      id: '2',
      sender: {
        name: 'Thomas',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      content: 'Bonjour Marie, tout va bien ici. On confirme la réunion de vendredi?',
      time: '09:45',
      isOwn: false,
    },
    {
      id: '3',
      sender: {
        name: 'Vous',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: 'Oui, je serai présent. Pouvons-nous ajouter un point sur les nouveaux mandats?',
      time: '10:15',
      isOwn: true,
    },
    {
      id: '4',
      sender: {
        name: 'Sophie',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      content: 'Bien sûr, c\'est noté. Je mets à jour l\'ordre du jour.',
      time: '10:30',
      isOwn: false,
    },
    {
      id: '5',
      sender: {
        name: 'Marie',
        avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      },
      content: 'Parfait! Je vous envoie l\'invitation mise à jour d\'ici ce soir.',
      time: '11:00',
      isOwn: false,
    },
    {
      id: '6',
      sender: {
        name: 'Marie',
        avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      },
      content: 'La réunion est confirmée pour vendredi',
      time: '11:30',
      isOwn: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeGroup, setActiveGroup] = useState(groups[0]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send the message to the server
    console.log('Sending group message:', newMessage);
    
    setNewMessage('');
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-3">
      {/* Groups list */}
      <div className="border-r border-border/50 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="search-bar flex-1 flex items-center">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Rechercher un groupe..."
              className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            />
          </div>
          <button className="ml-2 p-2 bg-[#d72345] text-white rounded-full">
            <Plus size={18} />
          </button>
        </div>
        
        <div className="space-y-2">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setActiveGroup(group)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeGroup.id === group.id
                  ? 'bg-noovimo-50 border-l-2 border-[#d72345]'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{group.name}</h3>
                    <span className="text-xs text-muted-foreground">{group.lastMessage.time}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate">
                      <span className="font-medium">{group.lastMessage.sender}:</span> {group.lastMessage.content}
                    </p>
                    
                    {group.unreadCount > 0 && (
                      <span className="flex items-center justify-center min-w-5 h-5 bg-[#d72345] text-white text-xs rounded-full px-1.5">
                        {group.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Group chat area */}
      <div className="md:col-span-2 flex flex-col h-[600px]">
        {/* Group header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3">
              <img
                src={activeGroup.avatar}
                alt={activeGroup.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="font-medium">{activeGroup.name}</h3>
              <p className="text-xs text-muted-foreground">
                {activeGroup.members} membres
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="icon-button">
              <Search size={18} className="text-muted-foreground" />
            </button>
            <button className="icon-button">
              <MoreVertical size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Group messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {groupMessages.map((message) => (
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
                placeholder="Message au groupe..."
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

export default GroupDiscussions;
