
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';

interface ContactFormActionsProps {
  onCancel: () => void;
}

const ContactFormActions: React.FC<ContactFormActionsProps> = ({ onCancel }) => {
  return (
    <DialogFooter className="gap-2 sm:gap-0">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex items-center gap-2"
      >
        <X className="h-4 w-4" /> Annuler
      </Button>
      <Button type="submit" className="flex items-center gap-2">
        <Save className="h-4 w-4" /> Enregistrer
      </Button>
    </DialogFooter>
  );
};

export default ContactFormActions;
