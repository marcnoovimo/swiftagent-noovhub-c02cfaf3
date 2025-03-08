
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    // Récupérer la session au chargement
    const fetchSession = async () => {
      if (!isSupabaseConfigured) {
        console.log("Mode démo activé: Supabase non configuré");
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
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
        // On ne définit pas de session car c'est un objet plus complexe
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
      setUser(null);
      setSession(null);
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
        demoMode
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
