
export interface EmailAddress {
  name: string;
  email: string;
}

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: EmailAddress[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  attachments?: EmailAttachment[];
  folder: string;
  status?: 'awaiting-reply' | 'replied' | 'forwarded';
  labels?: string[];
}

export interface EmailFolder {
  id: string;
  name: string;
  icon: string;
  count?: number;
  unread?: number;
}

export interface EmailContact {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: string;
  role?: string;
  status?: string;
  lastContact?: string;
  notes?: string;
}
