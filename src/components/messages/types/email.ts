
// Email types
export interface EmailAddress {
  name: string;
  email: string;
  avatar?: string;
}

export interface EmailContact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  // Propriétés additionnelles pour la compatibilité avec les composants existants
  firstName?: string;
  lastName?: string;
  company?: string;
  status?: string;
  phone?: string;
  lastContact?: string;
  notes?: string;
  unread?: number;
}

export interface EmailFolder {
  id: string;
  name: string;
  count?: number;
  icon?: string;
  unread?: number;
}

export interface EmailAttachment {
  id: string;
  name: string;
  size: number; // In bytes
  type: string;
  url?: string;
}

export interface Email {
  id: string;
  subject: string;
  body: string;
  content?: string; // Alternative for body for some components
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  attachments?: EmailAttachment[];
  hasAttachments?: boolean;
  date: string;
  timestamp?: number | string;
  read: boolean;
  isRead?: boolean; // Alternative for read property
  starred: boolean;
  isStarred?: boolean; // Alternative for starred property
  labels?: string[];
  folder: string;
  status?: string;
}

export interface EmailComposition {
  to: EmailAddress[];
  cc: EmailAddress[];
  bcc: EmailAddress[];
  subject: string;
  body: string;
  attachments: EmailAttachment[];
}

export interface EmailAction {
  type: 'reply' | 'replyAll' | 'forward' | 'new';
  originalEmail?: Email;
}
