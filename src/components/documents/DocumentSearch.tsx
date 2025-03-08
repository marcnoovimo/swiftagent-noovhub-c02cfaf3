
import React from 'react';
import { Search, Filter } from 'lucide-react';

interface DocumentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showUploadButton?: boolean;
  onUpload?: () => void;
  placeholder?: string;
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  showUploadButton = false,
  onUpload,
  placeholder = "Rechercher un document..."
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="search-bar flex items-center w-full">
          <Search size={18} className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
          <Filter size={16} />
          <span>Filtrer</span>
        </button>
        
        {showUploadButton && (
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-noovimo-500 text-white rounded-lg text-sm"
            onClick={onUpload}
          >
            <Upload size={16} />
            <span>Upload</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentSearch;
