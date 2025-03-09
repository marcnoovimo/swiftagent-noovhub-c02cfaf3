
import React, { useState } from 'react';
import { FileUp, BookOpen, Search, Folder, File } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');

  // Mock document items
  const agentDocuments = [
    { id: '1', name: 'Compromis Villa Marseille', type: 'pdf', category: 'Compromis', starred: true },
    { id: '2', name: 'Mandat de vente - Appartement Lyon', type: 'pdf', category: 'Mandats', starred: false },
    { id: '3', name: 'Facture Honoraires Vente Dupont', type: 'pdf', category: 'Factures', starred: false },
  ];

  const handleDocumentClick = (doc) => {
    console.log('Document clicked:', doc);
    // In a real implementation, this would open the document preview
  };

  const handleFolderClick = (folderId, folderName) => {
    console.log('Folder clicked:', folderId, folderName);
    // In a real implementation, this would navigate to the folder
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 animate-fade-in">
      <Helmet>
        <title>Documents | Intranet Noovimo</title>
      </Helmet>
      
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Gérez et organisez tous vos documents</p>
      </div>
      
      <Tabs defaultValue={activeDocType} onValueChange={(value) => {
        setActiveDocType(value as 'agent' | 'noovimo');
      }} className="w-full">
        <TabsList className="mb-4 sm:mb-6 w-full flex">
          <TabsTrigger value="agent" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
            <FileUp size={16} className="hidden xs:inline" />
            <span>Mes Documents</span>
          </TabsTrigger>
          <TabsTrigger value="noovimo" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium">
            <BookOpen size={16} className="hidden xs:inline" />
            <span>Base Documentaire</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="agent">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button className="flex items-center gap-2">
                <FileUp size={16} />
                <span>Ajouter un document</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleDocumentClick(doc)}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <File size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.category}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="noovimo">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Commercial', 'Juridique', 'Marketing', 'Formation'].map((folder) => (
                <Card 
                  key={folder} 
                  className="cursor-pointer hover:bg-accent/10 transition-colors"
                  onClick={() => handleFolderClick(folder.toLowerCase(), folder)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <Folder size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{folder}</p>
                      <p className="text-xs text-muted-foreground">Dossier</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
