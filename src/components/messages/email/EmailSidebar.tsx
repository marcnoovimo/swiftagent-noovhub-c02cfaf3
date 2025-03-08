
import React from 'react';
import { Inbox, Send, FileText, Trash, PenSquare, Users, Archive, Star, Alert, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmailFolder } from '../types/email';

interface EmailSidebarProps {
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  className?: string;
  onCreateEmail: () => void;
}

const EmailSidebar = ({ activeFolder, setActiveFolder, className = '', onCreateEmail }: EmailSidebarProps) => {
  const folders: EmailFolder[] = [
    { id: 'inbox', name: 'Boîte de réception', icon: 'inbox', count: 18, unread: 3, isDefault: true },
    { id: 'sent', name: 'Messages envoyés', icon: 'send', count: 32 },
    { id: 'drafts', name: 'Brouillons', icon: 'fileText', count: 4 },
    { id: 'clients', name: 'Clients', icon: 'users', count: 27, unread: 5, color: 'blue' },
    { id: 'mandats', name: 'Mandats', icon: 'home', count: 15, color: 'green' },
    { id: 'urgent', name: 'Urgent', icon: 'alert', count: 3, unread: 2, color: 'red' },
    { id: 'archived', name: 'Archives', icon: 'archive', count: 45 },
    { id: 'trash', name: 'Corbeille', icon: 'trash', count: 12 },
  ];

  const getIconComponent = (iconName: string, isActive: boolean) => {
    const iconProps = {
      size: 16,
      className: isActive ? 'text-[#d72345]' : 'text-muted-foreground'
    };

    switch (iconName) {
      case 'inbox': return <Inbox {...iconProps} />;
      case 'send': return <Send {...iconProps} />;
      case 'fileText': return <FileText {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'alert': return <Alert {...iconProps} />;
      case 'archive': return <Archive {...iconProps} />;
      case 'trash': return <Trash {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      default: return <Inbox {...iconProps} />;
    }
  };

  return (
    <div className={`lg:col-span-2 border-r border-border/50 overflow-hidden flex flex-col ${className}`}>
      <div className="p-2 sm:p-3 border-b border-border/50">
        <button 
          onClick={onCreateEmail}
          className="w-full bg-[#d72345] text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#c01f3c] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <PenSquare size={16} />
          <span className="truncate">Nouveau message</span>
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {folders.map((folder) => (
          <div 
            key={folder.id}
            onClick={() => setActiveFolder(folder.id)}
            className={`p-2 sm:p-3 cursor-pointer transition-colors flex items-center justify-between ${
              activeFolder === folder.id 
                ? 'bg-secondary/70 font-medium' 
                : 'hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {getIconComponent(folder.icon, activeFolder === folder.id)}
              <span className="text-xs sm:text-sm">{folder.name}</span>
            </div>
            
            {folder.count !== undefined && (
              <div className="flex items-center">
                {folder.unread && folder.unread > 0 ? (
                  <Badge variant="default" className="ml-auto text-[10px] h-5 min-w-5 flex items-center justify-center bg-[#d72345]">
                    {folder.unread}
                  </Badge>
                ) : (
                  <span className="text-[10px] text-muted-foreground">
                    {folder.count}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        
        <div className="p-2 sm:p-3 mt-2 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <p>Messagerie synchronisée</p>
            <p className="text-[10px] mt-1">Dernière sync: 14:35</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
