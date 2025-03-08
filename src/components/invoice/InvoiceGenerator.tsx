
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Check, XCircle, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { InvoiceService } from '@/services/invoiceService';
import { InvoiceData } from '@/types/commission';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const InvoiceGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const { data: invoices, isLoading, refetch } = useQuery({
    queryKey: ['agentInvoices', user?.id],
    queryFn: () => InvoiceService.getAgentInvoices(user?.id || ''),
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmitInvoice = async (invoiceId: string) => {
    setLoading(invoiceId);
    try {
      await InvoiceService.submitInvoice(invoiceId);
      toast({
        title: "Facture soumise",
        description: "Votre facture a été soumise pour validation.",
      });
      refetch();
    } catch (error) {
      console.error('Error submitting invoice:', error);
      toast({
        title: "Erreur",
        description: "Impossible de soumettre la facture. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDownloadInvoice = async (invoice: InvoiceData) => {
    setLoading(invoice.id);
    try {
      // Dans une vraie application, nous appellerions une API pour générer le PDF
      // Pour cette démonstration, nous affichons simplement un message de succès
      toast({
        title: "Téléchargement réussi",
        description: `Facture pour ${invoice.propertyAddress} téléchargée.`,
      });
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la facture. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: InvoiceData['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'submitted':
        return <Badge variant="secondary">Soumise</Badge>;
      case 'approved':
        return <Badge variant="default">Approuvée</Badge>;
      case 'paid':
        return <Badge variant="success" className="bg-green-500">Payée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Factures</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Gestion des factures
        </CardTitle>
        <CardDescription>
          Générez et suivez vos factures d'honoraires
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invoices && invoices.length > 0 ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Client</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.clientName}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{invoice.propertyAddress}</TableCell>
                      <TableCell className="text-right">{formatCurrency(invoice.commissionAmount)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDownloadInvoice(invoice)}
                            disabled={loading === invoice.id}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          
                          {invoice.status === 'draft' && (
                            <Button
                              variant="default"
                              size="icon"
                              onClick={() => handleSubmitInvoice(invoice.id)}
                              disabled={loading === invoice.id}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <p className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Les factures sont automatiquement générées à chaque transaction finalisée.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg">Aucune facture disponible</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              Les factures seront automatiquement générées à chaque nouvelle transaction finalisée.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceGenerator;
