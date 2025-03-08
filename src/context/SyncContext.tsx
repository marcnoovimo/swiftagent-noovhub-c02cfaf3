
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import SyncService from '@/services/syncService';

interface SyncContextProps {
  isOnline: boolean;
  lastSynced: Date | null;
  syncNow: () => void;
}

const SyncContext = createContext<SyncContextProps | undefined>(undefined);

export const SyncProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, demoMode } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const syncNow = () => {
    if (demoMode) {
      SyncService.simulateSync();
      setLastSynced(new Date());
    } else if (user) {
      // Logique de synchronisation réelle avec Supabase
      setLastSynced(new Date());
    }
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (user && !demoMode) {
      // Initialiser la synchronisation en temps réel avec Supabase
      SyncService.initialize(user.id).then(cleanupFn => {
        cleanup = cleanupFn;
        setLastSynced(new Date());
      });
    } else if (demoMode) {
      // En mode démo, simuler une synchronisation initiale
      setTimeout(() => {
        setLastSynced(new Date());
      }, 1000);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [user, demoMode]);

  return (
    <SyncContext.Provider value={{ isOnline, lastSynced, syncNow }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
