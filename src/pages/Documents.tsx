
import React from 'react';
import { FileUp, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentPreview from '@/components/documents/DocumentPreview';
import DocumentScanDialog from '@/components/documents/DocumentScanDialog';
import AgentDocumentsTab from '@/components/documents/tabs/AgentDocumentsTab';
import NoovimoDocumentsTab from '@/components/documents/tabs/NoovimoDocumentsTab';
import { useDocuments } from '@/hooks/useDocuments';

const Documents = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeDocType,
    setActiveDocType,
    currentFolder,
    breadcrumbs,
    setBreadcrumbs,
    selectedDocument,
    setSelectedDocument,
    scanDialogOpen,
    setScanDialogOpen,
    agentDocuments,
    noovimoFolders,
    agentCategories,
    navigateToFolder,
    handleDocumentClick,
    getFilteredContents,
    isSearchResult
  } = useDocuments();

  // Get current filtered contents based on the active tab and search query
  const filteredContents = getFilteredContents();

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 animate-fade-in">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Gérez et organisez tous vos documents</p>
      </div>
      
      <Tabs defaultValue={activeDocType} onValueChange={(value) => {
        setActiveDocType(value as 'agent' | 'noovimo');
        navigateToFolder('root', value === 'agent' ? 'Mes Documents' : 'Base Documentaire');
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
          <AgentDocumentsTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentFolder={currentFolder}
            agentCategories={agentCategories}
            items={filteredContents}
            isSearchResult={isSearchResult}
            onFileClick={handleDocumentClick}
            onFolderClick={navigateToFolder}
            onScanClick={() => setScanDialogOpen(true)}
            starredCount={agentDocuments.filter(doc => doc.starred).length}
            totalCount={agentDocuments.length}
          />
        </TabsContent>
        
        <TabsContent value="noovimo">
          <NoovimoDocumentsTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentFolder={currentFolder}
            breadcrumbs={breadcrumbs}
            noovimoFolders={noovimoFolders}
            items={filteredContents}
            isSearchResult={isSearchResult}
            onFileClick={handleDocumentClick}
            onFolderClick={navigateToFolder}
          />
        </TabsContent>
      </Tabs>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <DocumentPreview 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
      
      {/* Document Scanner Dialog */}
      <DocumentScanDialog 
        open={scanDialogOpen}
        onOpenChange={setScanDialogOpen}
        onSuccess={() => {
          // Refresh document list if necessary
          // In a real implementation, you would fetch updated document list
        }}
      />
    </div>
  );
};

export default Documents;
