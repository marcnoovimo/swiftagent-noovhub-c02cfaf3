
import React from 'react';
import { FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentUploadButtonProps {
  onClick: () => void;
}

const DocumentUploadButton = ({ onClick }: DocumentUploadButtonProps) => (
  <Button className="flex items-center gap-2" onClick={onClick}>
    <FileUp size={16} />
    <span>Ajouter un document</span>
  </Button>
);

export default DocumentUploadButton;
