
import React from 'react';
import DocumentSearch from '@/components/documents/DocumentSearch';
import DocumentBreadcrumbs from '@/components/documents/DocumentBreadcrumbs';
import DocumentSidebar from '@/components/documents/DocumentSidebar';
import DocumentList from '@/components/documents/DocumentList';
import { BreadcrumbItem, Folder } from '@/components/documents/types';

interface NoovimoDocumentsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentFolder: string;
  breadcrumbs: BreadcrumbItem[];
  noovimoFolders: Folder[];
  items: any[];
  isSearchResult: boolean;
  onFileClick: (document: any) => void;
  onFolderClick: (folderId: string, folderName: string) => void;
}

const NoovimoDocumentsTab: React.FC<NoovimoDocumentsTabProps> = ({
  searchQuery,
  setSearchQuery,
  currentFolder,
  breadcrumbs,
  noovimoFolders,
  items,
  isSearchResult,
  onFileClick,
  onFolderClick
}) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <DocumentSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        placeholder="Rechercher dans la base documentaire..."
      />
      
      {/* Breadcrumbs */}
      {!isSearchResult && (
        <DocumentBreadcrumbs 
          breadcrumbs={breadcrumbs}
          onNavigate={onFolderClick}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="lg:col-span-1">
          <DocumentSidebar 
            title="Base Documentaire"
            currentFolder={currentFolder}
            folders={noovimoFolders}
            onFolderClick={onFolderClick}
          />
        </div>
        
        {/* Document and folder list */}
        <div className="lg:col-span-3">
          <DocumentList 
            items={items}
            onFolderClick={onFolderClick}
            onFileClick={onFileClick}
            isSearchResult={isSearchResult}
          />
        </div>
      </div>
    </div>
  );
};

export default NoovimoDocumentsTab;
