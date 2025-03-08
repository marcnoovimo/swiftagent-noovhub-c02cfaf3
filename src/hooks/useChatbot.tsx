
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, DocumentReference } from '@/types/chatbot';
import { Document, Folder } from '@/components/documents/types';
import { useToast } from '@/hooks/use-toast';

// Mock database of documents
const documentDatabase: Document[] = [
  {
    id: '1',
    name: 'Guide des techniques de vente avancées',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: true,
    documentType: 'noovimo',
    extractedContent: 'Ce guide présente les techniques de vente les plus efficaces pour convertir vos prospects en clients. Découvrez comment améliorer votre taux de conversion et maximiser vos résultats.'
  },
  {
    id: '2',
    name: 'Formation - Négociation efficace',
    type: 'mp4',
    category: 'Formations',
    starred: false,
    documentType: 'noovimo',
    extractedContent: 'Formation complète sur les techniques de négociation. Apprenez à préparer vos arguments, gérer les objections et conclure vos ventes avec succès.'
  },
  {
    id: '3',
    name: 'Réglementation immobilière 2023',
    type: 'pdf',
    category: 'Réglementation',
    starred: true,
    documentType: 'noovimo',
    extractedContent: 'Guide complet sur les nouvelles réglementations immobilières de 2023. Inclut les informations sur les diagnostics énergétiques, les nouvelles normes de construction et les règles de location.'
  },
  {
    id: '4',
    name: 'Manuel utilisateur CRM Noovimo',
    type: 'pdf',
    category: 'Outils internes',
    starred: false,
    documentType: 'noovimo',
    extractedContent: 'Guide d\'utilisation du CRM Noovimo. Apprenez à gérer vos prospects, suivre vos ventes et optimiser votre workflow quotidien.'
  },
  {
    id: '5',
    name: 'Astuces pour augmenter son taux de conversion',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: true,
    documentType: 'noovimo',
    extractedContent: 'Collection d\'astuces éprouvées pour augmenter votre taux de conversion dans l\'immobilier. Stratégies de qualification des prospects, techniques de présentation et méthodes de suivi efficaces.'
  },
  {
    id: '6',
    name: 'Guide de prospection téléphonique',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: false,
    documentType: 'noovimo',
    extractedContent: 'Méthodologie complète pour réussir vos appels de prospection. Scripts d\'appel, réponses aux objections et techniques pour obtenir des rendez-vous.'
  },
  {
    id: '7',
    name: 'Webinaire - Optimisation fiscale',
    type: 'mp4',
    category: 'Formations',
    starred: false,
    documentType: 'noovimo',
    extractedContent: 'Webinaire sur les stratégies d\'optimisation fiscale pour les agents immobiliers et leurs clients. Découvrez comment maximiser vos déductions et minimiser votre imposition.'
  },
  {
    id: '8',
    name: 'Compromis Villa Marseille',
    type: 'pdf',
    category: 'Compromis',
    createdAt: '2023-01-15T14:30:00Z',
    starred: true,
    documentType: 'agent',
    extractedContent: 'Compromis de vente pour la villa située à Marseille, 13008. Signé le 15 janvier 2023 entre M. Dupont (vendeur) et Mme Martin (acheteur).'
  },
  {
    id: '9',
    name: 'Mandat de vente - Appartement Lyon',
    type: 'pdf',
    category: 'Mandats',
    createdAt: '2023-02-10T09:15:00Z',
    starred: false,
    documentType: 'agent',
    extractedContent: 'Mandat de vente exclusif pour l\'appartement situé à Lyon, 69002. Signé le 10 février 2023 avec M. Bernard pour une durée de 3 mois.'
  },
  {
    id: '10',
    name: 'Facture Honoraires Vente Dupont',
    type: 'pdf',
    category: 'Factures',
    createdAt: '2023-03-05T11:45:00Z',
    starred: false,
    documentType: 'agent',
    extractedContent: 'Facture d\'honoraires pour la vente de la propriété Dupont. Montant: 8500€ TTC. Date d\'émission: 5 mars 2023.'
  },
  {
    id: '11',
    name: 'Mandat de vente - Maison Nantes',
    type: 'pdf',
    category: 'Mandats',
    createdAt: '2023-04-20T10:30:00Z',
    starred: true,
    documentType: 'agent',
    extractedContent: 'Mandat de vente simple pour la maison située à Nantes, 44000. Signé le 20 avril 2023 avec Mme Leroy pour une durée de 3 mois.'
  },
  {
    id: '12',
    name: 'Compromis Appartement Paris',
    type: 'pdf',
    category: 'Compromis',
    createdAt: '2023-02-28T16:45:00Z',
    starred: false,
    documentType: 'agent',
    extractedContent: 'Compromis de vente pour l\'appartement situé à Paris, 75016. Signé le 28 février 2023 entre Mme Petit (vendeur) et M. Roux (acheteur).'
  }
];

// Knowledge base for common questions
const knowledgeBase: Record<string, string> = {
  'justifier_honoraires': `Pour justifier vos honoraires auprès d'un client, vous pouvez:

1. Détailler votre valeur ajoutée (expertise locale, réseau, disponibilité 7j/7)
2. Expliquer le travail invisible (recherche, qualification, négociation)
3. Présenter vos services exclusifs (photos pro, home staging virtuel)
4. Mettre en avant vos résultats passés (prix obtenus, délais courts)
5. Comparer avec le coût d'une vente ratée ou mal négociée

N'hésitez pas à personnaliser cette justification selon le bien et le client.`,

  'etapes_compromis': `Les étapes pour signer un compromis de vente sont:

1. Collecte des documents obligatoires (diagnostics, titre de propriété)
2. Négociation des conditions entre acheteur et vendeur
3. Rédaction du compromis par un professionnel
4. Signature des parties (en présence ou à distance)
5. Versement du dépôt de garantie (5-10% du prix)
6. Notification du délai de rétractation (10 jours)
7. Demande de financement par l'acheteur
8. Purge des conditions suspensives
9. Préparation de l'acte de vente

Votre rôle est d'accompagner et sécuriser toutes ces étapes.`,

  'trouver_mandat': `Pour retrouver rapidement un mandat de vente:

1. Utilisez la barre de recherche en haut avec le nom du client ou l'adresse
2. Filtrez par catégorie "Mandats" dans vos documents
3. Triez par date pour trouver les plus récents
4. Consultez la section "Documents étoilés" si vous l'avez marqué comme important

Vous pouvez également utiliser la commande vocale "Trouve mon mandat pour [nom/adresse]".`,

  'optimisation_fiscale': `Conseils d'optimisation fiscale pour agents immobiliers:

1. Choisir le bon statut (micro-BIC, régime réel)
2. Déduire toutes vos charges professionnelles
3. Amortir vos investissements (véhicule, matériel)
4. Constituer une SCI pour vos biens personnels
5. Optimiser votre protection sociale
6. Prévoir votre retraite (PER, SCPI...)

Pour vos clients, suggérez:
- Défiscalisation via l'investissement locatif
- Dispositifs Pinel, Denormandie ou LMNP
- Démembrement de propriété
- SCI familiale pour la transmission`
};

// Intent recognition for document queries
const documentIntents = [
  {
    intent: 'find_document_by_type',
    patterns: ['montre', 'affiche', 'trouve', 'cherche', 'où est', 'voir'],
    docTypes: ['compromis', 'mandat', 'facture', 'formation', 'guide', 'webinaire'],
    locations: ['nantes', 'paris', 'lyon', 'marseille'],
    timeframes: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'dernier', 'récent']
  }
];

export const useChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [documentReferences, setDocumentReferences] = useState<DocumentReference[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to detect document search intent
  const detectDocumentIntent = (query: string) => {
    query = query.toLowerCase();
    const intent = documentIntents[0]; // We only have one intent for now
    
    // Check if the query contains any of the patterns
    const hasPattern = intent.patterns.some(pattern => query.includes(pattern.toLowerCase()));
    if (!hasPattern) return null;
    
    // Check for document types
    const docType = intent.docTypes.find(type => query.includes(type.toLowerCase()));
    
    // Check for locations
    const location = intent.locations.find(loc => query.includes(loc.toLowerCase()));
    
    // Check for timeframes
    const timeframe = intent.timeframes.find(time => query.includes(time.toLowerCase()));
    
    return {
      type: 'find_document_by_type',
      docType,
      location,
      timeframe
    };
  };
  
  // Function to get documents based on intent
  const getDocumentsByIntent = (intent: any) => {
    if (!intent) return [];
    
    let filteredDocs = [...documentDatabase];
    
    if (intent.docType) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.category.toLowerCase().includes(intent.docType.toLowerCase()) ||
        doc.name.toLowerCase().includes(intent.docType.toLowerCase())
      );
    }
    
    if (intent.location) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.name.toLowerCase().includes(intent.location.toLowerCase())
      );
    }
    
    if (intent.timeframe) {
      if (intent.timeframe === 'dernier' || intent.timeframe === 'récent') {
        // Sort by date and get the most recent
        filteredDocs.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        
        if (intent.docType) {
          // Get the first document of the specific type
          const firstMatch = filteredDocs.find(doc => 
            doc.category.toLowerCase().includes(intent.docType.toLowerCase()) ||
            doc.name.toLowerCase().includes(intent.docType.toLowerCase())
          );
          
          if (firstMatch) {
            filteredDocs = [firstMatch];
          }
        } else {
          // Just get the first/most recent document
          filteredDocs = filteredDocs.slice(0, 3);
        }
      } else {
        // Filter by month
        const monthMap: Record<string, number> = {
          'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3,
          'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7,
          'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
        };
        
        const month = monthMap[intent.timeframe.toLowerCase()];
        if (month !== undefined) {
          filteredDocs = filteredDocs.filter(doc => {
            if (!doc.createdAt) return false;
            const docDate = new Date(doc.createdAt);
            return docDate.getMonth() === month;
          });
        }
      }
    }
    
    return filteredDocs;
  };
  
  // Function to check for knowledge base matches
  const checkKnowledgeBase = (query: string) => {
    query = query.toLowerCase();
    
    if (query.includes('honoraire') || query.includes('justifier') || query.includes('commission')) {
      return knowledgeBase.justifier_honoraires;
    }
    
    if (query.includes('compromis') && (query.includes('étape') || query.includes('signer') || query.includes('comment'))) {
      return knowledgeBase.etapes_compromis;
    }
    
    if ((query.includes('trouver') || query.includes('retrouver') || query.includes('chercher')) && query.includes('mandat')) {
      return knowledgeBase.trouver_mandat;
    }
    
    if (query.includes('fiscal') || query.includes('impôt') || query.includes('optimisation')) {
      return knowledgeBase.optimisation_fiscale;
    }
    
    return null;
  };
  
  const sendMessage = useCallback(async (content: string) => {
    // Add the user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };
    
    // Add a loading message for the bot
    const loadingBotMessage: ChatMessage = {
      id: uuidv4(),
      content: '',
      timestamp: new Date().toISOString(),
      sender: 'bot',
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, loadingBotMessage]);
    setIsProcessing(true);
    
    // Check for document intent
    const documentIntent = detectDocumentIntent(content);
    
    // Check for knowledge base response
    const knowledgeResponse = checkKnowledgeBase(content);
    
    // Simulate processing time
    setTimeout(() => {
      let response = '';
      let docs: Document[] = [];
      
      if (documentIntent) {
        // Get documents based on intent
        docs = getDocumentsByIntent(documentIntent);
        
        if (docs.length > 0) {
          response = `J'ai trouvé ${docs.length} document${docs.length > 1 ? 's' : ''} qui correspond${docs.length > 1 ? 'ent' : ''} à votre recherche.`;
          
          if (docs.length === 1) {
            response += ` Voici le document "${docs[0].name}" dans la catégorie ${docs[0].category}.`;
          }
        } else {
          response = "Je n'ai pas trouvé de documents correspondant à votre recherche. Essayez de reformuler ou d'utiliser des termes plus généraux.";
        }
      } else if (knowledgeResponse) {
        // Return knowledge base response
        response = knowledgeResponse;
        
        // Find relevant documents
        const lowerContent = content.toLowerCase();
        const relevantDocs = documentDatabase.filter(doc => {
          if (!doc.extractedContent) return false;
          
          // Check if document content contains keywords from the query
          const words = lowerContent.split(' ').filter(word => word.length > 3);
          return words.some(word => doc.extractedContent?.toLowerCase().includes(word));
        });
        
        docs = relevantDocs.slice(0, 2);
      } else {
        // Default response for other queries
        response = "Je ne suis pas sûr de comprendre votre demande. Vous pouvez me demander de :\n\n- Trouver des documents (ex: \"Montre mes derniers compromis\")\n- Répondre à des questions fréquentes (ex: \"Comment justifier mes honoraires ?\")\n- Vous aider avec la réglementation immobilière";
      }
      
      // Update the bot message with the response
      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading ? {
            ...msg,
            content: response,
            isLoading: false,
            timestamp: new Date().toISOString()
          } : msg
        )
      );
      
      // Convert documents to references
      const docReferences: DocumentReference[] = docs.map(doc => ({
        id: doc.id,
        name: doc.name,
        category: doc.category,
        documentType: doc.documentType || 'noovimo',
        relevanceScore: Math.random() * 0.5 + 0.5 // Score between 0.5 and 1
      }));
      
      setDocumentReferences(docReferences);
      setIsProcessing(false);
    }, 1500);
  }, []);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
    setDocumentReferences([]);
  }, []);
  
  return {
    messages,
    sendMessage,
    documentReferences,
    isProcessing,
    clearMessages
  };
};
