
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Transaction = {
  propertyType: string;
  location: string;
  seller: string;
  buyer: string;
  dates: { contract: string; completion: string };
  fees: string;
};

const TransactionItem = ({ propertyType, location, seller, buyer, dates, fees }: Transaction) => (
  <div className="rounded-lg border">
    <div className="p-4 flex justify-between items-start">
      <div className="space-y-1">
        <p className="font-medium">{propertyType} à {location}</p>
        <p className="text-sm text-muted-foreground">Vendeur: {seller}</p>
        <p className="text-sm text-muted-foreground">Acquéreur: {buyer}</p>
        <div className="flex gap-4 mt-1">
          <p className="text-xs text-muted-foreground">Avant-contrat: {dates.contract}</p>
          <p className="text-xs text-muted-foreground">
            {dates.completion.includes('prévu') ? 'Acte prévu' : 'Acte final'}: {dates.completion}
          </p>
        </div>
      </div>
      <div className="text-right whitespace-nowrap">
        <p className="font-bold">{fees}</p>
        <p className="text-xs text-muted-foreground">Honoraires</p>
      </div>
    </div>
  </div>
);

const TransactionsCard: React.FC = () => {
  const [showMorePending, setShowMorePending] = useState(false);
  const [showMoreCompleted, setShowMoreCompleted] = useState(false);
  
  // Ces données viendraient idéalement d'une API dans une application réelle
  const pendingTransactions: Transaction[] = [
    {
      propertyType: 'Appartement',
      location: 'Nantes',
      seller: 'Dupont Jean',
      buyer: 'Martin Sophie',
      dates: {
        contract: '15/03/2023',
        completion: '15/06/2023 prévu',
      },
      fees: '7 500 €',
    },
    {
      propertyType: 'Maison',
      location: 'Saint-Herblain',
      seller: 'Leroy Michel',
      buyer: 'Petit Laura',
      dates: {
        contract: '02/04/2023',
        completion: '02/07/2023 prévu',
      },
      fees: '12 300 €',
    },
  ];

  const completedTransactions: Transaction[] = [
    {
      propertyType: 'Appartement',
      location: 'Nantes',
      seller: 'Moreau Philippe',
      buyer: 'Thomas Pierre',
      dates: {
        contract: '01/02/2023',
        completion: '01/04/2023',
      },
      fees: '8 400 €',
    },
  ];

  return (
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
            {pendingTransactions.length > 0 && (
              <TransactionItem {...pendingTransactions[0]} />
            )}
            
            {pendingTransactions.length > 1 && showMorePending && (
              <div className="space-y-4 mt-4">
                {pendingTransactions.slice(1).map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </div>
            )}
            
            {pendingTransactions.length > 1 && (
              <Button 
                variant="ghost" 
                className="w-full text-sm flex items-center justify-center" 
                onClick={() => setShowMorePending(!showMorePending)}
              >
                {showMorePending ? (
                  <>Voir moins <ChevronUp className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Voir plus ({pendingTransactions.length - 1}) <ChevronDown className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTransactions.length > 0 && (
              <TransactionItem {...completedTransactions[0]} />
            )}
            
            {completedTransactions.length > 1 && showMoreCompleted && (
              <div className="space-y-4 mt-4">
                {completedTransactions.slice(1).map((transaction, index) => (
                  <TransactionItem key={index} {...transaction} />
                ))}
              </div>
            )}
            
            {completedTransactions.length > 1 && (
              <Button 
                variant="ghost" 
                className="w-full text-sm flex items-center justify-center" 
                onClick={() => setShowMoreCompleted(!showMoreCompleted)}
              >
                {showMoreCompleted ? (
                  <>Voir moins <ChevronUp className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Voir plus ({completedTransactions.length - 1}) <ChevronDown className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
