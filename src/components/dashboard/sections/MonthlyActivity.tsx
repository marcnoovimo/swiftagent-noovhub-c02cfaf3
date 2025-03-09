
import React from 'react';
import { Building2, Calendar, Euro, TrendingUp } from 'lucide-react';
import PerformanceCard from '../PerformanceCard';

interface MonthlyActivityProps {
  sales: number;
  compromis: number;
  commission: number;
  conversionRate: number;
  previousMonthSales: number;
  percentChange: string;
}

const MonthlyActivity: React.FC<MonthlyActivityProps> = ({ 
  sales, 
  compromis, 
  commission, 
  conversionRate, 
  previousMonthSales,
  percentChange
}) => {
  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="mb-3 sm:mb-6 performance-section">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Activité du mois</h2>
      <div className="card-grid">
        <PerformanceCard
          title="Unités de ventes"
          value={sales.toString()}
          change={percentChange}
          positive={sales >= previousMonthSales}
          icon={<Building2 size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Compromis"
          value={compromis.toString()}
          icon={<Calendar size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Honoraires"
          value={formatCurrency(commission)}
          icon={<Euro size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Tx de transformation"
          value={`${(conversionRate * 100).toFixed(0)}%`}
          icon={<TrendingUp size={14} className="text-noovimo-500" />}
        />
      </div>
    </div>
  );
};

export default MonthlyActivity;
