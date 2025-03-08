
export interface DocumentMetadata {
  id: string;
  name: string;
  type: string;
  category: string;
  starred: boolean;
  size?: number;
  ownerId?: string;
  createdAt?: string;
  path?: string;
  accessLevel?: 'admin' | 'agent' | 'shared';
  url?: string;
  unread?: boolean;
  extractedContent?: string;
}

// Mock data for documents
const mockDocuments: DocumentMetadata[] = [
  {
    id: "1",
    name: "Compromis Villa Marseille",
    type: "pdf",
    category: "Compromis",
    starred: true,
    createdAt: "2023-11-15T14:30:00Z",
    accessLevel: "agent",
    ownerId: "1"
  },
  {
    id: "2",
    name: "Mandat de vente - Appartement Lyon",
    type: "pdf",
    category: "Mandats",
    starred: false,
    createdAt: "2023-11-10T09:15:00Z",
    accessLevel: "agent",
    ownerId: "1"
  },
  {
    id: "3",
    name: "Facture Honoraires Vente Dupont",
    type: "pdf",
    category: "Factures",
    starred: false,
    createdAt: "2023-11-05T11:45:00Z",
    accessLevel: "agent",
    ownerId: "1"
  },
  // Add more mock documents as needed
];

// Check if a user is an admin
export const isAdmin = (user: any): boolean => {
  // For demo purposes, consider emails ending with @admin.noovimo.fr as admin
  return user?.email?.endsWith('@admin.noovimo.fr') || false;
};

// Upload a document
export const uploadDocument = async (
  file: File,
  category: string,
  accessLevel: 'admin' | 'agent' | 'shared',
  user: any,
  metadata?: Record<string, any>
): Promise<{ data: DocumentMetadata | null; error: string | null }> => {
  try {
    // In a real implementation, this would upload to Supabase or another backend
    // For now, we'll create a mock document
    const newDoc: DocumentMetadata = {
      id: `doc_${Date.now()}`,
      name: file.name,
      type: file.name.split('.').pop() || 'unknown',
      category,
      starred: false,
      size: file.size,
      ownerId: user?.id,
      createdAt: new Date().toISOString(),
      accessLevel,
      url: URL.createObjectURL(file),
      ...metadata
    };
    
    console.log('Document uploaded:', newDoc);
    
    // Return success
    return { data: newDoc, error: null };
  } catch (error) {
    console.error('Error uploading document:', error);
    return { data: null, error: 'Failed to upload document' };
  }
};

// Get documents for a user
export const getDocuments = async (user: any): Promise<{ data: DocumentMetadata[]; error: string | null }> => {
  try {
    // In a real implementation, this would fetch from Supabase or another backend
    // For now, we'll return mock data filtered by user
    let docs = [...mockDocuments];
    
    // Filter by owner if user is not admin
    if (user && !isAdmin(user)) {
      docs = docs.filter(doc => 
        doc.ownerId === user.id || 
        doc.accessLevel === 'shared'
      );
    }
    
    return { data: docs, error: null };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return { data: [], error: 'Failed to fetch documents' };
  }
};

// Get a single document by ID
export const getDocumentById = async (id: string): Promise<{ data: DocumentMetadata | null; error: string | null }> => {
  try {
    const doc = mockDocuments.find(d => d.id === id);
    if (!doc) {
      return { data: null, error: 'Document not found' };
    }
    return { data: doc, error: null };
  } catch (error) {
    console.error('Error fetching document:', error);
    return { data: null, error: 'Failed to fetch document' };
  }
};

// Update a document
export const updateDocument = async (
  id: string, 
  updates: Partial<DocumentMetadata>
): Promise<{ data: DocumentMetadata | null; error: string | null }> => {
  try {
    const index = mockDocuments.findIndex(d => d.id === id);
    if (index === -1) {
      return { data: null, error: 'Document not found' };
    }
    
    // Update the document
    const updatedDoc = { ...mockDocuments[index], ...updates };
    mockDocuments[index] = updatedDoc;
    
    return { data: updatedDoc, error: null };
  } catch (error) {
    console.error('Error updating document:', error);
    return { data: null, error: 'Failed to update document' };
  }
};

// Delete a document
export const deleteDocument = async (id: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const index = mockDocuments.findIndex(d => d.id === id);
    if (index === -1) {
      return { success: false, error: 'Document not found' };
    }
    
    // Remove from array
    mockDocuments.splice(index, 1);
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting document:', error);
    return { success: false, error: 'Failed to delete document' };
  }
};
