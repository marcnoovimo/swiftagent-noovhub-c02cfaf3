
export interface CommissionPack {
  id: string;
  name: string;
  description: string;
  ranges: CommissionRange[];
  year: number;
  isActive: boolean;
  monthlyFeeHT?: number;
  monthlyFeeTTC?: number;
  referralRate?: number;
}

export interface CommissionRange {
  minAmount: number;
  maxAmount: number;
  percentage: number;
}

export interface AgentCommission {
  agentId: string;
  packId: string;
  currentPercentage: number;
  salesAmount: number;
  rentalAmount: number;
  propertyManagementAmount: number;
  totalAmount: number;
  startDate: string;
  endDate: string;
}

export interface CommissionCalculationParams {
  amount: number;
  packId: string;
}

export type RevenueSource = 'sale' | 'rental' | 'propertyManagement';

export interface RevenueRecord {
  id: string;
  agentId: string;
  source: RevenueSource;
  amount: number;
  date: string;
  propertyAddress?: string;
  clientName?: string;
  notes?: string;
}

export interface CommissionSimulation {
  baseAmount: number;
  additionalAmount: number;
  estimatedTotal: number;
  currentPercentage: number;
  estimatedPercentage: number;
  currentCommission: number;
  estimatedCommission: number;
  increasedCommission: number;
  nextThreshold?: number;
}

export interface InvoiceData {
  id: string;
  agentId: string;
  agentName: string;
  revenueId: string;
  amount: number;
  commissionAmount: number;
  commissionRate: number;
  status: 'draft' | 'submitted' | 'approved' | 'paid';
  propertyAddress: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'compromis' | 'invoice_submitted' | 'invoice_approved' | 'invoice_paid' | 'commission_threshold';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}
