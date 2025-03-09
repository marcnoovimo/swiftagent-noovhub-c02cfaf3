
import React from 'react';
import { Contact } from '@/types/contact';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Mail, Phone, Briefcase, MapPin, Tag, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ContactDetailModalProps {
  contact: Contact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDetailModal = ({ contact, open, onOpenChange }: ContactDetailModalProps) => {
  if (!contact) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (e) {
      return 'Date invalide';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl flex items-center gap-2">
            Détails du contact
            <SheetClose className="ml-auto">
              <X className="h-4 w-4" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-semibold">
              {contact.firstName?.[0]}{contact.lastName?.[0]}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h3>
              <p className="text-sm text-muted-foreground">
                {contact.category === 'client' && 'Client'}
                {contact.category === 'prospect' && 'Prospect'}
                {contact.category === 'partner' && 'Partenaire'}
                {contact.category === 'notary' && 'Notaire'}
                {contact.category === 'agent' && 'Agent'}
                {contact.category === 'other' && 'Autre'}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p>{contact.email}</p>
                </div>
              </div>
            )}

            {contact.emailPro && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email professionnel</p>
                  <p>{contact.emailPro}</p>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p>{contact.phone}</p>
                </div>
              </div>
            )}

            {contact.mobile && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Mobile</p>
                  <p>{contact.mobile}</p>
                </div>
              </div>
            )}

            {(contact.company || contact.position) && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Entreprise / Poste</p>
                  <p>{contact.company} {contact.position ? `- ${contact.position}` : ''}</p>
                </div>
              </div>
            )}

            {(contact.address || contact.city) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p>{contact.address} {contact.city ? `- ${contact.city}` : ''}</p>
                </div>
              </div>
            )}

            {contact.tags && contact.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {contact.tags.map((tag) => (
                      <span key={tag} className="bg-secondary px-2 py-0.5 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date de création</p>
                <p>{formatDate(contact.createdAt)}</p>
              </div>
            </div>

            {contact.notes && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Notes</p>
                <div className="bg-muted p-3 rounded-md">
                  {contact.notes}
                </div>
              </div>
            )}
          </div>

          {contact.communicationHistory && contact.communicationHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Historique de communication</h4>
              <div className="space-y-3">
                {contact.communicationHistory.map((comm, index) => (
                  <div key={index} className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">
                        {comm.type === 'email' && 'Email'}
                        {comm.type === 'call' && 'Appel'}
                        {comm.type === 'meeting' && 'Rendez-vous'}
                        {comm.type === 'message' && 'Message'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comm.date)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comm.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactDetailModal;
