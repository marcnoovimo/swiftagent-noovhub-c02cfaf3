
import { supabase, STORAGE_BUCKETS, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { detectDocumentType } from '@/lib/utils';

// Types for document metadata
export interface DocumentMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  ownerId: string;
  createdAt: string;
  category: string;
  path: string;
  accessLevel: 'admin' | 'agent' | 'shared';
  starred: boolean;
  isScanned?: boolean;
  scanDate?: string;
  metadata?: Record<string, any>;
}

// Mock documents for demo mode (used when Supabase is not configured)
const mockDocuments: DocumentMetadata[] = [
  {
    id: '1',
    name: 'Compromis - 23 Rue des Lilas',
    type: 'pdf',
    size: 2500000,
    ownerId: '1',
    createdAt: new Date().toISOString(),
    category: 'Compromis',
    path: 'agent/compromis/compromis_lilas.pdf',
    accessLevel: 'agent',
    starred: true
  },
  {
    id: '2',
    name: 'Mandat exclusif - 8 Avenue des Roses',
    type: 'docx',
    size: 1800000,
    ownerId: '1',
    createdAt: new Date().toISOString(),
    category: 'Mandats',
    path: 'agent/mandats/mandat_roses.docx',
    accessLevel: 'agent',
    starred: false
  },
  {
    id: '3',
    name: 'Formation - Techniques de négociation',
    type: 'mp4',
    size: 25000000,
    ownerId: 'admin',
    createdAt: new Date().toISOString(),
    category: 'Formations',
    path: 'shared/formations/technique_negociation.mp4',
    accessLevel: 'shared',
    starred: false
  },
  {
    id: '4',
    name: 'Guide juridique - Mandats de vente',
    type: 'pdf',
    size: 5000000,
    ownerId: 'admin',
    createdAt: new Date().toISOString(),
    category: 'Guides',
    path: 'shared/guides/guide_mandats.pdf',
    accessLevel: 'shared',
    starred: true
  }
];

/**
 * Determines if a user has admin privileges
 */
export const isAdmin = (user: User | null): boolean => {
  if (!user) return false;
  
  // In a real implementation, you would check the user's role in user_metadata or app_metadata
  // For demo purposes, users with @admin.noovimo.fr are admins
  return user.email?.endsWith('@admin.noovimo.fr') || false;
};

/**
 * Uploads a file to Supabase Storage with the appropriate access level
 */
export const uploadDocument = async (
  file: File,
  category: string,
  accessLevel: 'admin' | 'agent' | 'shared',
  currentUser: User | null,
  additionalMetadata?: Record<string, any>
): Promise<{ data: DocumentMetadata | null; error: string | null }> => {
  if (!currentUser) {
    return { data: null, error: 'Utilisateur non authentifié' };
  }
  
  // Check if user has permission to upload to this access level
  if (accessLevel === 'admin' && !isAdmin(currentUser)) {
    return { data: null, error: 'Autorisation insuffisante pour cette action' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - create mock document
      const mockDocument: DocumentMetadata = {
        id: uuidv4(),
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: file.size,
        ownerId: currentUser.id,
        createdAt: new Date().toISOString(),
        category,
        path: `${accessLevel}/${category}/${file.name}`,
        accessLevel,
        starred: false,
        ...additionalMetadata
      };
      
      // Try to auto-classify if category is not specified
      if (category === 'Autres') {
        mockDocument.category = detectDocumentType(file.name);
      }
      
      // Add to mock documents array (in real app this would be in Supabase)
      mockDocuments.push(mockDocument);
      
      // Show different message based on whether it's a scanned document
      if (additionalMetadata?.isScanned) {
        toast.success('Document scanné et classifié avec succès (mode démo)');
      } else {
        toast.success('Document ajouté avec succès (mode démo)');
      }
      
      return { data: mockDocument, error: null };
    }
    
    // Real implementation with Supabase
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${accessLevel}/${category}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .upload(filePath, file);
      
    if (error) {
      console.error('Error uploading file:', error);
      return { data: null, error: error.message };
    }
    
    // Try to auto-classify if category is not specified
    let documentCategory = category;
    if (category === 'Autres') {
      documentCategory = detectDocumentType(file.name);
    }
    
    // Create metadata record in the documents table
    const documentMetadata: Omit<DocumentMetadata, 'id'> = {
      name: file.name,
      type: file.name.split('.').pop() || 'unknown',
      size: file.size,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
      category: documentCategory,
      path: data.path,
      accessLevel,
      starred: false,
      ...additionalMetadata
    };
    
    const { data: metadataData, error: metadataError } = await supabase
      .from('documents')
      .insert(documentMetadata)
      .select('*')
      .single();
      
    if (metadataError) {
      console.error('Error saving document metadata:', metadataError);
      // If metadata fails, remove the uploaded file to avoid orphaned files
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).remove([filePath]);
      return { data: null, error: metadataError.message };
    }
    
    // Show different message based on whether it's a scanned document
    if (additionalMetadata?.isScanned) {
      toast.success('Document scanné et classifié avec succès');
    } else {
      toast.success('Document ajouté avec succès');
    }
    
    return { data: metadataData as DocumentMetadata, error: null };
    
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    return { data: null, error: 'Une erreur est survenue lors de l\'upload du document' };
  }
};

/**
 * Gets documents that the current user has access to
 */
export const getDocuments = async (
  currentUser: User | null
): Promise<{ data: DocumentMetadata[]; error: string | null }> => {
  if (!currentUser) {
    return { data: [], error: 'Utilisateur non authentifié' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - return mock documents
      const isUserAdmin = isAdmin(currentUser);
      const accessibleDocuments = mockDocuments.filter(doc => 
        // Admins can see all documents
        isUserAdmin || 
        // Others can see shared documents and their own documents
        doc.accessLevel === 'shared' || 
        (doc.accessLevel === 'agent' && doc.ownerId === currentUser.id)
      );
      
      return { data: accessibleDocuments, error: null };
    }
    
    // Real implementation with Supabase
    const isUserAdmin = isAdmin(currentUser);
    let query = supabase.from('documents').select('*');
    
    if (!isUserAdmin) {
      // Non-admins can only see shared documents and their own documents
      query = query.or(`accessLevel.eq.shared,ownerId.eq.${currentUser.id}`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching documents:', error);
      return { data: [], error: error.message };
    }
    
    return { data: data as DocumentMetadata[], error: null };
    
  } catch (error) {
    console.error('Error in getDocuments:', error);
    return { data: [], error: 'Une erreur est survenue lors de la récupération des documents' };
  }
};

/**
 * Deletes a document from storage and its metadata
 */
export const deleteDocument = async (
  documentId: string,
  currentUser: User | null
): Promise<{ success: boolean; error: string | null }> => {
  if (!currentUser) {
    return { success: false, error: 'Utilisateur non authentifié' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - remove from mock documents
      const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
      
      if (documentIndex === -1) {
        return { success: false, error: 'Document non trouvé' };
      }
      
      const doc = mockDocuments[documentIndex];
      
      // Only admins or document owners can delete
      if (!isAdmin(currentUser) && doc.ownerId !== currentUser.id) {
        return { success: false, error: 'Autorisation insuffisante pour cette action' };
      }
      
      mockDocuments.splice(documentIndex, 1);
      toast.success('Document supprimé avec succès (mode démo)');
      return { success: true, error: null };
    }
    
    // Real implementation with Supabase
    
    // First get the document metadata to check permissions and get the file path
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();
      
    if (fetchError || !document) {
      return { success: false, error: 'Document non trouvé' };
    }
    
    // Check permissions - only admins or owners can delete
    if (!isAdmin(currentUser) && (document as DocumentMetadata).ownerId !== currentUser.id) {
      return { success: false, error: 'Autorisation insuffisante pour cette action' };
    }
    
    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .remove([(document as DocumentMetadata).path]);
      
    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      return { success: false, error: storageError.message };
    }
    
    // Delete the metadata
    const { error: metadataError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);
      
    if (metadataError) {
      console.error('Error deleting document metadata:', metadataError);
      return { success: false, error: metadataError.message };
    }
    
    toast.success('Document supprimé avec succès');
    return { success: true, error: null };
    
  } catch (error) {
    console.error('Error in deleteDocument:', error);
    return { success: false, error: 'Une erreur est survenue lors de la suppression du document' };
  }
};

/**
 * Updates a document's metadata (e.g., starred status, name, category)
 */
export const updateDocument = async (
  documentId: string,
  updates: Partial<DocumentMetadata>,
  currentUser: User | null
): Promise<{ success: boolean; error: string | null }> => {
  if (!currentUser) {
    return { success: false, error: 'Utilisateur non authentifié' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - update mock document
      const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
      
      if (documentIndex === -1) {
        return { success: false, error: 'Document non trouvé' };
      }
      
      const doc = mockDocuments[documentIndex];
      
      // Only admins or document owners can update
      if (!isAdmin(currentUser) && doc.ownerId !== currentUser.id) {
        return { success: false, error: 'Autorisation insuffisante pour cette action' };
      }
      
      // Update the document
      mockDocuments[documentIndex] = { ...doc, ...updates };
      toast.success('Document mis à jour avec succès (mode démo)');
      return { success: true, error: null };
    }
    
    // Real implementation with Supabase
    
    // First get the document to check permissions
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();
      
    if (fetchError || !document) {
      return { success: false, error: 'Document non trouvé' };
    }
    
    // Check permissions - only admins or owners can update
    if (!isAdmin(currentUser) && (document as DocumentMetadata).ownerId !== currentUser.id) {
      return { success: false, error: 'Autorisation insuffisante pour cette action' };
    }
    
    // Update the document metadata
    const { error: updateError } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', documentId);
      
    if (updateError) {
      console.error('Error updating document:', updateError);
      return { success: false, error: updateError.message };
    }
    
    toast.success('Document mis à jour avec succès');
    return { success: true, error: null };
    
  } catch (error) {
    console.error('Error in updateDocument:', error);
    return { success: false, error: 'Une erreur est survenue lors de la mise à jour du document' };
  }
};

/**
 * Gets a download URL for a document
 */
export const getDocumentUrl = async (
  documentPath: string,
  currentUser: User | null
): Promise<{ url: string | null; error: string | null }> => {
  if (!currentUser) {
    return { url: null, error: 'Utilisateur non authentifié' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - return a mock URL
      return { url: `https://example.com/documents/${documentPath}`, error: null };
    }
    
    // Real implementation with Supabase - get a temporary download URL
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .createSignedUrl(documentPath, 60); // URL valid for 60 seconds
      
    if (error) {
      console.error('Error getting document URL:', error);
      return { url: null, error: error.message };
    }
    
    return { url: data.signedUrl, error: null };
    
  } catch (error) {
    console.error('Error in getDocumentUrl:', error);
    return { url: null, error: 'Une erreur est survenue lors de la récupération de l\'URL' };
  }
};

/**
 * Creates a backup of all documents and data
 * In a real implementation, this would be triggered by a cron job every 48h
 */
export const createBackup = async (currentUser: User | null): Promise<{ success: boolean; error: string | null }> => {
  if (!currentUser) {
    return { success: false, error: 'Utilisateur non authentifié' };
  }
  
  // Only admins can create backups
  if (!isAdmin(currentUser)) {
    return { success: false, error: 'Autorisation insuffisante pour cette action' };
  }
  
  try {
    if (!isSupabaseConfigured) {
      // Demo mode - just show a success message
      toast.success('Sauvegarde simulée avec succès (mode démo)');
      return { success: true, error: null };
    }
    
    // In a real implementation, this would:
    // 1. Create a timestamped folder in the archives bucket
    // 2. Copy all files from the documents bucket to the archives bucket
    // 3. Export metadata from the database and store it as JSON
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `backup-${timestamp}`;
    
    // For this demo, we'll just create an empty marker file
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.ARCHIVES)
      .upload(`${backupPath}/.backup-marker`, new Blob(['Backup created']));
      
    if (error) {
      console.error('Error creating backup:', error);
      return { success: false, error: error.message };
    }
    
    toast.success('Sauvegarde créée avec succès');
    return { success: true, error: null };
    
  } catch (error) {
    console.error('Error in createBackup:', error);
    return { success: false, error: 'Une erreur est survenue lors de la création de la sauvegarde' };
  }
};

/**
 * Schedule automated backups (every 48 hours)
 * In a real implementation, this would be handled by a server-side cron job
 * For this demo, we'll simulate it with a setInterval
 */
export const scheduleAutomatedBackups = () => {
  if (!isSupabaseConfigured) return;
  
  // For demo purposes only - in a real app, this should be a server-side cron job
  // This interval will be cleared when the page refreshes
  const BACKUP_INTERVAL = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  
  setInterval(async () => {
    try {
      // In a real implementation, this would be an authenticated edge function or server-side job
      console.log('Automated backup triggered');
      
      // Call Supabase Edge Function to perform the backup
      const { error } = await supabase.functions.invoke('create-backup', {});
      
      if (error) {
        console.error('Automated backup failed:', error);
      } else {
        console.log('Automated backup completed successfully');
      }
    } catch (error) {
      console.error('Error in automated backup:', error);
    }
  }, BACKUP_INTERVAL);
};

// Add hook to Context for auth
export const updateAuthContextWithRoles = (user: User | null): { isAdmin: boolean } => {
  return {
    isAdmin: isAdmin(user)
  };
};

// Initialize scheduled backups when supabase is configured
if (isSupabaseConfigured) {
  scheduleAutomatedBackups();
}
