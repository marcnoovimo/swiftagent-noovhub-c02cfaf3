
import React from 'react';
import { usePerformanceData } from './hooks/usePerformanceData';
import { getPercentChange } from './utils/performanceUtils';
import MonthlyActivity from './sections/MonthlyActivity';
import AnnualCumulative from './sections/AnnualCumulative';
import PerformanceCharts from './charts/PerformanceCharts';
import { Skeleton } from '@/components/ui/skeleton';

const PerformanceDashboard: React.FC = () => {
  const { 
    monthlyStats, 
    cumulativeData, 
    monthlyData, 
    previousMonthSales,
    isLoading 
  } = usePerformanceData();

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <Skeleton className="h-[250px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in px-0 space-y-4 sm:space-y-6">
      <MonthlyActivity 
        sales={monthlyStats.sales}
        compromis={monthlyStats.compromis}
        commission={monthlyStats.commission}
        conversionRate={monthlyStats.conversionRate}
        previousMonthSales={previousMonthSales}
        percentChange={getPercentChange(monthlyStats.sales, previousMonthSales)}
      />

      <AnnualCumulative
        sales={cumulativeData.sales}
        compromis={cumulativeData.compromis}
        volume={cumulativeData.volume}
        commission={cumulativeData.commission}
      />

      <PerformanceCharts monthlyData={monthlyData} />
    </div>
  );
};

export default PerformanceDashboard;
