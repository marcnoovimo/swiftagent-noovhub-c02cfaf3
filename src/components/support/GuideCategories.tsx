
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Guide, GuideCategory } from './types';
import { cn } from '@/lib/utils';

interface GuideCategoriesProps {
  categories: GuideCategory[];
  activeGuide: Guide | null;
  setActiveGuide: (guide: Guide) => void;
  searchResults: Guide[];
  searchQuery: string;
}

const GuideCategories: React.FC<GuideCategoriesProps> = ({ 
  categories, 
  activeGuide, 
  setActiveGuide,
  searchResults,
  searchQuery
}) => {
  if (searchQuery && searchResults.length > 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
        <h3 className="font-medium mb-4">Résultats de recherche ({searchResults.length})</h3>
        <ul className="space-y-2">
          {searchResults.map((guide) => (
            <li key={guide.id}>
              <button
                onClick={() => setActiveGuide(guide)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeGuide?.id === guide.id
                    ? "bg-noovimo-50 text-noovimo-700 font-medium dark:bg-gray-700 dark:text-noovimo-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {guide.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border">
      <Accordion type="multiple" defaultValue={categories.map(cat => cat.id)} className="w-full">
        {categories.map((category) => (
          <AccordionItem value={category.id} key={category.id}>
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                {category.icon && <category.icon className="h-4 w-4" />}
                <span>{category.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 px-4 pb-2">
                {category.guides.map((guide) => (
                  <li key={guide.id}>
                    <button
                      onClick={() => setActiveGuide(guide)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        activeGuide?.id === guide.id
                          ? "bg-noovimo-50 text-noovimo-700 font-medium dark:bg-gray-700 dark:text-noovimo-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      {guide.title}
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default GuideCategories;
