
import { DocumentReference } from '@/types/chatbot';
import { agentDocuments, noovimoFolders } from '@/data/documentsData';
import { detectDocumentType } from '@/lib/utils';
import { searchInFolder } from '@/utils/documentUtils';

/**
 * Search for documents related to a user query
 */
export const searchDocumentsForQuery = (query: string): DocumentReference[] => {
  if (!query || query.trim() === '') return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 3);
  if (searchTerms.length === 0) return [];
  
  // Results from agent documents
  const agentResults: DocumentReference[] = agentDocuments
    .filter(doc => {
      let matchScore = 0;
      
      // Check document name
      searchTerms.forEach(term => {
        if (doc.name.toLowerCase().includes(term)) matchScore += 2;
        if (doc.category.toLowerCase().includes(term)) matchScore += 1;
      });
      
      return matchScore > 0;
    })
    .map(doc => ({
      id: doc.id,
      name: doc.name,
      type: doc.type,
      category: doc.category,
      confidenceScore: 0.8
    }));
  
  // Results from noovimo documents
  const noovimoResults: DocumentReference[] = [];
  
  // Recursively search through folders
  const searchFolder = (items: any[], path: string = '') => {
    items.forEach(item => {
      if (item.type === 'folder') {
        searchFolder(item.documents, `${path}${path ? ' > ' : ''}${item.name}`);
      } else {
        let matchScore = 0;
        
        // Check document name
        searchTerms.forEach(term => {
          if (item.name.toLowerCase().includes(term)) matchScore += 2;
          if (item.category?.toLowerCase().includes(term)) matchScore += 1;
        });
        
        if (matchScore > 0) {
          noovimoResults.push({
            id: item.id,
            name: item.name,
            type: item.type,
            category: `${path}${path ? ' > ' : ''}${item.category || detectDocumentType(item.name)}`,
            confidenceScore: matchScore > 2 ? 0.9 : 0.7
          });
        }
      }
    });
  };
  
  searchFolder(noovimoFolders);
  
  // Combine and sort results by relevance
  const allResults = [...agentResults, ...noovimoResults]
    .sort((a, b) => (b.confidenceScore || 0) - (a.confidenceScore || 0))
    .slice(0, 5); // Limit to 5 most relevant results
  
  return allResults;
};

/**
 * Format document references as context strings for AI
 */
export const formatDocumentsAsContext = (documents: DocumentReference[]): string[] => {
  return documents.map(doc => 
    `Document: ${doc.name}, Type: ${doc.type}, Catégorie: ${doc.category}`
  );
};
