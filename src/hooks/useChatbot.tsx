
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, DocumentReference } from '@/types/chatbot';
import { Document, Folder } from '@/components/documents/types';

// Mock de la base documentaire - dans un cas réel, cela viendrait d'une API
const documentDatabase: Document[] = [
  {
    id: '1',
    name: 'Guide des techniques de vente avancées',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: true,
    documentType: 'noovimo'
  },
  {
    id: '2',
    name: 'Formation - Négociation efficace',
    type: 'mp4',
    category: 'Formations',
    starred: false,
    documentType: 'noovimo'
  },
  {
    id: '3',
    name: 'Réglementation immobilière 2023',
    type: 'pdf',
    category: 'Réglementation',
    starred: true,
    documentType: 'noovimo'
  },
  {
    id: '4',
    name: 'Manuel utilisateur CRM Noovimo',
    type: 'pdf',
    category: 'Outils internes',
    starred: false,
    documentType: 'noovimo'
  },
  {
    id: '5',
    name: 'Astuces pour augmenter son taux de conversion',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: true,
    documentType: 'noovimo'
  },
  {
    id: '6',
    name: 'Guide de prospection téléphonique',
    type: 'pdf',
    category: 'Techniques de vente',
    starred: false,
    documentType: 'noovimo'
  },
  {
    id: '7',
    name: 'Webinaire - Optimisation fiscale',
    type: 'mp4',
    category: 'Formations',
    starred: false,
    documentType: 'noovimo'
  },
];

// Réponses prédéfinies basées sur des mots-clés
const predefinedResponses: Record<string, { response: string, docs: string[] }> = {
  'conversion': {
    response: "Pour augmenter votre taux de conversion, je vous recommande plusieurs approches :\n\n1. Qualifiez mieux vos prospects en amont\n2. Perfectionnez votre présentation des biens\n3. Anticipez et répondez aux objections\n4. Proposez systématiquement une étape suivante\n\nVous trouverez plus de détails dans notre guide \"Astuces pour augmenter son taux de conversion\".",
    docs: ['5', '1']
  },
  'négociation': {
    response: "Les techniques de négociation efficaces incluent :\n\n- L'écoute active pour comprendre les besoins réels\n- La préparation d'arguments de vente solides\n- La gestion des silences pour créer un sentiment d'urgence\n- L'utilisation de la technique du \"oui incrémental\"\n\nNotre formation vidéo \"Négociation efficace\" vous donnera toutes les clés pour maîtriser ces techniques.",
    docs: ['2', '1']
  },
  'réglementation': {
    response: "La réglementation immobilière a évolué en 2023 avec plusieurs changements importants :\n\n- Nouvelles normes énergétiques pour les biens mis en location\n- Évolution des règles concernant les diagnostics obligatoires\n- Modifications des conditions d'accès aux prêts immobiliers\n\nConsultez notre document \"Réglementation immobilière 2023\" pour tous les détails.",
    docs: ['3']
  },
  'crm': {
    response: "Notre CRM Noovimo vous permet de :\n\n- Gérer efficacement votre portefeuille de biens\n- Suivre vos prospects et clients\n- Automatiser vos relances\n- Générer des rapports d'activité\n\nVous trouverez tous les détails dans le \"Manuel utilisateur CRM Noovimo\".",
    docs: ['4']
  },
  'prospection': {
    response: "Pour optimiser votre prospection téléphonique :\n\n1. Préparez un script efficace mais flexible\n2. Concentrez-vous sur les heures optimales d'appel (10h-12h et 14h-16h)\n3. Utilisez la technique de l'entonnoir : commencez large puis affinez\n4. Proposez toujours une action concrète à la fin de l'appel\n\nNotre \"Guide de prospection téléphonique\" contient de nombreux exemples concrets et modèles de scripts.",
    docs: ['6', '1']
  },
  'formation': {
    response: "Noovimo propose plusieurs formations pour développer vos compétences :\n\n- Techniques de négociation avancées\n- Optimisation fiscale pour vos clients\n- Utilisation efficace du CRM\n- Prospection et fidélisation de clientèle\n\nJe vous recommande particulièrement le webinaire sur l'optimisation fiscale qui a reçu d'excellents retours.",
    docs: ['2', '7']
  }
};

// Fonction qui simule l'analyse de la requête et retourne une réponse
const analyzeQuery = (query: string): {response: string, references: Document[]} => {
  // Convertir la requête en minuscules pour faciliter la recherche
  const lowerQuery = query.toLowerCase();
  
  // Rechercher des mots-clés dans la requête
  for (const [keyword, data] of Object.entries(predefinedResponses)) {
    if (lowerQuery.includes(keyword)) {
      // Trouver les documents référencés
      const referencedDocs = documentDatabase.filter(doc => 
        data.docs.includes(doc.id)
      );
      
      return {
        response: data.response,
        references: referencedDocs
      };
    }
  }
  
  // Réponse par défaut si aucun mot-clé n'est trouvé
  return {
    response: "Je n'ai pas trouvé d'information spécifique sur ce sujet dans notre base documentaire. Pourriez-vous reformuler votre question ou être plus précis ? Vous pouvez me demander des informations sur les techniques de vente, la réglementation, nos formations ou nos outils internes.",
    references: []
  };
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [documentReferences, setDocumentReferences] = useState<DocumentReference[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const sendMessage = useCallback(async (content: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };
    
    // Ajouter un message "en chargement" pour le bot
    const loadingBotMessage: ChatMessage = {
      id: uuidv4(),
      content: '',
      timestamp: new Date().toISOString(),
      sender: 'bot',
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, loadingBotMessage]);
    setIsProcessing(true);
    
    // Simuler un délai pour l'analyse et la génération de réponse
    setTimeout(() => {
      // Analyser la requête et obtenir une réponse
      const { response, references } = analyzeQuery(content);
      
      // Convertir les documents en références documentaires
      const docReferences: DocumentReference[] = references.map(doc => ({
        id: doc.id,
        name: doc.name,
        category: doc.category,
        documentType: doc.documentType,
        relevanceScore: Math.random() * 0.5 + 0.5 // Score de pertinence entre 0.5 et 1
      }));
      
      // Mettre à jour le message du bot avec la réponse
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
      
      // Mettre à jour les références documentaires
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
