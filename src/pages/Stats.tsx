
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@/hooks/use-mobile';
import { statsService } from '@/services/statsService';
import { useStatsSynthesisData } from '@/components/stats/hooks/useStatsSynthesisData';

// Import smaller component pieces
import StatsHeader from '@/components/stats/StatsHeader';
import PerformanceGraphSection from '@/components/stats/PerformanceGraphSection';
import SynthesisSection from '@/components/stats/SynthesisSection';
import TransactionSection from '@/components/stats/TransactionSection';
import StatsLoading from '@/components/stats/StatsLoading';

const Stats = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['stats', 'year'],
    queryFn: () => statsService.getStats('year'),
  });
  
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Get synthesis data from custom hook
  const { synthesisData, isLoading: isSynthesisLoading } = useStatsSynthesisData();
  
  // Convert synthesisData to array format expected by SynthesisSection
  const synthesisCardData = [
    {
      title: "Transactions",
      value: synthesisData.transactions,
      change: 0,
      trend: "stable",
    },
    {
      title: "Chiffre d'affaires",
      value: synthesisData.revenue,
      format: "currency",
      change: 0,
      trend: "stable",
    },
    {
      title: "Montant moyen",
      value: synthesisData.averageTransaction,
      format: "currency",
      change: 0,
      trend: "stable",
    },
    {
      title: "Commission moyenne",
      value: synthesisData.averageCommission,
      format: "currency",
      change: 0,
      trend: "stable",
    }
  ];

  if (isLoading || !stats || isSynthesisLoading) {
    return <StatsLoading />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <StatsHeader 
        title="Statistiques de performance"
        subtitle="Suivez vos performances commerciales et vos commissions"
      />
      
      {/* Graphiques */}
      <PerformanceGraphSection />
      
      {/* Synthèse */}
      <SynthesisSection cardData={synthesisCardData} />
      
      {/* Transactions récentes */}
      <TransactionSection transactions={stats.transactions} />
    </div>
  );
};

export default Stats;
