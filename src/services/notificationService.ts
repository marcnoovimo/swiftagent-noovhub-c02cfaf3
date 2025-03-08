
import { Notification } from '@/types/commission';

// Données fictives pour les notifications
let notifications: Notification[] = [
  {
    id: "notif1",
    userId: "1",
    type: "compromis",
    title: "Nouveau compromis",
    message: "Un compromis a été déposé pour la propriété au 123 Rue de Paris.",
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "notif2",
    userId: "1",
    type: "invoice_submitted",
    title: "Facture soumise",
    message: "Votre facture pour la transaction à 45 Avenue des Fleurs a été soumise.",
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "notif3",
    userId: "1",
    type: "commission_threshold",
    title: "Nouveau palier atteint",
    message: "Félicitations ! Vous avez atteint un nouveau palier de commission à 76%.",
    read: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const NotificationService = {
  // Obtenir les notifications d'un utilisateur
  getUserNotifications: (userId: string): Promise<Notification[]> => {
    // Trier par date de création, les plus récentes en premier
    const userNotifications = notifications
      .filter(notif => notif.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return Promise.resolve(userNotifications);
  },
  
  // Créer une notification
  createNotification: (params: Omit<Notification, 'id' | 'read' | 'createdAt'>): Promise<Notification> => {
    const newNotification: Notification = {
      ...params,
      id: `notif${notifications.length + 1}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    return Promise.resolve(newNotification);
  },
  
  // Marquer une notification comme lue
  markAsRead: (notificationId: string): Promise<void> => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    
    return Promise.resolve();
  },
  
  // Marquer toutes les notifications d'un utilisateur comme lues
  markAllAsRead: (userId: string): Promise<void> => {
    notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
    
    return Promise.resolve();
  },
  
  // Obtenir le nombre de notifications non lues
  getUnreadCount: (userId: string): Promise<number> => {
    const count = notifications.filter(n => n.userId === userId && !n.read).length;
    return Promise.resolve(count);
  },
  
  // Vérifier si un nouvel événement déclenche une notification de seuil de commission
  checkCommissionThreshold: async (userId: string, oldPercentage: number, newPercentage: number): Promise<void> => {
    if (newPercentage > oldPercentage) {
      await NotificationService.createNotification({
        userId,
        type: 'commission_threshold',
        title: 'Nouveau palier atteint',
        message: `Félicitations ! Vous passez à ${newPercentage}% de commission !`,
        data: { oldPercentage, newPercentage }
      });
    }
  }
};
