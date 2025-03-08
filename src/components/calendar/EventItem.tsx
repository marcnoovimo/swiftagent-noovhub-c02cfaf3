
import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { User, MapPin, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EventItemProps {
  event: CalendarEvent;
  view: 'month' | 'week' | 'day';
}

const eventColors: Record<CalendarEvent['type'], string> = {
  'appointment': 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-800 dark:text-blue-200',
  'meeting': 'bg-purple-100 dark:bg-purple-900 border-purple-500 text-purple-800 dark:text-purple-200',
  'showing': 'bg-orange-100 dark:bg-orange-900 border-orange-500 text-orange-800 dark:text-orange-200',
  'personal': 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200',
  'other': 'bg-gray-100 dark:bg-gray-800 border-gray-500 text-gray-800 dark:text-gray-200',
};

const EventItem: React.FC<EventItemProps> = ({ event, view }) => {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  
  if (view === 'month') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn(
                "text-xs px-2 py-1 rounded-sm border-l-2 truncate cursor-pointer hover:opacity-80",
                eventColors[event.type]
              )}
            >
              {format(startTime, 'HH:mm')} {event.title}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 p-1">
              <div className="font-medium">{event.title}</div>
              <div className="flex items-center text-xs gap-1">
                <Clock className="h-3 w-3" />
                {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
              </div>
              {event.location && (
                <div className="flex items-center text-xs gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              )}
              {event.contactId && (
                <div className="flex items-center text-xs gap-1">
                  <User className="h-3 w-3" />
                  {event.contactName || 'Contact'}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  if (view === 'week') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn(
                "text-xs px-2 py-1 rounded-sm border-l-2 truncate cursor-pointer hover:opacity-80",
                eventColors[event.type]
              )}
            >
              {format(startTime, 'HH:mm')} {event.title}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 p-1">
              <div className="font-medium">{event.title}</div>
              <div className="flex items-center text-xs gap-1">
                <Clock className="h-3 w-3" />
                {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
              </div>
              {event.location && (
                <div className="flex items-center text-xs gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              )}
              {event.contactId && (
                <div className="flex items-center text-xs gap-1">
                  <User className="h-3 w-3" />
                  {event.contactName || 'Contact'}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Day view
  return (
    <div 
      className={cn(
        "px-2 py-1 mb-1 rounded border-l-2 hover:opacity-90 cursor-pointer",
        eventColors[event.type]
      )}
    >
      <div className="font-medium">{event.title}</div>
      <div className="flex items-center text-xs gap-1 mt-1">
        <Clock className="h-3 w-3" />
        {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
      </div>
      {event.location && (
        <div className="flex items-center text-xs gap-1 mt-1">
          <MapPin className="h-3 w-3" />
          {event.location}
        </div>
      )}
      {event.contactId && (
        <div className="flex items-center text-xs gap-1 mt-1">
          <User className="h-3 w-3" />
          {event.contactName || 'Contact'}
        </div>
      )}
    </div>
  );
};

export default EventItem;
