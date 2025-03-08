
import React, { useState } from 'react';
import { Search, Star, Paperclip, Tag, Clock } from 'lucide-react';
import { Email } from '../types/email';
import { Badge } from '@/components/ui/badge';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email) => void;
  activeFolder: string;
}

const EmailList = ({ emails, selectedEmail, setSelectedEmail, activeFolder }: EmailListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getFolderEmails = (folder: string) => {
    return emails
      .filter(email => email.folder === folder)
      .filter(email => {
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();
        return (
          email.from.name.toLowerCase().includes(query) ||
          email.from.email.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.content.toLowerCase().includes(query)
        );
      });
  };

  const toggleStar = (e: React.MouseEvent, email: Email) => {
    e.stopPropagation();
    // In a real app, you would update the email on the server
    console.log('Toggle star for email:', email.id);
  };

  return (
    <div className="lg:col-span-3 border-r border-border/50 overflow-hidden flex flex-col">
      <div className="p-2 sm:p-3 border-b border-border/50">
        <div className="search-bar flex items-center">
          <Search size={16} className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70 text-xs sm:text-sm"
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {getFolderEmails(activeFolder).length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Aucun email trouvé</p>
          </div>
        ) : (
          getFolderEmails(activeFolder).map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`border-b border-border/50 p-2 sm:p-3 cursor-pointer transition-colors ${
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
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-2"
                  />
                  <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">{email.from.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {email.hasAttachments && (
                    <Paperclip size={14} className="text-muted-foreground" />
                  )}
                  <button onClick={(e) => toggleStar(e, email)} className="flex items-center justify-center">
                    {email.isStarred ? (
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star size={14} className="text-muted-foreground" />
                    )}
                  </button>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{email.timestamp}</span>
                </div>
              </div>
              
              <h4 className="text-xs sm:text-sm truncate">{email.subject}</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate mt-1">
                {email.content.split('\n')[0]}
              </p>
              
              {(email.labels && email.labels.length > 0) && (
                <div className="flex flex-wrap mt-1 gap-1">
                  {email.labels.map((label, index) => (
                    <Badge key={index} variant="outline" className="px-1 py-0 text-[8px] sm:text-[10px] flex items-center">
                      <Tag size={10} className="mr-1" />
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
              
              {email.status === 'awaiting-reply' && (
                <div className="mt-1 flex items-center">
                  <Clock size={10} className="text-amber-500 mr-1" />
                  <span className="text-[8px] sm:text-[10px] text-amber-500">En attente de réponse</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
