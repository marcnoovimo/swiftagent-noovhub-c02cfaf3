
import { AgentStats } from '@/types/stats';
import { demoAgentStats } from '@/data/demoStatsData';

/**
 * Service for handling agent-specific statistics
 */
export const agentStatsService = {
  /**
   * Retrieves statistics for a specific agent
   * @param agentId The ID of the agent
   */
  getAgentStats: async (agentId: string): Promise<AgentStats> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real implementation, you would fetch data based on the agentId
    // For now, return demo data
    return demoAgentStats;
  }
};

export default agentStatsService;
