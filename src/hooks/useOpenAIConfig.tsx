
import { useState, useEffect } from 'react';
import { OpenAIConfig } from '@/types/chatbot';

export const useOpenAIConfig = () => {
  // Initialize OpenAI configuration from localStorage
  const [openaiConfig, setOpenaiConfig] = useState<OpenAIConfig>(() => {
    // Try to get API key from localStorage
    const savedConfig = localStorage.getItem('arthur_openai_config');
    return savedConfig ? JSON.parse(savedConfig) : {
      apiKey: '',
      model: 'gpt-4o',
      maxTokens: 500,
      temperature: 0.7
    };
  });

  // Save OpenAI config to localStorage whenever it changes
  useEffect(() => {
    if (openaiConfig) {
      localStorage.setItem('arthur_openai_config', JSON.stringify(openaiConfig));
    }
  }, [openaiConfig]);

  // Function to update OpenAI configuration
  const updateOpenAIConfig = (config: Partial<OpenAIConfig>) => {
    setOpenaiConfig(prev => ({ ...prev, ...config }));
  };

  return {
    openaiConfig,
    updateOpenAIConfig
  };
};
