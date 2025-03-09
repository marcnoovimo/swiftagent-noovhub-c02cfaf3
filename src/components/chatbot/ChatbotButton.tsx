
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotButtonProps {
  isOpen: boolean;
  toggleOpen: () => void;
  onStartVoiceRecognition: () => void;
  isListening: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ 
  isOpen, 
  toggleOpen, 
  onStartVoiceRecognition,
  isListening
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-primary text-white",
            isListening && "bg-red-500"
          )}
          onClick={onStartVoiceRecognition}
        >
          <Mic size={20} className={isListening ? "animate-pulse" : ""} />
        </motion.button>
      )}
      
      <motion.button
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-noovimo-500 text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOpen}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatbotButton;
