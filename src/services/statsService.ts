
import { isSupabaseConfigured } from '@/lib/supabase';

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

export const statsService = {
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
  }
};
