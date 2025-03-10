
import React from 'react';
import { X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmailContact } from '../../types/email';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmailRecipientFieldProps {
  label: string;
  recipients: string[];
  onRemoveRecipient: (email: string) => void;
  onOpenContactSelector: () => void;
  contacts: EmailContact[];
  placeholder: string;
}

const EmailRecipientField = ({
  label,
  recipients,
  onRemoveRecipient,
  onOpenContactSelector,
  contacts,
  placeholder,
}: EmailRecipientFieldProps) => {
  const isMobile = useIsMobile();
  
  const renderRecipientChips = () => {
    return recipients.map((email, index) => {
      const contact = contacts.find(c => c.email === email);
      const name = contact 
        ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || contact.name || email
        : email.split('@')[0];
      
      return (
        <div 
          key={index} 
          className="inline-flex items-center bg-gray-100 text-xs rounded-full px-2 py-1 mr-1 mb-1"
        >
          <span className="mr-1 truncate max-w-[120px] sm:max-w-[150px]">{name}</span>
          <button 
            onClick={() => onRemoveRecipient(email)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Retirer le destinataire"
          >
            <X size={12} />
          </button>
        </div>
      );
    });
  };

  return (
    <div className="flex items-start">
      <div className={`${isMobile ? 'w-10' : 'w-16'} pt-2 text-xs text-muted-foreground flex-shrink-0`}>
        {label}
      </div>
      <div className="flex-1 min-w-0 relative">
        <div className="flex flex-wrap min-h-9 border border-input rounded-md p-2 relative focus-within:ring-1 focus-within:ring-ring bg-white dark:bg-gray-950">
          {renderRecipientChips()}
          <input
            type="text"
            placeholder={recipients.length === 0 ? placeholder : ""}
            className="outline-none bg-transparent text-xs h-6 min-w-[80px] flex-grow"
            onFocus={onOpenContactSelector}
            aria-label={`Ajouter un ${label.toLowerCase()}`}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 absolute right-1 top-1.5"
            onClick={onOpenContactSelector}
            aria-label="Sélectionner des contacts"
          >
            <Users size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailRecipientField;
