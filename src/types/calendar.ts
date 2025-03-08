
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  type: 'appointment' | 'meeting' | 'showing' | 'personal' | 'other';
  contactId?: string;
  contactName?: string;
  reminder?: boolean;
  reminderType?: 'email' | 'sms' | 'whatsapp';
  createdAt: string;
  updatedAt?: string;
  googleEventId?: string;
}
