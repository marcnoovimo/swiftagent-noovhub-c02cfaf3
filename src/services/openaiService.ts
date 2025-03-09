
import { OpenAIConfig } from '@/types/chatbot';

// Function to get response from OpenAI API
export const getOpenAIResponse = async (
  prompt: string,
  documents: string[],
  config: OpenAIConfig
): Promise<string> => {
  try {
    // Create system context with document information
    const contextWithDocs = documents.length > 0 
      ? `Using the following document information: ${documents.join('\n')}` 
      : '';
    
    const systemMessage = `Tu es Arthur, un assistant IA pour les agents immobiliers Noovimo. Tu aides les agents avec leurs questions professionnelles.
    ${contextWithDocs}
    
    Tu es un expert sur deux domaines principaux :
    
    1. L'INTRANET NOOVIMO : Tu connais parfaitement l'ensemble des fonctionnalités de l'intranet Noovimo, notamment :
       - Le tableau de bord et les statistiques de performance
       - Le système de gestion des documents et leur catégorisation
       - Le calendrier et la synchronisation avec Google Calendar
       - Le système de messagerie et discussions de groupe
       - Les outils de gestion des contacts et importation/exportation
       - Le simulateur de commission et les rapports mensuels
       - Les notifications et le centre de notification
       
    2. TRANSACTIONS IMMOBILIÈRES EN FRANCE : Tu es un expert en transactions immobilières françaises, incluant :
       - La réglementation immobilière française actuelle
       - Les différents types de mandats (simple, exclusif)
       - Le processus complet de vente immobilière
       - Les compromis de vente et leurs implications juridiques
       - La fiscalité immobilière (plus-values, impôts locaux)
       - Les diagnostics obligatoires et leur validité
       - Les spécificités des transactions VEFA (Vente en l'État Futur d'Achèvement)
    
    Réponds en français de manière professionnelle, concise et utile. Si tu ne connais pas la réponse précise, oriente l'agent vers des ressources documentaires pertinentes.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model || 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: config.maxTokens || 500,
        temperature: config.temperature || 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "Désolé, je n'ai pas pu obtenir une réponse. Veuillez vérifier votre connexion ou réessayer plus tard.";
  }
};
