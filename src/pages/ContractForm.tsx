
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { fr } from "date-fns/locale";
import { toast } from 'sonner';

// Schéma de validation pour les données du formulaire (identique à celui du ContractFormDialog)
const contractFormSchema = z.object({
  sellerName: z.string().min(2, "Le nom du vendeur est requis"),
  buyerName: z.string().min(2, "Le nom de l'acquéreur est requis"),
  propertyAddress: z.string().min(5, "L'adresse du bien est requise"),
  agentFees: z.string().min(1, "Les honoraires sont requis"),
  preliminaryContractDate: z.date({
    required_error: "La date de l'avant-contrat est requise",
  }),
  finalActDate: z.date({
    required_error: "La date prévue de l'acte est requise",
  }),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

const ContractForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      sellerName: '',
      buyerName: '',
      propertyAddress: '',
      agentFees: '',
      preliminaryContractDate: new Date(),
      finalActDate: new Date(),
    },
  });

  const onSubmit = (data: ContractFormValues) => {
    try {
      // Envoyer les données à la fenêtre parente si possible
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'CONTRACT_FORM_DATA', data }, '*');
      }
      
      // Afficher un message de succès
      toast.success("Informations de l'avant-contrat sauvegardées");
      setFormSubmitted(true);
      
      // Fermer la fenêtre après un court délai
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde des informations");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Informations de l'avant-contrat</h1>
      
      {formSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <p className="text-green-700">Informations enregistrées avec succès!</p>
          <p className="text-sm text-green-600 mt-2">Cette fenêtre va se fermer automatiquement...</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sellerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du vendeur</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom et prénom du vendeur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'acquéreur</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom et prénom de l'acquéreur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="propertyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du bien</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse complète du bien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agentFees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Honoraires agent</FormLabel>
                  <FormControl>
                    <Input placeholder="Montant des honoraires" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="preliminaryContractDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de l'avant-contrat</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="finalActDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date prévue de l'acte</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.close()}
              >
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ContractForm;
