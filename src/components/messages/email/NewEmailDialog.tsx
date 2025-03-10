
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Email } from '../types/email';
import { useEmailCompose } from './dialog/useEmailCompose';
import EmailDialogHeader from './dialog/EmailDialogHeader';
import EmailComposeForm from './dialog/EmailComposeForm';
import EmailAttachmentsList from './dialog/EmailAttachmentsList';
import EmailDialogFooter from './dialog/EmailDialogFooter';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmailContact } from '../types/email';

interface NewEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: Partial<Email>) => void;
  contacts: EmailContact[];
}

const NewEmailDialog = ({ isOpen, onClose, onSend, contacts }: NewEmailDialogProps) => {
  const isMobile = useIsMobile();
  const {
    subject,
    setSubject,
    content,
    setContent,
    recipients,
    ccRecipients,
    bccRecipients,
    showCc,
    setShowCc,
    showBcc,
    setShowBcc,
    attachments,
    showContactSelector,
    setShowContactSelector,
    contactSearchQuery,
    setContactSearchQuery,
    activeField,
    handleSend,
    handleFileChange,
    addRecipient,
    removeRecipient,
    handleOpenContactSelector,
    removeAttachment
  } = useEmailCompose(onSend);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`p-0 flex flex-col ${isMobile ? 'h-[95vh] max-h-[95vh] max-w-[95vw] w-full' : 'sm:max-w-[700px] h-[80vh] max-h-[700px]'}`}
        style={{ 
          backgroundColor: "#FFFFFF", 
          opacity: 1,
          backdropFilter: "none",
          borderRadius: "0.75rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid hsl(var(--border))"
        }}
      >
        <EmailDialogHeader onClose={onClose} />
        
        <EmailComposeForm
          recipients={recipients}
          ccRecipients={ccRecipients}
          bccRecipients={bccRecipients}
          showCc={showCc}
          showBcc={showBcc}
          subject={subject}
          content={content}
          contacts={contacts}
          showContactSelector={showContactSelector}
          contactSearchQuery={contactSearchQuery}
          activeField={activeField}
          isMobile={isMobile}
          onRemoveRecipient={removeRecipient}
          onOpenContactSelector={handleOpenContactSelector}
          setShowCc={setShowCc}
          setShowBcc={setShowBcc}
          setSubject={setSubject}
          setContent={setContent}
          setContactSearchQuery={setContactSearchQuery}
          addRecipient={addRecipient}
          setShowContactSelector={setShowContactSelector}
        />
        
        <EmailAttachmentsList 
          attachments={attachments}
          onRemoveAttachment={removeAttachment}
        />
        
        <EmailDialogFooter
          onFileChange={handleFileChange}
          onSend={handleSend}
          isDisabled={!subject || !content || recipients.length === 0}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewEmailDialog;
