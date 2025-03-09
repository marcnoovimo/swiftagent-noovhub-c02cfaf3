
import { CommissionPack, AgentCommission, RevenueRecord } from "@/types/commission";

// Commission packs data for 2025
export const commissionPacks: CommissionPack[] = [
  {
    id: "bronze",
    name: "BRONZE",
    description: "Pack Bronze pour agents",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 119.00,
    monthlyFeeTTC: 142.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 68 },
      { minAmount: 35001, maxAmount: 70000, percentage: 72 },
      { minAmount: 70001, maxAmount: 100000, percentage: 76 },
      { minAmount: 100001, maxAmount: 150000, percentage: 80 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 84 }
    ]
  },
  {
    id: "ivoire",
    name: "IVOIRE",
    description: "Pack Ivoire pour agents",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 129.00,
    monthlyFeeTTC: 154.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 70 },
      { minAmount: 35001, maxAmount: 70000, percentage: 74 },
      { minAmount: 70001, maxAmount: 100000, percentage: 78 },
      { minAmount: 100001, maxAmount: 150000, percentage: 82 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 86 }
    ]
  },
  {
    id: "silver",
    name: "SILVER",
    description: "Pack Silver pour agents",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 179.00,
    monthlyFeeTTC: 214.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 72 },
      { minAmount: 35001, maxAmount: 70000, percentage: 76 },
      { minAmount: 70001, maxAmount: 100000, percentage: 80 },
      { minAmount: 100001, maxAmount: 150000, percentage: 84 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 88 }
    ]
  },
  {
    id: "emeraude",
    name: "EMERAUDE",
    description: "Pack Emeraude pour agents",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 79.00,
    monthlyFeeTTC: 94.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 62 },
      { minAmount: 35001, maxAmount: 70000, percentage: 66 },
      { minAmount: 70001, maxAmount: 100000, percentage: 70 },
      { minAmount: 100001, maxAmount: 150000, percentage: 74 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 78 }
    ]
  },
  {
    id: "gold",
    name: "GOLD",
    description: "Pack Gold pour agents premium",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 229.00,
    monthlyFeeTTC: 274.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 75 },
      { minAmount: 35001, maxAmount: 70000, percentage: 79 },
      { minAmount: 70001, maxAmount: 100000, percentage: 83 },
      { minAmount: 100001, maxAmount: 150000, percentage: 87 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 91 }
    ]
  },
  {
    id: "platinium",
    name: "PLATINIUM",
    description: "Pack Platinium pour agents élite",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 269.00,
    monthlyFeeTTC: 322.80,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 77 },
      { minAmount: 35001, maxAmount: 70000, percentage: 81 },
      { minAmount: 70001, maxAmount: 100000, percentage: 85 },
      { minAmount: 100001, maxAmount: 150000, percentage: 89 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 93 }
    ]
  },
  {
    id: "platinium-referent",
    name: "PLATINIUM REFERENT",
    description: "Pack Platinium Référent pour agents élite",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 269.00,
    monthlyFeeTTC: 322.80,
    referralRate: 2.40,
    ranges: [
      { minAmount: 0, maxAmount: 35000, percentage: 79 },
      { minAmount: 35001, maxAmount: 70000, percentage: 82 },
      { minAmount: 70001, maxAmount: 100000, percentage: 86 },
      { minAmount: 100001, maxAmount: 150000, percentage: 90 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 94 }
    ]
  },
  {
    id: "booster-pack",
    name: "BOOSTER PACK",
    description: "Pack Booster pour agents à haut potentiel",
    year: 2025,
    isActive: true,
    monthlyFeeHT: 269.00,
    monthlyFeeTTC: 322.80,
    ranges: [
      { minAmount: 0, maxAmount: 70000, percentage: 81 },
      { minAmount: 70001, maxAmount: 100000, percentage: 86 },
      { minAmount: 100001, maxAmount: 150000, percentage: 90 },
      { minAmount: 150001, maxAmount: 999999999, percentage: 94 }
    ]
  }
];

// Sample data for agent commissions
export let agentCommissions: AgentCommission[] = [
  {
    agentId: "1",
    packId: "silver",
    currentPercentage: 80,
    salesAmount: 95000,
    rentalAmount: 15000,
    propertyManagementAmount: 5000,
    totalAmount: 115000,
    startDate: "2025-01-01",
    endDate: "2025-12-31"
  }
];

// Sample data for revenue records
export let revenueRecords: RevenueRecord[] = [
  {
    id: "rev1",
    agentId: "1",
    source: "sale",
    amount: 95000,
    date: "2025-05-15",
    propertyAddress: "123 Rue de Paris, 75001 Paris",
    clientName: "Jean Dupont"
  },
  {
    id: "rev2",
    agentId: "1",
    source: "rental",
    amount: 15000,
    date: "2025-04-10",
    propertyAddress: "45 Avenue des Fleurs, 69000 Lyon",
    clientName: "Marie Martin"
  }
];

// Demo data for monthly revenue
export const monthlyRevenueData = [
  { month: "Jan", revenue: 15000, commission: 10800 },
  { month: "Fév", revenue: 20000, commission: 14400 },
  { month: "Mar", revenue: 18000, commission: 12960 },
  { month: "Avr", revenue: 22000, commission: 16720 },
  { month: "Mai", revenue: 35000, commission: 26600 },
  { month: "Juin", revenue: 40000, commission: 30400 },
  { month: "Juil", revenue: 0, commission: 0 },
  { month: "Août", revenue: 0, commission: 0 },
  { month: "Sep", revenue: 0, commission: 0 },
  { month: "Oct", revenue: 0, commission: 0 },
  { month: "Nov", revenue: 0, commission: 0 },
  { month: "Déc", revenue: 0, commission: 0 }
];
