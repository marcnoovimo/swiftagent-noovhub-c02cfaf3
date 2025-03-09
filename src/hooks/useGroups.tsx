
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Group, GroupMessage } from '@/types/group';

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fonction pour charger tous les groupes dont l'utilisateur est membre
  const fetchGroups = async () => {
    try {
      setLoading(true);
      
      // Pour l'instant, on utilise des données statiques, à remplacer par Supabase
      const mockGroups: Group[] = [
        {
          id: '1',
          name: 'Équipe Nantes',
          description: 'Groupe des agents commerciaux de Nantes',
          avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
          members: 8,
          lastMessage: {
            sender: 'Marie',
            content: 'La réunion est confirmée pour vendredi',
            time: '11:30',
          },
          unreadCount: 3,
        },
        {
          id: '2',
          name: 'Mandataires Bretagne',
          description: 'Échanges entre mandataires de la région Bretagne',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
          members: 12,
          lastMessage: {
            sender: 'Thomas',
            content: 'Nouveau bien à Rennes, photos dans le dossier partagé',
            time: 'Hier',
          },
          unreadCount: 0,
        },
        {
          id: '3',
          name: 'Formation Janvier',
          description: 'Groupe pour la formation des nouveaux agents de janvier',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          members: 25,
          lastMessage: {
            sender: 'Sophie',
            content: 'Tous les supports sont maintenant disponibles',
            time: 'Mer',
          },
          unreadCount: 5,
        },
        {
          id: '4',
          name: 'Nouvelles réglementations',
          description: 'Informations sur les nouvelles lois immobilières',
          avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
          members: 42,
          lastMessage: {
            sender: 'Pierre',
            content: 'Webinaire explicatif le 20 mars à 14h',
            time: 'Lun',
          },
          unreadCount: 0,
        },
      ];
      
      setGroups(mockGroups);
      if (mockGroups.length > 0 && !activeGroup) {
        setActiveGroup(mockGroups[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
      toast.error('Impossible de charger les groupes de discussion');
      setLoading(false);
    }
  };

  // Fonction pour charger les messages d'un groupe
  const fetchGroupMessages = async (groupId: string) => {
    try {
      setLoading(true);
      
      // Pour l'instant, on utilise des données statiques, à remplacer par Supabase
      const mockMessages: GroupMessage[] = [
        {
          id: '1',
          groupId,
          sender: {
            id: '101',
            name: 'Marie',
            avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          content: 'Bonjour à tous, j\'espère que vous allez bien!',
          timestamp: '09:30',
          isOwn: false,
        },
        {
          id: '2',
          groupId,
          sender: {
            id: '102',
            name: 'Thomas',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
          },
          content: 'Bonjour Marie, tout va bien ici. On confirme la réunion de vendredi?',
          timestamp: '09:45',
          isOwn: false,
        },
        {
          id: '3',
          groupId,
          sender: {
            id: user?.id || '103',
            name: 'Vous',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          content: 'Oui, je serai présent. Pouvons-nous ajouter un point sur les nouveaux mandats?',
          timestamp: '10:15',
          isOwn: true,
        },
        {
          id: '4',
          groupId,
          sender: {
            id: '104',
            name: 'Sophie',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          },
          content: 'Bien sûr, c\'est noté. Je mets à jour l\'ordre du jour.',
          timestamp: '10:30',
          isOwn: false,
        },
        {
          id: '5',
          groupId,
          sender: {
            id: '101',
            name: 'Marie',
            avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          content: 'Parfait! Je vous envoie l\'invitation mise à jour d\'ici ce soir.',
          timestamp: '11:00',
          isOwn: false,
        },
        {
          id: '6',
          groupId,
          sender: {
            id: '101',
            name: 'Marie',
            avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
          },
          content: 'La réunion est confirmée pour vendredi',
          timestamp: '11:30',
          isOwn: false,
        },
      ];
      
      setGroupMessages(mockMessages);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      toast.error('Impossible de charger les messages du groupe');
      setLoading(false);
    }
  };

  // Fonction pour envoyer un message
  const sendMessage = async (groupId: string, content: string) => {
    if (!content.trim() || !user) return;
    
    try {
      // Pour l'instant, on simule l'envoi, à remplacer par Supabase
      const newMessage: GroupMessage = {
        id: Date.now().toString(),
        groupId,
        sender: {
          id: user.id,
          name: 'Vous',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      
      setGroupMessages(prev => [...prev, newMessage]);
      
      // Mise à jour du dernier message dans la liste des groupes
      setGroups(prevGroups => 
        prevGroups.map(group => 
          group.id === groupId 
            ? {
                ...group,
                lastMessage: {
                  sender: 'Vous',
                  content,
                  time: 'À l\'instant',
                },
              }
            : group
        )
      );
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error('Impossible d\'envoyer le message');
      return false;
    }
  };

  // Fonction pour créer un nouveau groupe (admin seulement)
  const createGroup = async (name: string, description: string, avatar: string = 'https://randomuser.me/api/portraits/lego/1.jpg') => {
    try {
      // Pour l'instant, on simule la création, à remplacer par Supabase
      const newGroup: Group = {
        id: Date.now().toString(),
        name,
        description,
        avatar,
        members: 1,
        lastMessage: {
          sender: 'Système',
          content: 'Groupe créé',
          time: 'À l\'instant',
        },
        unreadCount: 0,
      };
      
      setGroups(prev => [newGroup, ...prev]);
      toast.success(`Le groupe "${name}" a été créé`);
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
      toast.error('Impossible de créer le groupe');
      return false;
    }
  };

  // Fonction pour rejoindre un groupe
  const joinGroup = async (groupId: string) => {
    try {
      // Pour l'instant, on simule, à remplacer par Supabase
      setGroups(prevGroups => 
        prevGroups.map(group => 
          group.id === groupId 
            ? { ...group, members: group.members + 1 }
            : group
        )
      );
      
      toast.success('Vous avez rejoint le groupe');
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'adhésion au groupe:', error);
      toast.error('Impossible de rejoindre le groupe');
      return false;
    }
  };

  // Effet pour charger les groupes au démarrage
  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  // Effet pour charger les messages quand on change de groupe actif
  useEffect(() => {
    if (activeGroup) {
      fetchGroupMessages(activeGroup.id);
    }
  }, [activeGroup?.id]);

  return {
    groups,
    activeGroup,
    setActiveGroup,
    groupMessages,
    loading,
    sendMessage,
    createGroup,
    joinGroup,
    fetchGroups
  };
};
