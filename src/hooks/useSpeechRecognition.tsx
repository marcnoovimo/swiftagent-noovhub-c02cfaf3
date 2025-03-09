
import { useState, useRef, useEffect } from 'react';
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

interface UseSpeechRecognitionProps {
  onTranscript: (transcript: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSpeechRecognition = ({
  onTranscript,
  isOpen,
  setIsOpen
}: UseSpeechRecognitionProps) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
        onTranscript(transcript);
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
    isListening,
    toggleListening
  };
};
