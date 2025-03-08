
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
  icon: React.ReactNode;
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
}
