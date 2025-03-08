
import React from 'react';
import { usePerformanceData } from './hooks/usePerformanceData';
import { getPercentChange } from './utils/performanceUtils';
import MonthlyActivity from './sections/MonthlyActivity';
import AnnualCumulative from './sections/AnnualCumulative';
import PerformanceCharts from './charts/PerformanceCharts';

const PerformanceDashboard: React.FC = () => {
  const { 
    monthlyStats, 
    cumulativeData, 
    monthlyData, 
    previousMonthSales,
    isLoading 
  } = usePerformanceData();

  if (isLoading) {
    return <div className="p-4 text-center">Chargement des statistiques...</div>;
  }

  return (
    <div className="w-full animate-fade-in px-0">
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
