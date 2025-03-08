
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ChatbotInterface from './ChatbotInterface';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Bot size={24} />
      </Button>
      
      <ChatbotInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
