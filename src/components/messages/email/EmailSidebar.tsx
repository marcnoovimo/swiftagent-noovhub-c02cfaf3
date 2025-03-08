
import React from 'react';
import { Inbox, Send, FileText, Trash, PenSquare } from 'lucide-react';

interface EmailSidebarProps {
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  className?: string;
}

const EmailSidebar = ({ activeFolder, setActiveFolder, className = '' }: EmailSidebarProps) => {
  return (
    <div className={`lg:col-span-2 border-r border-border/50 overflow-hidden flex flex-col ${className}`}>
      <div className="p-2 sm:p-3 border-b border-border/50">
        <button className="w-full bg-[#d72345] text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#c01f3c] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <PenSquare size={16} />
          <span className="truncate">Nouveau message</span>
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div 
          onClick={() => setActiveFolder('inbox')}
          className={`p-2 sm:p-3 cursor-pointer transition-colors flex items-center gap-2 ${
            activeFolder === 'inbox' 
              ? 'bg-secondary/70 font-medium' 
              : 'hover:bg-secondary/50'
          }`}
        >
          <Inbox size={16} className={activeFolder === 'inbox' ? 'text-[#d72345]' : 'text-muted-foreground'} />
          <span className="text-xs sm:text-sm">Boîte de réception</span>
        </div>
        
        <div 
          onClick={() => setActiveFolder('sent')}
          className={`p-2 sm:p-3 cursor-pointer transition-colors flex items-center gap-2 ${
            activeFolder === 'sent' 
              ? 'bg-secondary/70 font-medium' 
              : 'hover:bg-secondary/50'
          }`}
        >
          <Send size={16} className={activeFolder === 'sent' ? 'text-[#d72345]' : 'text-muted-foreground'} />
          <span className="text-xs sm:text-sm">Messages envoyés</span>
        </div>
        
        <div 
          onClick={() => setActiveFolder('drafts')}
          className={`p-2 sm:p-3 cursor-pointer transition-colors flex items-center gap-2 ${
            activeFolder === 'drafts' 
              ? 'bg-secondary/70 font-medium' 
              : 'hover:bg-secondary/50'
          }`}
        >
          <FileText size={16} className={activeFolder === 'drafts' ? 'text-[#d72345]' : 'text-muted-foreground'} />
          <span className="text-xs sm:text-sm">Brouillons</span>
        </div>
        
        <div 
          onClick={() => setActiveFolder('trash')}
          className={`p-2 sm:p-3 cursor-pointer transition-colors flex items-center gap-2 ${
            activeFolder === 'trash' 
              ? 'bg-secondary/70 font-medium' 
              : 'hover:bg-secondary/50'
          }`}
        >
          <Trash size={16} className={activeFolder === 'trash' ? 'text-[#d72345]' : 'text-muted-foreground'} />
          <span className="text-xs sm:text-sm">Corbeille</span>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
