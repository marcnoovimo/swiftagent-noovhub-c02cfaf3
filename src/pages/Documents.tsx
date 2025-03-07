
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
  BookOpen
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  date: string;
  starred: boolean;
  documentType: 'agent' | 'noovimo';
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'agent' | 'noovimo'>('agent');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Compromis - 23 Rue des Lilas',
      type: 'pdf',
      category: 'Compromis',
      size: '2.4 MB',
      date: '15 Oct 2023',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '2',
      name: 'Mandat exclusif - 8 Avenue des Roses',
      type: 'docx',
      category: 'Mandats',
      size: '1.7 MB',
      date: '12 Oct 2023',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '3',
      name: 'Facture commission - Sept 2023',
      type: 'pdf',
      category: 'Factures',
      size: '0.8 MB',
      date: '5 Oct 2023',
      starred: true,
      documentType: 'agent'
    },
    {
      id: '4',
      name: 'Photos - Appartement Centre-ville',
      type: 'zip',
      category: 'Photos',
      size: '15.2 MB',
      date: '28 Sept 2023',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '5',
      name: 'Diagnostic DPE - Maison Nantes Sud',
      type: 'pdf',
      category: 'Diagnostics',
      size: '3.1 MB',
      date: '25 Sept 2023',
      starred: false,
      documentType: 'agent'
    },
    {
      id: '6',
      name: 'Formation - Techniques de négociation',
      type: 'mp4',
      category: 'Formations',
      size: '250 MB',
      date: '15 Sept 2023',
      starred: false,
      documentType: 'noovimo'
    },
    {
      id: '7',
      name: 'Guide juridique - Mandats de vente',
      type: 'pdf',
      category: 'Guides',
      size: '5.2 MB',
      date: '10 Sept 2023',
      starred: true,
      documentType: 'noovimo'
    },
    {
      id: '8',
      name: 'Webinaire - Optimisation fiscale',
      type: 'mp4',
      category: 'Webinaires',
      size: '320 MB',
      date: '2 Sept 2023',
      starred: false,
      documentType: 'noovimo'
    },
    {
      id: '9',
      name: 'Charte graphique Noovimo 2023',
      type: 'pdf',
      category: 'Communication',
      size: '8.7 MB',
      date: '25 Août 2023',
      starred: true,
      documentType: 'noovimo'
    },
    {
      id: '10',
      name: 'Modèles d\'emails clients',
      type: 'docx',
      category: 'Modèles',
      size: '1.1 MB',
      date: '18 Août 2023',
      starred: false,
      documentType: 'noovimo'
    },
  ]);

  const [agentCategories] = useState([
    { name: 'Compromis', icon: <FileText size={18} className="text-noovimo-500" />, count: 4 },
    { name: 'Mandats', icon: <FileText size={18} className="text-green-500" />, count: 8 },
    { name: 'Factures', icon: <FileText size={18} className="text-yellow-500" />, count: 6 },
    { name: 'Photos', icon: <FileText size={18} className="text-purple-500" />, count: 12 },
    { name: 'Diagnostics', icon: <FileText size={18} className="text-red-500" />, count: 5 },
  ]);

  const [noovimoCategories] = useState([
    { name: 'Formations', icon: <FileText size={18} className="text-noovimo-500" />, count: 15 },
    { name: 'Guides', icon: <FileText size={18} className="text-blue-500" />, count: 10 },
    { name: 'Webinaires', icon: <FileText size={18} className="text-indigo-500" />, count: 8 },
    { name: 'Communication', icon: <FileText size={18} className="text-teal-500" />, count: 6 },
    { name: 'Modèles', icon: <FileText size={18} className="text-amber-500" />, count: 12 },
  ]);

  const filteredDocuments = documents.filter(doc => 
    doc.documentType === activeDocType &&
    (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'docx':
        return <FileText size={18} className="text-blue-500" />;
      case 'zip':
        return <FileText size={18} className="text-purple-500" />;
      case 'mp4':
        return <FileText size={18} className="text-orange-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground mt-1">Gérez et organisez tous vos documents</p>
      </div>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveDocType('agent')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${activeDocType === 'agent' ? 'bg-noovimo-500 text-white' : 'bg-secondary text-foreground'}`}
        >
          <FileUp size={18} />
          <span>Mes Documents</span>
        </button>
        
        <button 
          onClick={() => setActiveDocType('noovimo')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${activeDocType === 'noovimo' ? 'bg-noovimo-500 text-white' : 'bg-secondary text-foreground'}`}
        >
          <BookOpen size={18} />
          <span>Base Documentaire Noovimo</span>
        </button>
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="search-bar flex items-center w-full">
              <Search size={18} className="text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder={`Rechercher ${activeDocType === 'agent' ? 'un document' : 'dans la base documentaire'}...`}
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
            
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
              <Calendar size={16} />
              <span>Date</span>
            </button>
            
            {activeDocType === 'agent' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-noovimo-500 text-white rounded-lg text-sm">
                <Upload size={16} />
                <span>Upload</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/30 rounded-xl p-4">
              <h3 className="font-medium mb-4">
                {activeDocType === 'agent' ? 'Mes Documents' : 'Base Documentaire Noovimo'}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-noovimo-50 border-l-2 border-noovimo-500 dark:bg-noovimo-950/50">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={18} className="text-noovimo-500" />
                    <span className="text-sm font-medium">Tous les documents</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {documents.filter(doc => doc.documentType === activeDocType).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-500" />
                    <span className="text-sm">Favoris</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {documents.filter(doc => doc.documentType === activeDocType && doc.starred).length}
                  </span>
                </div>
                
                {(activeDocType === 'agent' ? agentCategories : noovimoCategories).map(category => (
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
              
              {activeDocType === 'agent' && (
                <div className="mt-6">
                  <button className="flex items-center gap-2 text-sm text-noovimo-500 hover:text-noovimo-600">
                    <Plus size={16} />
                    <span>Nouvelle catégorie</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Document list */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-soft dark:bg-gray-800">
              <div className="p-4 border-b border-border">
                <div className="grid grid-cols-12 text-xs text-muted-foreground font-medium">
                  <div className="col-span-6">Nom</div>
                  <div className="col-span-2 hidden md:block">Catégorie</div>
                  <div className="col-span-2 hidden md:block">Taille</div>
                  <div className="col-span-2">Date</div>
                </div>
              </div>
              
              <div className="divide-y divide-border">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map(document => (
                    <div 
                      key={document.id}
                      className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                      <div className="grid grid-cols-12 items-center">
                        <div className="col-span-6 flex items-center">
                          <div className="mr-3">
                            {getFileIcon(document.type)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{document.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden mt-1">
                              {document.category} • {document.date}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-sm hidden md:block">{document.category}</div>
                        <div className="col-span-2 text-sm hidden md:block">{document.size}</div>
                        <div className="col-span-2 text-sm">{document.date}</div>
                        
                        <div className="flex items-center justify-end gap-2">
                          {document.starred && (
                            <Star size={16} className="text-yellow-500" />
                          )}
                          
                          <button className="icon-button">
                            <Download size={16} className="text-muted-foreground" />
                          </button>
                          
                          <button className="icon-button">
                            <Share2 size={16} className="text-muted-foreground" />
                          </button>
                          
                          <button className="icon-button">
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
    </div>
  );
};

export default Documents;
