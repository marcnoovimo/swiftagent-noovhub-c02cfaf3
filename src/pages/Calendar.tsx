
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Plus, RefreshCw, Share2, BellRing } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CalendarView from '@/components/calendar/CalendarView';
import EventForm from '@/components/calendar/EventForm';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { useToast } from '@/hooks/use-toast';
import GoogleCalendarSync from '@/components/calendar/GoogleCalendarSync';

const Calendar = () => {
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');
  const { events, isLoading, syncEvents } = useCalendarEvents();
  const { toast } = useToast();
  
  const handleSyncClick = async () => {
    try {
      await syncEvents();
      toast({
        title: "Synchronisation réussie",
        description: "Votre agenda a été synchronisé avec Google Calendar",
      });
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser avec Google Calendar",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos rendez-vous et synchronisez-les avec Google Calendar
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleSyncClick} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Synchroniser</span>
          </Button>
          
          <Button onClick={() => setNewEventOpen(true)} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nouveau RDV</span>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="month">Mois</TabsTrigger>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="day">Jour</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 size={14} />
                <span className="hidden sm:inline">Partager mon agenda</span>
                <span className="sm:hidden">Partager</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BellRing size={14} />
                <span className="hidden sm:inline">Configurer les rappels</span>
                <span className="sm:hidden">Rappels</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="month">
            <CalendarView view="month" events={events || []} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="week">
            <CalendarView view="week" events={events || []} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="day">
            <CalendarView view="day" events={events || []} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
      
      <GoogleCalendarSync />
      
      <EventForm 
        open={newEventOpen} 
        onOpenChange={setNewEventOpen}
      />
    </div>
  );
};

export default Calendar;
