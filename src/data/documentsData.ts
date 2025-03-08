import { Document, Folder, Category } from '@/components/documents/types';
import { FileText, File, Image, FileArchive, FileCheck } from 'lucide-react';

// Agent documents structure
export const agentDocuments: Document[] = [
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
];

// Hierarchical Noovimo documents structure
export const noovimoFolders: Folder[] = [
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
];

// Using the correct Category interface
export const agentCategories: Category[] = [
  { name: 'Compromis', icon: FileText, count: 4 },
  { name: 'Mandats', icon: FileText, count: 8 },
  { name: 'Factures', icon: FileText, count: 6 },
  { name: 'Photos', icon: Image, count: 12 },
  { name: 'Diagnostics', icon: FileCheck, count: 5 },
];
