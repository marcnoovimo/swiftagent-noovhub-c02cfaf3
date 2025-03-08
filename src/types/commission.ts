
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
