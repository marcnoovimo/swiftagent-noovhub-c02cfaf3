
export type TimeFilter = 'month' | 'quarter' | 'year';

export interface Transaction {
  id: string;
  date: string;
  type: 'vente' | 'compromis' | 'location';
  property: string;
  amount: number;
  commission: number;
  address?: string;
  status?: string;
}

// Types for the dashboard stats
export interface DashboardStats {
  totalRevenue: string;
  salesCount: string;
  contactsCount: string;
  currentCommissionRate: string;
  ytdRevenue: number;
  nextThreshold: number;
  remainingForNextTier: number;
}

// Type for agent statistics
export interface AgentStats {
  sales: number;
  compromis: number;
  volume: number;
  commission: number;
  conversionRate: number;
}

// Type for monthly/periodic data points
export interface ChartDataPoint {
  month: string;
  value: number;
}

// Type for commission distribution by type
export interface CommissionByType {
  name: string;
  value: number;
}

// Type for complete statistics
export interface StatsData {
  transactions: Transaction[];
  totalSales: number;
  totalCompromis: number;
  totalCommission: number;
  totalVolume: number;
  monthlySales: ChartDataPoint[];
  monthlyCommissions: ChartDataPoint[];
  monthlyCompromis: ChartDataPoint[];
  commissionsByType: CommissionByType[];
}
