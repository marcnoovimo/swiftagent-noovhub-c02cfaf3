
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Service pour gérer la synchronisation en temps réel des messages et documents
 * entre différents appareils via Supabase Realtime
 */
export const SyncService = {
  /**
   * Initialise les abonnements aux changements en temps réel
   */
  initialize: async (userId: string) => {
    if (!isSupabaseConfigured) {
      console.log("Mode démo: synchronisation simulée");
      return;
    }

    try {
      // S'abonner aux changements des messages instantanés
      const messagesChannel = supabase
        .channel('messages-sync')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${userId}`,
        }, (payload) => {
          // Traiter les mises à jour en temps réel
          console.log('Nouveau message reçu:', payload);
          if (payload.eventType === 'INSERT') {
            toast.info("Nouveau message reçu", {
              description: "Synchronisation entre vos appareils terminée"
            });
          }
        })
        .subscribe();

      // S'abonner aux changements de documents
      const documentsChannel = supabase
        .channel('documents-sync')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'documents',
        }, (payload) => {
          console.log('Mise à jour document:', payload);
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            toast.info("Document mis à jour", {
              description: "Synchronisation terminée sur tous vos appareils"
            });
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(messagesChannel);
        supabase.removeChannel(documentsChannel);
      };
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la synchronisation:", error);
    }
  },

  /**
   * Simule la synchronisation pour le mode démo
   */
  simulateSync: () => {
    const syncEvents = [
      "Synchronisation en cours...",
      "Messages synchronisés",
      "Documents synchronisés",
      "Contacts synchronisés"
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index >= syncEvents.length) {
        clearInterval(interval);
        toast.success("Synchronisation terminée", {
          description: "Tous vos appareils sont à jour"
        });
        return;
      }
      
      toast.info(syncEvents[index]);
      index++;
    }, 1500);
    
    return () => clearInterval(interval);
  }
};

export default SyncService;
