
import React, { useState, useEffect } from 'react';
import { Bot, Mic, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ChatbotInterface from './ChatbotInterface';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ChatbotButton: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [listeningMode, setListeningMode] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionSupported(false);
      console.log("Speech recognition not supported in this browser");
    }
  }, []);
  
  const startVoiceListening = () => {
    if (!recognitionSupported) {
      toast({
        title: "Reconnaissance vocale non supportée",
        description: "Votre navigateur ne supporte pas cette fonctionnalité",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setListeningMode(true);
    toast({
      title: "Assistant vocal activé",
      description: "Dites votre commande...",
      duration: 2000,
    });
    
    // Simulate voice recognition (would be replaced with actual API)
    setTimeout(() => {
      setListeningMode(false);
      setIsOpen(true);
      
      // In a real implementation, this would be the result of speech recognition
      // that would then be passed to the chatbot
    }, 2500);
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <Button
                onClick={startVoiceListening}
                variant="outline"
                className={`h-12 w-12 rounded-full shadow-md ${
                  listeningMode ? 'bg-noovimo-500 text-white animate-pulse' : ''
                }`}
                size="icon"
                title="Assistant vocal"
              >
                <Mic size={20} />
              </Button>
              
              <Button
                onClick={() => setIsOpen(true)}
                className="h-14 w-14 rounded-full shadow-lg"
                size="icon"
                title="Assistant Noovimo"
              >
                <Bot size={24} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {isOpen && <ChatbotInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
