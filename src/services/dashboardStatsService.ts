
import { isSupabaseConfigured } from '@/lib/supabase';
import { DashboardStats } from '@/types/stats';
import { demoDashboardStats } from '@/data/demoStatsData';

/**
 * Service for fetching dashboard statistics
 */
export const dashboardStatsService = {
  /**
   * Retrieves statistics for the dashboard
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    // In demo mode, return mock data
    if (!isSupabaseConfigured) {
      return demoDashboardStats;
    }
    
    try {
      // Here, you would add a Supabase call to fetch real data
      
      // For now, we return demo data even in non-demo mode
      return demoDashboardStats;
    } catch (error) {
      console.error("Error retrieving dashboard statistics:", error);
      throw error;
    }
  }
};

export default dashboardStatsService;
