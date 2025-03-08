
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

export interface StatsData {
  transactions: Transaction[];
  totalSales: number;
  totalCompromis: number;
  totalCommission: number;
  totalVolume: number;
  monthlySales: { month: string; value: number }[];
  monthlyCommissions: { month: string; value: number }[];
  monthlyCompromis: { month: string; value: number }[];
  commissionsByType: { name: string; value: number }[];
}
