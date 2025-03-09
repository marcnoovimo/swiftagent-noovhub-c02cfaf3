
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContactScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactScanModal = ({ open, onOpenChange }: ContactScanModalProps) => (
  <div className={open ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50" : "hidden"}>
    <div className="bg-background p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Scanner une carte de visite</h2>
      <p className="text-muted-foreground mb-4">Fonctionnalité en cours de développement</p>
      <Button onClick={() => onOpenChange(false)}>Fermer</Button>
    </div>
  </div>
);

export default ContactScanModal;
