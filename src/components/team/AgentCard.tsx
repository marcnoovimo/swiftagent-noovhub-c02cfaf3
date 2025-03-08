
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Phone, Mail, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-muted relative">
        <img
          src={agent.photo || "/placeholder.svg"}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3">
          <h3 className="font-bold truncate">{agent.name}</h3>
          <div className="flex items-center text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{agent.city}, {agent.department}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="grid gap-1 text-sm">
          <div className="flex items-center">
            <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <a href={`tel:${agent.phone}`} className="hover:text-primary">{agent.phone}</a>
          </div>
          <div className="flex items-center">
            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <a href={`mailto:${agent.email}`} className="hover:text-primary truncate">{agent.email}</a>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span>Agent depuis {agent.joinDate}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={`/profile/${agent.id}`} className="inline-flex items-center justify-center">
            Voir profil
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
