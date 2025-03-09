
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ScanOptions, AccessLevel } from './types';

interface ScanConfigFormProps {
  scanOptions: ScanOptions;
  setScanOptions: (options: ScanOptions) => void;
  availableCategories: string[];
  isCompromis: boolean;
  onStartScan: () => void;
}

const ScanConfigForm: React.FC<ScanConfigFormProps> = ({
  scanOptions,
  setScanOptions,
  availableCategories,
  isCompromis,
  onStartScan
}) => {
  const [showSubCategories, setShowSubCategories] = useState(scanOptions.category === 'Compromis');
  
  // Sous-catégories spécifiques pour Compromis
  const compromisSubs = [
    'Compromis de vente',
    'Promesse de vente',
    'Location',
    'Autres'
  ];

  const handleCategoryChange = (value: string) => {
    setScanOptions({...scanOptions, category: value});
    setShowSubCategories(value === 'Compromis');
  };

  const handleSubCategoryChange = (value: string) => {
    setScanOptions({...scanOptions, category: value});
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="documentName">Nom du document</Label>
        <Input 
          id="documentName" 
          value={scanOptions.documentName}
          onChange={(e) => setScanOptions({...scanOptions, documentName: e.target.value})}
          placeholder="Ex: Compromis - 23 Rue des Lilas"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <Select 
          value={scanOptions.category}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger id="category">
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
      
      {/* Affichage des sous-catégories uniquement pour Compromis */}
      {showSubCategories && (
        <div className="space-y-2 pl-4 border-l-2 border-noovimo-100">
          <Label htmlFor="subCategory">Type d'avant-contrat</Label>
          <Select 
            value={scanOptions.category}
            onValueChange={handleSubCategoryChange}
          >
            <SelectTrigger id="subCategory">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {compromisSubs.map((subCategory) => (
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
          <SelectTrigger id="accessLevel">
            <SelectValue placeholder="Sélectionner un niveau d'accès" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agent">Personnel</SelectItem>
            <SelectItem value="shared">Siège social</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="autoClassify">Classification automatique</Label>
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
      
      <div className="flex justify-end pt-4">
        <Button onClick={onStartScan}>
          Commencer le scan
        </Button>
      </div>
    </div>
  );
};

export default ScanConfigForm;
