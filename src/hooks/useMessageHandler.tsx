
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, DocumentReference, OpenAIConfig } from '@/types/chatbot';
import { searchDocumentsForQuery, generateChatbotResponse } from '@/services/chatbotService';

interface UseMessageHandlerProps {
  openaiConfig: OpenAIConfig;
}

export const useMessageHandler = ({ openaiConfig }: UseMessageHandlerProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Bonjour, je suis Arthur, votre assistant IA expert en immobilier et sur l'intranet Noovimo. Je peux répondre à vos questions sur la plateforme ou sur les transactions immobilières en France. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentSuggestions, setDocumentSuggestions] = useState<DocumentReference[]>([]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      timestamp: new Date(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Add loading message
    const loadingMessageId = uuidv4();
    setMessages(prev => [...prev, {
      id: loadingMessageId,
      content: "Je réfléchis...",
      timestamp: new Date(),
      sender: 'bot',
      isLoading: true
    }]);
    
    // Search for relevant documents
    const documents = searchDocumentsForQuery(input);
    setDocumentSuggestions(documents);
    
    try {
      // Generate response with OpenAI if configured
      const botResponse = await generateChatbotResponse(input, documents, openaiConfig);
      
      // Remove loading message and add real response
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
      
      const botMessage: ChatMessage = {
        id: uuidv4(),
        content: botResponse,
        timestamp: new Date(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Remove loading message and add error message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
      
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        timestamp: new Date(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSendMessage,
    isLoading,
    documentSuggestions
  };
};
