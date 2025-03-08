
import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { DocumentReference } from '@/types/chatbot';
import DocumentIcon from '@/components/documents/DocumentIcon';

interface DocumentReferenceCardProps {
  reference: DocumentReference;
}

const DocumentReferenceCard: React.FC<DocumentReferenceCardProps> = ({ reference }) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-3 flex items-start gap-3 cursor-pointer hover:bg-secondary/50 transition-colors">
      <DocumentIcon type={reference.documentType === 'agent' ? 'pdf' : 'folder'} />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{reference.name}</h4>
        <p className="text-xs text-muted-foreground mt-1">{reference.category}</p>
      </div>
      
      <div className="flex-shrink-0 text-sm text-muted-foreground flex items-center gap-1">
        <ExternalLink size={14} />
      </div>
    </div>
  );
};

export default DocumentReferenceCard;
