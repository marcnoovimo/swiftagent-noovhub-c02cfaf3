
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Phone, Mail, MapPin, Calendar, Heart, Medal, ArrowLeft, Clock, Send, User, ExternalLink } from 'lucide-react';
import { fetchAgentById } from '@/services/teamService';
import { useIsMobile } from '@/hooks/use-mobile';

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const { data: agent, isLoading, error } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgentById(id || ''),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-noovimo-500 font-bold text-xl">
            Chargement du profil de l'agent...
          </div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Agent non trouvé</h2>
          <p className="text-muted-foreground mb-6">
            Nous n'avons pas pu trouver les informations de cet agent.
          </p>
          <Button onClick={() => navigate('/team')}>
            Retour à l'équipe
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-4 md:mb-6" 
        onClick={() => navigate('/team')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'équipe
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Profil principal */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                <AvatarImage src={agent.photo} alt={agent.name} />
                <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl md:text-2xl font-bold mb-1">{agent.name}</h1>
              <p className="text-muted-foreground mb-4 flex items-center justify-center text-sm md:text-base">
                <MapPin className="h-4 w-4 mr-1 inline-flex" /> 
                {agent.city}, {agent.department}
              </p>
              
              <div className="w-full space-y-3 mt-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium">Téléphone</p>
                    <a href={`tel:${agent.phone}`} className="text-sm text-primary hover:underline">
                      {agent.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col items-start overflow-hidden">
                    <p className="text-sm font-medium">Email</p>
                    <a 
                      href={`mailto:${agent.email}`} 
                      className="text-sm text-primary hover:underline truncate w-full"
                      title={agent.email}
                    >
                      {agent.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium">Chez Noovimo depuis</p>
                    <p className="text-sm">{agent.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <Button variant="default" className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Send className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Informations détaillées */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <div className="border-b px-4 md:px-6 pt-4 md:pt-6">
              <TabsList className="w-full justify-start overflow-x-auto no-scrollbar">
                <TabsTrigger value="about" className="px-3 md:px-4">À propos</TabsTrigger>
                <TabsTrigger value="expertise" className="px-3 md:px-4">Expertise</TabsTrigger>
                <TabsTrigger value="personal" className="px-3 md:px-4">Personnel</TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="p-4 md:p-6">
              <TabsContent value="about" className="mt-0 space-y-4">
                {agent.bio ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2">Biographie</h3>
                    <p className="text-muted-foreground">{agent.bio}</p>
                  </>
                ) : (
                  <p className="text-muted-foreground">Aucune biographie disponible.</p>
                )}
                
                {agent.mantra && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Devise professionnelle</h3>
                    <div className="bg-secondary p-4 rounded-lg italic">
                      "{agent.mantra}"
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="expertise" className="mt-0 space-y-4">
                <h3 className="text-lg font-semibold mb-2">Spécialités</h3>
                {agent.specialties && agent.specialties.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aucune spécialité définie.</p>
                )}
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Secteur géographique</h3>
                <p className="text-muted-foreground">{agent.city} et ses environs</p>
              </TabsContent>
              
              <TabsContent value="personal" className="mt-0 space-y-4">
                {agent.passions && agent.passions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Passions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.passions.map((passion, index) => (
                        <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                          {passion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {agent.favoriteSport && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Sport favori</h3>
                    <p className="text-muted-foreground">{agent.favoriteSport}</p>
                  </div>
                )}
                
                {agent.family && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Famille</h3>
                    <p className="text-muted-foreground">{agent.family}</p>
                  </div>
                )}
                
                {agent.idealVacation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Vacances idéales</h3>
                    <p className="text-muted-foreground">{agent.idealVacation}</p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Voir profil complet - Mobile only */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" className="rounded-full h-12 w-12 bg-primary shadow-lg">
                <User className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-3 rounded-none"
                onClick={() => navigate(`/agent/${agent.id}/profile`)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir profil complet
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default AgentDetail;
