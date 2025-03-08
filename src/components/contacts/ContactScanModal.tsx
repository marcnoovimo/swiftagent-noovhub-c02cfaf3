
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScanLine, Camera, Upload, Loader2, Save } from 'lucide-react';
import { Contact } from '@/types/contact';
import { extractBusinessCardInfo, createContact } from '@/services/contactService';
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
  const [isSaving, setIsSaving] = useState(false);

  // Reset le formulaire quand la modal se ferme
  useEffect(() => {
    if (!open) {
      resetModal();
    }
  }, [open]);

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
      console.log("Processing business card...");
      const extractedData = await extractBusinessCardInfo(imageData);
      console.log("Extracted data received:", extractedData); // Debug log
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Vérifier que les champs obligatoires sont présents
      if (!contactData.firstName || !contactData.lastName) {
        toast.error("Le prénom et le nom sont obligatoires");
        setIsSaving(false);
        return;
      }
      
      // Créer un contact avec les données obligatoires
      const newContact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        category: contactData.category || 'prospect',
        // Ajouter tous les autres champs optionnels
        email: contactData.email,
        emailPro: contactData.emailPro,
        phone: contactData.phone,
        mobile: contactData.mobile,
        company: contactData.company,
        position: contactData.position,
        address: contactData.address,
        city: contactData.city,
        notes: contactData.notes,
        tags: contactData.tags,
        source: 'scan'
      };
      
      await createContact(newContact);
      toast.success("Contact ajouté avec succès");
      onOpenChange(false);
      resetModal();
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Erreur lors de l'enregistrement du contact");
    } finally {
      setIsSaving(false);
    }
  };

  const resetModal = () => {
    setPreviewImage(null);
    setScanComplete(false);
    setContactData({});
    setIsScanning(false);
    setShowCamera(false);
    setIsSaving(false);
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scanner une carte de visite</DialogTitle>
          <DialogDescription>
            Prenez en photo une carte de visite ou importez une image pour ajouter rapidement un contact
          </DialogDescription>
        </DialogHeader>

        {showCamera ? (
          <DocumentScanner 
            onCapture={handleCameraCapture}
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
                        <p className="text-white mt-2">Analyse en cours par IA...</p>
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
            <p className="text-sm text-muted-foreground mb-4">L'IA a extrait les informations suivantes. Vous pouvez les modifier si nécessaire.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom<span className="text-red-500">*</span></Label>
                <Input 
                  id="firstName" 
                  value={contactData.firstName || ''} 
                  onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom<span className="text-red-500">*</span></Label>
                <Input 
                  id="lastName" 
                  value={contactData.lastName || ''} 
                  onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email personnel</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={contactData.email || ''} 
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPro">Email professionnel</Label>
                <Input 
                  id="emailPro" 
                  type="email" 
                  value={contactData.emailPro || ''} 
                  onChange={(e) => setContactData({...contactData, emailPro: e.target.value})}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone fixe</Label>
                <Input 
                  id="phone" 
                  value={contactData.phone || ''} 
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Téléphone mobile</Label>
                <Input 
                  id="mobile" 
                  value={contactData.mobile || ''} 
                  onChange={(e) => setContactData({...contactData, mobile: e.target.value})}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Société</Label>
                <Input 
                  id="company" 
                  value={contactData.company || ''} 
                  onChange={(e) => setContactData({...contactData, company: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Fonction</Label>
                <Input 
                  id="position" 
                  value={contactData.position || ''} 
                  onChange={(e) => setContactData({...contactData, position: e.target.value})}
                  className="w-full"
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
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input 
                  id="city" 
                  value={contactData.city || ''} 
                  onChange={(e) => setContactData({...contactData, city: e.target.value})}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie<span className="text-red-500">*</span></Label>
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
                  <option value="agent">Agent</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={contactData.notes || ''} 
                onChange={(e) => setContactData({...contactData, notes: e.target.value})}
                rows={3}
                className="w-full"
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">Annuler</Button>
          {scanComplete && (
            <Button 
              onClick={handleSave} 
              disabled={isSaving || !contactData.firstName || !contactData.lastName}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Enregistrer le contact</span>
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactScanModal;
