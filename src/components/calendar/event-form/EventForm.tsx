
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { useContacts } from '@/hooks/useContacts';
import { EventFormProps } from './types';
import { useEventForm } from './useEventForm';
import DeleteConfirmation from './DeleteConfirmation';
import EventDetailsFields from './EventDetailsFields';
import EventDateTimeFields from './EventDateTimeFields';
import EventTypeField from './EventTypeField';
import EventContactField from './EventContactField';
import EventReminderFields from './EventReminderFields';
import EventFormActions from './EventFormActions';

const EventForm: React.FC<EventFormProps> = ({ 
  open, 
  onOpenChange, 
  event,
  selectedDate,
  onEventCreated,
  onEventUpdated,
  onEventDeleted
}) => {
  const { contacts } = useContacts();
  
  const {
    form,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    onSubmit,
    handleDelete
  } = useEventForm({
    event,
    selectedDate,
    onEventCreated,
    onEventUpdated,
    onEventDeleted,
    onOpenChange,
    contacts
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CalendarIcon className="h-5 w-5" /> {event ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </DialogTitle>
        </DialogHeader>
        
        {showDeleteConfirmation ? (
          <DeleteConfirmation 
            onCancel={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 event-form">
              <div className="grid md:grid-cols-2 gap-6">
                <EventDetailsFields form={form} />
                
                <EventDateTimeFields form={form} />
                
                <EventTypeField form={form} />
                
                <EventContactField form={form} contacts={contacts} />
                
                <EventReminderFields form={form} />
              </div>
              
              <EventFormActions 
                event={event}
                onOpenChange={onOpenChange}
                onShowDeleteConfirmation={() => setShowDeleteConfirmation(true)}
                onSubmit={form.handleSubmit(onSubmit)}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
