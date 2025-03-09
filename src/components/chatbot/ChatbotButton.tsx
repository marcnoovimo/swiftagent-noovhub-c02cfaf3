
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ 
  isOpen, 
  toggleOpen
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
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
