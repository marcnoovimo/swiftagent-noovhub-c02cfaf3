
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn, formatDate } from '@/lib/utils';
import { fr } from "date-fns/locale";

// Schéma de validation pour les données du formulaire
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

interface ContractFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (data: ContractFormValues) => void;
  initialData?: Partial<ContractFormValues>;
  fromScannedDocument?: boolean;
}

const ContractFormDialog: React.FC<ContractFormDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  fromScannedDocument = false
}) => {
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      sellerName: initialData?.sellerName || '',
      buyerName: initialData?.buyerName || '',
      propertyAddress: initialData?.propertyAddress || '',
      agentFees: initialData?.agentFees || '',
      preliminaryContractDate: initialData?.preliminaryContractDate || new Date(),
      finalActDate: initialData?.finalActDate || new Date(),
    },
  });

  const onSubmit = (data: ContractFormValues) => {
    try {
      if (onSuccess) {
        onSuccess(data);
      }
      
      toast.success("Informations de l'avant-contrat sauvegardées");
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde des informations");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {fromScannedDocument 
              ? "Compléter les informations du document numérisé" 
              : "Remplir les informations de l'avant-contrat"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractFormDialog;
