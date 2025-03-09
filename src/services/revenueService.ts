
import { RevenueRecord } from "@/types/commission";
import { agentCommissions, revenueRecords, monthlyRevenueData } from "@/data/commissionData";
import { NotificationService } from "./notificationService";
import { CommissionCalculationService } from "./commissionCalculationService";

export const RevenueService = {
  // Add a new revenue record
  addRevenue: async (record: Omit<RevenueRecord, 'id'>): Promise<RevenueRecord> => {
    const newRecord: RevenueRecord = {
      ...record,
      id: `rev${revenueRecords.length + 1}`
    };
    
    revenueRecords.push(newRecord);
    
    // Update the agent's commission
    const commission = agentCommissions.find(c => c.agentId === record.agentId);
    const oldPercentage = commission?.currentPercentage || 0;
    
    if (commission) {
      if (record.source === 'sale') {
        commission.salesAmount += record.amount;
      } else if (record.source === 'rental') {
        commission.rentalAmount += record.amount;
      } else if (record.source === 'propertyManagement') {
        commission.propertyManagementAmount += record.amount;
      }
      
      commission.totalAmount = commission.salesAmount + commission.rentalAmount + commission.propertyManagementAmount;
      commission.currentPercentage = CommissionCalculationService.calculateCurrentPercentage({
        amount: commission.totalAmount,
        packId: commission.packId
      });
    }
    
    // Check if revenue addition triggered a new threshold
    if (commission) {
      await NotificationService.checkCommissionThreshold(
        record.agentId, 
        oldPercentage, 
        commission.currentPercentage
      );
    }
    
    // Create a notification for a compromis
    if (record.source === 'sale') {
      await NotificationService.createNotification({
        userId: record.agentId,
        type: 'compromis',
        title: 'Nouveau compromis enregistré',
        message: `Un compromis a été enregistré pour la propriété à ${record.propertyAddress || 'adresse non spécifiée'}.`,
        data: { revenueId: newRecord.id }
      });
    }
    
    return newRecord;
  },

  // Get agent revenues
  getAgentRevenues: (agentId: string): Promise<RevenueRecord[]> => {
    const records = revenueRecords.filter(r => r.agentId === agentId);
    return Promise.resolve(records);
  },
  
  // Get monthly revenue data
  getMonthlyRevenue: (agentId: string): Promise<{ month: string; revenue: number; commission: number; }[]> => {
    // In a real application, this would calculate data from actual transactions
    return Promise.resolve(monthlyRevenueData);
  }
};
