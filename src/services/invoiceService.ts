
import { InvoiceData, RevenueRecord } from '@/types/commission';
import { CommissionService } from './commissionService';
import { NotificationService } from './notificationService';

// Données fictives pour les factures
let invoices: InvoiceData[] = [
  {
    id: "inv1",
    agentId: "1",
    agentName: "Agent Test",
    revenueId: "rev1",
    amount: 250000,
    commissionAmount: 7500,
    commissionRate: 3,
    status: 'draft',
    propertyAddress: "123 Rue de Paris, 75001 Paris",
    clientName: "Jean Dupont",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "inv2",
    agentId: "1",
    agentName: "Agent Test",
    revenueId: "rev2",
    amount: 180000,
    commissionAmount: 5400,
    commissionRate: 3,
    status: 'submitted',
    propertyAddress: "45 Avenue des Fleurs, 69000 Lyon",
    clientName: "Marie Martin",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv3",
    agentId: "1",
    agentName: "Agent Test",
    revenueId: "rev3",
    amount: 320000,
    commissionAmount: 9600,
    commissionRate: 3,
    status: 'approved',
    propertyAddress: "8 Boulevard de la Mer, 06000 Nice",
    clientName: "Pierre Durand",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv4",
    agentId: "1",
    agentName: "Agent Test",
    revenueId: "rev4",
    amount: 420000,
    commissionAmount: 12600,
    commissionRate: 3,
    status: 'paid',
    propertyAddress: "15 Rue du Commerce, 33000 Bordeaux",
    clientName: "Sophie Lefebvre",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    paidAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const InvoiceService = {
  // Obtenir les factures d'un agent
  getAgentInvoices: (agentId: string): Promise<InvoiceData[]> => {
    const agentInvoices = invoices.filter(invoice => invoice.agentId === agentId);
    return Promise.resolve(agentInvoices);
  },
  
  // Créer une facture à partir d'une transaction
  createInvoice: async (revenue: RevenueRecord, agentName: string): Promise<InvoiceData> => {
    // Calculer le taux de commission de l'agent
    const agentCommission = await CommissionService.getAgentCommission(revenue.agentId);
    if (!agentCommission) {
      throw new Error("Agent commission not found");
    }
    
    const commissionRate = agentCommission.currentPercentage;
    const commissionAmount = revenue.amount * (commissionRate / 100);
    
    const newInvoice: InvoiceData = {
      id: `inv${invoices.length + 1}`,
      agentId: revenue.agentId,
      agentName,
      revenueId: revenue.id,
      amount: revenue.amount,
      commissionAmount,
      commissionRate,
      status: 'draft',
      propertyAddress: revenue.propertyAddress || "Adresse non spécifiée",
      clientName: revenue.clientName || "Client non spécifié",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    invoices.push(newInvoice);
    
    // Créer une notification pour l'agent
    await NotificationService.createNotification({
      userId: revenue.agentId,
      type: 'invoice_submitted',
      title: 'Nouvelle facture générée',
      message: `Une facture a été générée pour la transaction à ${newInvoice.propertyAddress}.`,
      data: { invoiceId: newInvoice.id }
    });
    
    return Promise.resolve(newInvoice);
  },
  
  // Soumettre une facture pour validation
  submitInvoice: async (invoiceId: string): Promise<InvoiceData> => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    
    // Mettre à jour le statut
    invoice.status = 'submitted';
    invoice.updatedAt = new Date().toISOString();
    
    // Créer une notification pour l'agent
    await NotificationService.createNotification({
      userId: invoice.agentId,
      type: 'invoice_submitted',
      title: 'Facture soumise',
      message: `Votre facture pour ${invoice.propertyAddress} a été soumise pour validation.`,
      data: { invoiceId: invoice.id }
    });
    
    // Dans un vrai système, on créerait aussi une notification pour le siège
    
    return Promise.resolve(invoice);
  },
  
  // Approuver une facture (simulé, normalement fait par le siège)
  approveInvoice: async (invoiceId: string): Promise<InvoiceData> => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    
    // Mettre à jour le statut
    invoice.status = 'approved';
    invoice.updatedAt = new Date().toISOString();
    
    // Créer une notification pour l'agent
    await NotificationService.createNotification({
      userId: invoice.agentId,
      type: 'invoice_approved',
      title: 'Facture approuvée',
      message: `Votre facture pour ${invoice.propertyAddress} a été approuvée.`,
      data: { invoiceId: invoice.id }
    });
    
    return Promise.resolve(invoice);
  },
  
  // Marquer une facture comme payée (simulé, normalement fait par le siège)
  markAsPaid: async (invoiceId: string): Promise<InvoiceData> => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    
    // Mettre à jour le statut
    invoice.status = 'paid';
    invoice.updatedAt = new Date().toISOString();
    invoice.paidAt = new Date().toISOString();
    
    // Créer une notification pour l'agent
    await NotificationService.createNotification({
      userId: invoice.agentId,
      type: 'invoice_paid',
      title: 'Facture payée',
      message: `Votre facture pour ${invoice.propertyAddress} a été payée. Montant: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(invoice.commissionAmount)}`,
      data: { invoiceId: invoice.id, amount: invoice.commissionAmount }
    });
    
    return Promise.resolve(invoice);
  }
};
