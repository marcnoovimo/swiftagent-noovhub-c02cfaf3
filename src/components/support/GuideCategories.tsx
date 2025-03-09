
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Guide, GuideCategory } from './types';
import { cn } from '@/lib/utils';
import SearchResultItem from './SearchResultItem';
import CategoryGuideList from './CategoryGuideList';

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
        <SearchResultItem 
          searchResults={searchResults}
          activeGuideId={activeGuide?.id}
          onGuideSelect={setActiveGuide}
        />
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
              <CategoryGuideList 
                guides={category.guides}
                activeGuideId={activeGuide?.id}
                onGuideSelect={setActiveGuide}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default GuideCategories;
