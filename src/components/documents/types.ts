
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  documentType: 'agent' | 'noovimo';
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
