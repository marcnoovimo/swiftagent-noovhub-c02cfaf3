
import React from 'react';
import { Agent } from '@/types/agent';
import { Phone, Mail, Calendar, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentMapPopupProps {
  agent: Agent;
  onClose: () => void;
  onViewProfile: () => void;
}

const AgentMapPopup: React.FC<AgentMapPopupProps> = ({ agent, onClose, onViewProfile }) => {
  return (
    <div className="agent-popup p-1 min-w-[220px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-sm">{agent.name}</h3>
          <p className="text-xs text-muted-foreground">{agent.city}, {agent.department}</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid gap-1 text-xs mb-2">
        <div className="flex items-center">
          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
          <a href={`tel:${agent.phone}`} className="hover:text-primary">{agent.phone}</a>
        </div>
        <div className="flex items-center">
          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
          <a href={`mailto:${agent.email}`} className="hover:text-primary truncate">{agent.email}</a>
        </div>
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
          <span>Agent depuis {agent.joinDate}</span>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full text-xs h-7" onClick={onViewProfile}>
        Voir profil
        <ExternalLink className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
};

export default AgentMapPopup;
