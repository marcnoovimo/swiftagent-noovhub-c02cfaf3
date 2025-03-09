
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, DocumentReference, OpenAIConfig } from '@/types/chatbot';
import { searchDocumentsForQuery, generateChatbotResponse } from '@/services/chatbotService';
import { useToast } from "@/hooks/use-toast";

// Define SpeechRecognition interface
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      }
    }
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: (event: Event) => void;
}

// Add speech recognition type
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const useChatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Bonjour, je suis Arthur, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentSuggestions, setDocumentSuggestions] = useState<DocumentReference[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // New state for OpenAI configuration
  const [openaiConfig, setOpenaiConfig] = useState<OpenAIConfig>(() => {
    // Try to get API key from localStorage
    const savedConfig = localStorage.getItem('arthur_openai_config');
    return savedConfig ? JSON.parse(savedConfig) : {
      apiKey: '',
      model: 'gpt-4o',
      maxTokens: 500,
      temperature: 0.7
    };
  });

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

  // Save OpenAI config to localStorage whenever it changes
  useEffect(() => {
    if (openaiConfig) {
      localStorage.setItem('arthur_openai_config', JSON.stringify(openaiConfig));
    }
  }, [openaiConfig]);

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

  // New function to update OpenAI configuration - fixed type issue
  const updateOpenAIConfig = (config: Partial<OpenAIConfig>) => {
    setOpenaiConfig(prev => ({ ...prev, ...config }));
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
    toggleListening,
    openaiConfig,
    updateOpenAIConfig
  };
};
