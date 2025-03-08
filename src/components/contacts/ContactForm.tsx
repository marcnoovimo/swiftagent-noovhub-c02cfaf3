
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Contact } from '@/types/contact';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Mail, Phone, Building, MapPin, Briefcase, Tag, Image, Save, X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const contactFormSchema = z.object({
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

// Important: Make this type match the Contact type without id/createdAt/updatedAt
type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC<ContactFormProps> = ({ 
  open, 
  onOpenChange,
  onSave
}) => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      emailPro: '',
      phone: '',
      mobile: '',
      company: '',
      position: '',
      address: '',
      city: '',
      notes: '',
      category: 'prospect',
      tags: [],
      source: 'manual',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // Convert form values to the expected Contact type (without id/createdAt/updatedAt)
    const contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || undefined,
      emailPro: data.emailPro || undefined,
      phone: data.phone,
      mobile: data.mobile,
      company: data.company,
      position: data.position,
      address: data.address,
      city: data.city,
      notes: data.notes,
      category: data.category,
      tags: data.tags,
      source: data.source,
      photo: data.photo,
    };
    
    onSave?.(contactData);
    
    toast({
      title: "Contact créé",
      description: `${data.firstName} ${data.lastName} a été ajouté au répertoire.`,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" /> Nouveau contact
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Photo upload placeholder */}
              <div className="md:col-span-2 flex justify-center">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              
              {/* Informations personnelles */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom*</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom*</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email personnel</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="jean.dupont@gmail.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emailPro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email professionnel</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="j.dupont@entreprise.fr" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone fixe</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="01 23 45 67 89" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone mobile</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="06 12 34 56 78" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Informations professionnelles */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Société</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Building className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="Entreprise SAS" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poste</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Briefcase className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="Directeur Commercial" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="15 rue de Paris" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                        <Input placeholder="Paris" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="partner">Partenaire</SelectItem>
                        <SelectItem value="notary">Notaire</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Informations complémentaires sur ce contact..." 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
