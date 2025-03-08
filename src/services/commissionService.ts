
import { CommissionPack, CommissionRange, AgentCommission, CommissionCalculationParams, RevenueRecord } from "@/types/commission";

// Données statiques pour les packs de commission
const commissionPacks: CommissionPack[] = [
  {
    id: "pack1",
    name: "Pack Starter",
    description: "Pack de démarrage pour nouveaux agents",
    year: 2024,
    isActive: true,
    ranges: [
      { minAmount: 0, maxAmount: 30000, percentage: 60 },
      { minAmount: 30001, maxAmount: 60000, percentage: 70 },
      { minAmount: 60001, maxAmount: 100000, percentage: 80 },
      { minAmount: 100001, maxAmount: Infinity, percentage: 85 }
    ]
  },
  {
    id: "pack2",
    name: "Pack Expert",
    description: "Pack pour agents confirmés",
    year: 2024,
    isActive: true,
    ranges: [
      { minAmount: 0, maxAmount: 50000, percentage: 70 },
      { minAmount: 50001, maxAmount: 100000, percentage: 80 },
      { minAmount: 100001, maxAmount: 150000, percentage: 85 },
      { minAmount: 150001, maxAmount: Infinity, percentage: 90 }
    ]
  },
  {
    id: "pack3",
    name: "Pack Elite",
    description: "Pack pour agents d'élite",
    year: 2024,
    isActive: true,
    ranges: [
      { minAmount: 0, maxAmount: 80000, percentage: 80 },
      { minAmount: 80001, maxAmount: 150000, percentage: 85 },
      { minAmount: 150001, maxAmount: 200000, percentage: 90 },
      { minAmount: 200001, maxAmount: Infinity, percentage: 95 }
    ]
  }
];

// Données fictives pour les commissions des agents
let agentCommissions: AgentCommission[] = [
  {
    agentId: "1",
    packId: "pack2",
    currentPercentage: 80,
    salesAmount: 95000,
    rentalAmount: 15000,
    propertyManagementAmount: 5000,
    totalAmount: 115000,
    startDate: "2024-01-01",
    endDate: "2024-12-31"
  }
];

// Données fictives pour les revenus
let revenueRecords: RevenueRecord[] = [
  {
    id: "rev1",
    agentId: "1",
    source: "sale",
    amount: 95000,
    date: "2024-05-15",
    propertyAddress: "123 Rue de Paris, 75001 Paris",
    clientName: "Jean Dupont"
  },
  {
    id: "rev2",
    agentId: "1",
    source: "rental",
    amount: 15000,
    date: "2024-04-10",
    propertyAddress: "45 Avenue des Fleurs, 69000 Lyon",
    clientName: "Marie Martin"
  }
];

export const CommissionService = {
  // Obtenir tous les packs de commission
  getCommissionPacks: (): Promise<CommissionPack[]> => {
    return Promise.resolve(commissionPacks);
  },

  // Obtenir un pack spécifique
  getCommissionPack: (packId: string): Promise<CommissionPack | undefined> => {
    const pack = commissionPacks.find(p => p.id === packId);
    return Promise.resolve(pack);
  },

  // Obtenir la commission d'un agent
  getAgentCommission: (agentId: string): Promise<AgentCommission | undefined> => {
    const commission = agentCommissions.find(c => c.agentId === agentId);
    return Promise.resolve(commission);
  },

  // Mettre à jour le pack d'un agent
  updateAgentPack: (agentId: string, packId: string): Promise<AgentCommission> => {
    let commission = agentCommissions.find(c => c.agentId === agentId);
    
    if (commission) {
      commission.packId = packId;
      commission.currentPercentage = CommissionService.calculateCurrentPercentage({
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
    
    return Promise.resolve(commission);
  },

  // Ajouter un revenu
  addRevenue: (record: Omit<RevenueRecord, 'id'>): Promise<RevenueRecord> => {
    const newRecord: RevenueRecord = {
      ...record,
      id: `rev${revenueRecords.length + 1}`
    };
    
    revenueRecords.push(newRecord);
    
    // Mettre à jour la commission de l'agent
    const commission = agentCommissions.find(c => c.agentId === record.agentId);
    
    if (commission) {
      if (record.source === 'sale') {
        commission.salesAmount += record.amount;
      } else if (record.source === 'rental') {
        commission.rentalAmount += record.amount;
      } else if (record.source === 'propertyManagement') {
        commission.propertyManagementAmount += record.amount;
      }
      
      commission.totalAmount = commission.salesAmount + commission.rentalAmount + commission.propertyManagementAmount;
      commission.currentPercentage = CommissionService.calculateCurrentPercentage({
        amount: commission.totalAmount,
        packId: commission.packId
      });
    }
    
    return Promise.resolve(newRecord);
  },

  // Calculer le pourcentage de commission actuel
  calculateCurrentPercentage: (params: CommissionCalculationParams): number => {
    const { amount, packId } = params;
    const pack = commissionPacks.find(p => p.id === packId);
    
    if (!pack) return 0;
    
    const applicableRange = pack.ranges.find(range => 
      amount >= range.minAmount && amount <= range.maxAmount
    );
    
    return applicableRange ? applicableRange.percentage : 0;
  },

  // Obtenir les revenus d'un agent
  getAgentRevenues: (agentId: string): Promise<RevenueRecord[]> => {
    const records = revenueRecords.filter(r => r.agentId === agentId);
    return Promise.resolve(records);
  },

  // Obtenir la progression vers le prochain palier
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
    
    const pack = commissionPacks.find(p => p.id === commission.packId);
    
    if (!pack) {
      return Promise.resolve({
        currentPercentage: commission.currentPercentage,
        nextPercentage: commission.currentPercentage,
        amountNeeded: 0,
        progress: 100
      });
    }
    
    const currentRange = pack.ranges.find(range => 
      commission.totalAmount >= range.minAmount && commission.totalAmount <= range.maxAmount
    );
    
    if (!currentRange) {
      return Promise.resolve({
        currentPercentage: commission.currentPercentage,
        nextPercentage: commission.currentPercentage,
        amountNeeded: 0,
        progress: 100
      });
    }
    
    const currentIndex = pack.ranges.indexOf(currentRange);
    const hasNextLevel = currentIndex < pack.ranges.length - 1;
    
    if (!hasNextLevel) {
      return Promise.resolve({
        currentPercentage: commission.currentPercentage,
        nextPercentage: commission.currentPercentage,
        amountNeeded: 0,
        progress: 100
      });
    }
    
    const nextRange = pack.ranges[currentIndex + 1];
    const amountNeeded = Math.max(0, nextRange.minAmount - commission.totalAmount);
    const rangeSize = currentRange.maxAmount - currentRange.minAmount;
    const amountInCurrentRange = commission.totalAmount - currentRange.minAmount;
    const progress = Math.min(100, (amountInCurrentRange / rangeSize) * 100);
    
    return Promise.resolve({
      currentPercentage: currentRange.percentage,
      nextPercentage: nextRange.percentage,
      amountNeeded,
      progress
    });
  }
};
