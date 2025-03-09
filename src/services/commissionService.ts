
import { CommissionCalculationParams, CommissionSimulation } from "@/types/commission";
import { PackService } from "./packService";
import { RevenueService } from "./revenueService";
import { CommissionCalculationService } from "./commissionCalculationService";

// Facade service that combines all commission-related services
export const CommissionService = {
  // Re-export pack-related methods
  getCommissionPacks: PackService.getCommissionPacks,
  getCommissionPack: PackService.getCommissionPack,
  getAgentCommission: PackService.getAgentCommission,
  updateAgentPack: PackService.updateAgentPack,
  getNextLevelProgress: PackService.getNextLevelProgress,
  
  // Re-export revenue-related methods
  addRevenue: RevenueService.addRevenue,
  getAgentRevenues: RevenueService.getAgentRevenues,
  getMonthlyRevenue: RevenueService.getMonthlyRevenue,
  
  // Re-export calculation methods
  calculateCurrentPercentage: CommissionCalculationService.calculateCurrentPercentage,
  
  // Simulate commission with additional amount (facade method with different parameters)
  simulateCommission: async (params: { agentId: string; additionalAmount: number }): Promise<CommissionSimulation> => {
    const { agentId, additionalAmount } = params;
    
    // Get the agent's commission data
    const commission = await PackService.getAgentCommission(agentId);
    if (!commission) {
      throw new Error("Agent commission not found");
    }
    
    // Use the calculation service to perform the simulation
    return CommissionCalculationService.simulateCommission({
      baseAmount: commission.totalAmount,
      additionalAmount,
      currentPercentage: commission.currentPercentage,
      packId: commission.packId
    });
  }
};
