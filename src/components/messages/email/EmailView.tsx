
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

interface EmailViewProps {
  selectedEmail: Email | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleSendReply: () => void;
  contacts: EmailContact[];
}

const EmailView = ({ selectedEmail, replyContent, setReplyContent, handleSendReply, contacts }: EmailViewProps) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [viewingAttachment, setViewingAttachment] = useState<string | null>(null);
  
  if (!selectedEmail) {
    return (
      <div className="lg:col-span-7 flex flex-col h-[600px]">
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-secondary/50 mb-4">
            <MessageCircle size={20} className="text-muted-foreground" />
          </div>
          <h3 className="text-base sm:text-lg font-medium">Aucun email sélectionné</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sélectionnez un email pour afficher son contenu
          </p>
        </div>
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
    <div className="lg:col-span-7 flex flex-col h-[600px]">
      <div className="p-2 sm:p-4 border-b border-border/50 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-medium truncate">{selectedEmail.subject}</h3>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Clock size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rappel</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Flag size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Marquer</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sauvegarder</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Supprimer</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Plus d'options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
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
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
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
          
          <div className="flex-1 min-w-0 ml-2 sm:ml-3">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-medium truncate">{selectedEmail.from.name}</h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {selectedEmail.from.email}
                </p>
              </div>
              <div className="flex items-center ml-2">
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {selectedEmail.timestamp}
                </p>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Star size={14} className={selectedEmail.isStarred ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                </Button>
              </div>
            </div>
            
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
              À: {selectedEmail.to.join(', ')}
            </div>
            
            {selectedEmail.labels && selectedEmail.labels.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-1">
                {selectedEmail.labels.map((label, index) => (
                  <Badge key={index} variant="outline" className="px-2 py-0.5 text-[10px] flex items-center">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="mt-4 whitespace-pre-line text-xs sm:text-sm break-words">
              {selectedEmail.content}
            </div>
            
            {selectedEmail.hasAttachments && selectedEmail.attachments && (
              <div className="mt-6 space-y-2">
                <h5 className="text-xs font-medium flex items-center">
                  <Paperclip size={14} className="mr-1" />
                  Pièces jointes ({selectedEmail.attachments.length})
                </h5>
                
                <div className="space-y-2">
                  {selectedEmail.attachments.map((attachment, index) => (
                    <div 
                      key={index}
                      className="p-2 sm:p-3 border border-border/50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <FileText size={16} className="text-muted-foreground mr-2" />
                        <div>
                          <p className="text-xs sm:text-sm truncate">{attachment.name}</p>
                          <p className="text-[10px] text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
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
        </div>
        
        <div className="mt-4 flex items-center justify-start space-x-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Reply size={14} className="mr-1" />
            Répondre
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Forward size={14} className="mr-1" />
            Transférer
          </Button>
        </div>
        
        <div className="mt-6">
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
