
import { Contact } from '@/types/contact';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  emailPro: string;
  phone: string;
  mobile: string;
  company: string;
  position: string;
  address: string;
  city: string;
  notes: string;
  category: 'client' | 'partner' | 'prospect' | 'notary' | 'agent' | 'other';
  tags: string[];
  dateOfBirth?: Date;
  gender: 'male' | 'female' | 'other';
}

export interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  contact?: Contact;
}
