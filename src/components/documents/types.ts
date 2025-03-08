
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  documentType: 'agent' | 'noovimo';
  size?: number;
  ownerId?: string;
  createdAt?: string;
  path?: string;
  accessLevel?: 'admin' | 'agent' | 'shared';
  url?: string;
  unread?: boolean;
  isScanned?: boolean; // Flag to indicate if document was scanned
  scanDate?: string; // Date when document was scanned
  analyzeText?: boolean; // Flag to indicate if document text should be analyzed
  extractedContent?: string; // Content extracted from document via OCR
  confidenceScore?: number; // OCR confidence score
  classificationScore?: number; // Auto-classification confidence score
}

export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  documents: (Document | Folder)[];
  parentId?: string;
  unreadCount?: number; // Nombre de documents non lus dans le dossier
}

export interface Category {
  name: string;
  icon: any; // Using 'any' to solve the Lucide icon component typing issue
  count: number;
}

export type BreadcrumbItem = {
  id: string;
  name: string;
};

export type AccessLevel = 'admin' | 'agent' | 'shared';

export interface UploadOptions {
  category: string;
  accessLevel: AccessLevel;
}

export interface ScanOptions {
  category: string;
  accessLevel: AccessLevel;
  documentName: string;
  autoClassify: boolean;
  analyzeText?: boolean; // Option pour analyser le texte du document scanné
}
