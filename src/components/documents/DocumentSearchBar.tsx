
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocumentSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DocumentSearchBar = ({ searchQuery, setSearchQuery }: DocumentSearchBarProps) => (
  <div className="relative w-full max-w-md">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Rechercher un document..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-8"
    />
  </div>
);

export default DocumentSearchBar;
