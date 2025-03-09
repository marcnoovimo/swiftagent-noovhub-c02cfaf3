
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TransactionItem = ({ propertyType, location, seller, buyer, dates, fees }: {
  propertyType: string;
  location: string;
  seller: string;
  buyer: string;
  dates: { contract: string; completion: string };
  fees: string;
}) => (
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
  // These would ideally come from an API or props in a real application
  const pendingTransactions = [
    {
      propertyType: 'Appartement',
      location: 'Nantes',
      seller: 'Dupont Jean',
      buyer: 'Martin Sophie',
      dates: {
        contract: '15/03/2023',
        completion: '15/06/2023',
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
        completion: '02/07/2023',
      },
      fees: '12 300 €',
    },
  ];

  const completedTransactions = [
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
            {pendingTransactions.map((transaction, index) => (
              <TransactionItem key={index} {...transaction} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTransactions.map((transaction, index) => (
              <TransactionItem key={index} {...transaction} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
