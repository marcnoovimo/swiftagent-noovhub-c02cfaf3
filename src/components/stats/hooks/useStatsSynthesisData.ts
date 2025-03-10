
import { useState, useEffect } from 'react';
import * as statsService from '@/services/statsService';

export interface SynthesisData {
  transactions: number;
  revenue: number;
  averageTransaction: number;
  averageCommission: number;
}

export const useStatsSynthesisData = (timeFilter: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [synthesisData, setSynthesisData] = useState<SynthesisData>({
    transactions: 0,
    revenue: 0,
    averageTransaction: 0,
    averageCommission: 0
  });

  // Load data based on time filter
  useEffect(() => {
    const loadSynthesisData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would use the timeFilter to fetch from API
        const data = await statsService.generateCompleteStats(timeFilter);
        
        setSynthesisData({
          transactions: data.totalTransactions,
          revenue: data.totalRevenue,
          averageTransaction: data.averageTransactionValue,
          averageCommission: data.averageCommission
        });
      } catch (error) {
        console.error('Failed to load synthesis data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSynthesisData();
  }, [timeFilter]);

  return { synthesisData, isLoading };
};

export default useStatsSynthesisData;
