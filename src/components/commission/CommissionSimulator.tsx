
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, TrendingUp } from 'lucide-react';
import { CommissionService } from '@/services/commissionService';
import { CommissionSimulation } from '@/types/commission';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const CommissionSimulator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [additionalAmount, setAdditionalAmount] = useState(50000);
  const [simulation, setSimulation] = useState<CommissionSimulation | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: agentCommission, isLoading } = useQuery({
    queryKey: ['agentCommission', user?.id],
    queryFn: () => CommissionService.getAgentCommission(user?.id || ''),
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateSimulation = async () => {
    if (!agentCommission) return;
    
    setLoading(true);
    try {
      const result = await CommissionService.simulateCommission({
        agentId: user?.id || '',
        additionalAmount
      });
      
      setSimulation(result);
    } catch (error) {
      console.error('Error calculating simulation:', error);
      toast({
        title: "Erreur",
        description: "Impossible de calculer la simulation. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentCommission) {
      calculateSimulation();
    }
  }, [agentCommission]);

  const handleSliderChange = (value: number[]) => {
    setAdditionalAmount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
    setAdditionalAmount(value);
  };

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Simulation de revenus</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          Simulation de revenus
        </CardTitle>
        <CardDescription>
          Estimez vos futurs revenus en fonction de vos ventes prévues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Ventes supplémentaires estimées</label>
              <div className="w-1/3">
                <Input 
                  type="text" 
                  value={formatCurrency(additionalAmount).replace('€', '').trim()}
                  onChange={handleInputChange}
                  className="text-right"
                />
              </div>
            </div>
            
            <Slider 
              value={[additionalAmount]} 
              min={0}
              max={250000}
              step={5000}
              onValueChange={handleSliderChange}
              className="mt-2"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 €</span>
              <span>250 000 €</span>
            </div>
          </div>
          
          <Button 
            onClick={calculateSimulation} 
            disabled={loading || !agentCommission}
            className="w-full"
          >
            {loading ? "Calcul en cours..." : "Calculer ma simulation"}
          </Button>
          
          {simulation && (
            <div className="mt-4 space-y-4 bg-primary/5 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Honoraires actuels:</span>
                  <span className="font-semibold">{formatCurrency(simulation.baseAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Honoraires additionnels:</span>
                  <span className="font-semibold text-primary">{formatCurrency(simulation.additionalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Total estimé:</span>
                  <span className="font-bold">{formatCurrency(simulation.estimatedTotal)}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Taux actuel:</span>
                  <span className="font-semibold">{simulation.currentPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taux estimé:</span>
                  <span className={`font-semibold ${simulation.estimatedPercentage > simulation.currentPercentage ? 'text-primary' : ''}`}>
                    {simulation.estimatedPercentage}%
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Commission actuelle:</span>
                  <span className="font-semibold">{formatCurrency(simulation.currentCommission)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Commission estimée:</span>
                  <span className="font-semibold">{formatCurrency(simulation.estimatedCommission)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Gain potentiel:</span>
                  <span className="font-bold text-primary">{formatCurrency(simulation.increasedCommission)}</span>
                </div>
              </div>
              
              {simulation.nextThreshold && (
                <div className="pt-2 border-t border-border">
                  <div className="text-sm flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>
                      Il vous manque <strong>{formatCurrency(simulation.nextThreshold - simulation.estimatedTotal)}</strong> pour atteindre le prochain palier.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionSimulator;
