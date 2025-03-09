
import React from 'react';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import { Euro, Users, TrendingUp, BarChart } from 'lucide-react';

interface DashboardStatsProps {
  totalRevenue: string;
  salesCount: string;
  contactsCount: string;
  currentCommissionRate: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalRevenue,
  salesCount,
  contactsCount,
  currentCommissionRate,
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <PerformanceCard
        title="Honoraires HT"
        value={totalRevenue}
        description="Cumul annuel"
        icon={<Euro className="h-4 w-4" />}
      />
      <PerformanceCard
        title="Unités de ventes"
        value={salesCount}
        description="Cumul annuel"
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <PerformanceCard
        title="Contacts"
        value={contactsCount}
        description="Dans votre réseau"
        icon={<Users className="h-4 w-4" />}
      />
      <PerformanceCard
        title="Tx de commission"
        value={currentCommissionRate}
        description="Palier actuel"
        icon={<BarChart className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardStats;
