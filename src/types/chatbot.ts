
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
