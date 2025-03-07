
import React, { useState } from 'react';
import { BarChart3, FileText, MessageCircle, TrendingUp, Wallet } from 'lucide-react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Index = () => {
  const [activities] = useState([
    {
      id: '1',
      title: 'Nouveau document ajouté',
      description: 'Mandat exclusif signé - 23 Rue des Lilas',
      time: 'Il y a 10 min',
      type: 'document' as const,
    },
    {
      id: '2',
      title: 'Message de Pierre Dupont',
      description: 'À propos du rendez-vous de demain...',
      time: 'Il y a 30 min',
      type: 'message' as const,
    },
    {
      id: '3',
      title: 'Palier de commission atteint',
      description: 'Félicitations! Vous êtes maintenant à 76%',
      time: 'Il y a 2h',
      type: 'notification' as const,
    },
    {
      id: '4',
      title: 'Rappel: Formation',
      description: 'Formation en ligne demain à 14h',
      time: 'Il y a 5h',
      type: 'alert' as const,
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bonjour, Agent</h1>
        <p className="text-muted-foreground mt-1">Voici votre activité et vos performances du jour</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PerformanceCard
          title="Chiffre d'affaires"
          value="76 500 €"
          change="+12% ce mois"
          icon={<Wallet size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Commission actuelle"
          value="76%"
          change="Prochain palier: 80%"
          icon={<TrendingUp size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Mandats en cours"
          value="12"
          change="+3 ce mois"
          icon={<FileText size={24} className="text-noovimo-500" />}
        />
        <PerformanceCard
          title="Messages non lus"
          value="8"
          change="4 urgents"
          positive={false}
          icon={<MessageCircle size={24} className="text-noovimo-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Performance mensuelle</h3>
              <select className="text-sm bg-transparent border border-input rounded-md px-2 py-1">
                <option>Ce mois</option>
                <option>Dernier mois</option>
                <option>3 derniers mois</option>
              </select>
            </div>
            
            <div className="flex items-center justify-center h-64">
              <div className="w-full h-full flex items-center justify-center">
                <BarChart3 size={120} className="text-muted-foreground/30" />
                <span className="ml-4 text-muted-foreground">Graphique de performance</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <ActivityFeed activities={activities} />
        </div>
      </div>
      
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Actions recommandées</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <MessageCircle size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Répondre aux messages</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <FileText size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Signer le mandat en attente</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-all">
            <TrendingUp size={24} className="text-noovimo-500 mb-2" />
            <span className="text-sm font-medium">Consulter votre progression</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
