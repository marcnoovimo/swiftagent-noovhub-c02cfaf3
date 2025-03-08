
import { isSupabaseConfigured } from '@/lib/supabase';
import { DashboardStats, AgentStats, StatsData, TimeFilter } from '@/types/stats';
import dashboardStatsService from './dashboardStatsService';
import agentStatsService from './agentStatsService';
import completeStatsService from './completeStatsService';

/**
 * Main statistics service that combines all stats-related functionality
 */
export const statsService = {
  // Re-export functions from individual services
  getDashboardStats: dashboardStatsService.getDashboardStats,
  getAgentStats: agentStatsService.getAgentStats,
  getStats: completeStatsService.getStats
};

// Export individual services for direct access if needed
export { 
  dashboardStatsService,
  agentStatsService,
  completeStatsService
};

// Export types for easier access
export type { 
  DashboardStats,
  AgentStats,
  StatsData,
  TimeFilter
};

export default statsService;
