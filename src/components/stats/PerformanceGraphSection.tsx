
import React from 'react';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';

const PerformanceGraphSection: React.FC = () => {
  return (
    <div className="w-full overflow-visible mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Graphique avants contrats / actes - Cumul annuel</h2>
      <PerformanceDashboard />
    </div>
  );
};

export default PerformanceGraphSection;
