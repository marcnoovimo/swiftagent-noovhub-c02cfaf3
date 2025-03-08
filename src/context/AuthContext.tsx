
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { isAdmin as checkIsAdmin } from '@/services/documentService';

interface AuthContextProps {
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

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a key for storing demo user in localStorage
const DEMO_USER_KEY = 'noovimo_demo_user';
const DEMO_ADMIN_KEY = 'noovimo_demo_admin';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!isSupabaseConfigured);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Récupérer la session au chargement
    const fetchSession = async () => {
      if (!isSupabaseConfigured) {
        console.log("Mode démo activé: Supabase non configuré");
        
        // Check if we have a stored demo user
        try {
          const storedUser = localStorage.getItem(DEMO_USER_KEY);
          const storedIsAdmin = localStorage.getItem(DEMO_ADMIN_KEY);
          
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as User;
            setUser(parsedUser);
            setIsAdmin(storedIsAdmin === 'true');
            console.log("Session démo restaurée depuis localStorage");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de la session démo:", error);
        }
        
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userIsAdmin = checkIsAdmin(session.user);
          setIsAdmin(userIsAdmin);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Écouter les changements d'authentification
    let subscription: { unsubscribe: () => void } | null = null;
    
    if (isSupabaseConfigured) {
      try {
        const { data } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsAdmin(session?.user ? checkIsAdmin(session.user) : false);
            setLoading(false);
          }
        );
        subscription = data.subscription;
      } catch (error) {
        console.error("Erreur lors de l'écoute des changements d'auth:", error);
        setLoading(false);
      }
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured) {
        console.log("Mode démo: connexion simulée pour", email);
        // Simuler un utilisateur connecté en mode démo
        // Conversion explicite en User pour satisfaire TypeScript
        const demoUser = {
          id: '1',
          email: email,
          app_metadata: {},
          user_metadata: {
            full_name: 'Utilisateur Démo'
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: '',
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          identities: []
        } as User;
        
        setUser(demoUser);
        
        // Définir si l'utilisateur est admin en fonction de son email
        const userIsAdmin = email.endsWith('@admin.noovimo.fr');
        setIsAdmin(userIsAdmin);
        
        // Store in localStorage for persistence
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        localStorage.setItem(DEMO_ADMIN_KEY, userIsAdmin.toString());
        
        toast.success("Mode démo activé. Bienvenue sur l'intranet Noovimo.");
        
        return { error: null };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (demoMode) {
      // Clear localStorage for demo mode
      localStorage.removeItem(DEMO_USER_KEY);
      localStorage.removeItem(DEMO_ADMIN_KEY);
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      return;
    }
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      if (!isSupabaseConfigured) {
        console.log("Mode démo: réinitialisation simulée pour", email);
        return { error: null };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      console.error("Erreur de réinitialisation:", error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        resetPassword,
        loading,
        demoMode,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
