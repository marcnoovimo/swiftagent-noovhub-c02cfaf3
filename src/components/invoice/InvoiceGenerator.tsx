import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Check, Download, FileText, Plus, Trash } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schéma de validation pour le formulaire de facture
const invoiceSchema = z.object({
  clientName: z.string().min(1, { message: 'Le nom du client est requis' }),
  clientAddress: z.string().min(1, { message: 'L\'adresse du client est requise' }),
  invoiceNumber: z.string().min(1, { message: 'Le numéro de facture est requis' }),
  invoiceDate: z.string().min(1, { message: 'La date de facture est requise' }),
  dueDate: z.string().min(1, { message: 'La date d\'échéance est requise' }),
  items: z.array(z.object({
    description: z.string().min(1, { message: 'La description est requise' }),
    quantity: z.number().min(1, { message: 'La quantité doit être au moins 1' }),
    unitPrice: z.number().min(0, { message: 'Le prix unitaire doit être positif' }),
  })).min(1, { message: 'Au moins un article est requis' }),
  notes: z.string().optional(),
  paymentMethod: z.string().min(1, { message: 'La méthode de paiement est requise' }),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Initialisation du formulaire avec des valeurs par défaut
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: '',
      clientAddress: '',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
      notes: '',
      paymentMethod: 'bank_transfer',
    },
  });
  
  const items = watch('items');
  
  // Calcul du total de la facture
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };
  
  // Ajout d'un nouvel article
  const addItem = () => {
    setValue('items', [...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };
  
  // Suppression d'un article
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setValue('items', items.filter((_, i) => i !== index));
    }
  };
  
  // Soumission du formulaire
  const onSubmit = (data: InvoiceFormValues) => {
    setIsGenerating(true);
    
    // Simulation de génération de facture
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Facture générée avec succès",
        description: `La facture ${data.invoiceNumber} a été générée et est prête à être téléchargée.`,
        variant: "outline",
      });
    }, 1500);
    
    console.log('Données de la facture:', data);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Générateur de facture</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations client</h3>
              
              <div className="space-y-2">
                <Label htmlFor="clientName">Nom du client</Label>
                <Controller
                  name="clientName"
                  control={control}
                  render={({ field }) => (
                    <Input id="clientName" {...field} placeholder="Nom complet du client" />
                  )}
                />
                {errors.clientName && (
                  <p className="text-sm text-red-500">{errors.clientName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Adresse du client</Label>
                <Controller
                  name="clientAddress"
                  control={control}
                  render={({ field }) => (
                    <Textarea id="clientAddress" {...field} placeholder="Adresse complète" />
                  )}
                />
                {errors.clientAddress && (
                  <p className="text-sm text-red-500">{errors.clientAddress.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Détails de la facture</h3>
              
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Numéro de facture</Label>
                <Controller
                  name="invoiceNumber"
                  control={control}
                  render={({ field }) => (
                    <Input id="invoiceNumber" {...field} />
                  )}
                />
                {errors.invoiceNumber && (
                  <p className="text-sm text-red-500">{errors.invoiceNumber.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate">Date de facture</Label>
                  <Controller
                    name="invoiceDate"
                    control={control}
                    render={({ field }) => (
                      <Input id="invoiceDate" type="date" {...field} />
                    )}
                  />
                  {errors.invoiceDate && (
                    <p className="text-sm text-red-500">{errors.invoiceDate.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <Input id="dueDate" type="date" {...field} />
                    )}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Articles</h3>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un article
              </Button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-6 space-y-2">
                  <Label htmlFor={`items.${index}.description`}>Description</Label>
                  <Controller
                    name={`items.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Input id={`items.${index}.description`} {...field} />
                    )}
                  />
                  {errors.items?.[index]?.description && (
                    <p className="text-sm text-red-500">{errors.items[index]?.description?.message}</p>
                  )}
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor={`items.${index}.quantity`}>Quantité</Label>
                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`items.${index}.quantity`}
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    )}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-sm text-red-500">{errors.items[index]?.quantity?.message}</p>
                  )}
                </div>
                
                <div className="col-span-3 space-y-2">
                  <Label htmlFor={`items.${index}.unitPrice`}>Prix unitaire (€)</Label>
                  <Controller
                    name={`items.${index}.unitPrice`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`items.${index}.unitPrice`}
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    )}
                  />
                  {errors.items?.[index]?.unitPrice && (
                    <p className="text-sm text-red-500">{errors.items[index]?.unitPrice?.message}</p>
                  )}
                </div>
                
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={items.length <= 1}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <div className="w-1/3 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{calculateTotal().toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea id="notes" {...field} placeholder="Informations supplémentaires, conditions de paiement, etc." />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Méthode de paiement</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Sélectionner une méthode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                      <SelectItem value="credit_card">Carte de crédit</SelectItem>
                      <SelectItem value="check">Chèque</SelectItem>
                      <SelectItem value="cash">Espèces</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentMethod && (
                <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <>Génération en cours...</>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Générer la facture
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceGenerator;
