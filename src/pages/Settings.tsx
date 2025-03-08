
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Settings as SettingsIcon, Mail, Calendar, Percent, Lock, Eye, EyeOff } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/context/AuthContext';
import { CommissionService } from '@/services/commissionService';
import { toast } from 'sonner';
import { CommissionPack, AgentCommission } from '@/types/commission';
import GoogleCalendarSync from '@/components/calendar/GoogleCalendarSync';

const Settings = () => {
  const { user } = useAuth();
  const [emailPassword, setEmailPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Récupérer les packs de commission
  const { data: packs } = useQuery({
    queryKey: ['commissionPacks'],
    queryFn: CommissionService.getCommissionPacks,
  });
  
  // Récupérer la commission de l'agent
  const { data: agentCommission } = useQuery({
    queryKey: ['agentCommission', user?.id],
    queryFn: () => CommissionService.getAgentCommission(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Récupérer les informations sur le prochain palier
  const { data: nextLevelInfo } = useQuery({
    queryKey: ['nextLevelInfo', user?.id],
    queryFn: () => CommissionService.getNextLevelProgress(user?.id || ''),
    enabled: !!user?.id,
  });

  // Fonction pour connecter le webmail OVH
  const connectWebmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailPassword) {
      toast.error("Veuillez entrer votre mot de passe");
      return;
    }
    
    // Simulation de connexion au webmail OVH
    setTimeout(() => {
      toast.success("Connexion au webmail OVH réussie", {
        description: "Vos emails seront synchronisés automatiquement"
      });
      setEmailPassword('');
    }, 1000);
  };
  
  // Fonction pour afficher le pack de commission
  const renderCommissionPack = () => {
    if (!agentCommission || !packs) return null;
    
    const currentPack = packs.find(p => p.id === agentCommission.packId);
    
    if (!currentPack) return (
      <div className="text-center p-4 bg-secondary/40 rounded-lg">
        <p>Aucun pack de commission assigné</p>
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">{currentPack.name}</h3>
            <p className="text-muted-foreground">{currentPack.description}</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground rounded-lg">
            <Percent className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">{agentCommission.currentPercentage}%</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-semibold">Votre progression</h4>
          
          {nextLevelInfo && nextLevelInfo.nextPercentage > nextLevelInfo.currentPercentage ? (
            <>
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
                Il vous reste <span className="font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(nextLevelInfo.amountNeeded)}</span> d'honoraires pour atteindre le prochain palier.
              </p>
            </>
          ) : (
            <p className="text-sm">Félicitations ! Vous avez atteint le palier maximal de votre pack.</p>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-semibold">Détails des barèmes</h4>
          
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
                {currentPack.ranges.map((range, index) => (
                  <tr key={index} className={`border-b ${agentCommission.currentPercentage === range.percentage ? 'bg-primary/10' : ''}`}>
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">
                      {range.minAmount.toLocaleString('fr-FR')}€ - {range.maxAmount === Infinity ? '+' : range.maxAmount.toLocaleString('fr-FR') + '€'}
                    </td>
                    <td className="py-2 px-3 font-medium">{range.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-muted-foreground italic">
            Les paliers de commission sont calculés sur les honoraires cumulés du 1er janvier au 31 décembre {currentPack.year}.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gérez vos préférences et connexions</p>
      </div>
      
      <Tabs defaultValue="commission" className="w-full">
        <TabsList className="mb-6 grid grid-cols-3 w-full max-w-[600px]">
          <TabsTrigger value="commission" className="flex items-center gap-2">
            <Percent className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Commission</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Agenda</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Barème de commission</CardTitle>
              <CardDescription>
                Votre barème de commission pour l'année {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderCommissionPack()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Email</CardTitle>
              <CardDescription>
                Connectez votre email professionnel Noovimo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={connectWebmail} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Email OVH Noovimo</h3>
                  <p className="text-sm text-muted-foreground">
                    Connectez votre adresse email OVH pour accéder à vos emails dans l'application.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Adresse email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user?.email || ''} 
                      readOnly 
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? 'text' : 'password'} 
                        value={emailPassword} 
                        onChange={(e) => setEmailPassword(e.target.value)}
                        placeholder="Entrez le mot de passe de votre email"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Votre mot de passe est utilisé uniquement pour la connexion à votre compte email et n'est pas stocké.
                    </p>
                  </div>
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Connecter mon email
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Agenda</CardTitle>
              <CardDescription>
                Synchronisez votre agenda avec Google Calendar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Google Calendar</h3>
                  <p className="text-sm text-muted-foreground">
                    Synchronisez vos rendez-vous avec Google Calendar pour une gestion simplifiée.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <GoogleCalendarSync />
                </div>
                
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Lock className="h-4 w-4" />
                    Confidentialité
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    L'application aura uniquement accès à vos événements d'agenda. Vous pouvez retirer l'accès à tout moment depuis votre compte Google.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
