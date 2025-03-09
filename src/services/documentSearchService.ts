
import { DocumentReference } from '@/types/chatbot';
import { agentDocuments, noovimoFolders } from '@/data/documentsData';
import { detectDocumentType } from '@/lib/utils';
import { searchInFolder } from '@/utils/documentUtils';

/**
 * Extract key terms from a query to improve search accuracy
 */
const extractKeyTerms = (query: string): string[] => {
  const normalizedQuery = query.toLowerCase();
  
  // Extract pack names - looking for words after "pack" with special handling
  const packMatch = normalizedQuery.match(/pack\s+(\w+)/i);
  const packTerms = packMatch ? [packMatch[1]] : [];
  
  // Extract specific document types that might be mentioned
  const docTypeTerms = [];
  if (normalizedQuery.includes('mandat')) docTypeTerms.push('mandat');
  if (normalizedQuery.includes('compromis')) docTypeTerms.push('compromis');
  if (normalizedQuery.includes('vefa')) docTypeTerms.push('vefa');
  if (normalizedQuery.includes('diagnostic')) docTypeTerms.push('diagnostic');
  
  // Extract key terms like "prix", "cout", "tarif" that indicate price questions
  const priceTerms = [];
  if (/prix|cout|tarif|combien|montant/.test(normalizedQuery)) {
    priceTerms.push('prix');
    // If a pack name is mentioned in a price question, boost it significantly
    if (/(silver|gold|bronze|ivoire|emeraude|platinium|booster)/.test(normalizedQuery)) {
      const packName = normalizedQuery.match(/(silver|gold|bronze|ivoire|emeraude|platinium|booster)/i);
      if (packName) priceTerms.push(packName[0]);
    }
  }
  
  // Extract standard search terms (words longer than 3 characters)
  const standardTerms = query.toLowerCase().split(' ')
    .filter(term => term.length > 3 && !priceTerms.includes(term) && !docTypeTerms.includes(term));
  
  return [...standardTerms, ...packTerms, ...docTypeTerms, ...priceTerms];
}

/**
 * Search for documents related to a user query
 */
export const searchDocumentsForQuery = (query: string): DocumentReference[] => {
  if (!query || query.trim() === '') return [];
  
  const searchTerms = extractKeyTerms(query);
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
 * Check if query is asking about price/cost of a pack
 */
export const isPriceQuery = (query: string): { isPriceQuestion: boolean, packName?: string } => {
  const normalizedQuery = query.toLowerCase();
  
  if (!/prix|cout|tarif|combien|montant/.test(normalizedQuery)) {
    return { isPriceQuestion: false };
  }
  
  // Check for pack names
  const packMatch = normalizedQuery.match(/(pack\s+)?(silver|gold|bronze|ivoire|emeraude|platinium|booster)/i);
  if (packMatch) {
    return { 
      isPriceQuestion: true, 
      packName: packMatch[2].toLowerCase()
    };
  }
  
  return { isPriceQuestion: true };
};

/**
 * Format document references as context strings for AI
 */
export const formatDocumentsAsContext = (documents: DocumentReference[]): string[] => {
  return documents.map(doc => 
    `Document: ${doc.name}, Type: ${doc.type}, Catégorie: ${doc.category}`
  );
};

/**
 * Create a direct link to open a document in the document module
 */
export const getDocumentLink = (documentId: string): string => {
  return `/documents?docId=${documentId}`;
};

