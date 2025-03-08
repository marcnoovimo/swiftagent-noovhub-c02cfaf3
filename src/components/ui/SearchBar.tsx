
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, StopCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SearchBar: React.FC = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionSupported(false);
      console.log("Speech recognition not supported in this browser");
    }
    
    // Cleanup function to stop recognition if component unmounts while listening
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
    
    // Show toast for demonstration
    if (query.trim()) {
      toast({
        title: "Recherche",
        description: `Recherche de "${query}" en cours...`,
        duration: 2000,
      });
    }
  };

  const startVoiceRecognition = () => {
    if (!recognitionSupported) {
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
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setQuery(transcript);
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
        // Automatically submit search after voice input
        if (query.trim() !== '') {
          setTimeout(() => {
            handleSearch(new Event('submit') as any);
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

  return (
    <form onSubmit={handleSearch} className={`search-bar flex items-center transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}>
      <Search size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
      <input
        type="text"
        placeholder="Recherchez un document, une information..."
        className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={toggleListening}
              className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                isListening 
                  ? 'bg-noovimo-500 text-white animate-pulse' 
                  : 'text-muted-foreground hover:text-noovimo-500'
              }`}
              aria-label={isListening ? "Arrêter la recherche vocale" : "Recherche vocale"}
            >
              {isListening ? <StopCircle size={18} /> : <Mic size={18} />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isListening ? 'Arrêter la dictée vocale' : 'Rechercher à la voix'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};

export default SearchBar;
