
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScanLine, Camera, Upload, Loader2 } from 'lucide-react';
import { Contact } from '@/types/contact';
import { extractBusinessCardInfo } from '@/services/contactService';
import { toast } from 'sonner';
import DocumentScanner from '@/components/documents/DocumentScanner';

interface ContactScanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactScanModal: React.FC<ContactScanModalProps> = ({ open, onOpenChange }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [contactData, setContactData] = useState<Partial<Contact>>({});
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    // Open the camera scanner
    setShowCamera(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
        processBusinessCard(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const processBusinessCard = async (imageData: string) => {
    setIsScanning(true);
    try {
      // Extract information from the business card
      const extractedData = await extractBusinessCardInfo(imageData);
      setContactData(extractedData);
      setScanComplete(true);
      setIsScanning(false);
      toast.success("Carte de visite analysée avec succès");
    } catch (error) {
      setIsScanning(false);
      toast.error("Erreur lors de l'analyse de la carte");
      console.error("Error extracting business card info:", error);
    }
  };

  const handleSave = () => {
    // In a real app, this would save the contact to the database
    toast.success("Contact ajouté avec succès");
    onOpenChange(false);
    resetModal();
  };

  const resetModal = () => {
    setPreviewImage(null);
    setScanComplete(false);
    setContactData({});
    setIsScanning(false);
    setShowCamera(false);
  };

  const handleCameraCapture = async (imageData: string) => {
    setShowCamera(false);
    setPreviewImage(imageData);
    processBusinessCard(imageData);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetModal();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Scanner une carte de visite</DialogTitle>
          <DialogDescription>
            Prenez en photo une carte de visite ou importez une image pour ajouter rapidement un contact
          </DialogDescription>
        </DialogHeader>

        {showCamera ? (
          <DocumentScanner 
            onCapture={(imageData) => handleCameraCapture(imageData, {
              documentName: "Carte de visite",
              category: "Contacts",
              autoClassify: false,
              accessLevel: "agent"
            })}
            options={{
              documentName: "Carte de visite",
              category: "Contacts",
              autoClassify: false,
              accessLevel: "agent"
            }}
            onClose={() => setShowCamera(false)}
          />
        ) : !scanComplete ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 h-64">
              {previewImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={previewImage} 
                    alt="Carte de visite" 
                    className="object-contain w-full h-full"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-center">
                        <Loader2 className="animate-spin h-8 w-8 text-white mx-auto" />
                        <p className="text-white mt-2">Analyse en cours...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <ScanLine className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Prenez en photo ou importez une image de carte de visite
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button onClick={handleCapture} className="flex items-center gap-2">
                      <Camera size={16} />
                      <span>Prendre une photo</span>
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
                      <Upload size={16} />
                      <span>Importer une image</span>
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  value={contactData.firstName || ''} 
                  onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  value={contactData.lastName || ''} 
                  onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={contactData.email || ''} 
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  value={contactData.phone || ''} 
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Société</Label>
                <Input 
                  id="company" 
                  value={contactData.company || ''} 
                  onChange={(e) => setContactData({...contactData, company: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Fonction</Label>
                <Input 
                  id="position" 
                  value={contactData.position || ''} 
                  onChange={(e) => setContactData({...contactData, position: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea 
                id="address" 
                value={contactData.address || ''} 
                onChange={(e) => setContactData({...contactData, address: e.target.value})}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input 
                  id="city" 
                  value={contactData.city || ''} 
                  onChange={(e) => setContactData({...contactData, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <select 
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={contactData.category || 'prospect'}
                  onChange={(e) => setContactData({...contactData, category: e.target.value as any})}
                >
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="partner">Partenaire</option>
                  <option value="notary">Notaire</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          {scanComplete && (
            <Button onClick={handleSave}>Enregistrer le contact</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactScanModal;
