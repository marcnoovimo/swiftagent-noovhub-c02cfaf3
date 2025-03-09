
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Guide, GuideCategory } from '@/components/support/types';
import { supportGuides, guideCategories } from '@/data/guideData';

export const useGuide = () => {
  const [guides] = useState<Guide[]>(supportGuides);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Guide[]>([]);

  // Set first guide as active initially or on reset
  useEffect(() => {
    if (guides.length > 0 && !activeGuide) {
      setActiveGuide(guides[0]);
    }
  }, [guides, activeGuide]);

  // Optimized search functionality with useCallback
  const searchGuides = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const results = guides.filter(guide => 
      guide.title.toLowerCase().includes(normalizedQuery) || 
      guide.content.toLowerCase().includes(normalizedQuery) ||
      guide.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );

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

  // Function to find a guide by ID
  const findGuideById = useCallback((id: string): Guide | undefined => {
    return guides.find(guide => guide.id === id);
  }, [guides]);

  // Memoized guideCategories to prevent re-renders
  const memoizedGuideCategories = useMemo(() => guideCategories, []);

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
    findGuideById
  };
};
