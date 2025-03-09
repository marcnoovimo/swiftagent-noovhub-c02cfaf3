
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RelatedGuide {
  id: string;
  title: string;
}

interface RelatedGuidesProps {
  guides: RelatedGuide[];
}

const RelatedGuides: React.FC<RelatedGuidesProps> = ({ guides }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="font-medium mb-4">Guides connexes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((guide, index) => (
          <div key={index} className="border rounded-md p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h4 className="font-medium">{guide.title}</h4>
            <Button 
              variant="ghost" 
              className="mt-2 h-8 px-2" 
              onClick={() => {}}>
              Voir le guide <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedGuides;
