
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from './types';

interface DocumentBreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (id: string, name: string) => void;
}

const DocumentBreadcrumbs: React.FC<DocumentBreadcrumbsProps> = ({ 
  breadcrumbs, 
  onNavigate 
}) => {
  return (
    <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.id}>
          <span 
            className={`cursor-pointer hover:text-foreground ${index === breadcrumbs.length - 1 ? 'font-medium text-foreground' : ''}`}
            onClick={() => onNavigate(crumb.id, crumb.name)}
          >
            {crumb.name}
          </span>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight size={14} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DocumentBreadcrumbs;
