
import { CommissionPack, CommissionCalculationParams, CommissionSimulation } from "@/types/commission";
import { commissionPacks } from "@/data/commissionData";

export const CommissionCalculationService = {
  // Calculate current commission percentage based on amount and pack
  calculateCurrentPercentage: (params: CommissionCalculationParams): number => {
    const { amount, packId } = params;
    const pack = commissionPacks.find(p => p.id === packId);
    
    if (!pack) return 0;
    
    const applicableRange = pack.ranges.find(range => 
      amount >= range.minAmount && amount <= range.maxAmount
    );
    
    return applicableRange ? applicableRange.percentage : 0;
  },

  // Simulate commission with additional amount
  simulateCommission: async (params: { 
    baseAmount: number; 
    additionalAmount: number; 
    currentPercentage: number;
    packId: string;
  }): Promise<CommissionSimulation> => {
    const { baseAmount, additionalAmount, currentPercentage, packId } = params;
    
    // Find the pack
    const pack = commissionPacks.find(p => p.id === packId);
    if (!pack) {
      throw new Error("Commission pack not found");
    }
    
    // Calculate current commission
    const currentCommission = baseAmount * (currentPercentage / 100);
    
    // Simulate with additional amount
    const estimatedTotal = baseAmount + additionalAmount;
    const estimatedPercentage = CommissionCalculationService.calculateCurrentPercentage({
      amount: estimatedTotal,
      packId: packId
    });
    
    const estimatedCommission = estimatedTotal * (estimatedPercentage / 100);
    const increasedCommission = estimatedCommission - currentCommission;
    
    // Determine next threshold
    let nextThreshold: number | undefined;
    
    const currentRange = pack.ranges.find(range => 
      estimatedTotal >= range.minAmount && estimatedTotal <= range.maxAmount
    );
    
    if (currentRange) {
      const currentIndex = pack.ranges.indexOf(currentRange);
      if (currentIndex < pack.ranges.length - 1) {
        nextThreshold = pack.ranges[currentIndex + 1].minAmount;
      }
    }
    
    return {
      baseAmount,
      additionalAmount,
      estimatedTotal,
      currentPercentage,
      estimatedPercentage,
      currentCommission,
      estimatedCommission,
      increasedCommission,
      nextThreshold
    };
  },

  // Get progression to next level
  getNextLevelProgress: (totalAmount: number, packId: string): {
    currentPercentage: number;
    nextPercentage: number;
    amountNeeded: number;
    progress: number;
  } => {
    const pack = commissionPacks.find(p => p.id === packId);
    
    if (!pack) {
      return {
        currentPercentage: 0,
        nextPercentage: 0,
        amountNeeded: 0,
        progress: 0
      };
    }
    
    const currentRange = pack.ranges.find(range => 
      totalAmount >= range.minAmount && totalAmount <= range.maxAmount
    );
    
    if (!currentRange) {
      return {
        currentPercentage: 0,
        nextPercentage: 0,
        amountNeeded: 0,
        progress: 100
      };
    }
    
    const currentIndex = pack.ranges.indexOf(currentRange);
    const hasNextLevel = currentIndex < pack.ranges.length - 1;
    
    if (!hasNextLevel) {
      return {
        currentPercentage: currentRange.percentage,
        nextPercentage: currentRange.percentage,
        amountNeeded: 0,
        progress: 100
      };
    }
    
    const nextRange = pack.ranges[currentIndex + 1];
    const amountNeeded = Math.max(0, nextRange.minAmount - totalAmount);
    const rangeSize = currentRange.maxAmount - currentRange.minAmount;
    const amountInCurrentRange = totalAmount - currentRange.minAmount;
    const progress = Math.min(100, (amountInCurrentRange / rangeSize) * 100);
    
    return {
      currentPercentage: currentRange.percentage,
      nextPercentage: nextRange.percentage,
      amountNeeded,
      progress
    };
  }
};
