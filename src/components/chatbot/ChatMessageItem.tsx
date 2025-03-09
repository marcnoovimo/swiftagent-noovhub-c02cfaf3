
import React from 'react';
import { ChatMessage } from '@/types/chatbot';
import { cn } from '@/lib/utils';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const isLoading = message.isLoading;

  return (
    <div className={cn(
      "flex",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "rounded-lg p-3 max-w-[80%]",
        isBot ? "bg-secondary/70" : "bg-noovimo-500 text-white",
        isLoading && "animate-pulse"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-[10px] opacity-70 text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessageItem;
