
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import GuideCategories from "@/components/support/GuideCategories";
import GuideContent from "@/components/support/GuideContent";
import PopularGuides from "@/components/support/PopularGuides";
import { useGuide } from '@/hooks/useGuide';
import { useLocation } from 'react-router-dom';

const Support = () => {
  const location = useLocation();
  const { 
    guideCategories, 
    guides, 
    activeGuide, 
    setActiveGuide, 
    searchGuides, 
    searchResults,
    searchQuery,
    setSearchQuery
  } = useGuide();

  // Check URL for search query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    
    if (queryParam) {
      setSearchQuery(queryParam);
      searchGuides(queryParam);
    }
  }, [location, searchGuides, setSearchQuery]);

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Centre d'aide Noovimo</h1>
        <p className="text-muted-foreground">
          Découvrez comment utiliser toutes les fonctionnalités de la plateforme Noovimo
        </p>
      </div>

      <div className="relative mb-8">
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
          />
        </div>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="popular">Guides populaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <GuideCategories 
                categories={guideCategories} 
                activeGuide={activeGuide}
                setActiveGuide={setActiveGuide}
                searchResults={searchResults}
                searchQuery={searchQuery}
              />
            </div>
            <div className="md:col-span-3">
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
            setActiveGuide={setActiveGuide} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
