
import { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';
import { deleteEvent } from '@/services/calendarService';
import { useToast } from '@/hooks/use-toast';

export function useCalendarOperations(onEventChange?: () => void) {
  const { toast } = useToast();
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [eventToShare, setEventToShare] = useState<CalendarEvent | null>(null);

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventFormOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès",
      });
      if (onEventChange) onEventChange();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'événement",
        variant: "destructive",
      });
    }
  };

  const handleShareEvent = (event: CalendarEvent) => {
    setEventToShare(event);
    setShareDialogOpen(true);
  };

  const handleAddEvent = (date: Date) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setEventFormOpen(true);
  };

  const handleEventChange = () => {
    if (onEventChange) onEventChange();
  };

  return {
    eventFormOpen,
    setEventFormOpen,
    selectedEvent,
    selectedDate,
    shareDialogOpen,
    setShareDialogOpen,
    eventToShare,
    handleEditEvent,
    handleDeleteEvent,
    handleShareEvent,
    handleAddEvent,
    handleEventChange
  };
}
