
import { useState } from 'react';
import { Document, Folder, BreadcrumbItem } from '@/components/documents/types';

export const useDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: 'root', name: 'Base Documentaire' }
  ]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  
  // Agent documents structure
  const [agentDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Compromis - 23 Rue des Lilas',
      type: 'pdf',
      category: 'Compromis',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '2',
      name: 'Mandat exclusif - 8 Avenue des Roses',
      type: 'docx',
      category: 'Mandats',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '3',
      name: 'Facture commission - Sept 2023',
      type: 'pdf',
      category: 'Factures',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '4',
      name: 'Photos - Appartement Centre-ville',
      type: 'zip',
      category: 'Photos',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '5',
      name: 'Diagnostic DPE - Maison Nantes Sud',
      type: 'pdf',
      category: 'Diagnostics',
      starred: false,
      documentType: 'agent'
    },
  ]);
  
  // Hierarchical Noovimo documents structure
  const [noovimoFolders] = useState<Folder[]>([
    {
      id: 'folder-1',
      name: 'Formations',
      type: 'folder',
      documents: [
        {
          id: 'folder-1-1',
          name: 'Techniques de vente',
          type: 'folder',
          documents: [
            {
              id: '6',
              name: 'Formation - Techniques de négociation',
              type: 'mp4',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            },
            {
              id: '6-1',
              name: 'Support - Techniques de négociation',
              type: 'pdf',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        },
        {
          id: 'folder-1-2',
          name: 'Outils Noovimo',
          type: 'folder',
          documents: [
            {
              id: '6-2',
              name: 'Formation - Utilisation CRM',
              type: 'mp4',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        }
      ]
    },
    {
      id: 'folder-2',
      name: 'Documentation Juridique',
      type: 'folder',
      documents: [
        {
          id: '7',
          name: 'Guide juridique - Mandats de vente',
          type: 'pdf',
          category: 'Guides',
          starred: true,
          documentType: 'noovimo'
        },
        {
          id: 'folder-2-1',
          name: 'Contrats',
          type: 'folder',
          documents: [
            {
              id: '7-1',
              name: 'Modèles contrats de vente',
              type: 'pdf',
              category: 'Guides',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        }
      ]
    },
    {
      id: 'folder-3',
      name: 'Webinaires',
      type: 'folder',
      documents: [
        {
          id: '8',
          name: 'Webinaire - Optimisation fiscale',
          type: 'mp4',
          category: 'Webinaires',
          starred: false,
          documentType: 'noovimo'
        }
      ]
    },
    {
      id: 'folder-4',
      name: 'Communication',
      type: 'folder',
      documents: [
        {
          id: '9',
          name: 'Charte graphique Noovimo 2023',
          type: 'pdf',
          category: 'Communication',
          starred: true,
          documentType: 'noovimo'
        }
      ]
    },
    {
      id: 'folder-5',
      name: 'Modèles',
      type: 'folder',
      documents: [
        {
          id: '10',
          name: 'Modèles d\'emails clients',
          type: 'docx',
          category: 'Modèles',
          starred: false,
          documentType: 'noovimo'
        }
      ]
    },
  ]);

  const [agentCategories] = useState([
    { name: 'Compromis', icon: <FileText size={18} className="text-noovimo-500" />, count: 4 },
    { name: 'Mandats', icon: <FileText size={18} className="text-green-500" />, count: 8 },
    { name: 'Factures', icon: <FileText size={18} className="text-yellow-500" />, count: 6 },
    { name: 'Photos', icon: <FileText size={18} className="text-purple-500" />, count: 12 },
    { name: 'Diagnostics', icon: <FileText size={18} className="text-red-500" />, count: 5 },
  ]);

  // Function to find folders and documents recursively
  const findFolderAndContents = (folderId: string, folders: Folder[]): (Document | Folder)[] | null => {
    // If we're at the root, return the top-level folders
    if (folderId === 'root') {
      return folders;
    }
    
    // Search recursively through folders
    for (const folder of folders) {
      if (folder.id === folderId) {
        return folder.documents;
      }
      
      // Search in nested folders
      if (folder.type === 'folder') {
        const foundInNested = findFolderAndContents(folderId, folder.documents.filter(d => d.type === 'folder') as Folder[]);
        if (foundInNested) {
          return foundInNested;
        }
      }
    }
    
    return null;
  };

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

  // Function to search documents recursively
  const searchDocuments = (query: string): Document[] => {
    if (!query) return [];
    
    const results: Document[] = [];
    
    const searchInFolder = (items: (Document | Folder)[]) => {
      items.forEach(item => {
        if ('documents' in item) {
          // This is a folder
          searchInFolder(item.documents);
        } else if (item.documentType === activeDocType && 
                  (item.name.toLowerCase().includes(query.toLowerCase()) || 
                   item.category.toLowerCase().includes(query.toLowerCase()))) {
          // This is a matching document
          results.push(item);
        }
      });
    };
    
    if (activeDocType === 'agent') {
      return agentDocuments.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) || 
        doc.category.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      searchInFolder(noovimoFolders);
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
