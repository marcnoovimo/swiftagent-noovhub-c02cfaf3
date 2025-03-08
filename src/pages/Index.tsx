
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import CommissionSimulator from '@/components/commission/CommissionSimulator';
import MonthlyRevenueChart from '@/components/commission/MonthlyRevenueChart';
import InvoiceGenerator from '@/components/invoice/InvoiceGenerator';
import { Building, Home, Key, Percent, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CommissionService } from '@/services/commissionService';
import RevenueTable from '@/components/stats/RevenueTable';

const Index = () => {
  const { user } = useAuth();

  const { data: agentCommission } = useQuery({
    queryKey: ['agentCommission', user?.id],
    queryFn: () => CommissionService.getAgentCommission(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: commissionPack } = useQuery({
    queryKey: ['commissionPack', agentCommission?.packId],
    queryFn: () => CommissionService.getCommissionPack(agentCommission?.packId || ''),
    enabled: !!agentCommission?.packId,
  });

  const { data: nextLevelInfo } = useQuery({
    queryKey: ['nextLevelInfo', user?.id],
    queryFn: () => CommissionService.getNextLevelProgress(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: revenues } = useQuery({
    queryKey: ['agentRevenues', user?.id],
    queryFn: () => CommissionService.getAgentRevenues(user?.id || ''),
    enabled: !!user?.id,
  });

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue {user?.name}, voici votre activité
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PerformanceCard 
          title="Total Honoraires" 
          value={formatCurrency(agentCommission?.totalAmount || 0)}
          description="Honoraires cumulés" 
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} 
        />
        <PerformanceCard 
          title="Ventes" 
          value={formatCurrency(agentCommission?.salesAmount || 0)}
          description="Honoraires ventes" 
          icon={<Home className="h-4 w-4 text-muted-foreground" />} 
        />
        <PerformanceCard 
          title="Locations" 
          value={formatCurrency(agentCommission?.rentalAmount || 0)}
          description="Honoraires locations" 
          icon={<Key className="h-4 w-4 text-muted-foreground" />} 
        />
        <PerformanceCard 
          title="Gestion" 
          value={formatCurrency(agentCommission?.propertyManagementAmount || 0)}
          description="Honoraires gestion" 
          icon={<Building className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-7 mt-6">
        <div className="md:col-span-5">
          <Tabs defaultValue="performance">
            <TabsList className="mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="factures">Factures</TabsTrigger>
            </TabsList>
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Annuelle</CardTitle>
                  <CardDescription>
                    Évolution de vos honoraires pour l'année {new Date().getFullYear()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceDashboard />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="commissions">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Barème de commission
                  </CardTitle>
                  <CardDescription>
                    {commissionPack ? (
                      <span>Vous êtes sur le pack <strong>{commissionPack.name}</strong> avec un taux actuel de <strong>{agentCommission?.currentPercentage}%</strong></span>
                    ) : (
                      <span>Aucun pack de commission assigné</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {nextLevelInfo && commissionPack && (
                    <div className="space-y-6">
                      {nextLevelInfo.nextPercentage > nextLevelInfo.currentPercentage ? (
                        <>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Taux actuel: {nextLevelInfo.currentPercentage}%</span>
                              <span>Prochain palier: {nextLevelInfo.nextPercentage}%</span>
                            </div>
                            
                            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${nextLevelInfo.progress}%` }}
                              />
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              Il vous reste <span className="font-medium">{formatCurrency(nextLevelInfo.amountNeeded)}</span> d'honoraires pour atteindre le prochain palier.
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-sm">Félicitations ! Vous avez atteint le palier maximal de votre pack.</p>
                        </div>
                      )}
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-3">Palier</th>
                              <th className="text-left py-2 px-3">Honoraires cumulés</th>
                              <th className="text-left py-2 px-3">Commission</th>
                            </tr>
                          </thead>
                          <tbody>
                            {commissionPack.ranges.map((range, index) => (
                              <tr key={index} className={`border-b ${agentCommission?.currentPercentage === range.percentage ? 'bg-primary/10' : ''}`}>
                                <td className="py-2 px-3">{index + 1}</td>
                                <td className="py-2 px-3">
                                  {range.minAmount === 0 ? '0' : formatCurrency(range.minAmount)} - {range.maxAmount === 999999999 ? '+' : formatCurrency(range.maxAmount)}
                                </td>
                                <td className="py-2 px-3 font-medium">{range.percentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Nouveau: Graphique d'évolution mensuelle */}
                      <div className="mt-6">
                        <MonthlyRevenueChart />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Dernières transactions</CardTitle>
                  <CardDescription>
                    Historique de vos transactions récentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueTable revenues={revenues || []} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="factures">
              <InvoiceGenerator />
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-2">
          <div className="grid gap-6 h-full">
            <Card className="h-full md:h-[45%]">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Derniers événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
            
            {/* Nouveau: Simulateur de commissions */}
            <Card className="h-full md:h-[55%]">
              <CardContent className="p-0">
                <CommissionSimulator />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
