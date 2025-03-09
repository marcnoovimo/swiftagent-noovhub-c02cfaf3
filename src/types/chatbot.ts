
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

export interface DocumentReference {
  id: string;
  name: string;
  type: string;
  category: string;
  url?: string;
  confidenceScore?: number;
}

// Update OpenAI API configuration type
export interface OpenAIConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
