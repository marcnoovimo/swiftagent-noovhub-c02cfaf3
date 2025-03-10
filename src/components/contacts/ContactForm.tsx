
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Contact } from '@/types/contact';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Building2, Phone, MapPin, User, Mail, Briefcase, Tags } from 'lucide-react';

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  contact?: Contact;
}

const ContactForm = ({ open, onOpenChange, onSave, contact }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    emailPro: contact?.emailPro || '',
    phone: contact?.phone || '',
    mobile: contact?.mobile || '',
    company: contact?.company || '',
    position: contact?.position || '',
    address: contact?.address || '',
    city: contact?.city || '',
    notes: contact?.notes || '',
    category: contact?.category || 'client',
    tags: contact?.tags || [],
    dateOfBirth: contact?.dateOfBirth ? new Date(contact.dateOfBirth) : undefined,
    gender: contact?.gender || 'other',
  });

  const [newTag, setNewTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value as any }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value as any }));
  };

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dateOfBirth: date }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format de la date pour l'API
    const formattedData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : undefined,
    };
    
    onSave(formattedData as any);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-background max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{contact ? 'Modifier le contact' : 'Nouveau contact'}</DialogTitle>
          <DialogDescription>
            {contact ? 'Modifiez les informations du contact' : 'Ajoutez un nouveau contact à votre répertoire'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="professional">Informations professionnelles</TabsTrigger>
              <TabsTrigger value="additional">Informations complémentaires</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User size={16} /> Prénom
                  </Label>
                  <Input 
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom du contact"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User size={16} /> Nom
                  </Label>
                  <Input 
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom du contact"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center gap-2">
                    <User size={16} /> Civilité
                  </Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={handleGenderChange}
                  >
                    <SelectTrigger id="gender" className="bg-white dark:bg-gray-950">
                      <SelectValue placeholder="Sélectionnez une civilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Monsieur</SelectItem>
                      <SelectItem value="female">Madame</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                    <CalendarIcon size={16} /> Date de naissance
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white dark:bg-gray-950"
                      >
                        {formData.dateOfBirth ? (
                          format(formData.dateOfBirth, 'dd MMMM yyyy', { locale: fr })
                        ) : (
                          <span className="text-muted-foreground">Sélectionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={handleDateOfBirthChange}
                        initialFocus
                        disabled={(date) => date > new Date()}
                        className="bg-white dark:bg-gray-950 border border-solid border-border rounded-xl shadow-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} /> Téléphone
                  </Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Téléphone fixe"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="flex items-center gap-2">
                    <Phone size={16} /> Mobile
                  </Label>
                  <Input 
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Téléphone mobile"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email personnel
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin size={16} /> Adresse
                  </Label>
                  <Input 
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Adresse postale"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin size={16} /> Ville
                  </Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ville"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="professional" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building2 size={16} /> Entreprise
                  </Label>
                  <Input 
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nom de l'entreprise"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center gap-2">
                    <Briefcase size={16} /> Fonction
                  </Label>
                  <Input 
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Fonction / Poste"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailPro" className="flex items-center gap-2">
                    <Mail size={16} /> Email professionnel
                  </Label>
                  <Input 
                    id="emailPro"
                    type="email"
                    value={formData.emailPro}
                    onChange={handleChange}
                    placeholder="email.pro@entreprise.com"
                    className="bg-white dark:bg-gray-950"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tags size={16} /> Catégorie
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category" className="bg-white dark:bg-gray-950">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="partner">Partenaire</SelectItem>
                      <SelectItem value="notary">Notaire</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="additional" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags" className="flex items-center gap-2">
                    <Tags size={16} /> Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      id="newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Ajouter un tag"
                      className="bg-white dark:bg-gray-950"
                    />
                    <Button type="button" onClick={handleAddTag} className="flex-shrink-0">
                      Ajouter
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)}
                          className="text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    Notes
                  </Label>
                  <Textarea 
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes et informations supplémentaires sur le contact"
                    className="min-h-[120px] bg-white dark:bg-gray-950"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-white dark:bg-gray-950">
              Annuler
            </Button>
            <Button type="submit" className="bg-noovimo-500 hover:bg-noovimo-600 text-white">
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
