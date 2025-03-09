
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, getDay, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar';
import EventItem from '../EventItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import EventTypeLegend from '../EventTypeLegend';

interface MonthViewProps {
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

const MonthView: React.FC<MonthViewProps> = ({
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
          <Button variant="outline" size="sm" onClick={onToday}>Aujourd'hui</Button>
          <Button variant="outline" size="icon" onClick={onPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNext}>
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
              onClick={() => onAddEvent(day)}
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
                    onAddEvent(day);
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

export default MonthView;
