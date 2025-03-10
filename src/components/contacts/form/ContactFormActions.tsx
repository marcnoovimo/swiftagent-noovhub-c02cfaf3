
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from "@/components/ui/dialog";

interface ContactFormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const ContactFormActions: React.FC<ContactFormActionsProps> = ({ onCancel, isEditing }) => {
  return (
    <DialogFooter className="mt-6 pt-4 border-t">
      <Button type="button" variant="outline" onClick={onCancel} className="bg-white dark:bg-gray-950">
        Annuler
      </Button>
      <Button type="submit" className="bg-noovimo-500 hover:bg-noovimo-600 text-white">
        {isEditing ? 'Mettre à jour' : 'Enregistrer'}
      </Button>
    </DialogFooter>
  );
};

export default ContactFormActions;
