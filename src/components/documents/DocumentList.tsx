
import React from 'react';
import { 
  Star, 
  Download, 
  Share2, 
  MoreVertical, 
  ChevronRight,
  Eye,
  Printer
} from 'lucide-react';
import { Document, Folder } from './types';
import DocumentIcon from './DocumentIcon';

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

  return (
    <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium">
          <div className="col-span-8">Nom</div>
          <div className="col-span-4 text-right">Actions</div>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {items.length > 0 ? (
          items.map((item) => {
            if (isFolder(item) && !isSearchResult) {
              // Folder item (not in search results)
              return (
                <div 
                  key={item.id}
                  className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => onFolderClick && onFolderClick(item.id, item.name)}
                >
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 flex items-center">
                      <div className="mr-3">
                        <DocumentIcon type="folder" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.documents.length} élément{item.documents.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex items-center justify-end">
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              );
            } else {
              // Document item (or folder in search results - treat as document)
              const document = item as Document;
              return (
                <div 
                  key={document.id}
                  className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => onFileClick && onFileClick(document)}
                >
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 flex items-center">
                      <div className="mr-3">
                        <DocumentIcon type={document.type} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{document.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {document.category}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex items-center justify-end gap-2">
                      {document.starred && (
                        <Star size={16} className="text-yellow-500" />
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
                </div>
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
      </div>
    </div>
  );
};

export default DocumentList;
