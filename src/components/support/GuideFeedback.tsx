
import React from 'react';
import { Button } from '@/components/ui/button';

interface GuideFeedbackProps {
  lastUpdated: string;
}

const GuideFeedback: React.FC<GuideFeedbackProps> = ({ lastUpdated }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <p className="text-sm text-muted-foreground">
        Dernière mise à jour: {lastUpdated}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Ce guide vous a-t-il été utile?</span>
        <Button variant="outline" size="sm">Oui</Button>
        <Button variant="outline" size="sm">Non</Button>
      </div>
      <div className="mt-4">
        <p className="text-sm">
          Besoin d'aide supplémentaire? 
          <Button variant="link" className="px-1 h-auto">
            Contactez le support
          </Button>
          ou utilisez 
          <Button variant="link" className="px-1 h-auto">
            Arthur, notre assistant IA
          </Button>
        </p>
      </div>
    </div>
  );
};

export default GuideFeedback;
