
import React from 'react';
import { Document } from './types';
import { X } from 'lucide-react';
import DocumentIcon from './DocumentIcon';

interface DocumentPreviewProps {
  document: Document | null;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  if (!document) return null;

  const renderPreview = () => {
    // For now, just show a placeholder for different types of documents
    // This would be expanded with actual document preview functionality
    switch (document.type.toLowerCase()) {
      case 'pdf':
        return (
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] dark:bg-gray-800">
            <DocumentIcon type={document.type} size={48} />
            <p className="mt-4 text-sm text-muted-foreground">
              Prévisualisation PDF non disponible. Cliquez sur télécharger pour voir le document.
            </p>
          </div>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] dark:bg-gray-800">
            <DocumentIcon type={document.type} size={48} />
            <p className="mt-4 text-sm text-muted-foreground">
              Prévisualisation d'image à venir.
            </p>
          </div>
        );
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'webm':
      case 'mkv':
        return (
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] dark:bg-gray-800">
            <DocumentIcon type={document.type} size={48} />
            <p className="mt-4 text-sm text-muted-foreground">
              Prévisualisation vidéo à venir.
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] dark:bg-gray-800">
            <DocumentIcon type={document.type} size={48} />
            <p className="mt-4 text-sm text-muted-foreground">
              Prévisualisation non disponible pour ce type de document.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center">
            <DocumentIcon type={document.type} />
            <h3 className="ml-2 font-medium">{document.name}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {renderPreview()}
          
          <div className="mt-6 flex justify-end gap-2">
            <button className="px-4 py-2 bg-secondary rounded-lg text-sm">
              Télécharger
            </button>
            <button className="px-4 py-2 bg-noovimo-500 text-white rounded-lg text-sm">
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
