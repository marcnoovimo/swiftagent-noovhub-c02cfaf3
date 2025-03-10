
import React from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailDialogFooterProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isDisabled: boolean;
  isMobile?: boolean;
}

const EmailDialogFooter = ({ 
  onFileChange, 
  onSend, 
  isDisabled,
  isMobile = false
}: EmailDialogFooterProps) => {
  return (
    <div className={`p-3 border-t border-border ${isMobile ? 'flex flex-col gap-2' : 'flex justify-between items-center'}`}>
      <label className="cursor-pointer">
        <input
          type="file"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
        <Button type="button" variant="outline" size="sm" className={`text-xs ${isMobile ? 'w-full' : ''}`}>
          <Paperclip size={14} className="mr-1" />
          Joindre un fichier
        </Button>
      </label>
      
      <Button 
        onClick={onSend} 
        disabled={isDisabled}
        className={isMobile ? 'w-full' : ''}
      >
        <Send size={14} className="mr-1" />
        Envoyer
      </Button>
    </div>
  );
};

export default EmailDialogFooter;
