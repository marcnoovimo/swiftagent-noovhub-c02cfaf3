
import { CommissionPack, AgentCommission } from "@/types/commission";
import { commissionPacks, agentCommissions } from "@/data/commissionData";
import { NotificationService } from "./notificationService";
import { CommissionCalculationService } from "./commissionCalculationService";

export const PackService = {
  // Get all commission packs
  getCommissionPacks: (): Promise<CommissionPack[]> => {
    return Promise.resolve(commissionPacks);
  },

  // Get a specific pack by ID
  getCommissionPack: (packId: string): Promise<CommissionPack | undefined> => {
    const pack = commissionPacks.find(p => p.id === packId);
    return Promise.resolve(pack);
  },

  // Get an agent's commission information
  getAgentCommission: (agentId: string): Promise<AgentCommission | undefined> => {
    const commission = agentCommissions.find(c => c.agentId === agentId);
    return Promise.resolve(commission);
  },

  // Update an agent's pack
  updateAgentPack: async (agentId: string, packId: string): Promise<AgentCommission> => {
    let commission = agentCommissions.find(c => c.agentId === agentId);
    const oldPercentage = commission?.currentPercentage || 0;
    
    if (commission) {
      commission.packId = packId;
      commission.currentPercentage = CommissionCalculationService.calculateCurrentPercentage({
        amount: commission.totalAmount,
        packId: packId
      });
    } else {
      commission = {
        agentId,
        packId,
        currentPercentage: 0,
        salesAmount: 0,
        rentalAmount: 0,
        propertyManagementAmount: 0,
        totalAmount: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: `${new Date().getFullYear()}-12-31`
      };
      agentCommissions.push(commission);
    }
    
    // Check if pack change triggered a new threshold
    await NotificationService.checkCommissionThreshold(
      agentId, 
      oldPercentage, 
      commission.currentPercentage
    );
    
    return Promise.resolve(commission);
  },

  // Get next level progress information
  getNextLevelProgress: (agentId: string): Promise<{
    currentPercentage: number;
    nextPercentage: number;
    amountNeeded: number;
    progress: number;
  }> => {
    const commission = agentCommissions.find(c => c.agentId === agentId);
    
    if (!commission) {
      return Promise.resolve({
        currentPercentage: 0,
        nextPercentage: 0,
        amountNeeded: 0,
        progress: 0
      });
    }
    
    const result = CommissionCalculationService.getNextLevelProgress(
      commission.totalAmount,
      commission.packId
    );
    
    return Promise.resolve(result);
  }
};
