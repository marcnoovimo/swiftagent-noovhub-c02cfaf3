
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { extractBusinessCardInfo, createContact } from '@/services/contactService';
import { Contact } from '@/types/contact';
import { useContacts } from '@/hooks/useContacts';
import { Camera, Upload, User } from 'lucide-react';

interface ContactScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactScanModal = ({ open, onOpenChange }: ContactScanModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedContact, setExtractedContact] = useState<Partial<Contact> | null>(null);
  const { toast } = useToast();
  const { refetch } = useContacts();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        setImagePreview(reader.result as string);
        setIsScanning(true);
        
        try {
          const extractedData = await extractBusinessCardInfo(reader.result as string);
          setExtractedContact(extractedData);
        } catch (error) {
          toast({
            title: "Erreur lors de l'extraction",
            description: "Une erreur est survenue lors de l'analyse de la carte de visite.",
            variant: "destructive",
          });
        } finally {
          setIsScanning(false);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    // Cette fonction simulerait l'ouverture de l'appareil photo
    toast({
      title: "Fonctionnalité en développement",
      description: "La numérisation directe depuis l'appareil photo sera bientôt disponible.",
    });
  };

  const handleSaveContact = async () => {
    if (!extractedContact) return;
    
    try {
      const newContact = await createContact({
        ...extractedContact as Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>,
        category: extractedContact.category || 'prospect',
      });
      
      refetch();
      
      toast({
        title: "Contact créé avec succès",
        description: `${newContact.firstName} ${newContact.lastName} a été ajouté à votre répertoire.`,
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur lors de la création du contact",
        description: "Une erreur est survenue, veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setImagePreview(null);
    setExtractedContact(null);
  };

  if (!open) return null;

  return (
    <div className={open ? "fixed inset-0 bg-black/50 flex items-center justify-center z-50" : "hidden"}>
      <div className="bg-background p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Scanner une carte de visite</h2>
        
        {!imagePreview ? (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Numérisez une carte de visite pour extraire automatiquement les informations de contact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleScan} 
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Camera size={18} />
                <span>Utiliser l'appareil photo</span>
              </Button>
              
              <div className="relative flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  <span>Importer une image</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-1/3 flex-shrink-0">
                <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Carte de visite" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                {isScanning ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-noovimo-500 mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Analyse en cours...</p>
                    </div>
                  </div>
                ) : extractedContact ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <User size={18} />
                      {extractedContact.firstName} {extractedContact.lastName}
                    </h3>
                    
                    <div className="text-sm space-y-1">
                      {extractedContact.company && (
                        <p className="text-muted-foreground">{extractedContact.position} - {extractedContact.company}</p>
                      )}
                      {extractedContact.email && <p>Email: {extractedContact.email}</p>}
                      {extractedContact.phone && <p>Tél: {extractedContact.phone}</p>}
                      {extractedContact.city && <p>Ville: {extractedContact.city}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Aucune information extraite</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={resetForm}
              >
                Réinitialiser
              </Button>
              
              <Button 
                onClick={handleSaveContact} 
                disabled={!extractedContact || isScanning}
              >
                Créer le contact
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-4 pt-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactScanModal;
