
import React, { useState } from 'react';
import { FolderOpen, Star, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Folder, Category } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentSidebarProps {
  title?: string;
  currentFolder?: string;
  folders?: Folder[];
  categories?: Category[];
  onFolderClick?: (id: string, name: string) => void;
  onCategoryClick?: (category: string) => void;
  starredCount?: number;
  totalCount?: number;
  showAddCategory?: boolean;
  onAddCategory?: () => void;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = ({
  title = "Documents",
  currentFolder = "",
  folders = [],
  categories = [],
  onFolderClick = () => {},
  onCategoryClick,
  starredCount,
  totalCount,
  showAddCategory = false,
  onAddCategory
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Avant-contrat']);

  const toggleCategory = (categoryName: string) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== categoryName));
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };

  // Sous-catégories pour les avant-contrats
  const avantContratSubs = [
    { name: 'Compromis de vente', count: 2 },
    { name: 'Promesse de vente', count: 1 },
    { name: 'Location', count: 1 },
  ];

  return (
    <div className="bg-secondary/30 rounded-xl p-4">
      <h3 className="font-medium mb-4">{title}</h3>
      
      <div className="space-y-2">
        <div 
          className={`flex items-center justify-between p-2 rounded-lg ${currentFolder === 'root' ? 'bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50' : 'hover:bg-secondary cursor-pointer'}`}
          onClick={() => onFolderClick('root', title)}
        >
          <div className="flex items-center gap-2">
            <FolderOpen size={18} className="text-noovimo-500" />
            <span className="text-sm font-medium">Tous les {folders.length > 0 ? 'dossiers' : 'documents'}</span>
          </div>
          {totalCount !== undefined && (
            <span className="text-xs text-muted-foreground">{totalCount}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-yellow-500" />
            <span className="text-sm">
              {folders.length > 0 ? 'Documents favoris' : 'Favoris'}
            </span>
          </div>
          {starredCount !== undefined && (
            <span className="text-xs text-muted-foreground">{starredCount}</span>
          )}
        </div>
        
        {categories.map(category => {
          const IconComponent = category.icon;
          const hasSubMenu = category.name === 'Avant-contrat';
          const isExpanded = expandedCategories.includes(category.name);
          
          return (
            <div key={category.name}>
              <div 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer"
                onClick={() => {
                  if (hasSubMenu) {
                    toggleCategory(category.name);
                  } else if (onCategoryClick) {
                    onCategoryClick(category.name);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  {hasSubMenu ? (
                    isExpanded ? <ChevronDown size={16} className="text-noovimo-500" /> : <ChevronRight size={16} className="text-noovimo-500" />
                  ) : null}
                  <IconComponent size={18} className="text-noovimo-500" />
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </div>
              
              {/* Sous-menus pour la catégorie Avant-contrat */}
              {hasSubMenu && isExpanded && (
                <ScrollArea className="h-auto max-h-[150px] pl-8 space-y-1 mt-1">
                  {avantContratSubs.map(sub => (
                    <div 
                      key={sub.name}
                      className="flex items-center justify-between p-1 rounded-lg hover:bg-secondary cursor-pointer"
                      onClick={() => onCategoryClick && onCategoryClick(sub.name)}
                    >
                      <span className="text-xs">{sub.name}</span>
                      <span className="text-xs text-muted-foreground">{sub.count}</span>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </div>
          );
        })}
        
        {folders.map(folder => (
          <div 
            key={folder.id}
            className={`flex items-center justify-between p-2 rounded-lg ${currentFolder === folder.id ? 'bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50' : 'hover:bg-secondary cursor-pointer'}`}
            onClick={() => onFolderClick(folder.id, folder.name)}
          >
            <div className="flex items-center gap-2">
              <FolderOpen size={18} className={`${currentFolder === folder.id ? 'text-noovimo-500' : 'text-blue-500'}`} />
              <span className="text-sm">{folder.name}</span>
            </div>
          </div>
        ))}
      </div>
      
      {showAddCategory && (
        <div className="mt-6">
          <button 
            className="flex items-center gap-2 text-sm text-noovimo-500 hover:text-noovimo-600"
            onClick={onAddCategory}
          >
            <Plus size={16} />
            <span>Nouvelle catégorie</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentSidebar;
