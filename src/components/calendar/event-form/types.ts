
import { CalendarEvent } from "@/types/calendar";
import { z } from "zod";

export const eventSchema = z.object({
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

export type EventFormValues = z.infer<typeof eventSchema>;

export interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent;
  selectedDate?: Date;
  onEventCreated?: () => void;
  onEventUpdated?: () => void;
  onEventDeleted?: () => void;
}
