
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Folder, Shield } from 'lucide-react';
import { AccessLevel } from './types';
import { useAuth } from '@/context/AuthContext';
import { isAdmin, uploadDocument } from '@/services/documentService';
import { toast } from 'sonner';

interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  onSuccess: () => void;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({ 
  open, 
  onClose, 
  categories, 
  onSuccess 
}) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<AccessLevel>("agent");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const userIsAdmin = user ? isAdmin(user) : false;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }
    
    if (!category) {
      toast.error("Veuillez sélectionner une catégorie");
      return;
    }
    
    setUploading(true);
    
    try {
      const { data, error } = await uploadDocument(file, category, accessLevel, user);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success("Fichier téléchargé avec succès");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast.error("Une erreur est survenue lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };
  
  const resetForm = () => {
    setFile(null);
    setCategory("");
    setAccessLevel("agent");
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Télécharger un document</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau document à votre espace de stockage
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-primary bg-secondary/30' : 'border-border'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Folder size={40} className="text-primary" />
                </div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFile(null)}
                  size="sm"
                >
                  Changer de fichier
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <Upload size={40} className="text-muted-foreground" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  Glissez-déposez votre fichier ici
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ou cliquez pour parcourir
                </p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
          
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Access Level Selection - only for admins */}
          {userIsAdmin && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="accessLevel">Niveau d'accès</Label>
                <Shield size={14} className="text-muted-foreground" />
              </div>
              <Select value={accessLevel} onValueChange={(value) => setAccessLevel(value as AccessLevel)}>
                <SelectTrigger id="accessLevel">
                  <SelectValue placeholder="Sélectionnez un niveau d'accès" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">Agent uniquement</SelectItem>
                  <SelectItem value="shared">Partagé (tous les agents)</SelectItem>
                  <SelectItem value="admin">Admin uniquement</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Détermine qui peut accéder à ce document
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || !category || uploading}
          >
            {uploading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
