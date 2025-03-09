
import React from 'react';
import { CalendarEvent, EVENT_TYPES } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { User, MapPin, Clock, Edit, Trash2, Share2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface EventItemProps {
  event: CalendarEvent;
  view: 'month' | 'week' | 'day';
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  onShare?: (event: CalendarEvent) => void;
}

const EventItem: React.FC<EventItemProps> = ({ 
  event, 
  view, 
  onEdit,
  onDelete,
  onShare
}) => {
  const { toast } = useToast();
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const eventTypeInfo = EVENT_TYPES[event.type];
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(event);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(event.id);
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(event);
  };
  
  if (view === 'month') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div 
            className={cn(
              "text-xs px-2 py-1 rounded-sm border-l-2 truncate cursor-pointer hover:opacity-80 group relative",
              eventTypeInfo.color
            )}
          >
            {format(startTime, 'HH:mm')} {event.title}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex space-x-1">
              <button 
                onClick={handleEdit}
                className="p-0.5 rounded-full bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 text-gray-600 dark:text-gray-300"
              >
                <Edit className="h-3 w-3" />
              </button>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="px-2 py-1.5">
            <div className="font-semibold text-sm">{event.title}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
            </div>
            {event.location && (
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location}
              </div>
            )}
            {event.contactName && (
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <User className="h-3 w-3 mr-1" />
                {event.contactName}
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  if (view === 'week') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div 
            className={cn(
              "text-xs px-2 py-1 rounded-sm border-l-2 truncate cursor-pointer hover:opacity-80 group relative",
              eventTypeInfo.color
            )}
          >
            {format(startTime, 'HH:mm')} {event.title}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex space-x-1">
              <button 
                onClick={handleEdit}
                className="p-0.5 rounded-full bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 text-gray-600 dark:text-gray-300"
              >
                <Edit className="h-3 w-3" />
              </button>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="px-2 py-1.5">
            <div className="font-semibold text-sm">{event.title}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
            </div>
            {event.location && (
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location}
              </div>
            )}
            {event.contactName && (
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <User className="h-3 w-3 mr-1" />
                {event.contactName}
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  // Day view
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div 
          className={cn(
            "px-2 py-1 mb-1 rounded border-l-2 hover:opacity-90 cursor-pointer group relative",
            eventTypeInfo.color
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
          <div className="absolute right-2 top-2 hidden group-hover:flex space-x-1">
            <button 
              onClick={handleEdit}
              className="p-0.5 rounded-full bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 text-gray-600 dark:text-gray-300"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive focus:text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventItem;
