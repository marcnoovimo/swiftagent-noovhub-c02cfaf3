
import React from 'react';
import { FolderOpen, Star, Plus } from 'lucide-react';
import { Folder, Category } from './types';

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
          return (
            <div 
              key={category.name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer"
              onClick={() => onCategoryClick && onCategoryClick(category.name)}
            >
              <div className="flex items-center gap-2">
                <IconComponent size={18} className="text-noovimo-500" />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{category.count}</span>
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
