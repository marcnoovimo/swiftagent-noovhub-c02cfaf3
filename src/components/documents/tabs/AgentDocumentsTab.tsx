
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Document, Folder, Category } from '@/components/documents/types';
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentList from '@/components/documents/DocumentList';
import DocumentSidebar from '@/components/documents/DocumentSidebar';
import ContractFormDialog from '@/components/documents/ContractFormDialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface AgentDocumentsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentFolder: string;
  agentCategories: Category[];
  items: (Document | Folder)[];
  isSearchResult: boolean;
  onFileClick: (document: Document) => void;
  onFolderClick: (folderId: string, folderName: string) => void;
  onScanClick: () => void;
  starredCount: number;
  totalCount: number;
}

const AgentDocumentsTab: React.FC<AgentDocumentsTabProps> = ({
  searchQuery,
  setSearchQuery,
  currentFolder,
  agentCategories,
  items,
  isSearchResult,
  onFileClick,
  onFolderClick,
  onScanClick,
  starredCount,
  totalCount
}) => {
  const [contractFormOpen, setContractFormOpen] = useState(false);

  const handleContractFormSubmit = (data: any) => {
    // En production, vous pourriez sauvegarder ces données dans votre système
    console.log("Données de l'avant-contrat:", data);
    toast.success("Avant-contrat créé avec succès");
    
    // Vous pourriez également générer un document PDF avec ces informations
    // et l'ajouter à la liste des documents
  };
  
  const openContractFormInNewWindow = () => {
    // Ouvrir une nouvelle fenêtre pour le formulaire d'avant-contrat
    const width = 800;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const contractWindow = window.open(
      '/contract-form', 
      'avant_contrat',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    
    // Si la fenêtre est bloquée par le navigateur
    if (!contractWindow || contractWindow.closed || typeof contractWindow.closed === 'undefined') {
      toast.error("Le navigateur a bloqué l'ouverture de la fenêtre. Veuillez autoriser les pop-ups pour ce site.");
      // Alternative: ouvrir le dialogue dans la même fenêtre
      setContractFormOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="hidden md:block w-64 shrink-0">
        <DocumentSidebar 
          title="Mes Documents"
          currentFolder={currentFolder}
          categories={agentCategories}
          starredCount={starredCount}
          totalCount={totalCount}
          onFolderClick={onFolderClick}
        />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <DocumentSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            placeholder="Rechercher dans mes documents..."
          />
          
          <Button 
            variant="default"
            className="flex items-center gap-2 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            onClick={onScanClick}
          >
            <FileText size={16} />
            <span>Numériser mon avant-contrat</span>
          </Button>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="min-h-[300px]">
          <DocumentList 
            items={items}
            isSearchResult={isSearchResult}
            onFileClick={onFileClick}
            onFolderClick={onFolderClick}
          />
        </div>
      </div>
      
      {/* Formulaire pour les informations d'avant-contrat (si popup bloquée) */}
      <ContractFormDialog 
        open={contractFormOpen}
        onOpenChange={setContractFormOpen}
        onSuccess={handleContractFormSubmit}
      />
    </div>
  );
};

export default AgentDocumentsTab;
