
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, Phone, Mail, Calendar, MapPin, Award, Heart, 
  Sailboat, Users, Cake, MessageCircle, Share2, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAgentById } from '@/services/teamService';
import { Agent } from '@/types/agent';

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: agent, isLoading, error } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgentById(id || ''),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-noovimo-500 font-bold text-xl">
            Chargement du profil...
          </div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h2 className="font-bold">Agent non trouvé</h2>
          <p>Impossible de charger les informations de cet agent.</p>
          <Button asChild className="mt-4">
            <Link to="/team">Retour à l'équipe</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/team">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold">Profil de l'agent</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Agent info card */}
        <div className="col-span-1">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <img
                src={agent.photo || "/placeholder.svg"}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                agent.status === 'active' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-500 text-white'
              }`}>
                {agent.status === 'active' ? 'Actif' : 'Inactif'}
              </div>
            </div>
            
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{agent.name}</h2>
              <div className="flex items-center text-sm text-muted-foreground mt-1 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{agent.city}, {agent.department}</span>
              </div>
              
              <div className="grid gap-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-noovimo-500" />
                  <a href={`tel:${agent.phone}`} className="hover:text-primary">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-noovimo-500" />
                  <a href={`mailto:${agent.email}`} className="hover:text-primary truncate">
                    {agent.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-noovimo-500" />
                  <span>Agent depuis {agent.joinDate}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <Button className="w-full" asChild>
                  <a href={`tel:${agent.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${agent.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un email
                  </a>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message interne
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {agent.specialties && agent.specialties.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold flex items-center mb-2">
                  <Award className="h-4 w-4 mr-2 text-noovimo-500" />
                  Spécialités
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((specialty, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right column - Bio and personal info */}
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="personal">Personnel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Biographie</h3>
                  {agent.bio ? (
                    <p className="text-muted-foreground">{agent.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">Cet agent n'a pas encore ajouté de biographie.</p>
                  )}
                  
                  {agent.mantra && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg italic text-center">
                      <blockquote className="text-foreground">
                        "{agent.mantra}"
                      </blockquote>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid gap-6">
                    {agent.passions && agent.passions.length > 0 && (
                      <div>
                        <h3 className="font-semibold flex items-center mb-2">
                          <Heart className="h-4 w-4 mr-2 text-noovimo-500" />
                          Passions
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.passions.map((passion, index) => (
                            <span 
                              key={index} 
                              className="bg-secondary/60 px-2 py-1 rounded-md text-sm"
                            >
                              {passion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {agent.favoriteSport && (
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 text-noovimo-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Sport favori</h4>
                          <p className="text-muted-foreground">{agent.favoriteSport}</p>
                        </div>
                      </div>
                    )}
                    
                    {agent.family && (
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 text-noovimo-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Famille</h4>
                          <p className="text-muted-foreground">{agent.family}</p>
                        </div>
                      </div>
                    )}
                    
                    {agent.birthday && (
                      <div className="flex items-start">
                        <Cake className="h-4 w-4 mr-2 text-noovimo-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Anniversaire</h4>
                          <p className="text-muted-foreground">{agent.birthday}</p>
                        </div>
                      </div>
                    )}
                    
                    {agent.idealVacation && (
                      <div className="flex items-start">
                        <Sailboat className="h-4 w-4 mr-2 text-noovimo-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Vacances idéales</h4>
                          <p className="text-muted-foreground">{agent.idealVacation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!agent.passions && !agent.favoriteSport && !agent.family && 
                   !agent.birthday && !agent.idealVacation && (
                    <div className="text-center p-4">
                      <p className="text-muted-foreground italic">
                        Cet agent n'a pas encore partagé d'informations personnelles.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
