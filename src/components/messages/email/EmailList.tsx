
import React from 'react';
import { Search, Star, Paperclip } from 'lucide-react';
import { Email } from '../types/email';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email) => void;
  activeFolder: string;
}

const EmailList = ({ emails, selectedEmail, setSelectedEmail, activeFolder }: EmailListProps) => {
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
  );
};

export default EmailList;
