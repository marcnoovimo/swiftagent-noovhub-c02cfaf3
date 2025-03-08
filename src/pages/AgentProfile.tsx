
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAgentById } from '@/services/teamService';
import { Agent } from '@/types/agent';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Trophy, 
  Heart, 
  Cake, 
  Palmtree, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgent = async () => {
      if (id) {
        try {
          const agentData = await fetchAgentById(id);
          setAgent(agentData);
        } catch (error) {
          console.error("Erreur lors du chargement de l'agent:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAgent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="animate-pulse text-noovimo-600">Chargement...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-red-500">Agent non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne Profil */}
        <div className="col-span-1">
          <Card className="p-6 shadow-md h-full">
            <div className="flex flex-col items-center mb-6">
              {agent.photo ? (
                <img 
                  src={agent.photo} 
                  alt={agent.name} 
                  className="rounded-full w-32 h-32 object-cover border-4 border-noovimo-100"
                />
              ) : (
                <div className="rounded-full w-32 h-32 bg-noovimo-100 flex items-center justify-center text-noovimo-600 text-4xl">
                  <User size={64} />
                </div>
              )}
              <h1 className="text-2xl font-bold mt-4 text-center">{agent.name}</h1>
              <p className="text-muted-foreground">{agent.city}, {agent.department}</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {agent.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="min-w-5 h-5 text-noovimo-500" />
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <a href={`tel:${agent.phone}`} className="text-sm text-muted-foreground hover:text-noovimo-600">
                    {agent.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="min-w-5 h-5 text-noovimo-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href={`mailto:${agent.email}`} className="text-sm text-muted-foreground hover:text-noovimo-600 break-all">
                    {agent.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="min-w-5 h-5 text-noovimo-500" />
                <div>
                  <p className="text-sm font-medium">Localisation</p>
                  <p className="text-sm text-muted-foreground">{agent.city}, {agent.department}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="min-w-5 h-5 text-noovimo-500" />
                <div>
                  <p className="text-sm font-medium">Date d'arrivée</p>
                  <p className="text-sm text-muted-foreground">{agent.joinDate}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Colonne Informations personnelles */}
        <div className="col-span-1 lg:col-span-2">
          <Card className="p-6 shadow-md h-full">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Informations personnelles</h2>
            
            <div className="space-y-6">
              {agent.bio && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <User className="h-5 w-5 text-noovimo-500" />
                    Biographie
                  </h3>
                  <p className="text-muted-foreground pl-7">{agent.bio}</p>
                </div>
              )}
              
              {agent.specialties && agent.specialties.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-noovimo-500" />
                    Spécialités
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {agent.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-noovimo-50 text-noovimo-600 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {agent.passions && agent.passions.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Heart className="h-5 w-5 text-noovimo-500" />
                    Passions
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {agent.passions.map((passion, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        {passion}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {agent.family && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Users className="h-5 w-5 text-noovimo-500" />
                    Famille
                  </h3>
                  <p className="text-muted-foreground pl-7">{agent.family}</p>
                </div>
              )}
              
              {agent.birthday && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Cake className="h-5 w-5 text-noovimo-500" />
                    Anniversaire
                  </h3>
                  <p className="text-muted-foreground pl-7">{agent.birthday}</p>
                </div>
              )}
              
              {agent.favoriteSport && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-noovimo-500" />
                    Sport favori
                  </h3>
                  <p className="text-muted-foreground pl-7">{agent.favoriteSport}</p>
                </div>
              )}
              
              {agent.idealVacation && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Palmtree className="h-5 w-5 text-noovimo-500" />
                    Vacances idéales
                  </h3>
                  <p className="text-muted-foreground pl-7">{agent.idealVacation}</p>
                </div>
              )}
              
              {agent.mantra && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-noovimo-500" />
                    Mantra
                  </h3>
                  <p className="text-muted-foreground pl-7">"{agent.mantra}"</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
