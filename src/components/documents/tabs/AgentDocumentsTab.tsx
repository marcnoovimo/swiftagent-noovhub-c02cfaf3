
import React from 'react';
import { FileScan } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentSidebar from '@/components/documents/DocumentSidebar';
import DocumentList from '@/components/documents/DocumentList';

interface AgentDocumentsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentFolder: string;
  agentCategories: any[];
  items: any[];
  isSearchResult: boolean;
  onFileClick: (document: any) => void;
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
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <DocumentSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          showUploadButton={true}
          placeholder="Rechercher un document..."
        />
        
        {/* Document Scanner Button */}
        <Button 
          variant="outline" 
          className="ml-2 flex items-center gap-2"
          onClick={onScanClick}
        >
          <FileScan size={18} />
          <span className="hidden sm:inline">Scanner</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="lg:col-span-1">
          <DocumentSidebar 
            title="Mes Documents"
            currentFolder={currentFolder}
            categories={agentCategories}
            onFolderClick={onFolderClick}
            starredCount={starredCount}
            totalCount={totalCount}
            showAddCategory={true}
          />
        </div>
        
        {/* Document list */}
        <div className="lg:col-span-3">
          <DocumentList 
            items={items} 
            isSearchResult={isSearchResult}
            onFileClick={onFileClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentDocumentsTab;
