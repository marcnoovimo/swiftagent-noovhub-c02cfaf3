
import React, { useState } from 'react';
import { 
  FileText, Clock, Flag, Bookmark, Trash2, MoreVertical, MessageCircle, 
  Reply, Forward, Star, Download, Paperclip, Link, User
} from 'lucide-react';
import EmailReplyBox from './EmailReplyBox';
import { Email, EmailContact } from '../types/email';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface EmailViewProps {
  selectedEmail: Email | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleSendReply: () => void;
  contacts: EmailContact[];
}

const EmailView = ({ selectedEmail, replyContent, setReplyContent, handleSendReply, contacts }: EmailViewProps) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  if (!selectedEmail) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full p-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-muted mb-4">
          <MessageCircle size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Aucun email sélectionné</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Sélectionnez un email pour afficher son contenu
        </p>
      </div>
    );
  }

  const findContact = (email: string): EmailContact | undefined => {
    return contacts.find(contact => contact.email === email);
  };

  const fromContact = findContact(selectedEmail.from.email);
  
  const handleDownloadAttachment = (attachmentName: string) => {
    console.log('Downloading attachment:', attachmentName);
    // In a real app, you would download the attachment
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3 border-b border-border/30 flex items-center justify-between bg-background/80 sticky top-0 z-10">
        <h3 className="text-base font-medium truncate">{selectedEmail.subject}</h3>
        
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Reply size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Répondre</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Forward size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Transférer</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Supprimer</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Plus d'options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-card rounded-lg shadow-sm border border-border/30 p-4">
          <div className="flex items-start mb-4">
            <div className="relative">
              <Button 
                variant="ghost" 
                className="p-0 h-auto rounded-full"
                onClick={toggleContactInfo}
              >
                <img
                  src={selectedEmail.from.avatar}
                  alt={selectedEmail.from.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Button>
              
              {showContactInfo && fromContact && (
                <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-background shadow-lg rounded-lg border border-border z-10">
                  <div className="flex items-center mb-2">
                    <img
                      src={fromContact.avatar || selectedEmail.from.avatar}
                      alt={fromContact.firstName}
                      className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{fromContact.firstName} {fromContact.lastName}</h4>
                      <p className="text-xs text-muted-foreground">{fromContact.status === 'notary' ? 'Notaire' : fromContact.status === 'client-buyer' ? 'Client acheteur' : fromContact.status === 'client-seller' ? 'Client vendeur' : fromContact.status === 'agent' ? 'Agent' : 'Partenaire'}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs space-y-1">
                    <p><span className="text-muted-foreground">Email:</span> {fromContact.email}</p>
                    {fromContact.phone && <p><span className="text-muted-foreground">Tél:</span> {fromContact.phone}</p>}
                    {fromContact.company && <p><span className="text-muted-foreground">Société:</span> {fromContact.company}</p>}
                    {fromContact.notes && <p><span className="text-muted-foreground">Notes:</span> {fromContact.notes}</p>}
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-border flex justify-between">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Link size={12} className="mr-1" />
                      Dossiers
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <User size={12} className="mr-1" />
                      Profil
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0 ml-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-medium">{selectedEmail.from.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {selectedEmail.from.email}
                  </p>
                </div>
                <div className="flex items-center ml-2">
                  <p className="text-xs text-muted-foreground">
                    {selectedEmail.timestamp}
                  </p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Star size={14} className={selectedEmail.isStarred ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">À:</span> {selectedEmail.to.map(recipient => typeof recipient === 'string' ? recipient : recipient.email).join(', ')}
              </div>
              
              {selectedEmail.labels && selectedEmail.labels.length > 0 && (
                <div className="flex flex-wrap mt-2 gap-1">
                  {selectedEmail.labels.map((label, index) => (
                    <Badge key={index} variant="outline" className="text-[10px]">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="whitespace-pre-line text-sm break-words">
            {selectedEmail.content}
          </div>
          
          {selectedEmail.hasAttachments && selectedEmail.attachments && (
            <div className="mt-6">
              <h5 className="text-sm font-medium flex items-center mb-2">
                <Paperclip size={14} className="mr-1" />
                Pièces jointes ({selectedEmail.attachments.length})
              </h5>
              
              <div className="space-y-2">
                {selectedEmail.attachments.map((attachment, index) => (
                  <div 
                    key={index}
                    className="p-3 border border-border/50 rounded-lg flex items-center justify-between bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm truncate">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDownloadAttachment(attachment.name)}
                    >
                      <Download size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <EmailReplyBox 
            replyContent={replyContent} 
            setReplyContent={setReplyContent} 
            handleSendReply={handleSendReply} 
          />
        </div>
      </div>
    </div>
  );
};

export default EmailView;
