
import React from 'react';
import { ArrowRight, Eye, ThumbsUp } from 'lucide-react';
import { Guide } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PopularGuidesProps {
  guides: Guide[];
  setActiveGuide: (guide: Guide) => void;
}

const PopularGuides: React.FC<PopularGuidesProps> = ({ guides, setActiveGuide }) => {
  // Get guides sorted by views
  const popularGuides = [...guides]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 8);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularGuides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {guide.excerpt || guide.content.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{guide.views || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{guide.likes || 0}</span>
                  </div>
                </div>
                <button 
                  className="text-noovimo-600 hover:text-noovimo-800 dark:text-noovimo-400 dark:hover:text-noovimo-200 inline-flex items-center text-sm font-medium"
                  onClick={() => setActiveGuide(guide)}
                >
                  Lire <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularGuides;
