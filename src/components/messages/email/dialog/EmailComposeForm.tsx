import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import EmailRecipientField from './EmailRecipientField';
import EmailContactSelector from './EmailContactSelector';
import { EmailContact } from '../../types/email';

interface EmailComposeFormProps {
  recipients: string[];
  ccRecipients: string[];
  bccRecipients: string[];
  showCc: boolean;
  showBcc: boolean;
  subject: string;
  content: string;
  contacts: EmailContact[];
  showContactSelector: boolean;
  contactSearchQuery: string;
  activeField: 'to' | 'cc' | 'bcc';
  isMobile: boolean;
  onRemoveRecipient: (field: 'to' | 'cc' | 'bcc', email: string) => void;
  onOpenContactSelector: (field: 'to' | 'cc' | 'bcc') => void;
  setShowCc: (show: boolean) => void;
  setShowBcc: (show: boolean) => void;
  setSubject: (subject: string) => void;
  setContent: (content: string) => void;
  setContactSearchQuery: (query: string) => void;
  addRecipient: (email: string) => void;
  setShowContactSelector: (show: boolean) => void;
}

const EmailComposeForm = ({
  recipients,
  ccRecipients,
  bccRecipients,
  showCc,
  showBcc,
  subject,
  content,
  contacts,
  showContactSelector,
  contactSearchQuery,
  activeField,
  isMobile,
  onRemoveRecipient,
  onOpenContactSelector,
  setShowCc,
  setShowBcc,
  setSubject,
  setContent,
  setContactSearchQuery,
  addRecipient,
  setShowContactSelector
}: EmailComposeFormProps) => {
  return (
    <>
      <div className={`p-4 border-b border-border space-y-3 ${isMobile ? 'overflow-y-auto' : ''}`}>
        <div className="relative">
          <EmailRecipientField
            label="À :"
            recipients={recipients}
            onRemoveRecipient={(email) => onRemoveRecipient('to', email)}
            onOpenContactSelector={() => onOpenContactSelector('to')}
            contacts={contacts}
            placeholder="Ajouter des destinataires..."
            isMobile={isMobile}
          />
        </div>
        
        {showCc && (
          <EmailRecipientField
            label="Cc :"
            recipients={ccRecipients}
            onRemoveRecipient={(email) => onRemoveRecipient('cc', email)}
            onOpenContactSelector={() => onOpenContactSelector('cc')}
            contacts={contacts}
            placeholder="Ajouter en copie..."
            isMobile={isMobile}
          />
        )}
        
        {showBcc && (
          <EmailRecipientField
            label="Cci :"
            recipients={bccRecipients}
            onRemoveRecipient={(email) => onRemoveRecipient('bcc', email)}
            onOpenContactSelector={() => onOpenContactSelector('bcc')}
            contacts={contacts}
            placeholder="Ajouter en copie cachée..."
            isMobile={isMobile}
          />
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
          <div className={`${isMobile ? 'w-10' : 'w-16'} pt-2 text-xs text-muted-foreground`}>Objet :</div>
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
          <EmailContactSelector
            contacts={contacts}
            contactSearchQuery={contactSearchQuery}
            setContactSearchQuery={setContactSearchQuery}
            onSelectContact={addRecipient}
            onClose={() => setShowContactSelector(false)}
          />
        )}
      </div>
    </>
  );
};

export default EmailComposeForm;
