
import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { CalendarView } from './hooks/useCalendarNavigation';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';

interface CalendarViewContentProps {
  view: CalendarView;
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

const CalendarViewContent: React.FC<CalendarViewContentProps> = ({
  view,
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
  // Render the appropriate view based on the current view state
  switch (view) {
    case 'month':
      return (
        <MonthView
          currentDate={currentDate}
          events={events}
          onPrevious={onPrevious}
          onNext={onNext}
          onToday={onToday}
          onAddEvent={onAddEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          onShareEvent={onShareEvent}
        />
      );
    
    case 'week':
      return (
        <WeekView
          currentDate={currentDate}
          events={events}
          onPrevious={onPrevious}
          onNext={onNext}
          onToday={onToday}
          onAddEvent={onAddEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          onShareEvent={onShareEvent}
        />
      );
    
    case 'day':
      return (
        <DayView
          currentDate={currentDate}
          events={events}
          onPrevious={onPrevious}
          onNext={onNext}
          onToday={onToday}
          onAddEvent={onAddEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          onShareEvent={onShareEvent}
        />
      );
    
    default:
      return null;
  }
};

export default CalendarViewContent;
