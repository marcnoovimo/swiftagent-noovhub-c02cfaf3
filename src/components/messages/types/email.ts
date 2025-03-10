
// Email types
export interface EmailAddress {
  name: string;
  email: string;
}

export interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Email {
  id: string;
  subject: string;
  body: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  attachments?: EmailAttachment[];
  date: string;
  read: boolean;
  starred: boolean;
  labels?: string[];
  folder: string;
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
