
import { CalendarEvent } from '@/types/calendar';
import { v4 as uuidv4 } from 'uuid';

// Mock calendar events database for demo
let eventsData: CalendarEvent[] = [
  {
    id: '1',
    title: 'Rendez-vous client',
    description: 'Discussion sur le projet immobilier',
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    location: '15 rue de la Paix, Paris',
    type: 'appointment',
    contactId: '1',
    contactName: 'Jean Dupont',
    reminder: true,
    reminderType: 'email',
    createdAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
  },
  {
    id: '2',
    title: 'Visite appartement',
    description: 'Visite de l\'appartement au 3ème étage',
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    location: '27 avenue des Ternes, Paris',
    type: 'showing',
    contactId: '2',
    contactName: 'Marie Martin',
    reminder: true,
    reminderType: 'sms',
    createdAt: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
  },
  {
    id: '3',
    title: 'Réunion d\'équipe',
    description: 'Point hebdomadaire',
    startTime: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    location: 'Bureau Noovimo',
    type: 'meeting',
    createdAt: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
  }
];

/**
 * Fetch all calendar events
 */
export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return eventsData;
};

/**
 * Add a new calendar event
 */
export const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newEvent: CalendarEvent = {
    ...event,
    id: uuidv4(),
    updatedAt: new Date().toISOString(),
  };
  
  eventsData.push(newEvent);
  return newEvent;
};

/**
 * Update an existing calendar event
 */
export const updateEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const index = eventsData.findIndex(e => e.id === event.id);
  if (index === -1) {
    throw new Error(`Event with ID ${event.id} not found`);
  }
  
  const updatedEvent = {
    ...event,
    updatedAt: new Date().toISOString(),
  };
  
  eventsData[index] = updatedEvent;
  return updatedEvent;
};

/**
 * Delete a calendar event
 */
export const deleteEvent = async (id: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const initialLength = eventsData.length;
  eventsData = eventsData.filter(e => e.id !== id);
  return eventsData.length < initialLength;
};

/**
 * Synchronize with Google Calendar
 */
export const syncWithGoogleCalendar = async (): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is a mock function - in a real application, 
  // this would communicate with Google Calendar API
  
  // Simulate adding a new event from Google Calendar
  const googleEvent: CalendarEvent = {
    id: uuidv4(),
    title: 'Rendez-vous Google Calendar',
    description: 'Événement synchronisé depuis Google Calendar',
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    location: 'Café Centrale',
    type: 'appointment',
    createdAt: new Date().toISOString(),
    googleEventId: 'google-event-123',
  };
  
  eventsData.push(googleEvent);
  
  return true;
};

/**
 * Create an event reminder
 */
export const createEventReminder = async (
  eventId: string,
  reminderType: 'email' | 'sms' | 'whatsapp'
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is a mock function - in a real application,
  // this would schedule a reminder in the database
  
  const event = eventsData.find(e => e.id === eventId);
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }
  
  event.reminder = true;
  event.reminderType = reminderType;
  
  return true;
};

/**
 * Generate a shareable link for calendar event
 */
export const generateShareableLink = async (eventId: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This is a mock function - in a real application,
  // this would generate a unique shareable link
  
  return `https://swiftagent.app/calendar/shared/${eventId}`;
};

/**
 * Share event via email with a contact
 */
export const shareEventWithContact = async (
  eventId: string, 
  contactId: string
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is a mock function - in a real application,
  // this would send an email to the contact
  
  const event = eventsData.find(e => e.id === eventId);
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`);
  }
  
  console.log(`Event ${event.title} shared with contact ID ${contactId}`);
  
  return true;
};
