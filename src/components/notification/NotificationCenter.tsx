
import React, { useState } from 'react';
import { Bell, CheckCircle2, FileText, Home, PiggyBank, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { NotificationService } from '@/services/notificationService';
import { Notification } from '@/types/commission';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const NotificationItem = ({ notification, onMarkAsRead }: { notification: Notification, onMarkAsRead: (id: string) => void }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'compromis':
        return <Home className="h-5 w-5 text-blue-500 flex-shrink-0" />;
      case 'invoice_submitted':
      case 'invoice_approved':
      case 'invoice_paid':
        return <FileText className="h-5 w-5 text-green-500 flex-shrink-0" />;
      case 'commission_threshold':
        return <PiggyBank className="h-5 w-5 text-purple-500 flex-shrink-0" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500 flex-shrink-0" />;
    }
  };

  return (
    <div className={`p-3 group hover:bg-accent/50 rounded-md transition-colors ${!notification.read ? 'bg-accent/20' : ''}`}>
      <div className="flex gap-3">
        <div className="mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>{notification.title}</h4>
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" 
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">
              {format(parseISO(notification.createdAt), 'dd MMM HH:mm', { locale: fr })}
            </span>
            {!notification.read && (
              <Badge variant="outline" className="text-xs bg-primary/20 border-primary/20">Nouveau</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ['userNotifications', user?.id],
    queryFn: () => NotificationService.getUserNotifications(user?.id || ''),
    enabled: !!user?.id,
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId);
      refetch();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer la notification comme lue.",
        variant: "destructive"
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead(user?.id || '');
      refetch();
      toast({
        title: "Toutes les notifications ont été marquées comme lues",
        description: ""
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer toutes les notifications comme lues.",
        variant: "destructive"
      });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-4 pb-2 pt-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-8 text-xs">
                  Tout marquer comme lu
                </Button>
              )}
            </div>
            <CardDescription className="text-xs">
              Vos dernières notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              {notifications && notifications.length > 0 ? (
                <div className="">
                  {notifications.map((notification) => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : isLoading ? (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Chargement...</p>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Aucune notification</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
