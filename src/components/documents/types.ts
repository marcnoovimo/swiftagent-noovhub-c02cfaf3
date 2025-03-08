
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
}

export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  documents: (Document | Folder)[];
  parentId?: string;
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
