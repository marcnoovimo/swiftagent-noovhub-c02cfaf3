
import React from 'react';
import { Card } from '@/components/ui/card';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, getDay, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar';
import EventItem from './EventItem';
import { ChevronLeft, ChevronRight, Loader, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteEvent } from '@/services/calendarService';
import EventForm from './EventForm';
import ShareEventDialog from './ShareEventDialog';
import EventTypeLegend from './EventTypeLegend';

interface CalendarViewProps {
  view: 'month' | 'week' | 'day';
  events: CalendarEvent[];
  isLoading?: boolean;
  onEventChange?: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  view, 
  events,
  isLoading = false,
  onEventChange
}) => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [eventFormOpen, setEventFormOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | undefined>(undefined);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [eventToShare, setEventToShare] = React.useState<CalendarEvent | null>(null);
  
  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

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

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: fr });
    const endDate = endOfWeek(monthEnd, { locale: fr });
    
    const dateFormat = "MMMM yyyy";
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold capitalize">
            {format(monthStart, dateFormat, { locale: fr })}
          </h2>
          <div className="flex items-center gap-2">
            <EventTypeLegend />
            <Button variant="outline" size="sm" onClick={handleToday}>Aujourd'hui</Button>
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
              {day}
            </div>
          ))}
          
          {days.map((day, i) => {
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.startTime), day)
            );
            
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[100px] p-1 border relative group",
                  !isSameMonth(day, monthStart) ? "bg-muted/30" : "",
                  isToday(day) ? "bg-blue-50 dark:bg-blue-950/20" : "",
                  "overflow-y-auto"
                )}
                onClick={() => handleAddEvent(day)}
              >
                <div className={cn(
                  "text-right p-1 font-medium text-sm",
                  !isSameMonth(day, monthStart) ? "text-muted-foreground" : "",
                  isToday(day) ? "text-blue-600 dark:text-blue-400" : ""
                )}>
                  {format(day, "d")}
                  <button 
                    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddEvent(day);
                    }}
                  >
                    <Plus className="h-3 w-3 text-primary" />
                  </button>
                </div>
                
                <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                  {dayEvents.map(event => (
                    <EventItem 
                      key={event.id} 
                      event={event} 
                      view="month" 
                      onEdit={handleEditEvent}
                      onDelete={handleDeleteEvent}
                      onShare={handleShareEvent}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate, { locale: fr });
    const endDate = endOfWeek(currentDate, { locale: fr });
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {format(startDate, "d", { locale: fr })} - {format(endDate, "d MMMM yyyy", { locale: fr })}
          </h2>
          <div className="flex items-center gap-2">
            <EventTypeLegend />
            <Button variant="outline" size="sm" onClick={handleToday}>Aujourd'hui</Button>
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div key={i} className="text-center">
              <div className={cn(
                "p-2 font-medium",
                isToday(day) ? "bg-blue-100 dark:bg-blue-950 rounded-md" : ""
              )}>
                <div className="text-xs text-muted-foreground">
                  {format(day, "EEE", { locale: fr })}
                </div>
                <div className={cn(
                  isToday(day) ? "text-blue-600 dark:text-blue-400" : ""
                )}>
                  {format(day, "d")}
                </div>
              </div>
            </div>
          ))}
          
          {days.map((day, i) => {
            const dayEvents = events.filter(event => 
              isSameDay(new Date(event.startTime), day)
            );
            
            return (
              <div 
                key={`events-${i}`} 
                className="space-y-1 min-h-[200px] border p-1 relative group"
                onClick={() => handleAddEvent(day)}
              >
                <button 
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEvent(day);
                  }}
                >
                  <Plus className="h-3 w-3 text-primary" />
                </button>
                
                <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                  {dayEvents.map(event => (
                    <EventItem 
                      key={event.id} 
                      event={event} 
                      view="week" 
                      onEdit={handleEditEvent}
                      onDelete={handleDeleteEvent}
                      onShare={handleShareEvent}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter(event => 
      isSameDay(new Date(event.startTime), currentDate)
    );
    
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
          </h2>
          <div className="flex items-center gap-2">
            <EventTypeLegend />
            <Button variant="outline" size="sm" onClick={handleToday}>Aujourd'hui</Button>
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          {hours.map(hour => {
            const hourEvents = dayEvents.filter(event => {
              const eventHour = new Date(event.startTime).getHours();
              return eventHour === hour;
            });
            
            const hourDate = new Date(currentDate);
            hourDate.setHours(hour, 0, 0, 0);
            
            return (
              <div 
                key={hour} 
                className="flex border-b pb-2 relative group hover:bg-muted/30"
                onClick={() => {
                  const date = new Date(currentDate);
                  date.setHours(hour);
                  handleAddEvent(date);
                }}
              >
                <div className="w-16 text-right pr-4 text-muted-foreground shrink-0">
                  {hour}:00
                </div>
                <div className="flex-1 min-h-[60px]" onClick={(e) => e.stopPropagation()}>
                  {hourEvents.map(event => (
                    <EventItem 
                      key={event.id} 
                      event={event} 
                      view="day"
                      onEdit={handleEditEvent}
                      onDelete={handleDeleteEvent}
                      onShare={handleShareEvent} 
                    />
                  ))}
                </div>
                <button 
                  className="absolute left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    const date = new Date(currentDate);
                    date.setHours(hour);
                    handleAddEvent(date);
                  }}
                >
                  <Plus className="h-3 w-3 text-primary" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-4">
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
      
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
