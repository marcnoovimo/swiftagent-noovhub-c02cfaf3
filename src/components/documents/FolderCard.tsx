
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Folder } from 'lucide-react';

interface FolderCardProps {
  name: string;
  onClick: (folderId: string, folderName: string) => void;
}

const FolderCard = ({ name, onClick }: FolderCardProps) => (
  <Card 
    className="cursor-pointer hover:bg-accent/10 transition-colors"
    onClick={() => onClick(name.toLowerCase(), name)}
  >
    <CardContent className="p-4 flex items-center gap-3">
      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <Folder size={20} />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Dossier</p>
      </div>
    </CardContent>
  </Card>
);

export default FolderCard;
