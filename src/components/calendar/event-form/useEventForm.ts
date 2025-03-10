
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Contact } from '@/types/contact';
import { CalendarEvent } from '@/types/calendar';
import { addEvent, deleteEvent, updateEvent } from '@/services/calendarService';
import { EventFormValues, eventSchema } from './types';

export function useEventForm(props: {
  event?: CalendarEvent;
  selectedDate?: Date;
  onEventCreated?: () => void;
  onEventUpdated?: () => void;
  onEventDeleted?: () => void;
  onOpenChange: (open: boolean) => void;
  contacts?: Contact[];
}) {
  const { 
    event, 
    selectedDate, 
    onEventCreated, 
    onEventUpdated, 
    onEventDeleted, 
    onOpenChange,
    contacts 
  } = props;
  
  const { toast } = useToast();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startDate: event ? new Date(event.startTime) : selectedDate || new Date(),
      startTime: event ? format(new Date(event.startTime), 'HH:mm') : '09:00',
      endTime: event ? format(new Date(event.endTime), 'HH:mm') : '10:00',
      location: event?.location || '',
      type: event?.type || 'appointment',
      contactId: event?.contactId || undefined,
      sendReminder: event?.reminder ? true : false,
      reminderType: event?.reminderType || 'email',
    },
  });

  const onSubmit = async (values: EventFormValues) => {
    try {
      const [startHour, startMinute] = values.startTime.split(':').map(Number);
      const [endHour, endMinute] = values.endTime.split(':').map(Number);
      
      const startDate = new Date(values.startDate);
      startDate.setHours(startHour, startMinute, 0);
      
      const endDate = new Date(values.startDate);
      endDate.setHours(endHour, endMinute, 0);
      
      // If end time is before start time, it must be the next day
      if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      const selectedContact = values.contactId ? 
        contacts?.find((c: Contact) => c.id === values.contactId) : undefined;
      
      if (event) {
        // Update existing event
        const updatedEvent: CalendarEvent = {
          ...event,
          title: values.title,
          description: values.description,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          location: values.location,
          type: values.type,
          contactId: values.contactId,
          contactName: selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : undefined,
          reminder: values.sendReminder,
          reminderType: values.sendReminder ? values.reminderType : undefined,
          updatedAt: new Date().toISOString(),
        };
        
        await updateEvent(updatedEvent);
        
        toast({
          title: "Rendez-vous modifié",
          description: `Le rendez-vous "${values.title}" a été mis à jour`,
        });
        
        if (onEventUpdated) onEventUpdated();
      } else {
        // Create new event
        const newEvent: Omit<CalendarEvent, 'id'> = {
          title: values.title,
          description: values.description,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          location: values.location,
          type: values.type,
          contactId: values.contactId,
          contactName: selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : undefined,
          reminder: values.sendReminder,
          reminderType: values.sendReminder ? values.reminderType : undefined,
          createdAt: new Date().toISOString(),
        };
        
        await addEvent(newEvent);
        
        toast({
          title: "Rendez-vous créé",
          description: `Le rendez-vous "${values.title}" a été ajouté à votre agenda`,
        });
        
        if (onEventCreated) onEventCreated();
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating/updating event:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création/modification du rendez-vous",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    
    try {
      await deleteEvent(event.id);
      
      toast({
        title: "Rendez-vous supprimé",
        description: `Le rendez-vous "${event.title}" a été supprimé de votre agenda`,
      });
      
      if (onEventDeleted) onEventDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du rendez-vous",
        variant: "destructive",
      });
    }
  };
  
  return {
    form,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    onSubmit,
    handleDelete
  };
}
