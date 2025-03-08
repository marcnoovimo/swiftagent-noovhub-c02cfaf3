
import React from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { DocumentReference } from '@/types/chatbot';
import DocumentIcon from '@/components/documents/DocumentIcon';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface DocumentReferenceCardProps {
  reference: DocumentReference;
}

const DocumentReferenceCard: React.FC<DocumentReferenceCardProps> = ({ reference }) => {
  const { toast } = useToast();
  
  const handleDocumentClick = () => {
    // In a real app, this would open the document
    toast({
      title: "Document ouvert",
      description: `Ouverture de ${reference.name}`,
      duration: 2000,
    });
  };
  
  const handleDocumentSummary = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would generate a summary of the document
    toast({
      title: "Résumé généré",
      description: `Le résumé de ${reference.name} est en cours de génération...`,
      duration: 3000,
    });
  };
  
  return (
    <div 
      className="bg-secondary/30 rounded-lg p-3 flex items-start gap-3 cursor-pointer hover:bg-secondary/50 transition-colors"
      onClick={handleDocumentClick}
    >
      <DocumentIcon type={reference.documentType === 'agent' ? 'pdf' : 'folder'} />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{reference.name}</h4>
        <p className="text-xs text-muted-foreground mt-1">{reference.category}</p>
      </div>
      
      <div className="flex-shrink-0 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={handleDocumentSummary}
          title="Résumer le document"
        >
          <FileText size={14} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            toast({
              title: "Téléchargement",
              description: `Téléchargement de ${reference.name}`,
              duration: 2000,
            });
          }}
          title="Télécharger"
        >
          <Download size={14} />
        </Button>
      </div>
    </div>
  );
};

export default DocumentReferenceCard;
