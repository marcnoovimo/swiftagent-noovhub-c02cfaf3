import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DocumentReference } from '@/types';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentSuggestions, setDocumentSuggestions] = useState<DocumentReference[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response and document suggestions after a delay
    setTimeout(() => {
      setIsLoading(false);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Réponse de l'IA pour : ${input}`, isUser: false }
      ]);
      setDocumentSuggestions([
        { title: "Document 1", url: "#" },
        { title: "Document 2", url: "#" }
      ]);
    }, 1500);
  };
  
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Reconnaissance vocale non supportée",
        description: "Votre navigateur ne supporte pas cette fonctionnalité",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'fr-FR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({
          title: "Écoute activée",
          description: "Parlez maintenant...",
          duration: 2000,
        });
        
        // Ouvrir le chatbot automatiquement
        if (!isOpen) {
          setIsOpen(true);
        }
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        stopVoiceRecognition();
        toast({
          title: "Erreur de reconnaissance vocale",
          description: event.error,
          variant: "destructive",
          duration: 3000,
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Envoyer automatiquement le message après la fin de la dictée vocale
        if (input.trim() !== '') {
          setTimeout(() => {
            handleSendMessage();
          }, 500);
        }
      };
      
      recognitionRef.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast({
        title: "Erreur d'initialisation vocale",
        description: "Impossible de démarrer la reconnaissance vocale",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };
  
  useEffect(() => {
    // Nettoyer la reconnaissance vocale lors du démontage du composant
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
}
