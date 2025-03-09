
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AgentMap from '@/components/team/AgentMap';
import AgentCard from '@/components/team/AgentCard';
import { Agent } from '@/types/agent';
import { fetchAgents } from '@/services/teamService';
import { Helmet } from 'react-helmet';

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  });

  const filteredAgents = agents?.filter((agent) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(query) ||
      agent.city.toLowerCase().includes(query) ||
      agent.department.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>Equipe Noovimo | Intranet Noovimo</title>
        </Helmet>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-noovimo-500 font-bold text-xl">
            Chargement de l'équipe...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <Helmet>
        <title>Equipe Noovimo | Intranet Noovimo</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Equipe Noovimo</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Découvrez les agents Noovimo près de chez vous
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, ville ou département..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Tabs defaultValue="map" className="w-auto" onValueChange={(value) => setViewMode(value as 'map' | 'list')}>
          <TabsList>
            <TabsTrigger value="map">Carte</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs defaultValue="map" value={viewMode} className="w-full">
        <TabsContent value="map" className="mt-0">
          <div className="glass-card rounded-xl overflow-hidden p-0 shadow-md border border-gray-100 dark:border-gray-800">
            <AgentMap agents={filteredAgents || []} />
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAgents?.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            
            {filteredAgents?.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center h-64 text-muted-foreground">
                <MapPin className="h-12 w-12 mb-4 text-muted-foreground/50" />
                <p>Aucun agent trouvé pour cette recherche</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Effacer la recherche
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team;
