import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Book, Mic, X, StopCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage, DocumentReference } from '@/types/chatbot';
import ChatMessageItem from './ChatMessageItem';
import DocumentReferenceCard from './DocumentReferenceCard';
import { useChatbot } from '@/hooks/useChatbot';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { 
    messages, 
    sendMessage, 
    documentReferences, 
    isProcessing,
    clearMessages 
  } = useChatbot();
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add voice recognition support
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionSupported(false);
      console.log("Speech recognition not supported in this browser");
    }
    
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    await sendMessage(inputValue.trim());
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  let recognitionInstance: any = null;
  
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
      recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'fr-FR';
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscription('');
        toast({
          title: "Écoute activée",
          description: "Parlez maintenant...",
          duration: 2000,
        });
      };
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setTranscription(transcript);
        setInputValue(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        stopVoiceRecognition();
        toast({
          title: "Erreur de reconnaissance vocale",
          description: event.error,
          variant: "destructive",
          duration: 3000,
        });
      };
      
      recognitionInstance.onend = () => {
        if (isListening) {
          stopVoiceRecognition();
        }
      };
      
      recognitionInstance.start();
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
    if (recognitionInstance) {
      recognitionInstance.stop();
    }
    setIsListening(false);
    
    // If we have a transcription, keep it in the input field
    if (transcription.trim() !== '') {
      toast({
        title: "Transcription terminée",
        duration: 2000,
      });
    } else {
      toast({
        title: "Écoute désactivée",
        duration: 2000,
      });
    }
  };
  
  const toggleVoiceInput = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] bg-background shadow-2xl rounded-2xl border border-border flex flex-col z-50 overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-primary/5">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-primary" />
          <h3 className="font-medium">Assistant Noovimo</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={18} />
        </Button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
            <Bot size={48} className="text-primary/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">Comment puis-je vous aider ?</h3>
            <p className="text-sm mb-4">
              Je peux répondre à vos questions sur nos formations, la réglementation, 
              les techniques de vente et les outils internes.
            </p>
            <div className="text-sm space-y-2 text-left w-full">
              <p className="font-medium">Essayez ces commandes vocales :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>"Montre-moi mes derniers compromis"</li>
                <li>"Comment justifier mes honoraires?"</li>
                <li>"Où est mon mandat de vente à Nantes?"</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
            {documentReferences.length > 0 && (
              <div className="mt-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Book size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Sources documentaires</span>
                </div>
                <div className="space-y-2">
                  {documentReferences.map((reference) => (
                    <DocumentReferenceCard key={reference.id} reference={reference} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              className={`min-h-[60px] resize-none pr-10 ${isListening ? 'border-noovimo-500' : ''}`}
              disabled={isProcessing}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-2 bottom-2 p-1.5 rounded-full transition-colors ${
                      isListening 
                        ? 'bg-primary text-primary-foreground animate-pulse' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {isListening ? <StopCircle size={18} /> : <Mic size={18} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isListening ? 'Arrêter la dictée vocale' : 'Dicter à la voix'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="h-[60px]"
            disabled={inputValue.trim() === '' || isProcessing}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
