
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Guide } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuideHeader from './GuideHeader';
import GuideBody from './GuideBody';
import RelatedGuides from './RelatedGuides';
import GuideFeedback from './GuideFeedback';

interface GuideContentProps {
  activeGuide: Guide | null;
  searchResults: Guide[];
  searchQuery: string;
}

const GuideContent: React.FC<GuideContentProps> = ({ 
  activeGuide,
  searchResults,
  searchQuery
}) => {
  if (!activeGuide) {
    return (
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Sélectionnez un guide pour voir son contenu</p>
      </div>
    );
  }

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardContent className="p-6">
        <GuideHeader 
          title={activeGuide.title}
          tags={activeGuide.tags}
        />
        
        <GuideBody 
          content={activeGuide.content}
          searchQuery={searchQuery}
        />
        
        {activeGuide.relatedGuides && activeGuide.relatedGuides.length > 0 && (
          <RelatedGuides guides={activeGuide.relatedGuides} />
        )}
        
        <GuideFeedback lastUpdated={activeGuide.lastUpdated} />
      </CardContent>
    </Card>
  );
};

export default GuideContent;
