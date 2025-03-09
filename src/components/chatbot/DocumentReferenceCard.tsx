
import React from 'react';
import { FileText, FileImage, FileArchive } from 'lucide-react';
import { DocumentReference } from '@/types/chatbot';
import { useNavigate } from 'react-router-dom';

export interface DocumentReferenceCardProps {
  document: DocumentReference;
}

const DocumentReferenceCard: React.FC<DocumentReferenceCardProps> = ({ document }) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (document.type.toLowerCase()) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage size={16} className="text-blue-500" />;
      case 'zip':
        return <FileArchive size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  const handleDocumentClick = () => {
    // Navigate to the documents page with the document ID as a parameter
    navigate(`/documents?docId=${document.id}`);
  };

  return (
    <div 
      className="bg-secondary/50 rounded-md p-2 text-xs flex items-center gap-2 cursor-pointer hover:bg-secondary hover:shadow-sm transition-all"
      onClick={handleDocumentClick}
      title="Cliquer pour ouvrir ce document"
    >
      {getIcon()}
      <div className="overflow-hidden">
        <p className="font-medium truncate max-w-[160px]">{document.name}</p>
        <p className="text-muted-foreground truncate max-w-[160px]">{document.category}</p>
      </div>
    </div>
  );
};

export default DocumentReferenceCard;
