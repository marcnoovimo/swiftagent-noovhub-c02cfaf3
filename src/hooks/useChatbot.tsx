
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, DocumentReference } from '@/types/chatbot';
import { searchDocumentsForQuery, generateChatbotResponse } from '@/services/chatbotService';
import { useToast } from "@/hooks/use-toast";

export const useChatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Bonjour, je suis Noovi, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentSuggestions, setDocumentSuggestions] = useState<DocumentReference[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
    
    // Search for relevant documents
    const documents = searchDocumentsForQuery(input);
    setDocumentSuggestions(documents);
    
    try {
      // Generate response
      const botResponse = await generateChatbotResponse(input, documents);
      
      const botMessage: ChatMessage = {
        id: uuidv4(),
        content: botResponse,
        timestamp: new Date(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
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

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    try {
      if (!isOpen) {
        setIsOpen(true);
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({
          title: "Non supporté",
          description: "La reconnaissance vocale n'est pas supportée par votre navigateur.",
          variant: "destructive"
        });
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.lang = 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Écoute en cours",
          description: "Parlez maintenant...",
        });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        
        // Automatically send message after voice recognition
        setTimeout(() => {
          setInput(transcript);
          handleSendMessage();
        }, 500);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Erreur",
          description: `Erreur de reconnaissance vocale: ${event.error}`,
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'initialisation de la reconnaissance vocale.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isOpen,
    toggleOpen,
    messages,
    input,
    setInput,
    handleSendMessage,
    isLoading,
    documentSuggestions,
    isListening,
    toggleListening
  };
};

// Add missing TypeScript declaration for browser Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
