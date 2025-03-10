
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailDialogHeaderProps {
  onClose: () => void;
}

const EmailDialogHeader = ({ onClose }: EmailDialogHeaderProps) => {
  return (
    <div className="p-4 border-b border-border flex justify-between items-center">
      <h3 className="font-medium">Nouveau message</h3>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
        <X size={18} />
      </Button>
    </div>
  );
};

export default EmailDialogHeader;
