import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import ChatMessageItem from './ChatMessageItem';
import DocumentReferenceCard from './DocumentReferenceCard';
import ChatbotButton from './ChatbotButton';

const ChatbotInterface: React.FC = () => {
  const {
    isOpen,
    toggleOpen,
    messages,
    input,
    setInput,
    handleSendMessage,
    isLoading,
    documentSuggestions,
    isListening,
    toggleListening
  } = useChatbot();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-[90vw] sm:w-96 h-[550px] bg-white dark:bg-gray-800 rounded-lg shadow-xl z-40 flex flex-col"
          >
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-noovimo-500 flex items-center justify-center mr-2">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Noovi - Assistant IA</h3>
                  <p className="text-xs text-muted-foreground">Répond instantanément à vos questions</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <ChatMessageItem key={index} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/70 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {documentSuggestions.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium mb-1">Documents pertinents :</p>
                  <div className="flex flex-wrap gap-2">
                    {documentSuggestions.map((doc, idx) => (
                      <DocumentReferenceCard key={idx} document={doc} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t dark:border-gray-700">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  className="w-full px-4 py-2 pl-4 pr-10 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
                  disabled={input.trim() === ''}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatbotButton 
        isOpen={isOpen} 
        toggleOpen={toggleOpen} 
        onStartVoiceRecognition={toggleListening} 
        isListening={isListening} 
      />
    </>
  );
};

export default ChatbotInterface;
