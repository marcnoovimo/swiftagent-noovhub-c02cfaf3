
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Guide, GuideCategory } from '@/components/support/types';
import { supportGuides, guideCategories } from '@/data/guideData';

export const useGuide = () => {
  const [guides] = useState<Guide[]>(supportGuides);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Guide[]>([]);

  // Memoized guide categories to prevent unnecessary re-renders
  const memoizedGuideCategories = useMemo(() => guideCategories, []);

  // Set first guide as active initially or on reset
  useEffect(() => {
    if (guides.length > 0 && !activeGuide) {
      setActiveGuide(guides[0]);
    }
  }, [guides, activeGuide]);

  // Optimized search with useCallback to prevent unnecessary function recreations
  const searchGuides = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    
    // Optimized search with improved relevance scoring
    const results = guides
      .map(guide => {
        // Calculate relevance score based on different match types
        let score = 0;
        
        // Title match (highest weight)
        if (guide.title.toLowerCase().includes(normalizedQuery)) {
          score += 10;
          // Exact title match gets higher score
          if (guide.title.toLowerCase() === normalizedQuery) {
            score += 5;
          }
        }
        
        // Content match
        if (guide.content.toLowerCase().includes(normalizedQuery)) {
          score += 5;
        }
        
        // Tag match
        const tagMatches = guide.tags.filter(tag => 
          tag.toLowerCase().includes(normalizedQuery)
        ).length;
        score += tagMatches * 3;
        
        return { guide, score };
      })
      .filter(item => item.score > 0) // Only include items with matches
      .sort((a, b) => b.score - a.score) // Sort by relevance score
      .map(item => item.guide); // Extract just the guide objects

    setSearchResults(results);

    // If we have results and no active guide is selected from the results, select the first one
    if (results.length > 0 && (!activeGuide || !results.includes(activeGuide))) {
      setActiveGuide(results[0]);
    }
  }, [guides, activeGuide, setActiveGuide]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    
    // Reset to first guide when clearing search
    if (guides.length > 0) {
      setActiveGuide(guides[0]);
    }
  }, [guides, setActiveGuide]);

  // Function to find a guide by ID - optimized with useCallback
  const findGuideById = useCallback((id: string): Guide | undefined => {
    return guides.find(guide => guide.id === id);
  }, [guides]);

  // Function to get guides by category
  const getGuidesByCategory = useCallback((categoryId: string): Guide[] => {
    return guides.filter(guide => guide.categoryId === categoryId);
  }, [guides]);

  return {
    guides,
    guideCategories: memoizedGuideCategories,
    activeGuide,
    setActiveGuide,
    searchGuides,
    searchResults,
    searchQuery,
    setSearchQuery,
    clearSearch,
    findGuideById,
    getGuidesByCategory
  };
};
