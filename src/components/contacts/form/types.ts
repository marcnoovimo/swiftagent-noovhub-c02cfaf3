
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal('')),
  emailPro: z.string().email("Email professionnel invalide").optional().or(z.literal('')),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
  category: z.enum(['client', 'partner', 'prospect', 'notary', 'agent', 'other']),
  tags: z.array(z.string()).optional(),
  source: z.enum(['manual', 'import', 'scan', 'sync']).default('manual'),
  photo: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
