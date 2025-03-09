
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import ActivityFeed, { Activity } from '@/components/dashboard/ActivityFeed';
import MonthlyRevenueChart from '@/components/commission/MonthlyRevenueChart';
import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/statsService';
import { Euro, Users, TrendingUp, BarChart } from 'lucide-react';

// Configuration de base pour tous les graphiques
const chartConfig = {
  colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
  fontFamily: '"Inter", sans-serif',
  tooltip: {
    style: {
      fontSize: '12px',
    },
  },
};

const Index = () => {
  const { user, isAdmin } = useAuth();
  
  // Requête pour obtenir les statistiques
  const { data: statsData } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: statsService.getDashboardStats,
    // Si l'utilisateur n'est pas connecté, on ne fait pas la requête
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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <PerformanceCard
          title="Honoraires HT"
          value={statsData?.totalRevenue || "0 €"}
          description="Cumul annuel"
          icon={<Euro className="h-4 w-4" />}
        />
        <PerformanceCard
          title="Unités de ventes"
          value={statsData?.salesCount || "0"}
          description="Cumul annuel"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <PerformanceCard
          title="Contacts"
          value={statsData?.contactsCount || "0"}
          description="Dans votre réseau"
          icon={<Users className="h-4 w-4" />}
        />
        <PerformanceCard
          title="Tx de commission"
          value={statsData?.currentCommissionRate || "72%"}
          description="Palier actuel"
          icon={<BarChart className="h-4 w-4" />}
        />
      </div>

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
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transactions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">En cours</TabsTrigger>
                <TabsTrigger value="completed">Finalisées</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium">Appartement à Nantes</p>
                      <p className="text-sm text-muted-foreground">Vendeur: Dupont Jean</p>
                      <p className="text-sm text-muted-foreground">Acquéreur: Martin Sophie</p>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">Avant-contrat: 15/03/2023</p>
                        <p className="text-xs text-muted-foreground">Acte prévu: 15/06/2023</p>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-bold">7 500 €</p>
                      <p className="text-xs text-muted-foreground">Honoraires</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border">
                  <div className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium">Maison à Saint-Herblain</p>
                      <p className="text-sm text-muted-foreground">Vendeur: Leroy Michel</p>
                      <p className="text-sm text-muted-foreground">Acquéreur: Petit Laura</p>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">Avant-contrat: 02/04/2023</p>
                        <p className="text-xs text-muted-foreground">Acte prévu: 02/07/2023</p>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-bold">12 300 €</p>
                      <p className="text-xs text-muted-foreground">Honoraires</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium">Appartement à Nantes</p>
                      <p className="text-sm text-muted-foreground">Vendeur: Moreau Philippe</p>
                      <p className="text-sm text-muted-foreground">Acquéreur: Thomas Pierre</p>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">Avant-contrat: 01/02/2023</p>
                        <p className="text-xs text-muted-foreground">Acte final: 01/04/2023</p>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-bold">8 400 €</p>
                      <p className="text-xs text-muted-foreground">Honoraires</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mes honoraires cumulés € HT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Palier actuel</p>
                  <p className="text-sm text-muted-foreground">0 € - 35 000 €</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">72%</p>
                  <p className="text-sm text-muted-foreground">de commission</p>
                </div>
              </div>
              
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                <p>8 750 € atteints sur 35 000 € pour le prochain palier (76%)</p>
                <p className="font-medium text-foreground mt-1">26 250 € restants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
