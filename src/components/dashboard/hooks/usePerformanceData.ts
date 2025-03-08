
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-hooks';
import { statsService } from '@/services/statsService';

export interface ChartDataPoint {
  month: string;
  ventes: number;
  compromis: number;
  commissions: number;
}

export interface PerformanceData {
  monthlyStats: {
    sales: number;
    compromis: number;
    volume: number;
    commission: number;
    conversionRate: number;
  };
  cumulativeData: {
    sales: number;
    compromis: number;
    volume: number;
    commission: number;
  };
  monthlyData: ChartDataPoint[];
  previousMonthSales: number;
  isLoading: boolean;
}

export const usePerformanceData = (): PerformanceData => {
  const { user } = useAuth();
  const [cumulativeData, setCumulativeData] = useState({
    sales: 0,
    compromis: 0,
    volume: 0,
    commission: 0
  });

  // Fetch current month stats for the agent
  const { data: monthlyStats, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['agentStats', user?.id],
    queryFn: () => statsService.getAgentStats(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Fetch yearly stats for comparison
  const { data: yearlyStats, isLoading: isLoadingYearly } = useQuery({
    queryKey: ['yearlyStats'],
    queryFn: () => statsService.getStats('year'),
  });

  // Calculate cumulative values
  useEffect(() => {
    if (yearlyStats) {
      setCumulativeData({
        sales: yearlyStats.totalSales,
        compromis: yearlyStats.totalCompromis,
        volume: yearlyStats.totalVolume,
        commission: yearlyStats.totalCommission
      });
    }
  }, [yearlyStats]);

  // Generate monthly data for charts
  const getMonthlyData = (): ChartDataPoint[] => {
    if (!yearlyStats) return [];
    return yearlyStats.monthlySales.map((item, index) => ({
      month: item.month,
      ventes: item.value,
      compromis: yearlyStats.monthlyCompromis[index]?.value || 0,
      commissions: yearlyStats.monthlyCommissions[index]?.value || 0
    }));
  };

  const previousMonthData = yearlyStats?.monthlySales[yearlyStats.monthlySales.length - 2];
  const previousMonthSales = previousMonthData?.value || 0;

  const defaultMonthlyStats = { 
    sales: 0, 
    compromis: 0, 
    volume: 0, 
    commission: 0, 
    conversionRate: 0 
  };

  return {
    monthlyStats: monthlyStats || defaultMonthlyStats,
    cumulativeData,
    monthlyData: getMonthlyData(),
    previousMonthSales,
    isLoading: isLoadingMonthly || isLoadingYearly
  };
};
