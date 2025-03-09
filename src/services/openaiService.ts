
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
    Réponds en français de manière professionnelle, concise et utile.`;

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
