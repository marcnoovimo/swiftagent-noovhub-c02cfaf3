
import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // This would be replaced with actual speech recognition
      setTimeout(() => {
        setQuery('Comment justifier mes honoraires?');
        setIsListening(false);
      }, 2000);
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
      <button
        type="button"
        onClick={toggleListening}
        className={`p-1 rounded-full transition-colors flex-shrink-0 ${
          isListening 
            ? 'bg-noovimo-500 text-white animate-pulse' 
            : 'text-muted-foreground hover:text-noovimo-500'
        }`}
        aria-label="Recherche vocale"
      >
        <Mic size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
