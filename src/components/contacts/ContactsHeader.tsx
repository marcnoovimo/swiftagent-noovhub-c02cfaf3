
import React from 'react';
import { PlusCircle, ScanLine, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactsHeaderProps {
  onOpenScanModal: () => void;
  onOpenImportExportModal: () => void;
  onOpenNewContactModal: () => void;
}

const ContactsHeader = ({ 
  onOpenScanModal, 
  onOpenImportExportModal, 
  onOpenNewContactModal 
}: ContactsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Répertoire des contacts</h1>
        <p className="text-muted-foreground mt-1">
          Gérez tous vos contacts professionnels en un seul endroit
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={onOpenScanModal} variant="outline" className="flex items-center gap-2">
          <ScanLine size={16} />
          <span className="hidden sm:inline">Scanner une carte</span>
        </Button>
        
        <Button onClick={onOpenImportExportModal} variant="outline" className="flex items-center gap-2">
          <Smartphone size={16} />
          <span className="hidden sm:inline">Synchroniser</span>
        </Button>
        
        <Button onClick={onOpenNewContactModal} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Nouveau contact</span>
        </Button>
      </div>
    </div>
  );
};

export default ContactsHeader;
