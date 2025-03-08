
export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  attachments?: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'clients' | 'mandats' | 'urgent' | 'archived';
  labels?: string[];
  status?: 'sent' | 'read' | 'replied' | 'forwarded' | 'awaiting-reply';
  relatedDocuments?: string[];
  contactId?: string;
  readDate?: string;
}

export interface EmailContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: string;
  role?: string;
  status: 'client-buyer' | 'client-seller' | 'notary' | 'partner' | 'agent' | 'other';
  notes?: string;
  address?: string;
  lastContact?: string;
  communicationHistory?: {
    type: 'email' | 'call' | 'meeting' | 'message';
    date: string;
    summary: string;
    documentId?: string;
  }[];
  labels?: string[];
  transactions?: string[];
}

export interface EmailFolder {
  id: string;
  name: string;
  icon: string;
  count?: number;
  unread?: number;
  color?: string;
  isDefault?: boolean;
}
