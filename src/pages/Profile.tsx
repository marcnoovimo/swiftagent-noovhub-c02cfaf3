
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  BadgeCheck, 
  Edit, 
  Upload,
  Award,
  FileText,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Agent } from '@/types/agent';
import CommissionPackSelector from '@/components/agent/CommissionPackSelector';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Données factices pour un agent, en attendant une API réelle
  const demoAgent: Agent = {
    id: user?.id || '1',
    name: user?.user_metadata?.full_name || 'Agent Noovimo',
    email: user?.email || 'agent@noovimo.fr',
    role: 'Agent immobilier',
    location: 'Nantes, France',
    status: 'Actif',
    joinDate: '2021-06-15',
    phone: '+33 6 12 34 56 78',
    address: '12 rue de la Paix, 44000 Nantes',
    licensedSince: '2020-01-10',
    avatar: user?.user_metadata?.avatar_url || '',
    city: 'Nantes',
    department: '44',
    latitude: 47.2173,
    longitude: -1.5534,
    bio: "Agent immobilier passionné avec plus de 3 ans d'expérience dans le secteur immobilier nantais.",
    specialties: ['Appartements', 'Maisons', 'Locaux commerciaux']
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Mon profil | Intranet Noovimo</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Mon profil</h1>
          <p className="text-sm text-muted-foreground">
            Consultez et modifiez vos informations personnelles
          </p>
        </div>
        
        <Button variant="outline" size="sm" className="self-start">
          <Edit className="h-4 w-4 mr-2" />
          Modifier le profil
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={demoAgent.avatar} alt={demoAgent.name} />
                <AvatarFallback>{demoAgent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-lg font-semibold">{demoAgent.name}</h2>
                <p className="text-sm text-muted-foreground">{demoAgent.role}</p>
                <div className="flex items-center justify-center mt-1">
                  <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{demoAgent.location}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Changer la photo
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{demoAgent.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{demoAgent.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Rejoint le {new Date(demoAgent.joinDate).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Agent depuis {new Date(demoAgent.licensedSince).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <CommissionPackSelector agent={demoAgent} />
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations détaillées</CardTitle>
              <CardDescription>Votre profil professionnel</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="stats">Statistiques</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Présentation</h3>
                    <p className="text-sm text-muted-foreground">{demoAgent.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Spécialités</h3>
                    <div className="flex flex-wrap gap-2">
                      {demoAgent.specialties?.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Adresse professionnelle</h3>
                    <p className="text-sm text-muted-foreground">{demoAgent.address}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Carte professionnelle</p>
                        <p className="text-xs text-muted-foreground">Validée jusqu'au 31/12/2023</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Attestation formation</p>
                        <p className="text-xs text-muted-foreground">Mai 2022</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-10 w-10 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Contrat de partenariat</p>
                        <p className="text-xs text-muted-foreground">Juin 2021</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Les statistiques détaillées sont disponibles dans la section Statistiques</p>
                    <Button variant="outline" className="mt-4">
                      Voir mes statistiques
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function Download(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export default Profile;
