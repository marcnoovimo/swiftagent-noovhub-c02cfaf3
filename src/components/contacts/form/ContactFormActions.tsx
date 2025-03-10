
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface ContactFormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
  isMobile?: boolean;
}

const ContactFormActions: React.FC<ContactFormActionsProps> = ({ 
  onCancel, 
  isEditing,
  isMobile = false
}) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row justify-end space-x-2'} mt-6`}>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className={`${isMobile ? 'w-full' : ''}`}
      >
        <X className="mr-2 h-4 w-4" />
        Annuler
      </Button>
      
      <Button 
        type="submit"
        className={`${isMobile ? 'w-full' : ''}`}
      >
        <Check className="mr-2 h-4 w-4" />
        {isEditing ? 'Enregistrer les modifications' : 'Créer le contact'}
      </Button>
    </div>
  );
};

export default ContactFormActions;
