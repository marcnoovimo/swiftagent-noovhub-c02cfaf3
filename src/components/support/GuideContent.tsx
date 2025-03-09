
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Guide } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  // Highlight search terms in content
  const highlightContent = (content: string, query: string) => {
    if (!query.trim()) return content;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return content.split(regex).map((part, i) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>;
      }
      return part;
    });
  };

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{activeGuide.title}</h2>
          <div className="flex gap-2 text-sm text-muted-foreground mb-4">
            {activeGuide.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          {searchQuery.trim() 
            ? <div>{highlightContent(activeGuide.content, searchQuery)}</div>
            : <div dangerouslySetInnerHTML={{ __html: activeGuide.content }} />
          }
        </div>
        
        {activeGuide.relatedGuides && activeGuide.relatedGuides.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium mb-4">Guides connexes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeGuide.relatedGuides.map((guide, index) => (
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
        )}
        
        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour: {activeGuide.lastUpdated}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ce guide vous a-t-il été utile?</span>
            <Button variant="outline" size="sm">Oui</Button>
            <Button variant="outline" size="sm">Non</Button>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              Besoin d'aide supplémentaire? 
              <Button variant="link" className="px-1 h-auto">
                Contactez le support
              </Button>
              ou utilisez 
              <Button variant="link" className="px-1 h-auto">
                Arthur, notre assistant IA
              </Button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideContent;
