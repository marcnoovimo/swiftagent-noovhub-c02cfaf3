import React, { useState } from 'react';
import { 
  Search, 
  FolderOpen, 
  FileText, 
  Upload, 
  Plus, 
  MoreVertical, 
  Calendar, 
  Download, 
  Share2, 
  Star, 
  Filter,
  FileUp,
  BookOpen,
  ChevronRight,
  Printer,
  Eye,
  File,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  documentType: 'agent' | 'noovimo';
}

interface Folder {
  id: string;
  name: string;
  type: 'folder';
  documents: (Document | Folder)[];
  parentId?: string;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [breadcrumbs, setBreadcrumbs] = useState<{id: string, name: string}[]>([
    { id: 'root', name: 'Base Documentaire' }
  ]);
  
  // Agent documents structure
  const [agentDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Compromis - 23 Rue des Lilas',
      type: 'pdf',
      category: 'Compromis',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '2',
      name: 'Mandat exclusif - 8 Avenue des Roses',
      type: 'docx',
      category: 'Mandats',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '3',
      name: 'Facture commission - Sept 2023',
      type: 'pdf',
      category: 'Factures',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '4',
      name: 'Photos - Appartement Centre-ville',
      type: 'zip',
      category: 'Photos',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '5',
      name: 'Diagnostic DPE - Maison Nantes Sud',
      type: 'pdf',
      category: 'Diagnostics',
      starred: false,
      documentType: 'agent'
    },
  ]);
  
  // Hierarchical Noovimo documents structure
  const [noovimoFolders] = useState<Folder[]>([
    {
      id: 'folder-1',
      name: 'Formations',
      type: 'folder',
      documents: [
        {
          id: 'folder-1-1',
          name: 'Techniques de vente',
          type: 'folder',
          documents: [
            {
              id: '6',
              name: 'Formation - Techniques de négociation',
              type: 'mp4',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            },
            {
              id: '6-1',
              name: 'Support - Techniques de négociation',
              type: 'pdf',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        },
        {
          id: 'folder-1-2',
          name: 'Outils Noovimo',
          type: 'folder',
          documents: [
            {
              id: '6-2',
              name: 'Formation - Utilisation CRM',
              type: 'mp4',
              category: 'Formations',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        }
      ]
    },
    {
      id: 'folder-2',
      name: 'Documentation Juridique',
      type: 'folder',
      documents: [
        {
          id: '7',
          name: 'Guide juridique - Mandats de vente',
          type: 'pdf',
          category: 'Guides',
          starred: true,
          documentType: 'noovimo'
        },
        {
          id: 'folder-2-1',
          name: 'Contrats',
          type: 'folder',
          documents: [
            {
              id: '7-1',
              name: 'Modèles contrats de vente',
              type: 'pdf',
              category: 'Guides',
              starred: false,
              documentType: 'noovimo'
            }
          ]
        }
      ]
    },
    {
      id: 'folder-3',
      name: 'Webinaires',
      type: 'folder',
      documents: [
        {
          id: '8',
          name: 'Webinaire - Optimisation fiscale',
          type: 'mp4',
          category: 'Webinaires',
          starred: false,
          documentType: 'noovimo'
        }
      ]
    },
    {
      id: 'folder-4',
      name: 'Communication',
      type: 'folder',
      documents: [
        {
          id: '9',
          name: 'Charte graphique Noovimo 2023',
          type: 'pdf',
          category: 'Communication',
          starred: true,
          documentType: 'noovimo'
        }
      ]
    },
    {
      id: 'folder-5',
      name: 'Modèles',
      type: 'folder',
      documents: [
        {
          id: '10',
          name: 'Modèles d\'emails clients',
          type: 'docx',
          category: 'Modèles',
          starred: false,
          documentType: 'noovimo'
        }
      ]
    },
  ]);

  const [agentCategories] = useState([
    { name: 'Compromis', icon: <FileText size={18} className="text-noovimo-500" />, count: 4 },
    { name: 'Mandats', icon: <FileText size={18} className="text-green-500" />, count: 8 },
    { name: 'Factures', icon: <FileText size={18} className="text-yellow-500" />, count: 6 },
    { name: 'Photos', icon: <FileText size={18} className="text-purple-500" />, count: 12 },
    { name: 'Diagnostics', icon: <FileText size={18} className="text-red-500" />, count: 5 },
  ]);

  // Recursive function to find folders and documents
  const findFolderAndContents = (folderId: string, folders: Folder[]): (Document | Folder)[] | null => {
    // If we're at the root, return the top-level folders
    if (folderId === 'root') {
      return folders;
    }
    
    // Search recursively through folders
    for (const folder of folders) {
      if (folder.id === folderId) {
        return folder.documents;
      }
      
      // Search in nested folders
      if (folder.type === 'folder') {
        const foundInNested = findFolderAndContents(folderId, folder.documents.filter(d => d.type === 'folder') as Folder[]);
        if (foundInNested) {
          return foundInNested;
        }
      }
    }
    
    return null;
  };

  // Function to navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    
    // Update breadcrumbs
    const newBreadcrumbs = [...breadcrumbs];
    const existingIndex = newBreadcrumbs.findIndex(b => b.id === folderId);
    
    if (existingIndex >= 0) {
      // If we're navigating to an existing breadcrumb, trim the array
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1));
    } else {
      // Add the new folder to breadcrumbs
      setBreadcrumbs([...newBreadcrumbs, { id: folderId, name: folderName }]);
    }
  };

  // Function to get current folder contents
  const getCurrentFolderContents = (): (Document | Folder)[] => {
    if (activeDocType === 'agent') {
      return agentDocuments;
    } else {
      const contents = findFolderAndContents(currentFolder, noovimoFolders);
      return contents || [];
    }
  };

  // Function to search through all documents recursively
  const searchDocuments = (query: string): Document[] => {
    if (!query) return [];
    
    const results: Document[] = [];
    
    const searchInFolder = (items: (Document | Folder)[]) => {
      items.forEach(item => {
        if ('documents' in item) {
          // This is a folder
          searchInFolder(item.documents);
        } else if (item.documentType === activeDocType && 
                  (item.name.toLowerCase().includes(query.toLowerCase()) || 
                   item.category.toLowerCase().includes(query.toLowerCase()))) {
          // This is a matching document
          results.push(item);
        }
      });
    };
    
    if (activeDocType === 'agent') {
      return agentDocuments.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase()) || 
        doc.category.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      searchInFolder(noovimoFolders);
      return results;
    }
  };

  // Updated function to get appropriate file icon based on file extension
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'docx':
      case 'doc':
      case 'word':
        return <FileText size={18} className="text-blue-500" />;
      case 'xlsx':
      case 'xls':
      case 'excel':
        return <FileSpreadsheet size={18} className="text-green-500" />;
      case 'pptx':
      case 'ppt':
      case 'powerpoint':
        return <FileText size={18} className="text-orange-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'webp':
        return <FileImage size={18} className="text-purple-500" />;
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'webm':
      case 'mkv':
        return <FileVideo size={18} className="text-pink-500" />;
      case 'mp3':
      case 'wav':
      case 'ogg':
      case 'flac':
        return <FileAudio size={18} className="text-yellow-500" />;
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
      case 'gz':
        return <File size={18} className="text-gray-500" />;
      case 'html':
      case 'css':
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'json':
        return <FileCode size={18} className="text-cyan-500" />;
      default:
        return <File size={18} className="text-gray-500" />;
    }
  };

  const filteredContents = searchQuery ? 
    searchDocuments(searchQuery) : 
    getCurrentFolderContents();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1">Gérez et organisez tous vos documents</p>
      </div>
      
      <Tabs defaultValue={activeDocType} onValueChange={(value) => {
        setActiveDocType(value as 'agent' | 'noovimo');
        setCurrentFolder('root');
        setBreadcrumbs([{ id: 'root', name: activeDocType === 'agent' ? 'Mes Documents' : 'Base Documentaire' }]);
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
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="search-bar flex items-center w-full">
                  <Search size={18} className="text-muted-foreground mr-2" />
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
                  <Filter size={16} />
                  <span>Filtrer</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-noovimo-500 text-white rounded-lg text-sm">
                  <Upload size={16} />
                  <span>Upload</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h3 className="font-medium mb-4">Mes Documents</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50">
                      <div className="flex items-center gap-2">
                        <FolderOpen size={18} className="text-noovimo-500" />
                        <span className="text-sm font-medium">Tous les documents</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {agentDocuments.length}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-500" />
                        <span className="text-sm">Favoris</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {agentDocuments.filter(doc => doc.starred).length}
                      </span>
                    </div>
                    
                    {agentCategories.map(category => (
                      <div 
                        key={category.name}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{category.count}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <button className="flex items-center gap-2 text-sm text-noovimo-500 hover:text-noovimo-600">
                      <Plus size={16} />
                      <span>Nouvelle catégorie</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Document list */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
                  <div className="p-4 border-b border-border">
                    <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium">
                      <div className="col-span-8">Nom</div>
                      <div className="col-span-4 text-right">Actions</div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {filteredContents.length > 0 ? (
                      filteredContents.map(document => (
                        <div 
                          key={(document as Document).id}
                          className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                        >
                          <div className="grid grid-cols-12 items-center">
                            <div className="col-span-8 flex items-center">
                              <div className="mr-3">
                                {getFileIcon((document as Document).type)}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{(document as Document).name}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {(document as Document).category}
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-span-4 flex items-center justify-end gap-2">
                              {(document as Document).starred && (
                                <Star size={16} className="text-yellow-500" />
                              )}
                              
                              <button className="icon-button" aria-label="Télécharger">
                                <Download size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Partager">
                                <Share2 size={16} className="text-muted-foreground" />
                              </button>
                              
                              <button className="icon-button" aria-label="Plus d'options">
                                <MoreVertical size={16} className="text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">Aucun document trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="noovimo">
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="search-bar flex items-center w-full">
                  <Search size={18} className="text-muted-foreground mr-2" />
                  <input
                    type="text"
                    placeholder="Rechercher dans la base documentaire..."
                    className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
                  <Filter size={16} />
                  <span>Filtrer</span>
                </button>
              </div>
            </div>
            
            {/* Breadcrumbs */}
            {!searchQuery && (
              <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.id}>
                    <span 
                      className={`cursor-pointer hover:text-foreground ${index === breadcrumbs.length - 1 ? 'font-medium text-foreground' : ''}`}
                      onClick={() => navigateToFolder(crumb.id, crumb.name)}
                    >
                      {crumb.name}
                    </span>
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight size={14} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h3 className="font-medium mb-4">Base Documentaire</h3>
                  
                  <div className="space-y-2">
                    <div 
                      className={`flex items-center justify-between p-2 rounded-lg ${currentFolder === 'root' ? 'bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50' : 'hover:bg-secondary cursor-pointer'}`}
                      onClick={() => navigateToFolder('root', 'Base Documentaire')}
                    >
                      <div className="flex items-center gap-2">
                        <FolderOpen size={18} className="text-noovimo-500" />
                        <span className="text-sm font-medium">Tous les dossiers</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-500" />
                        <span className="text-sm">Documents favoris</span>
                      </div>
                    </div>
                    
                    {noovimoFolders.map(folder => (
                      <div 
                        key={folder.id}
                        className={`flex items-center justify-between p-2 rounded-lg ${currentFolder === folder.id ? 'bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50' : 'hover:bg-secondary cursor-pointer'}`}
                        onClick={() => navigateToFolder(folder.id, folder.name)}
                      >
                        <div className="flex items-center gap-2">
                          <FolderOpen size={18} className={`${currentFolder === folder.id ? 'text-noovimo-500' : 'text-blue-500'}`} />
                          <span className="text-sm">{folder.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Document and folder list */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800">
                  <div className="p-4 border-b border-border">
                    <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium">
                      <div className="col-span-8">Nom</div>
                      <div className="col-span-4 text-right">Actions</div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {searchQuery ? (
                      // Search results
                      filteredContents.length > 0 ? (
                        (filteredContents as Document[]).map(document => (
                          <div 
                            key={document.id}
                            className="p-4 hover:bg-secondary/20 transition-colors"
                          >
                            <div className="grid grid-cols-12 items-center">
                              <div className="col-span-8 flex items-center">
                                <div className="mr-3">
                                  {getFileIcon(document.type)}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{document.name}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {document.category}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col-span-4 flex items-center justify-end gap-2">
                                {document.starred && (
                                  <Star size={16} className="text-yellow-500" />
                                )}
                                
                                <button className="icon-button" aria-label="Visualiser">
                                  <Eye size={16} className="text-muted-foreground" />
                                </button>
                                
                                <button className="icon-button" aria-label="Télécharger">
                                  <Download size={16} className="text-muted-foreground" />
                                </button>
                                
                                <button className="icon-button" aria-label="Imprimer">
                                  <Printer size={16} className="text-muted-foreground" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">Aucun document trouvé</p>
                        </div>
                      )
                    ) : (
                      // Folder contents
                      filteredContents.length > 0 ? (
                        (filteredContents as (Document | Folder)[]).map(item => {
                          if ('documents' in item) {
                            // Folder
                            return (
                              <div 
                                key={item.id}
                                className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                                onClick={() => navigateToFolder(item.id, item.name)}
                              >
                                <div className="grid grid-cols-12 items-center">
                                  <div className="col-span-8 flex items-center">
                                    <div className="mr-3">
                                      <FolderOpen size={18} className="text-blue-500" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm">{item.name}</div>
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {item.documents.length} élément{item.documents.length !== 1 ? 's' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="col-span-4 flex items-center justify-end">
                                    <ChevronRight size={16} className="text-muted-foreground" />
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            // Document
                            return (
                              <div 
                                key={item.id}
                                className="p-4 hover:bg-secondary/20 transition-colors"
                              >
                                <div className="grid grid-cols-12 items-center">
                                  <div className="col-span-8 flex items-center">
                                    <div className="mr-3">
                                      {getFileIcon(item.type)}
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm">{item.name}</div>
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {item.category}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="col-span-4 flex items-center justify-end gap-2">
                                    {item.starred && (
                                      <Star size={16} className="text-yellow-500" />
                                    )}
                                    
                                    <button className="icon-button" aria-label="Visualiser">
                                      <Eye size={16} className="text-muted-foreground" />
                                    </button>
                                    
                                    <button className="icon-button" aria-label="Télécharger">
                                      <Download size={16} className="text-muted-foreground" />
                                    </button>
                                    
                                    <button className="icon-button" aria-label="Imprimer">
                                      <Printer size={16} className="text-muted-foreground" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">Ce dossier est vide</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
