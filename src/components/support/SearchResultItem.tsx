
import React from 'react';
import { Guide } from './types';
import { cn } from '@/lib/utils';

interface SearchResultItemProps {
  searchResults: Guide[];
  activeGuideId: string | undefined;
  onGuideSelect: (guide: Guide) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ 
  searchResults, 
  activeGuideId, 
  onGuideSelect 
}) => {
  return (
    <ul className="space-y-2">
      {searchResults.map((guide) => (
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

export default SearchResultItem;
