
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import ActivityFeed, { Activity } from '@/components/dashboard/ActivityFeed';
import MonthlyRevenueChart from '@/components/commission/MonthlyRevenueChart';
import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/statsService';
import DashboardStats from '@/components/dashboard/DashboardStats';
import TransactionsCard from '@/components/dashboard/TransactionsCard';
import CommissionRateCard from '@/components/commission/CommissionRateCard';
import { PackService } from '@/services/packService';

const Index = () => {
  const { user } = useAuth();
  
  // Requête pour obtenir les statistiques
  const { data: statsData } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: statsService.getDashboardStats,
    // Si l'utilisateur n'est pas connecté, on ne fait pas la requête
    enabled: !!user
  });

  // Query to get commission data
  const { data: commissionData } = useQuery({
    queryKey: ['nextLevelProgress'],
    queryFn: () => PackService.getNextLevelProgress(user?.id || ''),
    enabled: !!user
  });

  // Données factices pour les activités (en attendant l'API)
  const demoActivities: Activity[] = [
    {
      id: '1',
      type: 'vente',
      title: 'Vente finalisée',
      description: 'Appartement vendu à Nantes pour 280 000€',
      date: new Date(2023, 3, 1).toISOString(),
      user: {
        name: user?.user_metadata?.full_name || 'Agent Noovimo',
        avatar: user?.user_metadata?.avatar_url
      },
      status: 'completed'
    },
    {
      id: '2',
      type: 'facture',
      title: 'Facture validée',
      description: 'Commission de 4 200€ pour la vente à Nantes',
      date: new Date(2023, 3, 2).toISOString(),
      user: {
        name: user?.user_metadata?.full_name || 'Agent Noovimo',
        avatar: user?.user_metadata?.avatar_url
      },
      status: 'completed'
    },
    {
      id: '3',
      type: 'mandat',
      title: 'Nouveau mandat',
      description: 'Maison à Saint-Herblain, mandat exclusif',
      date: new Date(2023, 3, 5).toISOString(),
      user: {
        name: user?.user_metadata?.full_name || 'Agent Noovimo',
        avatar: user?.user_metadata?.avatar_url
      },
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <Helmet>
        <title>Tableau de bord | Intranet Noovimo</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">
            Bienvenue, {user?.user_metadata?.full_name || 'Agent Noovimo'}
          </p>
        </div>
      </div>

      <DashboardStats 
        totalRevenue={statsData?.totalRevenue || "0 €"}
        salesCount={statsData?.salesCount || "0"}
        contactsCount={statsData?.contactsCount || "0"}
        currentCommissionRate={statsData?.currentCommissionRate || "72%"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <MonthlyRevenueChart />
            </div>
          </CardContent>
        </Card>

        <ActivityFeed activities={demoActivities} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <TransactionsCard />
        <CommissionRateCard 
          currentTier="0 € - 35 000 €"
          nextTier="35 000 € - 70 000 €"
          currentRate={`${commissionData?.currentPercentage || 72}%`}
          nextRate={`${commissionData?.nextPercentage || 76}%`}
          amountReached={commissionData?.progress || 8750}
          tierTarget={commissionData?.amountNeeded || 35000}
        />
      </div>
    </div>
  );
};

export default Index;
