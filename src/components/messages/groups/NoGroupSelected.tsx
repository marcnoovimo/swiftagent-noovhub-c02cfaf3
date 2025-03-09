
import React from 'react';
import { Users } from 'lucide-react';

const NoGroupSelected = () => {
  return (
    <div className="md:col-span-2 flex items-center justify-center">
      <div className="text-center p-6">
        <Users size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Aucun groupe sélectionné</h3>
        <p className="text-muted-foreground">
          Sélectionnez un groupe pour commencer à discuter
        </p>
      </div>
    </div>
  );
};

export default NoGroupSelected;
