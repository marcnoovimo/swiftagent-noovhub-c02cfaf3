
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Activity, Award, Calendar, FileText, Mail, MapPin, Phone, User } from 'lucide-react';
import { CommissionService } from '@/services/commissionService';
import RevenueTable from '@/components/stats/RevenueTable';
import CommissionPackSelector from '@/components/agent/CommissionPackSelector';

const Profile = () => {
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
  
  const { data: revenues } = useQuery({
    queryKey: ['agentRevenues', user?.id],
    queryFn: () => CommissionService.getAgentRevenues(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Données fictives pour l'affichage
  const agent = {
    ...user,
    role: 'Agent mandataire',
    location: 'Nantes',
    status: 'active',
    joinDate: '2021-05-15',
    phone: '06 12 34 56 78',
    address: '15 rue des Fleurs, 44000 Nantes',
    licensedSince: '2018-03-10',
  };
  
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Profil</CardTitle>
              <Badge variant={agent.status === 'active' ? 'default' : 'outline'}>
                {agent.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{agent.name}</h2>
                <p className="text-muted-foreground">{agent.role}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{agent.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Chez Noovimo depuis {format(new Date(agent.joinDate), 'MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Agent immobilier depuis {format(new Date(agent.licensedSince), 'yyyy', { locale: fr })}</span>
                </div>
              </div>
              
              {agent.id && (
                <CommissionPackSelector agent={agent} isAdmin={false} />
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="mb-4 grid grid-cols-2 w-full max-w-[400px]">
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ventes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(agentCommission?.salesAmount || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Honoraires cumulés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(agentCommission?.rentalAmount || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Honoraires cumulés</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Gestion locative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(agentCommission?.propertyManagementAmount || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Honoraires cumulés</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Synthèse des commissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total des honoraires</p>
                      <p className="text-2xl font-bold">{formatCurrency(agentCommission?.totalAmount || 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pack actuel</p>
                      <p className="text-lg font-semibold">{commissionPack?.name || 'Non assigné'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taux de commission</p>
                      <p className="text-xl font-bold">{agentCommission?.currentPercentage || 0}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Historique des revenus</h4>
                    <RevenueTable revenues={revenues || []} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Aucun document disponible pour le moment
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
