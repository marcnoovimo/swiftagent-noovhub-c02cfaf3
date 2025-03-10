
import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import EventForm from './EventForm';
import ShareEventDialog from './ShareEventDialog';
import { useCalendarNavigation, CalendarView as ViewType } from './hooks/useCalendarNavigation';
import { useCalendarOperations } from './hooks/useCalendarOperations';
import CalendarViewContent from './CalendarViewContent';
import { CalendarEvent } from '@/types/calendar';

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
  const { 
    currentDate, 
    view, 
    setView,
    handlePrevious, 
    handleNext, 
    handleToday 
  } = useCalendarNavigation(initialView);
  
  const {
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
  } = useCalendarOperations(onEventChange);
  
  // Update the view if the props change
  React.useEffect(() => {
    setView(initialView);
  }, [initialView, setView]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card className="p-4">
      <CalendarViewContent
        view={view}
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
      
      <EventForm 
        open={eventFormOpen} 
        onOpenChange={setEventFormOpen}
        event={selectedEvent}
        selectedDate={selectedDate}
        onEventCreated={handleEventChange}
        onEventUpdated={handleEventChange}
        onEventDeleted={handleEventChange}
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
