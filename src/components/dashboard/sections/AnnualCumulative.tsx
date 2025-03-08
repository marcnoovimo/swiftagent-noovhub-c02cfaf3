
import React from 'react';
import { Building2, Briefcase, BarChart3, PiggyBank } from 'lucide-react';
import PerformanceCard from '../PerformanceCard';

interface AnnualCumulativeProps {
  sales: number;
  compromis: number;
  volume: number;
  commission: number;
}

const AnnualCumulative: React.FC<AnnualCumulativeProps> = ({ 
  sales, 
  compromis, 
  volume, 
  commission 
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
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Cumul annuel</h2>
      <div className="card-grid">
        <PerformanceCard
          title="Ventes réalisées"
          value={sales.toString()}
          icon={<Building2 size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Compromis signés"
          value={compromis.toString()}
          icon={<Briefcase size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Volume de transactions"
          value={formatCurrency(volume)}
          icon={<BarChart3 size={14} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Commissions totales"
          value={formatCurrency(commission)}
          icon={<PiggyBank size={14} className="text-noovimo-500" />}
        />
      </div>
    </div>
  );
};

export default AnnualCumulative;
