
import React from 'react';
import { Document } from './types';
import { X, Download, Share2, Star, Printer, ArrowLeft } from 'lucide-react';
import DocumentIcon from './DocumentIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DocumentPreviewProps {
  document: Document | null;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  if (!document) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Téléchargement démarré", {
      description: `${document.name} sera bientôt disponible.`
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Lien de partage créé", {
      description: "Un lien temporaire a été copié dans votre presse-papier."
    });
  };

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(document.starred ? "Document retiré des favoris" : "Document ajouté aux favoris");
  };

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
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/30">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="h-8 w-8 mr-1"
              >
                <ArrowLeft size={18} />
              </Button>
              <DocumentIcon type={document.type} />
              <h3 className="font-medium">{document.name}</h3>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleStar}
                className="h-8 w-8 text-yellow-500"
              >
                <Star size={18} className={document.starred ? "fill-yellow-500" : ""} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground"
              >
                <X size={18} />
              </Button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            {renderPreview()}
          </div>
          
          <div className="p-4 border-t border-border flex justify-between items-center bg-secondary/30">
            <div className="text-sm text-muted-foreground">
              {document.size ? `${(document.size / 1024).toFixed(2)} KB` : 'Taille inconnue'} • {document.createdAt ? new Date(document.createdAt).toLocaleDateString() : 'Date inconnue'}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleDownload}
              >
                <Download size={16} />
                Télécharger
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <Printer size={16} />
                Imprimer
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="gap-1 bg-noovimo-500 hover:bg-noovimo-600"
                onClick={handleShare}
              >
                <Share2 size={16} />
                Partager
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentPreview;
