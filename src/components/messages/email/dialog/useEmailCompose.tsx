import { useState } from 'react';
import { Email } from '../../types/email';

export const useEmailCompose = (onSend: (emailData: Partial<Email>) => void) => {
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

  const resetForm = () => {
    setSubject('');
    setContent('');
    setRecipients([]);
    setCcRecipients([]);
    setBccRecipients([]);
    setShowCc(false);
    setShowBcc(false);
    setAttachments([]);
    setShowContactSelector(false);
    setContactSearchQuery('');
  };

  const handleSend = () => {
    if (!subject || !content || recipients.length === 0) {
      // Handle validation
      return false;
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
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

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
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return {
    // State
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
    
    // Actions
    handleSend,
    handleFileChange,
    addRecipient,
    removeRecipient,
    handleOpenContactSelector,
    removeAttachment
  };
};
