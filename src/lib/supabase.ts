
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This will make authentication work even without proper credentials
export const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Document storage buckets
export const STORAGE_BUCKETS = {
  DOCUMENTS: 'documents',
  ARCHIVES: 'archives'
};

// Initialize storage buckets if they don't exist
export const initializeStorage = async () => {
  if (!isSupabaseConfigured) return;
  
  try {
    // Create main documents bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    
    if (!buckets?.find(bucket => bucket.name === STORAGE_BUCKETS.DOCUMENTS)) {
      await supabase.storage.createBucket(STORAGE_BUCKETS.DOCUMENTS, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
      });
      
      // Create default folders
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).upload('admin/.gitkeep', new Blob(['']));
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).upload('agent/.gitkeep', new Blob(['']));
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).upload('shared/.gitkeep', new Blob(['']));
    }
    
    // Create archives bucket if it doesn't exist
    if (!buckets?.find(bucket => bucket.name === STORAGE_BUCKETS.ARCHIVES)) {
      await supabase.storage.createBucket(STORAGE_BUCKETS.ARCHIVES, {
        public: false,
        fileSizeLimit: 52428800, // 50MB for archives
      });
    }
    
    console.log('Storage buckets initialized');
  } catch (error) {
    console.error('Error initializing storage buckets:', error);
  }
};

// Initialize storage when module is imported in demo mode
if (isSupabaseConfigured) {
  initializeStorage();
}
