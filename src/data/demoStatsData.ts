
import { Transaction, StatsData, DashboardStats, AgentStats } from '@/types/stats';

// Demo transactions data
export const demoTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-06-15',
    type: 'vente',
    property: 'Appartement 3 pièces',
    amount: 210000,
    commission: 7350,
    status: 'Finalisée'
  },
  {
    id: '2',
    date: '2023-06-02',
    type: 'vente',
    property: 'Maison 5 pièces',
    amount: 320000,
    commission: 11200,
    status: 'Finalisée'
  },
  {
    id: '3',
    date: '2023-05-18',
    type: 'location',
    property: 'Studio meublé',
    amount: 650,
    commission: 650,
    status: 'Finalisée'
  },
  {
    id: '4',
    date: '2023-04-30',
    type: 'vente',
    property: 'Appartement 2 pièces',
    amount: 175000,
    commission: 6125,
    status: 'Finalisée'
  },
  {
    id: '5',
    date: '2023-04-15',
    type: 'vente',
    property: 'Maison 4 pièces',
    amount: 295000,
    commission: 10325,
    status: 'Finalisée'
  }
];

// Demo complete stats data
export const demoCompleteStats: StatsData = {
  totalSales: 12,
  totalCompromis: 15,
  totalVolume: 1250000,
  totalCommission: 87500,
  monthlySales: [
    { month: 'Janvier', value: 1 },
    { month: 'Février', value: 0 },
    { month: 'Mars', value: 2 },
    { month: 'Avril', value: 1 },
    { month: 'Mai', value: 2 },
    { month: 'Juin', value: 3 },
    { month: 'Juillet', value: 1 },
    { month: 'Août', value: 0 },
    { month: 'Septembre', value: 1 },
    { month: 'Octobre', value: 1 },
    { month: 'Novembre', value: 0 },
    { month: 'Décembre', value: 0 }
  ],
  monthlyCompromis: [
    { month: 'Janvier', value: 2 },
    { month: 'Février', value: 1 },
    { month: 'Mars', value: 2 },
    { month: 'Avril', value: 1 },
    { month: 'Mai', value: 2 },
    { month: 'Juin', value: 3 },
    { month: 'Juillet', value: 2 },
    { month: 'Août', value: 0 },
    { month: 'Septembre', value: 1 },
    { month: 'Octobre', value: 1 },
    { month: 'Novembre', value: 0 },
    { month: 'Décembre', value: 0 }
  ],
  monthlyCommissions: [
    { month: 'Janvier', value: 7500 },
    { month: 'Février', value: 0 },
    { month: 'Mars', value: 15000 },
    { month: 'Avril', value: 7500 },
    { month: 'Mai', value: 12000 },
    { month: 'Juin', value: 19500 },
    { month: 'Juillet', value: 9000 },
    { month: 'Août', value: 0 },
    { month: 'Septembre', value: 8500 },
    { month: 'Octobre', value: 8500 },
    { month: 'Novembre', value: 0 },
    { month: 'Décembre', value: 0 }
  ],
  commissionsByType: [
    { name: 'Ventes', value: 58500 },
    { name: 'Locations', value: 12000 },
    { name: 'Viagers', value: 9500 },
    { name: 'Commerces', value: 7500 }
  ],
  transactions: demoTransactions
};

// Demo dashboard stats
export const demoDashboardStats: DashboardStats = {
  totalRevenue: "8 750 €",
  salesCount: "3",
  contactsCount: "29",
  currentCommissionRate: "72%",
  ytdRevenue: 8750,
  nextThreshold: 35000,
  remainingForNextTier: 26250
};

// Demo agent stats
export const demoAgentStats: AgentStats = {
  sales: 3,
  compromis: 4,
  volume: 450000,
  commission: 16200,
  conversionRate: 0.75
};
