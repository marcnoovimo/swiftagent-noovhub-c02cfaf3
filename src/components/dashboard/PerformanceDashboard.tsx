
import React from 'react';
import { usePerformanceData } from './hooks/usePerformanceData';
import PerformanceCharts from './charts/PerformanceCharts';
import { Skeleton } from '@/components/ui/skeleton';

const PerformanceDashboard: React.FC = () => {
  const { 
    monthlyData, 
    isLoading 
  } = usePerformanceData();

  if (isLoading) {
    return (
      <div className="space-y-6 w-full animate-pulse">
        <Skeleton className="h-[250px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in px-0 space-y-4 sm:space-y-6">
      {/* Affichage uniquement du graphique, sans les sections Activité du mois et Cumul annuel */}
      <PerformanceCharts monthlyData={monthlyData} />
    </div>
  );
};

export default PerformanceDashboard;
