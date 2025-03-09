
import { Document } from '@/components/documents/types';
import { DocumentReference, OpenAIConfig } from '@/types/chatbot';
import { agentDocuments, noovimoFolders } from '@/data/documentsData';
import { detectDocumentType } from '@/lib/utils';
import { findFolderAndContents, searchInFolder } from '@/utils/documentUtils';
import { getOpenAIResponse } from './openaiService';

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
 * Generate a chatbot response based on user query and document context
 */
export const generateChatbotResponse = async (
  query: string,
  documentSuggestions: DocumentReference[],
  openaiConfig?: OpenAIConfig
): Promise<string> => {
  // If OpenAI config is provided, use the OpenAI API
  if (openaiConfig?.apiKey) {
    // Extract document information to provide context
    const documentContexts = documentSuggestions.map(doc => 
      `Document: ${doc.name}, Type: ${doc.type}, Catégorie: ${doc.category}`
    );
    
    return await getOpenAIResponse(query, documentContexts, openaiConfig);
  }
  
  // Fallback to the mock response logic when no API key is configured
  if (query.toLowerCase().includes('formation') || query.toLowerCase().includes('apprendre')) {
    return "Voici quelques documents de formation pertinents pour votre demande. Vous pouvez y accéder directement depuis les suggestions ci-dessous.";
  }
  
  if (query.toLowerCase().includes('vente') || query.toLowerCase().includes('client')) {
    return "J'ai trouvé des guides sur les techniques de vente qui pourraient vous aider. Consultez les documents suggérés pour plus d'informations.";
  }
  
  if (query.toLowerCase().includes('mandat') || query.toLowerCase().includes('compromis')) {
    return "Pour vos questions sur les mandats ou compromis, j'ai sélectionné quelques documents juridiques pertinents. Vous pouvez les consulter dans les suggestions.";
  }
  
  if (query.toLowerCase().includes('facture') || query.toLowerCase().includes('commission')) {
    return "Concernant votre question sur les factures ou commissions, voici quelques documents utiles dans les suggestions ci-dessous.";
  }
  
  if (documentSuggestions.length > 0) {
    return `J'ai trouvé ${documentSuggestions.length} document(s) qui pourraient répondre à votre question. Consultez les suggestions ci-dessous pour plus d'informations.`;
  }
  
  // Default response
  return "Je n'ai pas trouvé de documents spécifiques pour votre demande. Essayez de reformuler votre question ou contactez le support Noovimo pour plus d'aide.";
};
