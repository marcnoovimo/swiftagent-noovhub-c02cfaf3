
import React from 'react';
import { 
  Star, 
  Download, 
  Share2, 
  MoreVertical, 
  ChevronRight,
  Eye,
  Printer,
  Bell
} from 'lucide-react';
import { Document, Folder } from './types';
import DocumentIcon from './DocumentIcon';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

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
  const isFolder = (item: Document | Folder): item is Folder => {
    return 'documents' in item;
  };

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium">
          <div className="col-span-8">Nom</div>
          <div className="col-span-4 text-right">Actions</div>
        </div>
      </div>
      
      <motion.div 
        className="divide-y divide-border"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {items.length > 0 ? (
          items.map((item) => {
            if (isFolder(item) && !isSearchResult) {
              // Folder item (not in search results)
              return (
                <motion.div 
                  key={item.id}
                  className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => onFolderClick && onFolderClick(item.id, item.name)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 flex items-center">
                      <div className="mr-3 relative">
                        <DocumentIcon type="folder" />
                        {item.unreadCount && item.unreadCount > 0 && (
                          <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center bg-noovimo-500 text-white text-xs rounded-full">
                            {item.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm flex items-center gap-1">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.documents.length} élément{item.documents.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex items-center justify-end">
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              // Document item (or folder in search results - treat as document)
              const document = item as Document;
              return (
                <motion.div 
                  key={document.id}
                  className={`p-4 hover:bg-secondary/20 transition-colors cursor-pointer ${document.unread ? 'bg-noovimo-50' : ''}`}
                  onClick={() => onFileClick && onFileClick(document)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 flex items-center">
                      <div className="mr-3 relative">
                        <DocumentIcon type={document.type} />
                        {document.unread && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-noovimo-500 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm flex items-center gap-1">
                          {document.name}
                          {document.unread && (
                            <Badge variant="outline" className="ml-2 bg-noovimo-50 text-noovimo-500 text-xs border-noovimo-200">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {document.category}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex items-center justify-end gap-2">
                      {document.starred && (
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      )}
                      
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
