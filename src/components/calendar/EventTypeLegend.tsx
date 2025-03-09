
import React from 'react';
import { EVENT_TYPES } from '@/types/calendar';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventTypeLegend = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
          <HelpCircle size={16} />
          <span className="hidden sm:inline">Légende</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end">
        <h4 className="text-sm font-medium mb-2">Types d'évènements</h4>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(EVENT_TYPES).map(([type, info]) => (
            <div key={type} className="flex items-center gap-2">
              <div 
                className={cn(
                  "w-4 h-4 rounded-sm border-l-2",
                  info.color.split(' ')[0],
                  info.color.split(' ')[3]
                )} 
              />
              <span className="text-sm">{info.label}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EventTypeLegend;
