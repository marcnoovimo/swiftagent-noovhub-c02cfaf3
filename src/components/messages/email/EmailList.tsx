
import React, { useState } from 'react';
import { Search, Star, Paperclip, Tag, Clock } from 'lucide-react';
import { Email } from '../types/email';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
    <div className="border-r border-border/30 w-full lg:w-80 flex flex-col">
      <div className="p-3 border-b border-border/30 bg-background sticky top-0 z-10">
        <div className="relative">
          <Search size={16} className="text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md bg-muted/20 border border-border/50 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary"
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
              className={`transition-colors hover:bg-muted/10 ${
                selectedEmail?.id === email.id
                  ? 'bg-muted/15 border-l-2 border-primary'
                  : 'border-l-2 border-transparent'
              } ${
                !email.isRead ? 'font-medium' : ''
              }`}
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center">
                    <img
                      src={email.from.avatar}
                      alt={email.from.name}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <div className="min-w-0">
                      <span className="text-sm font-medium block truncate">{email.from.name}</span>
                      <span className="text-xs text-muted-foreground block">{email.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {email.hasAttachments && (
                      <Paperclip size={14} className="text-muted-foreground" />
                    )}
                    <button onClick={(e) => toggleStar(e, email)} className="flex items-center justify-center">
                      {email.isStarred ? (
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      ) : (
                        <Star size={16} className="text-muted-foreground/50" />
                      )}
                    </button>
                  </div>
                </div>
                
                <h4 className="text-sm truncate mb-1">{email.subject}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                  {email.content.split('\n')[0]}
                </p>
                
                <div className="flex flex-wrap items-center gap-1.5">
                  {email.status === 'awaiting-reply' && (
                    <div className="flex items-center bg-amber-50 text-amber-600 rounded-full px-2 py-0.5">
                      <Clock size={10} className="mr-1" />
                      <span className="text-[10px]">En attente</span>
                    </div>
                  )}
                  
                  {(email.labels && email.labels.length > 0) && (
                    email.labels.map((label, index) => (
                      <Badge key={index} variant="outline" className="px-2 py-0.5 text-[10px] flex items-center bg-muted/20">
                        <Tag size={10} className="mr-1" />
                        {label}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
              <Separator className="mx-3 last:hidden" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
