
import React, { useState } from 'react';
import { 
  Star, 
  Download, 
  Share2, 
  MoreVertical, 
  ChevronRight,
  Eye,
  Printer,
  Search,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Document, Folder } from './types';
import DocumentIcon from './DocumentIcon';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentListProps {
  items: (Document | Folder)[];
  onFolderClick?: (id: string, name: string) => void;
  onFileClick?: (document: Document) => void;
  isSearchResult?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  items, 
  onFolderClick,
  onFileClick,
  isSearchResult = false
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const isFolder = (item: Document | Folder): item is Folder => {
    return 'documents' in item;
  };

  // Sort items function
  const getSortedItems = () => {
    return [...items].sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name);
        return sortDirection === 'asc' ? comparison : -comparison;
      } else {
        // Assuming there's a updatedAt field, otherwise fallback to name
        const dateA = (a as Document).updatedAt || '';
        const dateB = (b as Document).updatedAt || '';
        const comparison = dateA.localeCompare(dateB);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
    });
  };

  const toggleSort = (field: 'name' | 'date') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const sortedItems = getSortedItems();

  return (
    <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground font-medium">
            {items.length} élément{items.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => toggleSort('name')}
              className="h-8 px-2 text-xs"
              aria-label="Trier par nom"
            >
              Nom {sortBy === 'name' && (
                sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
              )}
            </Button>
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleSort('date')}
                className="h-8 px-2 text-xs"
                aria-label="Trier par date"
              >
                Date {sortBy === 'date' && (
                  sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="divide-y divide-border"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => {
            if (isFolder(item) && !isSearchResult) {
              // Folder item (not in search results)
              return (
                <motion.div 
                  key={item.id}
                  className="p-3 sm:p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => onFolderClick && onFolderClick(item.id, item.name)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="mr-3 relative">
                        <DocumentIcon type="folder" />
                        {item.unreadCount && item.unreadCount > 0 && (
                          <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center bg-noovimo-500 text-white text-xs rounded-full">
                            {item.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate max-w-[200px] sm:max-w-none">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.documents.length} élément{item.documents.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              );
            } else {
              // Document item (or folder in search results - treat as document)
              const document = item as Document;
              return (
                <motion.div 
                  key={document.id}
                  className={`p-3 sm:p-4 hover:bg-secondary/20 transition-colors cursor-pointer ${document.unread ? 'bg-noovimo-50' : ''}`}
                  onClick={() => onFileClick && onFileClick(document)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="mr-3 relative">
                        <DocumentIcon type={document.type} />
                        {document.unread && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-noovimo-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm flex items-center gap-1 truncate max-w-[160px] sm:max-w-none">
                          {document.name}
                          {document.unread && (
                            <Badge variant="outline" className="ml-2 bg-noovimo-50 text-noovimo-500 text-xs border-noovimo-200 whitespace-nowrap">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate max-w-[180px] sm:max-w-none">
                          {document.category}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      {document.starred && (
                        <Star size={isMobile ? 14 : 16} className="text-yellow-500 fill-yellow-500" />
                      )}
                      
                      {isMobile ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye size={14} className="mr-2" />
                              Visualiser
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download size={14} className="mr-2" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 size={14} className="mr-2" />
                              Partager
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <>
                          {document.documentType === 'noovimo' ? (
                            <>
                              <button className="icon-button" aria-label="Visualiser" onClick={(e) => e.stopPropagation()}>
                                <Eye size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Télécharger" onClick={(e) => e.stopPropagation()}>
                                <Download size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Imprimer" onClick={(e) => e.stopPropagation()}>
                                <Printer size={16} className="text-muted-foreground" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="icon-button" aria-label="Télécharger" onClick={(e) => e.stopPropagation()}>
                                <Download size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Partager" onClick={(e) => e.stopPropagation()}>
                                <Share2 size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Plus d'options" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical size={16} className="text-muted-foreground" />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            }
          })
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {isSearchResult ? "Aucun document trouvé" : "Ce dossier est vide"}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DocumentList;
