
import { useState } from 'react';
import { useOpenAIConfig } from './useOpenAIConfig';
import { useMessageHandler } from './useMessageHandler';
import { useSpeechRecognition } from './useSpeechRecognition';

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openaiConfig, updateOpenAIConfig } = useOpenAIConfig();
  const { messages, input, setInput, handleSendMessage, isLoading, documentSuggestions } = useMessageHandler({
    openaiConfig
  });

  const handleTranscript = (transcript: string) => {
    setInput(transcript);
    
    // Automatically send message after voice recognition
    setTimeout(() => {
      handleSendMessage();
    }, 500);
  };

  const { isListening, toggleListening } = useSpeechRecognition({
    onTranscript: handleTranscript,
    isOpen,
    setIsOpen
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return {
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
  };
};
