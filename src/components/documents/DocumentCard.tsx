
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { File } from 'lucide-react';
import DocumentIcon from './DocumentIcon';

interface DocumentCardProps {
  id: string;
  name: string;
  type: string;
  category: string;
  onClick: (doc: any) => void;
}

const DocumentCard = ({ id, name, type, category, onClick }: DocumentCardProps) => (
  <Card 
    key={id} 
    className="cursor-pointer hover:bg-accent/10 transition-colors" 
    onClick={() => onClick({ id, name, type, category })}
  >
    <CardContent className="p-4 flex items-center gap-3">
      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <DocumentIcon type={type} />
      </div>
      <div>
        <p className="font-medium text-sm line-clamp-1">{name}</p>
        <p className="text-xs text-muted-foreground">{category}</p>
      </div>
    </CardContent>
  </Card>
);

export default DocumentCard;
