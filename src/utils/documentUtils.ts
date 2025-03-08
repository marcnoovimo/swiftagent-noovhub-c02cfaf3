
import { Document, Folder } from '@/components/documents/types';

// Function to find folders and documents recursively
export const findFolderAndContents = (folderId: string, folders: Folder[]): (Document | Folder)[] | null => {
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

// Function to search documents recursively in folders
export const searchInFolder = (items: (Document | Folder)[], query: string, docType: 'agent' | 'noovimo', results: Document[]) => {
  items.forEach(item => {
    if ('documents' in item) {
      // This is a folder
      searchInFolder(item.documents, query, docType, results);
    } else if (item.documentType === docType && 
              (item.name.toLowerCase().includes(query.toLowerCase()) || 
               item.category.toLowerCase().includes(query.toLowerCase()))) {
      // This is a matching document
      results.push(item);
    }
  });
};
