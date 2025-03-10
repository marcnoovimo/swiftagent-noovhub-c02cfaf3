
import React from 'react';
import { Paperclip, X } from 'lucide-react';

interface EmailAttachmentsListProps {
  attachments: File[];
  onRemoveAttachment: (index: number) => void;
}

const EmailAttachmentsList = ({ 
  attachments, 
  onRemoveAttachment 
}: EmailAttachmentsListProps) => {
  if (attachments.length === 0) return null;
  
  return (
    <div className="p-3 border-t border-border">
      <h4 className="text-xs font-medium mb-2">Pièces jointes ({attachments.length})</h4>
      <div className="flex flex-wrap gap-2">
        {attachments.map((file, index) => (
          <div key={index} className="bg-muted/50 rounded-md px-3 py-1 text-xs flex items-center">
            <Paperclip size={12} className="mr-1 text-muted-foreground" />
            <span className="truncate max-w-[200px]">{file.name}</span>
            <button 
              className="ml-2 text-muted-foreground hover:text-foreground" 
              onClick={() => onRemoveAttachment(index)}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailAttachmentsList;
