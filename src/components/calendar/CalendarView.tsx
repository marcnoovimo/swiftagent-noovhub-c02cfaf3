
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CalendarEvent } from '@/types/calendar';
import { Loader } from 'lucide-react';
import EventForm from './EventForm';
import ShareEventDialog from './ShareEventDialog';
import { useCalendarNavigation, CalendarView as ViewType } from './hooks/useCalendarNavigation';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import { useToast } from '@/hooks/use-toast';
import { deleteEvent } from '@/services/calendarService';

interface CalendarViewProps {
  view: ViewType;
  events: CalendarEvent[];
  isLoading?: boolean;
  onEventChange?: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  view: initialView, 
  events,
  isLoading = false,
  onEventChange
}) => {
  const { toast } = useToast();
  const { 
    currentDate, 
    view, 
    setView,
    handlePrevious, 
    handleNext, 
    handleToday 
  } = useCalendarNavigation(initialView);
  
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [eventToShare, setEventToShare] = useState<CalendarEvent | null>(null);
  
  // Update the view if the props change
  React.useEffect(() => {
    setView(initialView);
  }, [initialView, setView]);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card className="p-4">
      {view === 'month' && (
        <MonthView
          currentDate={currentDate}
          events={events}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onShareEvent={handleShareEvent}
        />
      )}
      
      {view === 'week' && (
        <WeekView
          currentDate={currentDate}
          events={events}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onShareEvent={handleShareEvent}
        />
      )}
      
      {view === 'day' && (
        <DayView
          currentDate={currentDate}
          events={events}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onShareEvent={handleShareEvent}
        />
      )}
      
      <EventForm 
        open={eventFormOpen} 
        onOpenChange={setEventFormOpen}
        event={selectedEvent}
        selectedDate={selectedDate}
        onEventCreated={() => {
          if (onEventChange) onEventChange();
        }}
        onEventUpdated={() => {
          if (onEventChange) onEventChange();
        }}
        onEventDeleted={() => {
          if (onEventChange) onEventChange();
        }}
      />
      
      <ShareEventDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        event={eventToShare}
      />
    </Card>
  );
};

export default CalendarView;
