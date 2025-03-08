
import React, { useState } from 'react';
import { Search, MoreVertical, Send, Paperclip, Users, X } from 'lucide-react';
import { useGroups } from '@/hooks/useGroups';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import CreateGroupDialog from './CreateGroupDialog';
import GroupInfo from './GroupInfo';
import { toast } from 'sonner';

interface GroupDiscussionsProps {
  onClose?: () => void;
}

const GroupDiscussions = ({ onClose }: GroupDiscussionsProps) => {
  const { user } = useAuth();
  const { 
    groups, 
    activeGroup, 
    setActiveGroup, 
    groupMessages, 
    loading, 
    sendMessage, 
    createGroup,
    joinGroup 
  } = useGroups();
  
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !activeGroup) return;
    
    const success = await sendMessage(activeGroup.id, newMessage);
    if (success) {
      setNewMessage('');
    }
  };

  const handleCreateGroup = async (name: string, description: string) => {
    return await createGroup(name, description);
  };

  // Check if user is admin (for demo purposes, check if email ends with @admin.noovimo.fr)
  const isAdmin = user?.email?.endsWith('@admin.noovimo.fr') || user?.email?.endsWith('@noovimo.fr');

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-3 relative">
      {/* Close button */}
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {/* Groups list */}
      <div className="border-r border-border/50 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="search-bar flex-1 flex items-center">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Rechercher un groupe..."
              className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isAdmin && (
            <div className="ml-2">
              <CreateGroupDialog onCreateGroup={handleCreateGroup} />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setActiveGroup(group)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                activeGroup?.id === group.id
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

                  <div className="flex items-center mt-1">
                    <Users size={12} className="text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">{group.members} membres</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center p-4 text-muted-foreground">
              Aucun groupe trouvé
            </div>
          )}
        </div>
      </div>
      
      {/* Group chat area */}
      {activeGroup ? (
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
            
            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => {
                        joinGroup(activeGroup.id);
                        toast("Vous avez rejoint le groupe");
                      }}
                    >
                      <Users size={16} className="text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rejoindre le groupe</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <Search size={16} className="text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rechercher dans les messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <GroupInfo group={activeGroup} />
            </div>
          </div>
          
          {/* Group messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-container">
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
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {groupMessages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Users size={40} className="mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Bienvenue dans {activeGroup.name}</h3>
                  <p className="text-muted-foreground mt-1">{activeGroup.description}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                      <Paperclip size={18} className="text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ajouter une pièce jointe</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="flex-1 search-bar mx-2">
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
              
              <Button
                variant="default"
                size="icon"
                className="rounded-full h-10 w-10 bg-[#d72345] hover:bg-[#b61d39]"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={18} className="text-white" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="text-center p-6">
            <Users size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Aucun groupe sélectionné</h3>
            <p className="text-muted-foreground">
              Sélectionnez un groupe pour commencer à discuter
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDiscussions;
