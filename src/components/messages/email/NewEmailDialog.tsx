
import React, { useState } from 'react';
import { X, Send, Paperclip, ChevronDown, User, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmailContact, Email } from '../types/email';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: Partial<Email>) => void;
  contacts: EmailContact[];
}

const NewEmailDialog = ({ isOpen, onClose, onSend, contacts }: NewEmailDialogProps) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [ccRecipients, setCcRecipients] = useState<string[]>([]);
  const [bccRecipients, setBccRecipients] = useState<string[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [activeField, setActiveField] = useState<'to' | 'cc' | 'bcc'>('to');
  
  const handleSend = () => {
    if (!subject || !content || recipients.length === 0) {
      // Handle validation
      return;
    }
    
    const emailData: Partial<Email> = {
      subject,
      content,
      to: recipients,
      cc: showCc ? ccRecipients : undefined,
      bcc: showBcc ? bccRecipients : undefined,
      hasAttachments: attachments.length > 0,
    };
    
    onSend(emailData);
    resetForm();
  };
  
  const resetForm = () => {
    setSubject('');
    setContent('');
    setRecipients([]);
    setCcRecipients([]);
    setBccRecipients([]);
    setShowCc(false);
    setShowBcc(false);
    setAttachments([]);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };
  
  const filteredContacts = contacts.filter(contact => {
    const query = contactSearchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });
  
  const addRecipient = (email: string) => {
    if (activeField === 'to' && !recipients.includes(email)) {
      setRecipients([...recipients, email]);
    } else if (activeField === 'cc' && !ccRecipients.includes(email)) {
      setCcRecipients([...ccRecipients, email]);
    } else if (activeField === 'bcc' && !bccRecipients.includes(email)) {
      setBccRecipients([...bccRecipients, email]);
    }
    setShowContactSelector(false);
    setContactSearchQuery('');
  };
  
  const removeRecipient = (field: 'to' | 'cc' | 'bcc', email: string) => {
    if (field === 'to') {
      setRecipients(recipients.filter(e => e !== email));
    } else if (field === 'cc') {
      setCcRecipients(ccRecipients.filter(e => e !== email));
    } else if (field === 'bcc') {
      setBccRecipients(bccRecipients.filter(e => e !== email));
    }
  };
  
  const handleOpenContactSelector = (field: 'to' | 'cc' | 'bcc') => {
    setActiveField(field);
    setShowContactSelector(true);
  };
  
  const renderRecipientChips = (field: 'to' | 'cc' | 'bcc') => {
    const list = field === 'to' 
      ? recipients 
      : field === 'cc' 
        ? ccRecipients 
        : bccRecipients;
    
    return list.map((email, index) => {
      const contact = contacts.find(c => c.email === email);
      const name = contact 
        ? `${contact.firstName} ${contact.lastName}` 
        : email.split('@')[0];
      
      return (
        <div 
          key={index} 
          className="inline-flex items-center bg-secondary text-xs rounded-full px-2 py-1 mr-1 mb-1"
        >
          <span className="mr-1 truncate max-w-[150px]">{name}</span>
          <button 
            onClick={() => removeRecipient(field, email)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={12} />
          </button>
        </div>
      );
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 h-[80vh] max-h-[700px] flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h3 className="font-medium">Nouveau message</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={18} />
          </Button>
        </div>
        
        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <div className="flex items-start">
              <div className="w-16 pt-2 text-xs text-muted-foreground flex-shrink-0">À :</div>
              <div className="flex-1 min-w-0 relative">
                <div className="flex flex-wrap min-h-9 border border-input rounded-md p-2 relative focus-within:ring-1 focus-within:ring-ring">
                  {renderRecipientChips('to')}
                  <input
                    type="text"
                    placeholder={recipients.length === 0 ? "Ajouter des destinataires..." : ""}
                    className="outline-none bg-transparent text-xs h-6 min-w-[80px] flex-grow"
                    onFocus={() => handleOpenContactSelector('to')}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-1 top-1.5"
                    onClick={() => handleOpenContactSelector('to')}
                  >
                    <Users size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {showCc && (
            <div className="flex items-start">
              <div className="w-16 pt-2 text-xs text-muted-foreground flex-shrink-0">Cc :</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap min-h-9 border border-input rounded-md p-2 relative focus-within:ring-1 focus-within:ring-ring">
                  {renderRecipientChips('cc')}
                  <input
                    type="text"
                    placeholder="Ajouter en copie..."
                    className="outline-none bg-transparent text-xs h-6 min-w-[80px] flex-grow"
                    onFocus={() => handleOpenContactSelector('cc')}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-1 top-1.5"
                    onClick={() => handleOpenContactSelector('cc')}
                  >
                    <Users size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {showBcc && (
            <div className="flex items-start">
              <div className="w-16 pt-2 text-xs text-muted-foreground flex-shrink-0">Cci :</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap min-h-9 border border-input rounded-md p-2 relative focus-within:ring-1 focus-within:ring-ring">
                  {renderRecipientChips('bcc')}
                  <input
                    type="text"
                    placeholder="Ajouter en copie cachée..."
                    className="outline-none bg-transparent text-xs h-6 min-w-[80px] flex-grow"
                    onFocus={() => handleOpenContactSelector('bcc')}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-1 top-1.5"
                    onClick={() => handleOpenContactSelector('bcc')}
                  >
                    <Users size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {(!showCc || !showBcc) && (
            <div className="flex items-center justify-end space-x-2 text-xs">
              {!showCc && (
                <Button variant="link" className="h-6 p-0" onClick={() => setShowCc(true)}>
                  Ajouter Cc
                </Button>
              )}
              {!showBcc && (
                <Button variant="link" className="h-6 p-0" onClick={() => setShowBcc(true)}>
                  Ajouter Cci
                </Button>
              )}
            </div>
          )}
          
          <div className="flex items-center">
            <div className="w-16 pt-2 text-xs text-muted-foreground">Objet :</div>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet du message"
              className="flex-1 h-9 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Écrivez votre message ici..."
            className="h-full resize-none p-4 border-0 focus-visible:ring-0 text-sm"
          />
          
          {showContactSelector && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-background z-10 flex flex-col">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Sélectionner des contacts</h4>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowContactSelector(false)}>
                    <X size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-2 top-2.5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un contact..."
                    value={contactSearchQuery}
                    onChange={(e) => setContactSearchQuery(e.target.value)}
                    className="pl-8 text-sm h-9"
                    autoFocus
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredContacts.map((contact) => (
                    <div 
                      key={contact.id}
                      onClick={() => addRecipient(contact.email)}
                      className="p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors flex items-center"
                    >
                      <div className="flex-shrink-0 mr-2">
                        {contact.avatar ? (
                          <img 
                            src={contact.avatar} 
                            alt={`${contact.firstName} ${contact.lastName}`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User size={16} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        
        {attachments.length > 0 && (
          <div className="p-3 border-t border-border">
            <h4 className="text-xs font-medium mb-2">Pièces jointes ({attachments.length})</h4>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="bg-muted/50 rounded-md px-3 py-1 text-xs flex items-center">
                  <Paperclip size={12} className="mr-1 text-muted-foreground" />
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <button className="ml-2 text-muted-foreground hover:text-foreground" onClick={() => {
                    setAttachments(attachments.filter((_, i) => i !== index));
                  }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-3 border-t border-border flex justify-between items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Button type="button" variant="outline" size="sm" className="text-xs">
              <Paperclip size={14} className="mr-1" />
              Joindre un fichier
            </Button>
          </label>
          
          <Button onClick={handleSend} disabled={!subject || !content || recipients.length === 0}>
            <Send size={14} className="mr-1" />
            Envoyer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewEmailDialog;
