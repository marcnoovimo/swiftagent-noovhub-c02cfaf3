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
  unread?: boolean; // Nouvelle propriété pour identifier les documents non lus
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
