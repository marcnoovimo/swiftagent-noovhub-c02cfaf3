export interface DocumentMetadata {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  size?: number;
  ownerId?: string;
  createdAt?: string;
  path?: string;
  accessLevel?: 'admin' | 'agent' | 'shared';
  url?: string;
  unread?: boolean;
  extractedContent?: string; // Added this field to fix the type error
}

// ... keep existing code (the rest of the file)
