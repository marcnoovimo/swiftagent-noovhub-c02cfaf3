
import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import GuideCategories from "@/components/support/GuideCategories";
import GuideContent from "@/components/support/GuideContent";
import PopularGuides from "@/components/support/PopularGuides";
import { useGuide } from '@/hooks/useGuide';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("categories");
  
  const { 
    guideCategories, 
    guides, 
    activeGuide, 
    setActiveGuide, 
    searchGuides, 
    searchResults,
    searchQuery,
    setSearchQuery,
    clearSearch
  } = useGuide();

  // Check URL for search query and guide parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    const guideParam = searchParams.get('guide');
    
    if (queryParam) {
      setSearchQuery(queryParam);
      searchGuides(queryParam);
      
      if (guideParam) {
        const guide = guides.find(g => g.id === guideParam);
        if (guide) {
          setActiveGuide(guide);
        }
      }
    }
  }, [location, searchGuides, setSearchQuery, guides, setActiveGuide]);

  const handleClearSearch = useCallback(() => {
    clearSearch();
    navigate('/support');
  }, [clearSearch, navigate]);

  return (
    <div className="container mx-auto py-4 sm:py-6 max-w-7xl animate-fade-in">
      <div className="mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Centre d'aide Noovimo</h1>
        <p className="text-muted-foreground">
          Découvrez comment utiliser toutes les fonctionnalités de la plateforme Noovimo
        </p>
      </div>

      <div className="relative mb-4 sm:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 h-12"
            placeholder="Rechercher dans les guides..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchGuides(e.target.value);
            }}
            aria-label="Rechercher dans les guides"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleClearSearch}
              aria-label="Effacer la recherche"
            >
              Effacer
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 sm:mb-8 w-full sm:w-auto flex">
          <TabsTrigger value="categories" className="flex-1 sm:flex-none">Catégories</TabsTrigger>
          <TabsTrigger value="popular" className="flex-1 sm:flex-none">Guides populaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="md:col-span-1 order-2 md:order-1">
              <GuideCategories 
                categories={guideCategories} 
                activeGuide={activeGuide}
                setActiveGuide={setActiveGuide}
                searchResults={searchResults}
                searchQuery={searchQuery}
              />
            </div>
            <div className="md:col-span-3 order-1 md:order-2">
              <GuideContent 
                activeGuide={activeGuide} 
                searchResults={searchResults}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <PopularGuides 
            guides={guides} 
            setActiveGuide={(guide) => {
              setActiveGuide(guide);
              setActiveTab("categories");
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
