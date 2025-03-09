
import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { ScanOptions, AccessLevel } from './types';

interface ScanConfigFormProps {
  scanOptions: ScanOptions;
  setScanOptions: (options: ScanOptions) => void;
  availableCategories: string[];
  isCompromis: boolean;
  onStartScan: () => void;
  onFileImport?: (file: File) => void;
}

const ScanConfigForm: React.FC<ScanConfigFormProps> = ({
  scanOptions,
  setScanOptions,
  availableCategories,
  isCompromis,
  onStartScan,
  onFileImport
}) => {
  const [showSubCategories, setShowSubCategories] = useState(scanOptions.category === 'Avant-contrat');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sous-catégories spécifiques pour les avant-contrats
  const avantContratSubs = [
    'Compromis de vente',
    'Promesse de vente',
    'Location'
  ];

  const handleCategoryChange = (value: string) => {
    setScanOptions({...scanOptions, category: value});
    setShowSubCategories(value === 'Avant-contrat');
  };

  const handleSubCategoryChange = (value: string) => {
    setScanOptions({...scanOptions, category: value});
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileImport) {
      onFileImport(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 py-2 sm:py-4">
      <div className="space-y-2">
        <Label htmlFor="documentName">Nom du document</Label>
        <Input 
          id="documentName" 
          value={scanOptions.documentName}
          onChange={(e) => setScanOptions({...scanOptions, documentName: e.target.value})}
          placeholder="Ex: Compromis - 23 Rue des Lilas"
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <Select 
          value={scanOptions.category}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Affichage des sous-catégories uniquement pour Avant-contrat */}
      {showSubCategories && (
        <div className="space-y-2 pl-4 border-l-2 border-noovimo-100">
          <Label htmlFor="subCategory">Type d'avant-contrat</Label>
          <Select 
            value={scanOptions.category}
            onValueChange={handleSubCategoryChange}
          >
            <SelectTrigger id="subCategory" className="w-full">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {avantContratSubs.map((subCategory) => (
                <SelectItem key={subCategory} value={subCategory}>
                  {subCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="accessLevel">Niveau d'accès</Label>
        <Select 
          value={scanOptions.accessLevel}
          onValueChange={(value) => setScanOptions({...scanOptions, accessLevel: value as AccessLevel})}
        >
          <SelectTrigger id="accessLevel" className="w-full">
            <SelectValue placeholder="Sélectionner un niveau d'accès" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agent">Agent uniquement</SelectItem>
            <SelectItem value="shared">Partagé avec le siège</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="autoClassify" className="text-sm sm:text-base">Classification automatique</Label>
        <Switch 
          id="autoClassify" 
          checked={scanOptions.autoClassify}
          onCheckedChange={(checked) => setScanOptions({...scanOptions, autoClassify: checked})}
        />
      </div>
      
      {isCompromis && (
        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
          <p>Pour un avant-contrat, vous pourrez remplir les informations supplémentaires après la numérisation (vendeur, acquéreur, dates, etc.).</p>
        </div>
      )}
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />
      
      <div className="flex justify-end gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={triggerFileInput}
          className="flex-1 sm:flex-none"
        >
          <Upload size={16} className="mr-2" />
          Importer
        </Button>
        <Button 
          onClick={onStartScan}
          className="flex-1 sm:flex-none"
        >
          Commencer le scan
        </Button>
      </div>
    </div>
  );
};

export default ScanConfigForm;
