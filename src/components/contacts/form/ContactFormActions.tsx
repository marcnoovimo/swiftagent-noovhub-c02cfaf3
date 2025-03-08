
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';

interface ContactFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ContactFormActions: React.FC<ContactFormActionsProps> = ({ 
  onCancel, 
  isSubmitting = false 
}) => {
  return (
    <DialogFooter className="gap-2 sm:gap-0">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex items-center gap-2"
        disabled={isSubmitting}
      >
        <X className="h-4 w-4" /> Annuler
      </Button>
      <Button 
        type="submit" 
        className="flex items-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enregistrement...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" /> Enregistrer
          </>
        )}
      </Button>
    </DialogFooter>
  );
};

export default ContactFormActions;
