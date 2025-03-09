
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin, User, X, Save, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarEvent, EVENT_TYPES } from '@/types/calendar';
import { addEvent, updateEvent, deleteEvent } from '@/services/calendarService';
import { useToast } from '@/hooks/use-toast';
import { useContacts } from '@/hooks/useContacts';
import { Contact } from '@/types/contact';

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
  onEventCreated?: () => void;
  onEventUpdated?: () => void;
  onEventDeleted?: () => void;
}

const eventSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "La date de début est requise",
  }),
  startTime: z.string().min(1, "L'heure de début est requise"),
  endTime: z.string().min(1, "L'heure de fin est requise"),
  location: z.string().optional(),
  type: z.enum(['appointment', 'meeting', 'showing', 'personal', 'prospecting', 'administrative', 'other', 'signature']),
  contactId: z.string().optional(),
  sendReminder: z.boolean().default(false),
  reminderType: z.enum(['email', 'sms', 'whatsapp']).optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

const EventForm: React.FC<EventFormProps> = ({ 
  open, 
  onOpenChange, 
  event,
  selectedDate,
  onEventCreated,
  onEventUpdated,
  onEventDeleted
}) => {
  const { toast } = useToast();
  const { contacts } = useContacts();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startDate: event ? new Date(event.startTime) : selectedDate || new Date(),
      startTime: event ? format(new Date(event.startTime), 'HH:mm') : '09:00',
      endTime: event ? format(new Date(event.endTime), 'HH:mm') : '10:00',
      location: event?.location || '',
      type: event?.type || 'appointment',
      contactId: event?.contactId || undefined,
      sendReminder: event?.reminder ? true : false,
      reminderType: event?.reminderType || 'email',
    },
  });

  const onSubmit = async (values: EventFormValues) => {
    try {
      const [startHour, startMinute] = values.startTime.split(':').map(Number);
      const [endHour, endMinute] = values.endTime.split(':').map(Number);
      
      const startDate = new Date(values.startDate);
      startDate.setHours(startHour, startMinute, 0);
      
      const endDate = new Date(values.startDate);
      endDate.setHours(endHour, endMinute, 0);
      
      // If end time is before start time, it must be the next day
      if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      const selectedContact = values.contactId ? 
        contacts?.find((c: Contact) => c.id === values.contactId) : undefined;
      
      if (event) {
        // Update existing event
        const updatedEvent: CalendarEvent = {
          ...event,
          title: values.title,
          description: values.description,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          location: values.location,
          type: values.type,
          contactId: values.contactId,
          contactName: selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : undefined,
          reminder: values.sendReminder,
          reminderType: values.sendReminder ? values.reminderType : undefined,
          updatedAt: new Date().toISOString(),
        };
        
        await updateEvent(updatedEvent);
        
        toast({
          title: "Rendez-vous modifié",
          description: `Le rendez-vous "${values.title}" a été mis à jour`,
        });
        
        if (onEventUpdated) onEventUpdated();
      } else {
        // Create new event
        const newEvent: Omit<CalendarEvent, 'id'> = {
          title: values.title,
          description: values.description,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          location: values.location,
          type: values.type,
          contactId: values.contactId,
          contactName: selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : undefined,
          reminder: values.sendReminder,
          reminderType: values.sendReminder ? values.reminderType : undefined,
          createdAt: new Date().toISOString(),
        };
        
        await addEvent(newEvent);
        
        toast({
          title: "Rendez-vous créé",
          description: `Le rendez-vous "${values.title}" a été ajouté à votre agenda`,
        });
        
        if (onEventCreated) onEventCreated();
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating/updating event:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création/modification du rendez-vous",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    
    try {
      await deleteEvent(event.id);
      
      toast({
        title: "Rendez-vous supprimé",
        description: `Le rendez-vous "${event.title}" a été supprimé de votre agenda`,
      });
      
      if (onEventDeleted) onEventDeleted();
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du rendez-vous",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CalendarIcon className="h-5 w-5" /> {event ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </DialogTitle>
        </DialogHeader>
        
        {showDeleteConfirmation ? (
          <div className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Confirmer la suppression</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Annuler
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
              >
                Supprimer définitivement
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre du rendez-vous" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            locale={fr}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Event Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de rendez-vous" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(EVENT_TYPES).map(([type, info]) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <div className={cn("w-3 h-3 rounded-sm", info.color.split(' ')[0])} />
                                <span>{info.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heure de début</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* End Time */}
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heure de fin</FormLabel>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Lieu</FormLabel>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Lieu du rendez-vous" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Contact */}
                <FormField
                  control={form.control}
                  name="contactId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Contact associé</FormLabel>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un contact" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contacts?.map((contact: Contact) => (
                              <SelectItem key={contact.id} value={contact.id}>
                                {contact.firstName} {contact.lastName} {contact.company ? `(${contact.company})` : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description du rendez-vous" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Reminder */}
                <FormField
                  control={form.control}
                  name="sendReminder"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Envoyer un rappel</FormLabel>
                    </FormItem>
                  )}
                />
                
                {/* Reminder Type - Only show if sendReminder is true */}
                {form.watch('sendReminder') && (
                  <FormField
                    control={form.control}
                    name="reminderType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de rappel</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type de rappel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-between gap-2">
                {event && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={() => setShowDeleteConfirmation(true)}
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
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" /> Annuler
                  </Button>
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Enregistrer
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
