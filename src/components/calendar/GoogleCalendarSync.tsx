
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleCalendar, RotateCw, Save, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const GoogleCalendarSync: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarId, setCalendarId] = useState('');
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsConnected(true);
      setSyncEnabled(true);
      setCalendarId('primary');
      
      toast({
        title: "Compte Google connecté",
        description: "Votre compte Google a été connecté avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à Google Calendar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres de synchronisation ont été enregistrés",
    });
  };

  const handleSyncNow = async () => {
    setIsLoading(true);
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Synchronisation terminée",
        description: "Votre agenda a été synchronisé avec Google Calendar",
      });
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser avec Google Calendar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <GoogleCalendar className="h-5 w-5" />
          Synchronisation Google Calendar
        </CardTitle>
        <CardDescription>
          Configurez la synchronisation bidirectionnelle avec Google Calendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="font-medium">État de la connexion</h3>
              <p className="text-sm text-muted-foreground">
                {isConnected ? "Connecté à Google Calendar" : "Non connecté à Google Calendar"}
              </p>
            </div>
            <Button 
              onClick={handleConnect} 
              disabled={isLoading || isConnected}
              className={cn(
                "w-full sm:w-auto",
                isConnected && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isLoading ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : isConnected ? (
                <>
                  <GoogleCalendar className="mr-2 h-4 w-4" />
                  Connecté
                </>
              ) : (
                <>
                  <GoogleCalendar className="mr-2 h-4 w-4" />
                  Se connecter
                </>
              )}
            </Button>
          </div>
          
          {isConnected && (
            <>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="calendar-id">ID du calendrier</Label>
                  <Input 
                    id="calendar-id" 
                    value={calendarId} 
                    onChange={(e) => setCalendarId(e.target.value)}
                    placeholder="primary" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Utilisez "primary" pour votre calendrier principal ou l'ID spécifique d'un calendrier
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="sync-enabled" 
                    checked={syncEnabled}
                    onCheckedChange={setSyncEnabled}
                  />
                  <Label htmlFor="sync-enabled">Activer la synchronisation</Label>
                </div>
                
                <div className="grid gap-2">
                  <Label>Paramètres de synchronisation</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="sync-two-way" defaultChecked />
                      <Label htmlFor="sync-two-way">Synchronisation bidirectionnelle</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sync-auto" defaultChecked />
                      <Label htmlFor="sync-auto">Synchronisation automatique</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sync-reminders" defaultChecked />
                      <Label htmlFor="sync-reminders">Synchroniser les rappels</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sync-attendees" defaultChecked />
                      <Label htmlFor="sync-attendees">Synchroniser les participants</Label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleSyncNow} disabled={!isConnected || isLoading}>
          {isLoading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Synchronisation...
            </>
          ) : (
            <>
              <RotateCw className="mr-2 h-4 w-4" />
              Synchroniser maintenant
            </>
          )}
        </Button>
        <Button onClick={handleSaveSettings} disabled={!isConnected}>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les paramètres
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoogleCalendarSync;
