
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, FileText, MessageCircle, TrendingUp, Wallet, Home, Key, Building } from 'lucide-react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { CommissionService } from '@/services/commissionService';
import { useAuth } from '@/context/AuthContext';
import { RevenueTable } from '@/components/stats/RevenueTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { user } = useAuth();
  const [activities] = useState([
    {
      id: '1',
      title: 'Nouveau document ajouté',
      description: 'Mandat exclusif signé - 23 Rue des Lilas',
      time: 'Il y a 10 min',
      type: 'document' as const,
    },
    {
      id: '2',
      title: 'Message de Pierre Dupont',
      description: 'À propos du rendez-vous de demain...',
      time: 'Il y a 30 min',
      type: 'message' as const,
    },
    {
      id: '3',
      title: 'Palier de commission atteint',
      description: 'Félicitations! Vous êtes maintenant à 76%',
      time: 'Il y a 2h',
      type: 'notification' as const,
    },
    {
      id: '4',
      title: 'Rappel: Formation',
      description: 'Formation en ligne demain à 14h',
      time: 'Il y a 5h',
      type: 'alert' as const,
    },
  ]);

  // Récupérer la commission de l'agent
  const { data: agentCommission } = useQuery({
    queryKey: ['agentCommission', user?.id],
    queryFn: () => CommissionService.getAgentCommission(user?.id || '1'),
  });
  
  // Récupérer les revenus de l'agent
  const { data: agentRevenues } = useQuery({
    queryKey: ['agentRevenues', user?.id],
    queryFn: () => CommissionService.getAgentRevenues(user?.id || '1'),
  });
  
  // Récupérer les informations sur le prochain palier
  const { data: nextLevelInfo } = useQuery({
    queryKey: ['nextLevelInfo', user?.id],
    queryFn: () => CommissionService.getNextLevelProgress(user?.id || '1'),
  });

  // Fonction pour formater la devise
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
        <h1 className="text-3xl font-bold">Bonjour, {user?.user_metadata?.full_name || "Agent"}</h1>
        <p className="text-muted-foreground mt-1">Voici votre activité et vos performances du jour</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PerformanceCard
          title="Chiffre d'affaires"
          value={formatCurrency(agentCommission?.totalAmount || 0)}
          change={nextLevelInfo ? `${nextLevelInfo.currentPercentage}% de commission` : null}
          icon={<Wallet size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Ventes"
          value={formatCurrency(agentCommission?.salesAmount || 0)}
          change={`${agentRevenues?.filter(r => r.source === 'sale').length || 0} transactions`}
          icon={<Home size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Locations"
          value={formatCurrency(agentCommission?.rentalAmount || 0)}
          change={`${agentRevenues?.filter(r => r.source === 'rental').length || 0} transactions`}
          icon={<Key size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Gestion locative"
          value={formatCurrency(agentCommission?.propertyManagementAmount || 0)}
          icon={<Building size={24} className="text-noovimo-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progression de commission</h3>
            </div>
            
            {nextLevelInfo && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-medium">Taux actuel: {nextLevelInfo.currentPercentage}%</h4>
                    {nextLevelInfo.nextPercentage > nextLevelInfo.currentPercentage && (
                      <p className="text-sm text-muted-foreground">
                        Prochain palier: {nextLevelInfo.nextPercentage}%
                      </p>
                    )}
                  </div>
                  
                  <div className="p-2 px-4 bg-primary-foreground rounded-lg text-sm font-medium">
                    {formatCurrency(agentCommission?.totalAmount || 0)} / {nextLevelInfo.nextPercentage > nextLevelInfo.currentPercentage 
                      ? formatCurrency((agentCommission?.totalAmount || 0) + nextLevelInfo.amountNeeded) 
                      : "Palier max"}
                  </div>
                </div>
                
                <div className="w-full h-4 bg-secondary/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-noovimo-500 rounded-full transition-all duration-500"
                    style={{ width: `${nextLevelInfo.progress}%` }}
                  />
                </div>
                
                {nextLevelInfo.nextPercentage > nextLevelInfo.currentPercentage ? (
                  <p className="text-sm">
                    Il vous reste <span className="font-medium">{formatCurrency(nextLevelInfo.amountNeeded)}</span> d'honoraires pour atteindre le prochain palier de commission.
                  </p>
                ) : (
                  <p className="text-sm">Félicitations ! Vous avez atteint le taux de commission maximal de votre pack.</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <ActivityFeed activities={activities} />
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-lg font-semibold">Revenus récents</h3>
          
          <Tabs defaultValue="all" className="w-full sm:w-auto mt-2 sm:mt-0">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="sales">Ventes</TabsTrigger>
              <TabsTrigger value="rentals">Locations</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {agentRevenues && <RevenueTable revenues={agentRevenues.slice(0, 5)} />}
        </TabsContent>
        
        <TabsContent value="sales" className="mt-0">
          {agentRevenues && <RevenueTable revenues={agentRevenues.filter(r => r.source === 'sale').slice(0, 5)} />}
        </TabsContent>
        
        <TabsContent value="rentals" className="mt-0">
          {agentRevenues && <RevenueTable revenues={agentRevenues.filter(r => r.source === 'rental' || r.source === 'propertyManagement').slice(0, 5)} />}
        </TabsContent>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            Voir tous les revenus
          </Button>
        </div>
      </div>
      
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Actions recommandées</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <MessageCircle size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Répondre aux messages</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <FileText size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Signer le mandat en attente</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <TrendingUp size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Consulter votre progression</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
