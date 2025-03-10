
import { useState, useEffect } from 'react';
import * as dashboardStatsService from '@/services/dashboardStatsService';

export const useStatsSynthesisData = () => {
  const [timeFilter, setTimeFilter] = useState('thisMonth');
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);
  
  const [synthesisData, setSynthesisData] = useState({
    transactions: 0,
    revenue: 0,
    averageTransaction: 0,
    averageCommission: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Use the correct method from the service
        const data = await dashboardStatsService.getDashboardStats();
        setStatsData(data);
        
        // Calculate synthesis data
        const transactions = data?.transactions?.count || 0;
        const revenue = data?.revenue?.total || 0;
        const averageTransaction = transactions > 0 ? revenue / transactions : 0;
        const averageCommission = data?.commissions?.average || 0;

        setSynthesisData({
          transactions,
          revenue,
          averageTransaction,
          averageCommission
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeFilter]);

  return {
    synthesisData,
    isLoading,
    timeFilter,
    setTimeFilter
  };
};
