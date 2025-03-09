
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import { supportGuides } from '@/data/guideData';
import { useChatbot } from '@/hooks/useChatbot';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SearchBar: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [matchingGuides, setMatchingGuides] = useState<any[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { toggleOpen, setInput, handleSendMessage } = useChatbot();

  // Check URL for search query parameters on mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('q');
    
    if (queryParam && location.pathname === '/support') {
      setQuery(queryParam);
    }
  }, [location]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter guides when query changes
  useEffect(() => {
    if (query.trim()) {
      const filtered = supportGuides.filter(guide => 
        guide.title.toLowerCase().includes(query.toLowerCase()) || 
        guide.content.toLowerCase().includes(query.toLowerCase()) ||
        guide.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setMatchingGuides(filtered);
    } else {
      setMatchingGuides([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      if (matchingGuides.length > 0) {
        // Redirect to support page with search query
        navigate(`/support?q=${encodeURIComponent(query)}`);
        setShowResults(false);
      } else {
        // Open chatbot with query if no guide matches
        setInput(query);
        toggleOpen();
        setTimeout(() => {
          handleSendMessage();
        }, 300);
        
        // Show toast for search
        toast({
          title: "Recherche",
          description: `Recherche de "${query}" en cours...`,
          duration: 2000,
        });
      }
    }
  };

  const handleResultClick = (guideId: string) => {
    navigate(`/support?q=${encodeURIComponent(query)}&guide=${encodeURIComponent(guideId)}`);
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchContainerRef} className="relative">
      <form 
        onSubmit={handleSearch} 
        className={`search-bar flex items-center transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}
      >
        <Search size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Recherchez un document, une information..."
          className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            setIsExpanded(true);
            if (query.trim().length > 0) {
              setShowResults(true);
            }
          }}
          onBlur={() => setIsExpanded(false)}
          aria-label="Barre de recherche"
        />
        {query && (
          <button 
            type="button" 
            onClick={clearSearch}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Effacer la recherche"
          >
            <X size={16} />
          </button>
        )}
      </form>
      
      {showResults && matchingGuides.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-md z-50 max-h-[300px] overflow-y-auto">
          <div className="p-2">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">Résultats ({matchingGuides.length})</h3>
            <div className="space-y-1">
              {matchingGuides.slice(0, 5).map((guide) => (
                <div 
                  key={guide.id}
                  className="p-2 hover:bg-secondary rounded-md cursor-pointer"
                  onClick={() => handleResultClick(guide.id)}
                >
                  <div className="text-sm font-medium">{guide.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{guide.content.replace(/<[^>]*>/g, '')}</div>
                </div>
              ))}
            </div>
            {matchingGuides.length > 5 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2 text-xs"
                onClick={handleSearch}
              >
                Voir tous les résultats ({matchingGuides.length})
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
