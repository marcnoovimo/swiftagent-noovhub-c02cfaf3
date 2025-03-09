
import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, 
  CreditCard, 
  TrendingUp, 
  Home, 
  BarChart3 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeFilter } from '@/types/stats';
import { statsService } from '@/services/statsService';
import TimeFilterSelector from '@/components/stats/TimeFilterSelector';
import StatCard from '@/components/stats/StatCard';
import TransactionTable from '@/components/stats/TransactionTable';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';

const Stats = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('year');
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['stats', timeFilter],
    queryFn: () => statsService.getStats(timeFilter),
  });
  
  useEffect(() => {
    refetch();
  }, [timeFilter, refetch]);
  
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Statistiques de performance</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Suivez vos performances commerciales et vos commissions
          </p>
        </div>
        <TimeFilterSelector activeFilter={timeFilter} onChange={setTimeFilter} />
      </div>
      
      {/* Performance Dashboard Component */}
      <div className="w-full overflow-visible mb-6">
        <PerformanceDashboard />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          title="Ventes réalisées"
          value={stats.totalSales}
          icon={<Home size={isMobile ? 14 : 16} className="text-noovimo-500" />}
        />
        <StatCard
          title="Compromis signés"
          value={stats.totalCompromis}
          icon={<Building2 size={isMobile ? 14 : 16} className="text-noovimo-500" />}
        />
        <StatCard
          title="Volume de transactions"
          value={formatCurrency(stats.totalVolume)}
          icon={<BarChart3 size={isMobile ? 14 : 16} className="text-noovimo-500" />}
        />
        <StatCard
          title="Commissions totales"
          value={formatCurrency(stats.totalCommission)}
          icon={<CreditCard size={isMobile ? 14 : 16} className="text-noovimo-500" />}
        />
      </div>
      
      <div className="mb-4 sm:mb-6">
        <div className="glass-card rounded-xl p-2 sm:p-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Transactions récentes</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <TransactionTable transactions={stats.transactions.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
