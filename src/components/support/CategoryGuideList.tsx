
import React from 'react';
import { Guide } from './types';
import { cn } from '@/lib/utils';

interface CategoryGuideListProps {
  guides: Guide[];
  activeGuideId: string | undefined;
  onGuideSelect: (guide: Guide) => void;
}

const CategoryGuideList: React.FC<CategoryGuideListProps> = ({ 
  guides, 
  activeGuideId, 
  onGuideSelect 
}) => {
  return (
    <ul className="space-y-1 px-4 pb-2">
      {guides.map((guide) => (
        <li key={guide.id}>
          <button
            onClick={() => onGuideSelect(guide)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              activeGuideId === guide.id
                ? "bg-noovimo-50 text-noovimo-700 font-medium dark:bg-gray-700 dark:text-noovimo-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            {guide.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryGuideList;
