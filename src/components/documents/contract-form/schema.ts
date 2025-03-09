
import { z } from 'zod';

// Schéma de validation pour les données du formulaire
export const contractFormSchema = z.object({
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

export type ContractFormValues = z.infer<typeof contractFormSchema>;

export interface ContractFormProps {
  initialData?: Partial<ContractFormValues>;
  onSubmit: (data: ContractFormValues) => void;
}
