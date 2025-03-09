
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent } from '@/types/calendar';
import EventItem from '../EventItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import EventTypeLegend from '../EventTypeLegend';

interface DayViewProps {
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

const DayView: React.FC<DayViewProps> = ({
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
          <Button variant="outline" size="sm" onClick={onToday}>Aujourd'hui</Button>
          <Button variant="outline" size="icon" onClick={onPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNext}>
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
                onAddEvent(date);
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
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                    onShare={onShareEvent} 
                  />
                ))}
              </div>
              <button 
                className="absolute left-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full bg-primary/10 hover:bg-primary/20"
                onClick={(e) => {
                  e.stopPropagation();
                  const date = new Date(currentDate);
                  date.setHours(hour);
                  onAddEvent(date);
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

export default DayView;
