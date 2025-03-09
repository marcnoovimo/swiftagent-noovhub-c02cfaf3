
import { useState } from 'react';
import { addMonths, subMonths, addDays } from 'date-fns';

export type CalendarView = 'month' | 'week' | 'day';

export function useCalendarNavigation(initialView: CalendarView = 'month') {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);

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

  return {
    currentDate,
    setCurrentDate,
    view,
    setView,
    handlePrevious,
    handleNext,
    handleToday
  };
}
