
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  documentType?: 'agent' | 'noovimo'; // Made optional to fix type compatibility issues
  size?: number;
  ownerId?: string;
  createdAt?: string;
  path?: string;
  accessLevel?: 'admin' | 'agent' | 'shared';
  url?: string;
  unread?: boolean;
  isScanned?: boolean; // Flag to indicate if document was scanned
  scanDate?: string; // Date when document was scanned
  analyzeText?: boolean; // Flag to indicate if document text should be analyzed
  extractedContent?: string; // Content extracted from document via OCR
  confidenceScore?: number; // OCR confidence score
  classificationScore?: number; // Auto-classification confidence score
  // New properties for statistics tracking
  propertyValue?: number; // Value of the property in the document (for sales/contracts)
  commissionAmount?: number; // Commission amount for the transaction
  transactionType?: 'vente' | 'compromis' | 'mandat' | 'autre'; // Type of transaction
  transactionDate?: string; // Date of the transaction
  propertyAddress?: string; // Address of the property
  propertyType?: string; // Type of property (apartment, house, etc.)
  analyzed?: boolean; // Flag to indicate if document has been analyzed for stats
  // Nouvelles propriétés pour les avant-contrats
  sellerName?: string; // Nom du vendeur
  buyerName?: string; // Nom de l'acquéreur
  agentFees?: string; // Honoraires agent
  preliminaryContractDate?: Date | string; // Date de l'avant-contrat
  finalActDate?: Date | string; // Date prévue de l'acte
  contractData?: any; // Données complètes du contrat
}

export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  documents: (Document | Folder)[];
  parentId?: string;
  unreadCount?: number; // Nombre de documents non lus dans le dossier
}

export interface Category {
  name: string;
  icon: any; // Using 'any' to solve the Lucide icon component typing issue
  count: number;
}

export type BreadcrumbItem = {
  id: string;
  name: string;
};

export type AccessLevel = 'admin' | 'agent' | 'shared';

export interface UploadOptions {
  category: string;
  accessLevel: AccessLevel;
}

export interface ScanOptions {
  category: string;
  accessLevel: AccessLevel;
  documentName: string;
  autoClassify: boolean;
  analyzeText?: boolean; // Option pour analyser le texte du document scanné
  contractData?: any; // Données du contrat si c'est un avant-contrat
}

// New types for statistics tracking
export interface AgentStats {
  agentId: string;
  agentName: string;
  period: string; // e.g., "2023-05" for May 2023
  sales: number; // Number of completed sales
  contracts: number; // Number of signed contracts
  mandates: number; // Number of new mandates
  totalVolume: number; // Total property value
  totalCommission: number; // Total commission earned
  conversionRate: number; // Conversion rate (sales/mandates)
  documents: number; // Total documents uploaded
}

export interface ReportData {
  agent: {
    id: string;
    name: string;
    email?: string;
  };
  period: {
    month: string;
    year: string;
  };
  metrics: {
    sales: number;
    contracts: number;
    mandates: number;
    conversionRate: number;
    volume: number;
    commission: number;
    averageCommissionRate: number;
  };
  documents: Document[];
  previousPeriod?: {
    sales: number;
    contracts: number;
    mandates: number;
    conversionRate: number;
    volume: number;
    commission: number;
  };
}
