
import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, Settings, Key } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';
import ChatMessageItem from './ChatMessageItem';
import DocumentReferenceCard from './DocumentReferenceCard';
import ChatbotButton from './ChatbotButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    toggleListening,
    openaiConfig,
    updateOpenAIConfig
  } = useChatbot();

  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(openaiConfig?.apiKey || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const saveApiKey = () => {
    updateOpenAIConfig({ apiKey });
    setShowSettings(false);
  };

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
                  <h3 className="font-medium">Arthur - Assistant IA</h3>
                  <p className="text-xs text-muted-foreground">Répond instantanément à vos questions</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className="hover:bg-secondary"
              >
                <Settings size={18} />
              </Button>
            </div>

            {showSettings ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <h3 className="font-medium text-sm mb-2">Configuration de l'API OpenAI</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Clé API OpenAI</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="sk-..."
                      />
                      <Button variant="outline" size="sm" onClick={() => setApiKey('')}>
                        <Key size={14} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Votre clé API est stockée localement et n'est jamais partagée.
                    </p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                      Annuler
                    </Button>
                    <Button size="sm" onClick={saveApiKey}>
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <ChatMessageItem key={message.id} message={message} />
                ))}
                
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
                
                <div ref={messagesEndRef} />
              </div>
            )}

            <div className="p-4 border-t dark:border-gray-700">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative"
              >
                <Textarea
                  placeholder="Posez votre question à Arthur..."
                  className="resize-none w-full px-4 py-2 pl-4 pr-10 min-h-[60px] border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  type="submit"
                  className="absolute right-3 bottom-3 text-muted-foreground hover:text-primary"
                  disabled={isLoading || input.trim() === ''}
                >
                  <Send size={18} className={isLoading ? "opacity-50" : ""} />
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
