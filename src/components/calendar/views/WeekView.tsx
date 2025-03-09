
import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar';
import EventItem from '../EventItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import EventTypeLegend from '../EventTypeLegend';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onAddEvent: (date: Date) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  onShareEvent: (event: CalendarEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onPrevious,
  onNext,
  onToday,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onShareEvent
}) => {
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
          <Button variant="outline" size="sm" onClick={onToday}>Aujourd'hui</Button>
          <Button variant="outline" size="icon" onClick={onPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNext}>
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
              onClick={() => onAddEvent(day)}
            >
              <button 
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddEvent(day);
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
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                    onShare={onShareEvent}
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

export default WeekView;
