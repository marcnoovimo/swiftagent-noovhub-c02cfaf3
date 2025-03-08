
import React, { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';
import { isAdmin as checkIsAdmin } from '@/services/documentService';
import { AuthContext } from './auth-context';
import { AuthContextProps, DEMO_USER_KEY, DEMO_ADMIN_KEY } from './auth-types';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!isSupabaseConfigured);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Retrieve session on load
    const fetchSession = async () => {
      if (!isSupabaseConfigured) {
        console.log("Demo mode enabled: Supabase not configured");
        
        // Check if we have a stored demo user
        try {
          const storedUser = localStorage.getItem(DEMO_USER_KEY);
          const storedIsAdmin = localStorage.getItem(DEMO_ADMIN_KEY);
          
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as User;
            setUser(parsedUser);
            setIsAdmin(storedIsAdmin === 'true');
            console.log("Demo session restored from localStorage");
          }
        } catch (error) {
          console.error("Error retrieving demo session:", error);
        }
        
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Supabase session retrieved:", session ? "Valid" : "None");
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userIsAdmin = await checkIsAdmin(session.user);
          setIsAdmin(userIsAdmin);
        }
      } catch (error) {
        console.error("Error retrieving session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    
    if (isSupabaseConfigured) {
      try {
        const { data } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            console.log("Auth state changed:", _event);
            setSession(session);
            setUser(session?.user ?? null);
            setIsAdmin(session?.user ? await checkIsAdmin(session.user) : false);
            setLoading(false);
          }
        );
        subscription = data.subscription;
      } catch (error) {
        console.error("Error listening to auth changes:", error);
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
        console.log("Demo mode: simulated login for", email);
        // Simulate logged in user in demo mode
        const demoUser = {
          id: '1',
          email: email,
          app_metadata: {},
          user_metadata: {
            full_name: email.split('@')[0].replace('.', ' ').split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            avatar_url: '',
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: '',
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          identities: [],
          phone: '',
          phone_confirmed_at: null,
          confirmation_sent_at: null,
          recovery_sent_at: null,
          email_change_sent_at: null,
          new_email: null,
          new_phone: null,
          email_confirmed_at: new Date().toISOString(),
          banned_until: null,
          reauthentication_sent_at: null,
          is_anonymous: false,
          toJSON: () => ({}),
          factors: [],
          mfa_factors: []
        } as User;
        
        setUser(demoUser);
        
        // Set if user is admin based on email
        const userIsAdmin = email.endsWith('@admin.noovimo.fr');
        setIsAdmin(userIsAdmin);
        
        // Store in localStorage for persistence
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        localStorage.setItem(DEMO_ADMIN_KEY, userIsAdmin.toString());
        
        toast.success("Demo mode enabled. Welcome to Noovimo intranet.");
        
        return { error: null };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login successful");
      }
      
      return { error };
    } catch (error) {
      console.error("Login error:", error);
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
        console.log("Demo mode: simulated reset for", email);
        return { error: null };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      console.error("Error resetting password:", error);
      return { error: error as Error };
    }
  };

  const contextValue: AuthContextProps = {
    session,
    user,
    signIn,
    signOut,
    resetPassword,
    loading,
    demoMode,
    isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
