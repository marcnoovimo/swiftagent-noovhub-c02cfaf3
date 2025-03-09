
import React, { useState, useRef } from 'react';
import { Camera, FileText, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface DocumentScanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capturedImage: string | null;
  onImageCapture: (imageData: string) => void;
  onClose: () => void;
}

interface ScanFormData {
  // Vendeur principal
  vendeurCivilite: string;
  vendeurPrenom: string;
  vendeurNom: string;
  vendeurEmail: string;
  vendeurTelephone: string;
  
  // Vendeur secondaire
  vendeurSecondaireCivilite: string;
  vendeurSecondairePrenom: string;
  vendeurSecondaireNom: string;
  vendeurSecondaireEmail: string;
  vendeurSecondaireTelephone: string;
  
  // Bien immobilier
  typeBien: string;
  villeBien: string;
  
  // Acquéreur principal
  acquereurCivilite: string;
  acquereurPrenom: string;
  acquereurNom: string;
  acquereurEmail: string;
  acquereurTelephone: string;
  
  // Acquéreur secondaire
  acquereurSecondaireCivilite: string;
  acquereurSecondairePrenom: string;
  acquereurSecondaireNom: string;
  acquereurSecondaireEmail: string;
  acquereurSecondaireTelephone: string;
  
  // Honoraires et commission
  honorairesHT: string;
  unitesVente: string;
  
  // Répartition des commissions
  trigrammeAgent1: string;
  pourcentageAgent1: number;
  trigrammeAgent2: string;
  pourcentageAgent2: number;
  trigrammeAgent3: string;
  pourcentageAgent3: number;
  
  // Dates et informations notariales
  dateAvantContrat: string;
  dateSignaturePrevue: string;
  nomNotaire: string;
  telephoneNotaire: string;
  emailNotaire: string;
  villeNotaire: string;
  
  // Informations sur le mandat
  numeroMandat: string;
  dateMandat: string;
}

const CIVILITE_OPTIONS = ['M.', 'Mme', 'Société'];
const TYPE_BIEN_OPTIONS = ['Maison', 'Appartement', 'Terrain', 'Garage', 'Autre'];

const DocumentScanForm: React.FC<DocumentScanFormProps> = ({
  open,
  onOpenChange,
  capturedImage,
  onImageCapture,
  onClose
}) => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const form = useForm<ScanFormData>({
    defaultValues: {
      vendeurCivilite: '',
      vendeurPrenom: '',
      vendeurNom: '',
      vendeurEmail: '',
      vendeurTelephone: '',
      vendeurSecondaireCivilite: '',
      vendeurSecondairePrenom: '',
      vendeurSecondaireNom: '',
      vendeurSecondaireEmail: '',
      vendeurSecondaireTelephone: '',
      typeBien: '',
      villeBien: '',
      acquereurCivilite: '',
      acquereurPrenom: '',
      acquereurNom: '',
      acquereurEmail: '',
      acquereurTelephone: '',
      acquereurSecondaireCivilite: '',
      acquereurSecondairePrenom: '',
      acquereurSecondaireNom: '',
      acquereurSecondaireEmail: '',
      acquereurSecondaireTelephone: '',
      honorairesHT: '',
      unitesVente: '',
      trigrammeAgent1: '',
      pourcentageAgent1: 100,
      trigrammeAgent2: '',
      pourcentageAgent2: 0,
      trigrammeAgent3: '',
      pourcentageAgent3: 0,
      dateAvantContrat: '',
      dateSignaturePrevue: '',
      nomNotaire: '',
      telephoneNotaire: '',
      emailNotaire: '',
      villeNotaire: '',
      numeroMandat: '',
      dateMandat: ''
    }
  });

  const onSubmit = (data: ScanFormData) => {
    console.log('Document data submitted:', data);
    
    // Validate that agent percentages total 100%
    const totalPercentage = data.pourcentageAgent1 + data.pourcentageAgent2 + data.pourcentageAgent3;
    
    if (totalPercentage !== 100) {
      toast({
        title: "Erreur de validation",
        description: "La somme des pourcentages des agents doit être égale à 100%.",
        variant: "destructive"
      });
      return;
    }
    
    // Process the completed form
    toast({
      title: "Document enregistré",
      description: "Le document scanné et les métadonnées ont été enregistrés avec succès."
    });
    
    // Close the form
    onClose();
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        toast({
          title: "Erreur",
          description: "Votre appareil ne prend pas en charge l'accès à l'appareil photo.",
          variant: "destructive"
        });
        setIsCameraActive(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à l'appareil photo. Veuillez vérifier les permissions.",
        variant: "destructive"
      });
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    try {
      setIsCapturing(true);
      
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        onImageCapture(imageData);
        
        // Stop camera after capture
        stopCamera();
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast({
        title: "Erreur",
        description: "Impossible de capturer l'image.",
        variant: "destructive"
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  React.useEffect(() => {
    return () => {
      // Clean up camera resources when component unmounts
      stopCamera();
    };
  }, []);

  const calculateRemainingPercentage = () => {
    const agent1Percent = form.watch('pourcentageAgent1') || 0;
    const agent2Percent = form.watch('pourcentageAgent2') || 0;
    return 100 - agent1Percent - agent2Percent;
  };

  // Update agent 3 percentage when agent 1 or 2 percentages change
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'pourcentageAgent1' || name === 'pourcentageAgent2') {
        form.setValue('pourcentageAgent3', calculateRemainingPercentage());
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose();
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Numérisation de document</DialogTitle>
        </DialogHeader>
        
        {!capturedImage && !isCameraActive && (
          <div className="flex flex-col items-center justify-center p-6">
            <Button onClick={startCamera} className="flex items-center gap-2">
              <Camera size={16} />
              <span>Numériser avec l'appareil photo</span>
            </Button>
          </div>
        )}
        
        {isCameraActive && (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-full max-w-lg aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline" 
                onClick={stopCamera}
                className="flex items-center gap-2"
              >
                <X size={16} />
                <span>Annuler</span>
              </Button>
              
              <Button
                onClick={captureImage}
                disabled={isCapturing}
                className="flex items-center gap-2"
              >
                <Camera size={16} />
                <span>{isCapturing ? 'Capture en cours...' : 'Capturer'}</span>
              </Button>
            </div>
          </div>
        )}
        
        {capturedImage && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-1/3 mb-4">
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img src={capturedImage} alt="Document scanné" className="w-full" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">Document numérisé</p>
                </div>
                
                <div className="w-full md:w-2/3 space-y-6">
                  {/* Vendeur principal */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Vendeur principal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="vendeurCivilite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Civilité</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CIVILITE_OPTIONS.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurPrenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurNom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurTelephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Vendeur secondaire */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Vendeur secondaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="vendeurSecondaireCivilite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Civilité</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CIVILITE_OPTIONS.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurSecondairePrenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurSecondaireNom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurSecondaireEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vendeurSecondaireTelephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Bien immobilier */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Bien immobilier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="typeBien"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de bien</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TYPE_BIEN_OPTIONS.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="villeBien"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville du bien</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Acquéreur principal */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Acquéreur principal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="acquereurCivilite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Civilité</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CIVILITE_OPTIONS.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurPrenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurNom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurTelephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Acquéreur secondaire */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Acquéreur secondaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="acquereurSecondaireCivilite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Civilité</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CIVILITE_OPTIONS.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurSecondairePrenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurSecondaireNom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurSecondaireEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="acquereurSecondaireTelephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Honoraires et vente */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Honoraires et unités de vente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="honorairesHT"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Honoraires € HT</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="unitesVente"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unités de vente</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Répartition des commissions */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Répartition des commissions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="trigrammeAgent1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trigramme Agent 1</FormLabel>
                            <FormControl>
                              <Input {...field} maxLength={3} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pourcentageAgent1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pourcentage (%)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="100" 
                                {...field} 
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="trigrammeAgent2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trigramme Agent 2</FormLabel>
                            <FormControl>
                              <Input {...field} maxLength={3} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pourcentageAgent2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pourcentage (%)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="100" 
                                {...field} 
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="trigrammeAgent3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Trigramme Agent 3</FormLabel>
                            <FormControl>
                              <Input {...field} maxLength={3} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="pourcentageAgent3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pourcentage (%)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="100" 
                                value={calculateRemainingPercentage()}
                                disabled
                              />
                            </FormControl>
                            <FormDescription>
                              La valeur est calculée automatiquement pour un total de 100%
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Dates et informations notariales */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Dates et informations notariales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateAvantContrat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de l'avant-contrat</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dateSignaturePrevue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date signature prévue de l'acte</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nomNotaire"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du notaire</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="telephoneNotaire"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone du notaire</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emailNotaire"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email du notaire</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="villeNotaire"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville du notaire</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Informations sur le mandat */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-4">Informations sur le mandat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numeroMandat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro du mandat</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dateMandat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date du mandat</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleClose}
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit"
                      className="flex items-center gap-2"
                    >
                      <FileText size={16} />
                      <span>Enregistrer le document</span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentScanForm;
