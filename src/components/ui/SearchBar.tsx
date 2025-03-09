
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supportGuides } from '@/data/guideData';

const SearchBar: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    
    if (query.trim()) {
      // Check if the query matches any support guides
      const matchingGuides = supportGuides.filter(guide => 
        guide.title.toLowerCase().includes(query.toLowerCase()) || 
        guide.content.toLowerCase().includes(query.toLowerCase()) ||
        guide.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      if (matchingGuides.length > 0) {
        // Redirect to support page with search query
        navigate(`/support?q=${encodeURIComponent(query)}`);
      } else {
        // Show toast for general search
        toast({
          title: "Recherche",
          description: `Recherche de "${query}" en cours...`,
          duration: 2000,
        });
      }
      
      // Clear search input
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`search-bar flex items-center transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}>
      <Search size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
      <input
        type="text"
        placeholder="Recherchez un document, une information..."
        className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
    </form>
  );
};

export default SearchBar;
