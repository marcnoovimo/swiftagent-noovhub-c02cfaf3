
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SearchBar: React.FC = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
    
    // Show toast for demonstration
    if (query.trim()) {
      toast({
        title: "Recherche",
        description: `Recherche de "${query}" en cours...`,
        duration: 2000,
      });
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
