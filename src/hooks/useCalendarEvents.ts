
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarEvent } from '@/types/calendar';
import { fetchEvents, syncWithGoogleCalendar } from '@/services/calendarService';
import { useToast } from '@/hooks/use-toast';

export const useCalendarEvents = () => {
  const { toast } = useToast();
  
  const { 
    data: events, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: fetchEvents,
  });

  const syncEvents = async () => {
    try {
      await syncWithGoogleCalendar();
      refetch();
      toast({
        title: "Synchronisation réussie",
        description: "Vos événements ont été synchronisés avec Google Calendar",
      });
      return true;
    } catch (error) {
      console.error('Error syncing events:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser avec Google Calendar",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    events,
    isLoading,
    error,
    refetch,
    syncEvents
  };
};
