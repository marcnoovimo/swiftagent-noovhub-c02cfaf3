
import React from 'react';
import DocumentSearchBar from './DocumentSearchBar';
import DocumentUploadButton from './DocumentUploadButton';
import DocumentCard from './DocumentCard';
import FolderCard from './FolderCard';
import { Document } from '@/components/documents/types';

interface DocumentsTabContentProps {
  activeDocType: 'agent' | 'noovimo';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleDocumentClick: (doc: any) => void;
  handleFolderClick: (folderId: string, folderName: string) => void;
  documents: Document[] | null;
  folders?: string[];
}

const DocumentsTabContent = ({
  activeDocType,
  searchQuery,
  setSearchQuery,
  handleDocumentClick,
  handleFolderClick,
  documents,
  folders = [],
}: DocumentsTabContentProps) => (
  <div className="mb-6">
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      <DocumentSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {activeDocType === 'agent' && (
        <DocumentUploadButton onClick={() => console.log('Add document clicked')} />
      )}
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeDocType === 'noovimo'
        ? folders.map((folder) => (
            <FolderCard
              key={folder}
              name={folder}
              onClick={handleFolderClick}
            />
          ))
        : documents?.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              name={doc.name}
              type={doc.type}
              category={doc.category}
              onClick={handleDocumentClick}
            />
          ))}
    </div>
  </div>
);

export default DocumentsTabContent;
