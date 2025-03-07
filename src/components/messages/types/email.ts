
export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string[];
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
}
