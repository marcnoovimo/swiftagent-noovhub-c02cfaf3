
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommissionRateCardProps {
  currentTier: string;
  nextTier: string;
  currentRate: string;
  nextRate: string;
  amountReached: number;
  tierTarget: number;
}

const CommissionRateCard: React.FC<CommissionRateCardProps> = ({
  currentTier = "0 € - 35 000 €",
  nextTier = "35 000 €",
  currentRate = "72%",
  nextRate = "76%",
  amountReached = 8750,
  tierTarget = 35000,
}) => {
  const percentProgress = (amountReached / tierTarget) * 100;
  const amountRemaining = tierTarget - amountReached;

  // Fonction pour formater les nombres avec maximum 2 décimales
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Mes honoraires cumulés € HT</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Palier actuel</p>
              <p className="text-sm text-muted-foreground">{currentTier}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{currentRate}</p>
              <p className="text-sm text-muted-foreground">de commission</p>
            </div>
          </div>
          
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full" 
              style={{ width: `${percentProgress}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            <p>{formatAmount(amountReached)} € atteints sur {formatAmount(tierTarget)} € pour le prochain palier ({nextRate})</p>
            <p className="font-medium text-foreground mt-1">{formatAmount(amountRemaining)} € restants</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionRateCard;
