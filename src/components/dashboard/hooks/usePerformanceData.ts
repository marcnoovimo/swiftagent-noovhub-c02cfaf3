
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
  monthlyData: ChartDataPoint[];
  isLoading: boolean;
}

export const usePerformanceData = (): PerformanceData => {
  const { user } = useAuth();
  
  // Fetch yearly stats for the charts
  const { data: yearlyStats, isLoading: isLoadingYearly } = useQuery({
    queryKey: ['yearlyStats'],
    queryFn: () => statsService.getStats('year'),
  });

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

  return {
    monthlyData: getMonthlyData(),
    isLoading: isLoadingYearly
  };
};
