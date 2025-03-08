
import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/chatbot';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 rounded-full p-2 h-8 w-8 flex items-center justify-center ${
        isBot ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
      }`}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className={`rounded-xl p-3 max-w-[80%] ${
        isBot 
          ? 'bg-secondary text-secondary-foreground' 
          : 'bg-primary text-primary-foreground ml-auto'
      }`}>
        {message.isLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
        <div className={`text-xs mt-1 ${isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
