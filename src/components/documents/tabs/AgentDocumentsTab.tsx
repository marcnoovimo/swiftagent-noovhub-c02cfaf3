
import React from 'react';
import { PlusCircle, Upload, Search, FileText } from 'lucide-react';
import { Document, Folder, Category } from '@/components/documents/types';
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentList from '@/components/documents/DocumentList';
import DocumentSidebar from '@/components/documents/DocumentSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AgentDocumentsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentFolder: string;
  agentCategories: { name: string; icon: React.ComponentType<any>; count: number }[];
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
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="hidden md:block w-64 shrink-0">
        <DocumentSidebar 
          categories={agentCategories}
          starredCount={starredCount}
          totalCount={totalCount}
        />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <DocumentSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            placeholder="Rechercher dans mes documents..."
          />
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={onScanClick}
            >
              <PlusCircle size={16} />
              <span>Numériser</span>
            </Button>
            
            <Button 
              variant="default" 
              className="flex items-center gap-2 w-full sm:w-auto bg-noovimo-500 hover:bg-noovimo-600"
            >
              <Upload size={16} />
              <span>Importer</span>
            </Button>
          </div>
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
    </div>
  );
};

export default AgentDocumentsTab;
