
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="space-y-4">
      <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-destructive">Confirmer la suppression</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button 
          variant="destructive"
          onClick={onConfirm}
        >
          Supprimer définitivement
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
