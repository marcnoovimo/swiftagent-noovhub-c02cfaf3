
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { CalendarClock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const GoogleCalendarSync: React.FC = () => {
  const { syncEvents } = useCalendarEvents();

  const handleSync = async () => {
    await syncEvents();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={handleSync}
          >
            <CalendarClock className="h-4 w-4" />
            <span className="hidden sm:inline">Synchroniser</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Synchroniser avec Google Calendar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GoogleCalendarSync;
