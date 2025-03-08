
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextProps {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    error: Error | null;
  }>;
  loading: boolean;
  demoMode: boolean;
  isAdmin: boolean;
}

// Constants for local storage keys
export const DEMO_USER_KEY = 'noovimo_demo_user';
export const DEMO_ADMIN_KEY = 'noovimo_demo_admin';
