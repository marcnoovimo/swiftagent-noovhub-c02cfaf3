
import { useState } from 'react';
import { Document, Folder, BreadcrumbItem } from '@/components/documents/types';
import { agentDocuments, noovimoFolders, agentCategories } from '@/data/documentsData';
import { findFolderAndContents, searchInFolder } from '@/utils/documentUtils';

export const useDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: 'root', name: 'Base Documentaire' }
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);

  // Function to navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    
    // Update breadcrumbs
    const newBreadcrumbs = [...breadcrumbs];
    const existingIndex = newBreadcrumbs.findIndex(b => b.id === folderId);
    
    if (existingIndex >= 0) {
      // If we're navigating to an existing breadcrumb, trim the array
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1));
    } else {
      // Add the new folder to breadcrumbs
      setBreadcrumbs([...newBreadcrumbs, { id: folderId, name: folderName }]);
    }
  };

  // Function to search documents
  const searchDocuments = (query: string): Document[] => {
    if (!query) return [];
    
    const results: Document[] = [];
    
    if (activeDocType === 'agent') {
      return agentDocuments.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) || 
        doc.category.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      searchInFolder(noovimoFolders, query, activeDocType, results);
      return results;
    }
  };

  // Function to get current folder contents
  const getCurrentFolderContents = (): (Document | Folder)[] => {
    if (activeDocType === 'agent') {
      return agentDocuments;
    } else {
      const contents = findFolderAndContents(currentFolder, noovimoFolders);
      return contents || [];
    }
  };

  // Handle document click for preview
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  // Get filtered contents
  const getFilteredContents = () => {
    return searchQuery ? searchDocuments(searchQuery) : getCurrentFolderContents();
  };

  return {
    searchQuery,
    setSearchQuery,
    activeDocType,
    setActiveDocType,
    currentFolder,
    breadcrumbs,
    setBreadcrumbs,
    selectedDocument,
    setSelectedDocument,
    scanDialogOpen,
    setScanDialogOpen,
    agentDocuments,
    noovimoFolders,
    agentCategories,
    navigateToFolder,
    handleDocumentClick,
    getFilteredContents,
    isSearchResult: !!searchQuery
  };
};
