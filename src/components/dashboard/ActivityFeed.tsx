
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface Activity {
  id: string;
  type: 'vente' | 'location' | 'mandat' | 'facture' | 'commission' | 'message';
  title: string;
  description: string;
  date: string;
  user: {
    name: string;
    avatar?: string;
  };
  status?: 'pending' | 'completed' | 'rejected';
}

export interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  // S'assurer que activities est un tableau (protection contre undefined)
  const safeActivities = activities || [];
  
  // Filtrer les activités par type
  const salesActivities = safeActivities.filter(a => a.type === 'vente' || a.type === 'mandat');
  const invoiceActivities = safeActivities.filter(a => a.type === 'facture' || a.type === 'commission');
  const messageActivities = safeActivities.filter(a => a.type === 'message' || a.type === 'location');

  const renderActivities = (items: Activity[]) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-muted-foreground">Aucune activité récente</p>
        </div>
      );
    }

    return items.map((activity) => (
      <div key={activity.id} className="mb-4 last:mb-0">
        <div className="flex items-start gap-3 w-full">
          <Avatar className="h-8 w-8 border border-border flex-shrink-0">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-medium leading-none truncate max-w-[70%]">{activity.title}</p>
              <p className="text-xs text-muted-foreground flex-shrink-0">
                {format(new Date(activity.date), 'PP', { locale: fr })}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 break-words">{activity.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Activité récente</CardTitle>
        <CardDescription>Suivez les dernières activités</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all">
          <TabsList className="w-full flex-wrap px-4 sm:px-6 pt-2 border-b overflow-x-hidden">
            <TabsTrigger value="all" className="text-xs whitespace-nowrap">Tout</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs whitespace-nowrap">Ventes</TabsTrigger>
            <TabsTrigger value="invoices" className="text-xs whitespace-nowrap">Factures</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs whitespace-nowrap">Messages</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[300px]">
            <div className="px-4 sm:px-6 py-4">
              <TabsContent value="all" className="m-0">
                {renderActivities(safeActivities)}
              </TabsContent>
              <TabsContent value="sales" className="m-0">
                {renderActivities(salesActivities)}
              </TabsContent>
              <TabsContent value="invoices" className="m-0">
                {renderActivities(invoiceActivities)}
              </TabsContent>
              <TabsContent value="messages" className="m-0">
                {renderActivities(messageActivities)}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
