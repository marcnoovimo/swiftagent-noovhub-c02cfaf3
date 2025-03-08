import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

const InvoiceGenerator: React.FC = () => {
  const { toast } = useToast();
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(Math.random() * 10000)}`);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);
  const [paymentTerms, setPaymentTerms] = useState('30');
  const [notes, setNotes] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index][field] = Number(value);
    } else {
      newItems[index][field as 'description'] = value as string;
    }
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.2; // 20% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleDownloadPDF = () => {
    if (!clientName) {
      toast({
        title: "Information manquante",
        description: "Veuillez saisir le nom du client.",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      
      // Add company info
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.text('NOOVIMO', 20, 20);
      
      doc.setFontSize(10);
      doc.text('123 Avenue des Immobiliers', 20, 30);
      doc.text('75000 Paris, France', 20, 35);
      doc.text('Email: contact@noovimo.fr', 20, 40);
      doc.text('Tel: +33 1 23 45 67 89', 20, 45);
      
      // Add invoice details
      doc.setFontSize(16);
      doc.text('FACTURE', 150, 20);
      
      doc.setFontSize(10);
      doc.text(`Numéro: ${invoiceNumber}`, 150, 30);
      doc.text(`Date: ${invoiceDate}`, 150, 35);
      doc.text(`Échéance: ${paymentTerms} jours`, 150, 40);
      
      // Add client info
      doc.setFontSize(12);
      doc.text('Facturer à:', 20, 60);
      
      doc.setFontSize(10);
      doc.text(clientName, 20, 65);
      const addressLines = clientAddress.split('\n');
      addressLines.forEach((line, index) => {
        doc.text(line, 20, 70 + (index * 5));
      });
      
      // Add items table
      const tableColumn = ["Description", "Quantité", "Prix unitaire", "Total"];
      const tableRows = items.map(item => [
        item.description,
        item.quantity.toString(),
        formatCurrency(item.unitPrice),
        formatCurrency(item.quantity * item.unitPrice)
      ]);
      
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 90,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185] }
      });
      
      // Add totals
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      
      doc.text('Sous-total:', 140, finalY);
      doc.text(formatCurrency(calculateSubtotal()), 170, finalY);
      
      doc.text('TVA (20%):', 140, finalY + 5);
      doc.text(formatCurrency(calculateTax()), 170, finalY + 5);
      
      doc.setFontSize(12);
      doc.text('Total:', 140, finalY + 15);
      doc.text(formatCurrency(calculateTotal()), 170, finalY + 15);
      
      // Add notes
      if (notes) {
        doc.setFontSize(10);
        doc.text('Notes:', 20, finalY + 30);
        doc.text(notes, 20, finalY + 35);
      }
      
      // Add footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text('Merci pour votre confiance.', 20, 280);
        doc.text(`Page ${i} sur ${pageCount}`, 170, 280);
      }
      
      // Save the PDF
      doc.save(`Facture_${invoiceNumber}.pdf`);
      
      toast({
        title: "Succès",
        description: "Votre facture a été téléchargée avec succès.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Générateur de facture</CardTitle>
          <CardDescription>Créez et téléchargez des factures professionnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoiceNumber">Numéro de facture</Label>
                <Input 
                  id="invoiceNumber" 
                  value={invoiceNumber} 
                  onChange={(e) => setInvoiceNumber(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="invoiceDate">Date de facture</Label>
                <Input 
                  id="invoiceDate" 
                  type="date" 
                  value={invoiceDate} 
                  onChange={(e) => setInvoiceDate(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">Conditions de paiement</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une échéance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Paiement immédiat</SelectItem>
                    <SelectItem value="15">15 jours</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="60">60 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientName">Nom du client</Label>
                <Input 
                  id="clientName" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="clientAddress">Adresse du client</Label>
                <Textarea 
                  id="clientAddress" 
                  rows={3} 
                  value={clientAddress} 
                  onChange={(e) => setClientAddress(e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Articles</h3>
              <Button variant="outline" size="sm" onClick={addItem}>Ajouter un article</Button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-6">
                  <Input 
                    placeholder="Description" 
                    value={item.description} 
                    onChange={(e) => updateItem(index, 'description', e.target.value)} 
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    placeholder="Quantité" 
                    value={item.quantity} 
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)} 
                  />
                </div>
                <div className="col-span-3">
                  <Input 
                    type="number" 
                    placeholder="Prix unitaire" 
                    value={item.unitPrice} 
                    onChange={(e) => updateItem(index, 'unitPrice', e.target.value)} 
                  />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex flex-col items-end mt-4 space-y-1">
              <div className="flex justify-between w-64">
                <span>Sous-total:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between w-64">
                <span>TVA (20%):</span>
                <span>{formatCurrency(calculateTax())}</span>
              </div>
              <div className="flex justify-between w-64 font-bold">
                <span>Total:</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Informations complémentaires, conditions, etc." 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>Aperçu</Button>
          <Button variant="default" onClick={handleDownloadPDF} disabled={isDownloading}>
            {isDownloading ? "Téléchargement..." : "Télécharger PDF"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvoiceGenerator;
