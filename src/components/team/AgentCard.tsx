
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Phone, Mail, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types/agent';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-square sm:aspect-[4/3] bg-muted relative">
        <img
          src={agent.photo || "/placeholder.svg"}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
          <h3 className="font-bold text-base md:text-lg truncate">{agent.name}</h3>
          <div className="flex items-center text-xs">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{agent.city}, {agent.department}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3 flex-grow">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center">
            <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground flex-shrink-0" />
            <a href={`tel:${agent.phone}`} className="hover:text-primary truncate" title={agent.phone}>{agent.phone}</a>
          </div>
          <div className="flex items-center">
            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground flex-shrink-0" />
            <a href={`mailto:${agent.email}`} className="hover:text-primary truncate" title={agent.email}>{agent.email}</a>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground flex-shrink-0" />
            <span className="truncate" title={`Agent depuis ${agent.joinDate}`}>Agent depuis {agent.joinDate}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 mt-auto">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button 
            variant="destructive" 
            size={isMobile ? "sm" : "default"} 
            className="w-full" 
            asChild
          >
            <a href={`tel:${agent.phone}`} className="inline-flex items-center justify-center">
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              Appeler
            </a>
          </Button>
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"} 
            className="w-full" 
            asChild
          >
            <Link to={`/agent/${agent.id}`} className="inline-flex items-center justify-center">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Profil
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
