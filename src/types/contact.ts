
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  emailPro?: string;
  phone?: string;
  mobile?: string;
  photo?: string;
  company?: string;
  position?: string;
  address?: string;
  city?: string;
  notes?: string;
  category: 'client' | 'partner' | 'prospect' | 'notary' | 'agent' | 'other';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  lastContact?: string;
  source?: 'manual' | 'import' | 'scan' | 'sync';
  communicationHistory?: {
    type: 'email' | 'call' | 'meeting' | 'message';
    date: string;
    summary: string;
  }[];
}
