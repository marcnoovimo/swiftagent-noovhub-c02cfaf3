
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

export interface DocumentReference {
  id: string;
  name: string;
  category: string;
  documentType: 'agent' | 'noovimo';
  relevanceScore: number;
}
