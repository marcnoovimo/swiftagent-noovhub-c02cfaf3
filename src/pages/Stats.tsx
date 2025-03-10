
import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, 
  CreditCard, 
  BarChart3, 
  Home,
  FileCheck,
  FileText,
  Users
} from 'lucide-react';
import { statsService } from '@/services/statsService';
import StatCard from '@/components/stats/StatCard';
import TransactionTable from '@/components/stats/TransactionTable';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';
import { useMediaQuery } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';

const Stats = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['stats', 'year'],
    queryFn: () => statsService.getStats('year'),
  });
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Memoize card data to prevent unnecessary re-renders
  const synthesisCardData = useMemo(() => {
    if (!stats) return [];
    
    return [
      {
        title: "Unités de ventes avants contrats",
        value: stats.totalCompromis,
        icon: <Building2 size={isMobile ? 14 : 16} className="text-noovimo-500" />
      },
      {
        title: "Unités de ventes actés",
        value: stats.totalSales,
        icon: <Home size={isMobile ? 14 : 16} className="text-noovimo-500" />
      },
      {
        title: "Honoraires compromis",
        value: formatCurrency(stats.totalVolume * 0.05), // Estimation des honoraires sur compromis
        icon: <FileCheck size={isMobile ? 14 : 16} className="text-noovimo-500" />
      },
      {
        title: "Honoraires actés",
        value: formatCurrency(stats.totalCommission),
        icon: <FileText size={isMobile ? 14 : 16} className="text-noovimo-500" />
      },
      {
        title: "Commissions agents",
        value: formatCurrency(stats.totalCommission * 0.7), // Estimation des commissions agents
        icon: <Users size={isMobile ? 14 : 16} className="text-noovimo-500" />
      }
    ];
  }, [stats, formatCurrency, isMobile]);

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <Helmet>
          <title>Statistiques | Intranet Noovimo</title>
        </Helmet>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <Helmet>
        <title>Statistiques | Intranet Noovimo</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Statistiques de performance</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Suivez vos performances commerciales et vos commissions
          </p>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="w-full overflow-visible mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Graphique avants contrats / actes - Cumul annuel</h2>
        <PerformanceDashboard />
      </div>
      
      {/* Synthèse */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Synthèse</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
          {synthesisCardData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
      
      {/* Transactions récentes */}
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
