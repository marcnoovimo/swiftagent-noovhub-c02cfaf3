
import { MessageSquare, X, Mic, StopCircle } from 'lucide-react';
import React from 'react';

interface ChatbotButtonProps {
  isOpen: boolean;
  toggleOpen: () => void;
  onStartVoiceRecognition?: () => void;
  isListening?: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ 
  isOpen, 
  toggleOpen, 
  onStartVoiceRecognition,
  isListening
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2 z-50">
      {isListening && (
        <div className="bg-noovimo-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          Écoute en cours...
        </div>
      )}
      <button
        onClick={toggleOpen}
        className={`rounded-full shadow-lg transition-all flex items-center justify-center 
          ${isOpen ? 'bg-gray-200 w-12 h-12 dark:bg-gray-700' : 'bg-white dark:bg-gray-800 w-14 h-14'}`}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <div className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-noovimo-500" />
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">Noovi</span>
          </div>
        )}
      </button>
      
      {!isOpen && (
        <button
          onClick={onStartVoiceRecognition}
          className={`absolute -left-14 bottom-3 rounded-full shadow-md p-3 
            ${isListening 
              ? 'bg-noovimo-500 text-white animate-pulse' 
              : 'bg-white dark:bg-gray-800 text-muted-foreground hover:text-noovimo-500'
            }`}
        >
          {isListening ? <StopCircle size={18} /> : <Mic size={18} />}
        </button>
      )}
    </div>
  );
};

export default ChatbotButton;
