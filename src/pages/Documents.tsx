
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
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1">Gérez et organisez tous vos documents</p>
      </div>
      
      <Tabs defaultValue={activeDocType} onValueChange={(value) => {
        setActiveDocType(value as 'agent' | 'noovimo');
        navigateToFolder('root', value === 'agent' ? 'Mes Documents' : 'Base Documentaire');
      }}>
        <TabsList className="mb-6">
          <TabsTrigger value="agent" className="flex items-center gap-2 px-6 py-3 text-sm font-medium">
            <FileUp size={18} />
            <span>Mes Documents</span>
          </TabsTrigger>
          <TabsTrigger value="noovimo" className="flex items-center gap-2 px-6 py-3 text-sm font-medium">
            <BookOpen size={18} />
            <span>Base Documentaire Noovimo</span>
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
