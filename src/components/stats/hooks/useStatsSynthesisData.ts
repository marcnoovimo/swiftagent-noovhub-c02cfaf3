
import { useState, useEffect } from 'react';
import { useDashboardStatsQuery } from '@/services/dashboardStatsService';

export const useStatsSynthesisData = () => {
  const [timeFilter, setTimeFilter] = useState('thisMonth');
  const { 
    data: statsData, 
    isLoading 
  } = useDashboardStatsQuery(timeFilter);
  
  const [synthesisData, setSynthesisData] = useState({
    transactions: 0,
    revenue: 0,
    averageTransaction: 0,
    averageCommission: 0
  });

  useEffect(() => {
    if (statsData) {
      // Calculate synthesis data
      const transactions = statsData.transactions.count || 0;
      const revenue = statsData.revenue.total || 0;
      const averageTransaction = transactions > 0 ? revenue / transactions : 0;
      const averageCommission = statsData.commissions.average || 0;

      setSynthesisData({
        transactions,
        revenue,
        averageTransaction,
        averageCommission
      });
    }
  }, [statsData]);

  return {
    synthesisData,
    isLoading,
    timeFilter,
    setTimeFilter
  };
};
