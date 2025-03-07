
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Shield, 
  Lock, 
  Bell, 
  LogOut,
  Briefcase,
  Award,
  TrendingUp
} from 'lucide-react';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et paramètres</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-card rounded-xl p-6 text-center lg:col-span-1">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-noovimo-100 border-4 border-white shadow-soft overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-noovimo-500 text-white p-2 rounded-full">
                <Edit size={16} />
              </button>
            </div>
          </div>
          
          <h2 className="text-xl font-bold">Agent Noovimo</h2>
          <p className="text-muted-foreground text-sm mt-1">Conseiller immobilier</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <Mail size={16} className="text-noovimo-500" />
              </div>
              <span className="text-sm">agent@noovimo.fr</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <Phone size={16} className="text-noovimo-500" />
              </div>
              <span className="text-sm">+33 6 12 34 56 78</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/70">
                <MapPin size={16} className="text-noovimo-500" />
              </div>
              <span className="text-sm">Nantes, France</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-noovimo-500">76%</div>
                <div className="text-xs text-muted-foreground mt-1">Commission</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground mt-1">Mandats</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground mt-1">Ventes</div>
              </div>
            </div>
          </div>
          
          <button className="mt-8 w-full flex items-center justify-center gap-2 p-2 text-sm text-white bg-noovimo-500 rounded-lg hover:bg-noovimo-600 transition-colors">
            <Edit size={16} />
            Modifier le profil
          </button>
        </div>
        
        {/* Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User size={20} className="text-noovimo-500" />
              Informations personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Prénom</label>
                <input
                  type="text"
                  defaultValue="Jean"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nom</label>
                <input
                  type="text"
                  defaultValue="Dupont"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="agent@noovimo.fr"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Téléphone</label>
                <input
                  type="tel"
                  defaultValue="+33 6 12 34 56 78"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Ville</label>
                <input
                  type="text"
                  defaultValue="Nantes"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Date d'entrée</label>
                <input
                  type="text"
                  defaultValue="15/03/2022"
                  readOnly
                  className="w-full rounded-lg border border-input px-3 py-2 bg-secondary/50 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
            
            <div className="mt-4 text-right">
              <button className="bg-noovimo-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-noovimo-600 transition-colors">
                Enregistrer
              </button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-noovimo-500" />
              Informations professionnelles
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">N° RSAC</label>
                <input
                  type="text"
                  defaultValue="RS 123456789"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Secteur</label>
                <input
                  type="text"
                  defaultValue="Nantes et agglomération"
                  className="w-full rounded-lg border border-input px-3 py-2 bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Commission actuelle</label>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full h-4 bg-secondary/70 rounded-full">
                      <div 
                        className="absolute top-0 left-0 h-4 bg-noovimo-500 rounded-full" 
                        style={{ width: '76%' }}
                      />
                    </div>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Prochain palier</label>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-noovimo-500" />
                    <span className="text-sm">80% (4% restants)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-noovimo-100">
                  <Award size={18} className="text-noovimo-500" />
                </div>
                
                <div>
                  <h4 className="font-medium">Récompenses et badges</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vous avez obtenu 5 badges dont "Meilleur vendeur du mois" en Septembre.
                  </p>
                  
                  <div className="flex gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star size={16} className="text-yellow-500" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Trophy size={16} className="text-blue-500" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={20} className="text-noovimo-500" />
              Sécurité et préférences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-noovimo-500" />
                  <div>
                    <h4 className="text-sm font-medium">Changer le mot de passe</h4>
                    <p className="text-xs text-muted-foreground mt-1">Dernière mise à jour il y a 3 mois</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-noovimo-500" />
                  <div>
                    <h4 className="text-sm font-medium">Notifications</h4>
                    <p className="text-xs text-muted-foreground mt-1">Gérer vos préférences de notifications</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <LogOut size={18} className="text-noovimo-500" />
                  <div>
                    <h4 className="text-sm font-medium">Déconnexion</h4>
                    <p className="text-xs text-muted-foreground mt-1">Se déconnecter de tous les appareils</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding missing components
const Star = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Trophy = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const CheckCircle = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const ChevronRight = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"/></svg>;

export default Profile;
