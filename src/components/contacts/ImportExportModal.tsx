
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Smartphone, FileText, Loader2, CheckCircle } from 'lucide-react';
import { importContacts, exportContacts } from '@/services/contactService';
import { toast } from 'sonner';

interface ImportExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportExportModal: React.FC<ImportExportModalProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importSource, setImportSource] = useState<'phone' | 'csv' | 'vcard'>('phone');
  const [exportFormat, setExportFormat] = useState<'csv' | 'vcard'>('csv');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [processResult, setProcessResult] = useState<string>('');

  const handleImport = async () => {
    setIsProcessing(true);
    
    try {
      const importedCount = await importContacts(importSource);
      setProcessResult(`${importedCount} contacts importés avec succès`);
      setIsComplete(true);
      toast.success(`${importedCount} contacts importés`);
    } catch (error) {
      toast.error("Erreur lors de l'importation des contacts");
      console.error("Import error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    setIsProcessing(true);
    
    try {
      const downloadUrl = await exportContacts(exportFormat);
      setProcessResult(`Contacts exportés avec succès`);
      setIsComplete(true);
      
      // Simuler un téléchargement (dans une vraie application, cela déclencherait un téléchargement)
      setTimeout(() => {
        toast.success("Contacts exportés avec succès");
      }, 500);
    } catch (error) {
      toast.error("Erreur lors de l'exportation des contacts");
      console.error("Export error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => {
    setIsProcessing(false);
    setIsComplete(false);
    setProcessResult('');
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetState();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Synchroniser les contacts</DialogTitle>
          <DialogDescription>
            Importez ou exportez vos contacts depuis votre smartphone ou un fichier
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="import" value={activeTab} onValueChange={(v) => setActiveTab(v as 'import' | 'export')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Importer</TabsTrigger>
            <TabsTrigger value="export">Exporter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="import" className="space-y-4 pt-4">
            {!isProcessing && !isComplete ? (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={importSource === 'phone' ? 'default' : 'outline'}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    onClick={() => setImportSource('phone')}
                  >
                    <Smartphone className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">Smartphone</span>
                  </Button>
                  <Button
                    variant={importSource === 'csv' ? 'default' : 'outline'}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    onClick={() => setImportSource('csv')}
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">Fichier CSV</span>
                  </Button>
                  <Button
                    variant={importSource === 'vcard' ? 'default' : 'outline'}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    onClick={() => setImportSource('vcard')}
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">Fichier vCard</span>
                  </Button>
                </div>
                
                <div className="p-4 bg-muted rounded-md text-sm">
                  {importSource === 'phone' && (
                    <p>Importez les contacts directement depuis votre smartphone. Une synchronisation sera effectuée avec les contacts de votre appareil.</p>
                  )}
                  {importSource === 'csv' && (
                    <p>Importez vos contacts à partir d'un fichier CSV exporté depuis un autre système de gestion de contacts.</p>
                  )}
                  {importSource === 'vcard' && (
                    <p>Importez vos contacts à partir de fichiers vCard (.vcf) qui contiennent les informations de contact standardisées.</p>
                  )}
                </div>
              </>
            ) : isComplete ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Importation réussie!</h3>
                <p className="text-center text-muted-foreground mb-4">{processResult}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-semibold mb-2">Importation en cours...</h3>
                <p className="text-center text-muted-foreground">Veuillez patienter pendant que nous importons vos contacts.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4 pt-4">
            {!isProcessing && !isComplete ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={exportFormat === 'csv' ? 'default' : 'outline'}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">Fichier CSV</span>
                  </Button>
                  <Button
                    variant={exportFormat === 'vcard' ? 'default' : 'outline'}
                    className="flex flex-col items-center justify-center h-24 p-2"
                    onClick={() => setExportFormat('vcard')}
                  >
                    <Download className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">Fichier vCard</span>
                  </Button>
                </div>
                
                <div className="p-4 bg-muted rounded-md text-sm">
                  {exportFormat === 'csv' && (
                    <p>Exportez vos contacts au format CSV pour les utiliser dans d'autres applications comme Excel ou d'autres CRM.</p>
                  )}
                  {exportFormat === 'vcard' && (
                    <p>Exportez vos contacts au format vCard (.vcf) pour les importer directement dans la plupart des applications de contacts sur smartphone.</p>
                  )}
                </div>
              </>
            ) : isComplete ? (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Exportation réussie!</h3>
                <p className="text-center text-muted-foreground mb-4">{processResult}</p>
                <Button>Télécharger le fichier</Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-semibold mb-2">Exportation en cours...</h3>
                <p className="text-center text-muted-foreground">Veuillez patienter pendant que nous préparons vos contacts.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {isComplete ? (
            <Button onClick={() => onOpenChange(false)}>Fermer</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
              {!isProcessing && (
                <Button 
                  onClick={activeTab === 'import' ? handleImport : handleExport}
                >
                  {activeTab === 'import' ? 'Importer' : 'Exporter'}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportExportModal;
