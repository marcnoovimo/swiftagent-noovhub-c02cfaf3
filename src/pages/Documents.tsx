
import React, { useState } from 'react';
import { FileUp, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Helmet } from 'react-helmet';
import DocumentsTabContent from '@/components/documents/DocumentsTabContent';

type TransactionType = 'compromis' | 'mandat' | 'vente' | 'autre';

// Define specific document type
interface DocumentType {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  buyerName?: string;
  sellerName?: string;
  propertyAddress?: string;
  propertyType?: string;
  propertyValue?: number;
  commissionAmount?: number;
  transactionType: TransactionType;
  agentFees?: string;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');

  // Mock document items with additional metadata for scanned documents
  const agentDocuments: DocumentType[] = [
    { 
      id: '1', 
      name: 'Compromis Villa Marseille', 
      type: 'pdf', 
      category: 'Compromis', 
      starred: true,
      buyerName: 'Martin Dupont',
      sellerName: 'Marie Laurent',
      propertyAddress: '15 Avenue de la Plage, 13008 Marseille',
      propertyType: 'Villa',
      propertyValue: 520000,
      commissionAmount: 15600,
      transactionType: 'compromis',
      agentFees: '15600€'
    },
    { 
      id: '2', 
      name: 'Mandat de vente - Appartement Lyon', 
      type: 'pdf', 
      category: 'Mandats', 
      starred: false,
      sellerName: 'Philippe Blanc',
      propertyAddress: '8 Rue de la République, 69002 Lyon',
      propertyType: 'Appartement',
      propertyValue: 320000,
      commissionAmount: 9600,
      transactionType: 'mandat',
      agentFees: '9600€'
    },
    { 
      id: '3', 
      name: 'Facture Honoraires Vente Dupont', 
      type: 'pdf', 
      category: 'Factures', 
      starred: false,
      buyerName: 'Thomas Dupont',
      sellerName: 'Carole Moreau',
      transactionType: 'vente',
      agentFees: '12500€'
    },
  ];

  const handleDocumentClick = (doc: DocumentType) => {
    console.log('Document clicked:', doc);
    // In a real implementation, this would open the document preview
  };

  const handleFolderClick = (folderId: string, folderName: string) => {
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
          <DocumentsTabContent
            activeDocType="agent"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleDocumentClick={handleDocumentClick}
            handleFolderClick={handleFolderClick}
            documents={agentDocuments}
          />
        </TabsContent>
        
        <TabsContent value="noovimo">
          <DocumentsTabContent
            activeDocType="noovimo"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleDocumentClick={handleDocumentClick}
            handleFolderClick={handleFolderClick}
            documents={[]}
            folders={['Commercial', 'Juridique', 'Marketing', 'Formation']}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
