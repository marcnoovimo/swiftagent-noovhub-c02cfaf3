
import React from 'react';
import { Inbox, Send, FileText, Trash, PenSquare, Archive, Star, AlertCircle, FolderPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmailFolder } from '../types/email';

interface EmailSidebarProps {
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  className?: string;
  onCreateEmail: () => void;
}

const EmailSidebar = ({ activeFolder, setActiveFolder, onCreateEmail }: EmailSidebarProps) => {
  const folders: EmailFolder[] = [
    { id: 'inbox', name: 'Boîte de réception', icon: 'inbox', count: 18, unread: 3 },
    { id: 'sent', name: 'Messages envoyés', icon: 'send', count: 32 },
    { id: 'drafts', name: 'Brouillons', icon: 'fileText', count: 4 },
    { id: 'urgent', name: 'Urgent', icon: 'alert', count: 3, unread: 2 },
    { id: 'archived', name: 'Archives', icon: 'archive', count: 45 },
    { id: 'trash', name: 'Corbeille', icon: 'trash', count: 12 },
  ];

  const getIconComponent = (iconName: string, isActive: boolean) => {
    const iconProps = {
      size: 16,
      className: isActive ? 'text-primary' : 'text-muted-foreground'
    };

    switch (iconName) {
      case 'inbox': return <Inbox {...iconProps} />;
      case 'send': return <Send {...iconProps} />;
      case 'fileText': return <FileText {...iconProps} />;
      case 'alert': return <AlertCircle {...iconProps} />;
      case 'archive': return <Archive {...iconProps} />;
      case 'trash': return <Trash {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'folderPlus': return <FolderPlus {...iconProps} />;
      default: return <Inbox {...iconProps} />;
    }
  };

  return (
    <div className="w-full lg:w-64 border-r border-border/30 overflow-hidden flex flex-col bg-muted/10">
      <div className="p-3 sm:p-4 border-b border-border/30">
        <Button 
          onClick={onCreateEmail}
          variant="default"
          className="w-full py-2 font-medium"
        >
          <PenSquare size={16} className="mr-2" />
          <span>Nouveau message</span>
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1 py-2">
        {folders.map((folder) => (
          <div 
            key={folder.id}
            onClick={() => setActiveFolder(folder.id)}
            className={`mx-2 mb-1 p-2.5 cursor-pointer transition-all flex items-center justify-between rounded-md ${
              activeFolder === folder.id 
                ? 'bg-primary/10 font-medium' 
                : 'hover:bg-muted/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {getIconComponent(folder.icon, activeFolder === folder.id)}
              <span className="text-sm truncate">{folder.name}</span>
            </div>
            
            {folder.count !== undefined && folder.count > 0 && (
              <div className="flex items-center">
                {folder.unread && folder.unread > 0 ? (
                  <Badge variant="default" className="ml-auto text-[10px] h-5 min-w-[1.25rem] flex items-center justify-center">
                    {folder.unread}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {folder.count}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border/30 mx-2 mt-2">
        <div className="text-xs text-muted-foreground">
          <p>Messagerie synchronisée</p>
          <p className="text-[10px] mt-1">Dernière sync: 14:35</p>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
