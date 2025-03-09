
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  type: 'appointment' | 'meeting' | 'showing' | 'personal' | 'prospecting' | 'administrative' | 'other' | 'signature';
  contactId?: string;
  contactName?: string;
  reminder?: boolean;
  reminderType?: 'email' | 'sms' | 'whatsapp';
  createdAt: string;
  updatedAt?: string;
  googleEventId?: string;
}

export type EventTypeInfo = {
  label: string;
  color: string;
}

export const EVENT_TYPES: Record<CalendarEvent['type'], EventTypeInfo> = {
  'appointment': { label: 'Face à face', color: 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-800 dark:text-blue-200' },
  'signature': { label: 'Signature', color: 'bg-green-500/20 dark:bg-green-800/40 border-green-600 text-green-800 dark:text-green-200' },
  'meeting': { label: 'Réunion', color: 'bg-purple-100 dark:bg-purple-900 border-purple-500 text-purple-800 dark:text-purple-200' },
  'personal': { label: 'Personnel', color: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-800 dark:text-yellow-200' },
  'prospecting': { label: 'Prospection terrain', color: 'bg-orange-100 dark:bg-orange-900 border-orange-500 text-orange-800 dark:text-orange-200' },
  'administrative': { label: 'Administratif bureau', color: 'bg-green-800/20 dark:bg-green-950 border-green-800 text-green-900 dark:text-green-100' },
  'other': { label: 'Tâches diverses', color: 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200' },
  'showing': { label: 'Visite', color: 'bg-orange-200 dark:bg-orange-950 border-orange-600 text-orange-900 dark:text-orange-100' }
};
