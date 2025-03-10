
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Save } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';

interface EventFormActionsProps {
  event?: CalendarEvent;
  onOpenChange: (open: boolean) => void;
  onShowDeleteConfirmation: () => void;
  onSubmit: () => void;
}

const EventFormActions: React.FC<EventFormActionsProps> = ({ 
  event, 
  onOpenChange, 
  onShowDeleteConfirmation,
  onSubmit
}) => {
  return (
    <div className="flex justify-between gap-2">
      {event && (
        <Button 
          type="button" 
          variant="destructive" 
          onClick={onShowDeleteConfirmation}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" /> Supprimer
        </Button>
      )}
      <div className="flex justify-end gap-2 ml-auto">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onOpenChange(false)}
          className="flex items-center gap-2 bg-white dark:bg-gray-950"
        >
          <X className="h-4 w-4" /> Annuler
        </Button>
        <Button 
          type="submit" 
          className="flex items-center gap-2"
          onClick={onSubmit}
        >
          <Save className="h-4 w-4" /> Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default EventFormActions;
