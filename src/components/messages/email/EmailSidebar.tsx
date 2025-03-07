
import React from 'react';
import { Plus, Inbox, Send as SendIcon, FileText, Trash2 } from 'lucide-react';

interface EmailSidebarProps {
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
}

const EmailSidebar = ({ activeFolder, setActiveFolder }: EmailSidebarProps) => {
  const folderIcons = {
    inbox: <Inbox size={18} />,
    sent: <SendIcon size={18} />,
    drafts: <FileText size={18} />,
    trash: <Trash2 size={18} />,
  };

  return (
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
  );
};

export default EmailSidebar;
