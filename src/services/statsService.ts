
import { isSupabaseConfigured } from '@/lib/supabase';
import { Transaction, TimeFilter } from '@/types/stats';

// Types pour les données de statistiques du dashboard
export interface DashboardStats {
  totalRevenue: string;
  salesCount: string;
  contactsCount: string;
  currentCommissionRate: string;
  ytdRevenue: number;
  nextThreshold: number;
  remainingForNextTier: number;
}

// Type pour les statistiques d'agent
export interface AgentStats {
  sales: number;
  compromis: number;
  volume: number;
  commission: number;
  conversionRate: number;
}

// Type pour les statistiques complètes
export interface CompleteStats {
  totalSales: number;
  totalCompromis: number;
  totalVolume: number;
  totalCommission: number;
  monthlySales: Array<{ month: string; value: number }>;
  monthlyCompromis: Array<{ month: string; value: number }>;
  monthlyCommissions: Array<{ month: string; value: number }>;
  commissionsByType: Array<{ name: string; value: number }>;
  transactions: Transaction[];
}

// Données de démonstration pour les statistiques complètes
const demoCompleteStats: CompleteStats = {
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
  transactions: [
    {
      id: '1',
      date: '2023-06-15',
      type: 'Vente',
      property: 'Appartement 3 pièces',
      amount: 210000,
      commission: 7350,
      status: 'Finalisée'
    },
    {
      id: '2',
      date: '2023-06-02',
      type: 'Vente',
      property: 'Maison 5 pièces',
      amount: 320000,
      commission: 11200,
      status: 'Finalisée'
    },
    {
      id: '3',
      date: '2023-05-18',
      type: 'Location',
      property: 'Studio meublé',
      amount: 650,
      commission: 650,
      status: 'Finalisée'
    },
    {
      id: '4',
      date: '2023-04-30',
      type: 'Vente',
      property: 'Appartement 2 pièces',
      amount: 175000,
      commission: 6125,
      status: 'Finalisée'
    },
    {
      id: '5',
      date: '2023-04-15',
      type: 'Vente',
      property: 'Maison 4 pièces',
      amount: 295000,
      commission: 10325,
      status: 'Finalisée'
    }
  ]
};

// Services de statistiques
const statsService = {
  // Récupère les statistiques pour le dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    // En mode démo, on retourne des données factices
    if (!isSupabaseConfigured) {
      return {
        totalRevenue: "8 750 €",
        salesCount: "3",
        contactsCount: "29",
        currentCommissionRate: "72%",
        ytdRevenue: 8750,
        nextThreshold: 35000,
        remainingForNextTier: 26250
      };
    }
    
    try {
      // Ici, vous pourriez ajouter un appel à Supabase
      // pour récupérer les vraies données
      
      // Pour l'instant, on retourne aussi des données factices
      return {
        totalRevenue: "8 750 €",
        salesCount: "3",
        contactsCount: "29",
        currentCommissionRate: "72%",
        ytdRevenue: 8750,
        nextThreshold: 35000,
        remainingForNextTier: 26250
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      throw error;
    }
  },

  // Récupère les statistiques complètes pour la période donnée
  getStats: async (timeFilter: TimeFilter): Promise<CompleteStats> => {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Pour l'instant, on retourne des données de démo
    return demoCompleteStats;
  },

  // Récupère les statistiques d'un agent spécifique
  getAgentStats: async (agentId: string): Promise<AgentStats> => {
    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Pour l'instant, on retourne des données factices
    return {
      sales: 3,
      compromis: 4,
      volume: 450000,
      commission: 16200,
      conversionRate: 0.75
    };
  }
};

export { statsService };
export default statsService;
