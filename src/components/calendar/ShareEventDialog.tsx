
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CalendarEvent } from '@/types/calendar';
import { useContacts } from '@/hooks/useContacts';
import { shareEventWithContact } from '@/services/calendarService';
import { Contact } from '@/types/contact';
import { Search, Send, Share2, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ShareEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
}

const ShareEventDialog: React.FC<ShareEventDialogProps> = ({ 
  open, 
  onOpenChange,
  event
}) => {
  const { contacts } = useContacts();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  if (!event) return null;

  const filteredContacts = contacts?.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const company = contact.company?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || company.includes(query);
  }) || [];

  const handleShare = async () => {
    if (!selectedContact) {
      toast({
        title: "Aucun contact sélectionné",
        description: "Veuillez sélectionner un contact pour partager l'événement",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    try {
      await shareEventWithContact(event.id, selectedContact.id);
      toast({
        title: "Événement partagé",
        description: `L'événement a été partagé avec ${selectedContact.firstName} ${selectedContact.lastName}`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du partage de l'événement",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" /> 
            Partager un événement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border p-3 rounded-md bg-muted/30">
            <h3 className="font-medium">{event.title}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              {format(new Date(event.startTime), 'EEEE d MMMM yyyy, HH:mm', { locale: fr })}
            </div>
            {event.location && (
              <div className="text-sm mt-1">{event.location}</div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Sélectionner un contact
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un contact..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="max-h-[200px] overflow-y-auto">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className={`flex items-center gap-3 p-2.5 hover:bg-muted cursor-pointer ${
                      selectedContact?.id === contact.id ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {contact.photo ? (
                        <img 
                          src={contact.photo} 
                          alt={`${contact.firstName} ${contact.lastName}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                      {contact.company && (
                        <div className="text-xs text-muted-foreground">{contact.company}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Aucun contact trouvé
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" /> Annuler
          </Button>
          <Button 
            onClick={handleShare}
            disabled={!selectedContact || isSharing}
            className="gap-2"
          >
            <Send className="h-4 w-4" /> Partager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareEventDialog;
