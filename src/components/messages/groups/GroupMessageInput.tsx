
import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface GroupMessageInputProps {
  onSendMessage: (message: string) => void;
}

const GroupMessageInput = ({ onSendMessage }: GroupMessageInputProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="p-4 border-t border-border/50">
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Paperclip size={18} className="text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ajouter une pièce jointe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1 search-bar mx-2">
          <input
            type="text"
            placeholder="Message au groupe..."
            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
        </div>
        
        <Button
          variant="default"
          size="icon"
          className="rounded-full h-10 w-10 bg-[#d72345] hover:bg-[#b61d39]"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send size={18} className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default GroupMessageInput;
