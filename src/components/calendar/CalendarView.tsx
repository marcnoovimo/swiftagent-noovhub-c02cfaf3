
import React from 'react';
import { Card } from '@/components/ui/card';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, getDay, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CalendarEvent } from '@/types/calendar';
import EventItem from './EventItem';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarViewProps {
  view: 'month' | 'week' | 'day';
  events: CalendarEvent[];
  isLoading?: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  view, 
  events,
  isLoading = false
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
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
                  "min-h-[100px] p-1 border",
                  !isSameMonth(day, monthStart) ? "bg-muted/30" : "",
                  isToday(day) ? "bg-blue-50 dark:bg-blue-950/20" : "",
                  "overflow-y-auto"
                )}
              >
                <div className={cn(
                  "text-right p-1 font-medium text-sm",
                  !isSameMonth(day, monthStart) ? "text-muted-foreground" : "",
                  isToday(day) ? "text-blue-600 dark:text-blue-400" : ""
                )}>
                  {format(day, "d")}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <EventItem key={event.id} event={event} view="month" />
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
              <div key={`events-${i}`} className="space-y-1 min-h-[200px] border p-1">
                {dayEvents.map(event => (
                  <EventItem key={event.id} event={event} view="week" />
                ))}
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
            
            return (
              <div key={hour} className="flex border-b pb-2">
                <div className="w-16 text-right pr-4 text-muted-foreground">
                  {hour}:00
                </div>
                <div className="flex-1 min-h-[60px]">
                  {hourEvents.map(event => (
                    <EventItem key={event.id} event={event} view="day" />
                  ))}
                </div>
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
    </Card>
  );
};

export default CalendarView;
