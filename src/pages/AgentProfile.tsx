
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  HeartHandshake,
  Trophy,
  Users,
  Cake,
  PalmTree,
  Quote
} from 'lucide-react';
import { fetchAgentById } from '@/services/teamService';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = React.useState(false);
  
  const { data: agent, isLoading, isError } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgentById(id || ''),
    enabled: !!id
  });

  const [formData, setFormData] = React.useState({
    bio: '',
    passions: '',
    favoriteSport: '',
    family: '',
    birthday: '',
    idealVacation: '',
    mantra: ''
  });

  React.useEffect(() => {
    if (agent) {
      setFormData({
        bio: agent.bio || '',
        passions: agent.passions ? agent.passions.join(', ') : '',
        favoriteSport: agent.favoriteSport || '',
        family: agent.family || '',
        birthday: agent.birthday || '',
        idealVacation: agent.idealVacation || '',
        mantra: agent.mantra || ''
      });
    }
  }, [agent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would save this data to the server
    toast.success("Profil mis à jour avec succès");
    setIsEditing(false);
  };

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

  if (isError || !agent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500 font-bold text-xl">
            Agent non trouvé
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profil de {agent.name}</h1>
        <p className="text-muted-foreground mt-1">Informations sur l'agent immobilier</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-card rounded-xl p-6 text-center lg:col-span-1">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-noovimo-100 border-4 border-white shadow-soft overflow-hidden dark:border-gray-800">
                <img 
                  src={agent.photo || "/placeholder.svg"} 
                  alt={agent.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold">{agent.name}</h2>
          <p className="text-muted-foreground text-sm mt-1">Conseiller immobilier</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <Mail size={16} className="text-noovimo-500" />
              </div>
              <a href={`mailto:${agent.email}`} className="text-sm hover:text-primary">{agent.email}</a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <Phone size={16} className="text-noovimo-500" />
              </div>
              <a href={`tel:${agent.phone}`} className="text-sm hover:text-primary">{agent.phone}</a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <MapPin size={16} className="text-noovimo-500" />
              </div>
              <span className="text-sm">{agent.city}, {agent.department}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <Calendar size={16} className="text-noovimo-500" />
              </div>
              <span className="text-sm">Agent depuis {agent.joinDate}</span>
            </div>
          </div>
          
          {agent.specialties && agent.specialties.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Spécialités</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {agent.specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-noovimo-100 dark:bg-noovimo-900 text-noovimo-800 dark:text-noovimo-100 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Bio and Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User size={20} className="text-noovimo-500" />
                Biographie
              </h3>
              
              {!isEditing && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </Button>
              )}
            </div>
            
            {!isEditing ? (
              <div className="space-y-4">
                {agent.bio && (
                  <div className="mb-4">
                    <p className="text-sm italic bg-secondary/30 p-4 rounded-lg">{agent.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agent.passions && agent.passions.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <HeartHandshake size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Passions</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agent.passions.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {agent.favoriteSport && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <Trophy size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sport favori</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agent.favoriteSport}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {agent.family && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <Users size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Famille</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agent.family}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {agent.birthday && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <Cake size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Anniversaire</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agent.birthday}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {agent.idealVacation && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <PalmTree size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Vacances idéales</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agent.idealVacation}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {agent.mantra && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary/70 shrink-0">
                        <Quote size={16} className="text-noovimo-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Mon mantra</h4>
                        <p className="text-sm text-muted-foreground mt-1 italic">
                          "{agent.mantra}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {!agent.bio && !agent.passions && !agent.favoriteSport && !agent.family && 
                 !agent.birthday && !agent.idealVacation && !agent.mantra && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Aucune information personnelle n'a été ajoutée
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => setIsEditing(true)}
                    >
                      Ajouter des informations
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Parlez de vous en quelques lignes..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passions">Mes passions (séparées par des virgules)</Label>
                    <Input
                      id="passions"
                      name="passions"
                      value={formData.passions}
                      onChange={handleInputChange}
                      placeholder="Lecture, Cuisine, Randonnée..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="favoriteSport">Sport favori</Label>
                    <Input
                      id="favoriteSport"
                      name="favoriteSport"
                      value={formData.favoriteSport}
                      onChange={handleInputChange}
                      placeholder="Tennis, Football, Yoga..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="family">Ma famille</Label>
                    <Input
                      id="family"
                      name="family"
                      value={formData.family}
                      onChange={handleInputChange}
                      placeholder="Marié(e), 2 enfants..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="birthday">Date d'anniversaire</Label>
                    <Input
                      id="birthday"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      placeholder="15 mars"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="idealVacation">Vacances idéales</Label>
                    <Input
                      id="idealVacation"
                      name="idealVacation"
                      value={formData.idealVacation}
                      onChange={handleInputChange}
                      placeholder="À la mer, à la montagne..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mantra">Mon mantra</Label>
                    <Input
                      id="mantra"
                      name="mantra"
                      value={formData.mantra}
                      onChange={handleInputChange}
                      placeholder="Une phrase qui vous inspire..."
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
