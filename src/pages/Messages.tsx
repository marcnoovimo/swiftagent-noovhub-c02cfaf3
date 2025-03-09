
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageCircle, Users } from 'lucide-react';
import InstantMessages from '@/components/messages/InstantMessages';
import GroupDiscussions from '@/components/messages/GroupDiscussions';
import EmailClient from '@/components/messages/EmailClient';
import { useAuth } from '@/context/auth-hooks';
import { Helmet } from 'react-helmet';

const Messages = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('email');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Helmet>
        <title>Communication | Intranet Noovimo</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Communication</h1>
        <p className="text-muted-foreground mt-1">Gérez vos communications en temps réel sur tous vos appareils</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="instant" className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
            <MessageCircle size={16} className="flex-shrink-0" />
            <span className="hidden xs:inline truncate">Messages instantanés</span>
            <span className="xs:hidden truncate">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
            <Users size={16} className="flex-shrink-0" />
            <span className="hidden xs:inline truncate">Discussions de groupe</span>
            <span className="xs:hidden truncate">Groupes</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
            <Mail size={16} className="flex-shrink-0" />
            <span className="hidden xs:inline truncate">Messagerie Noovimo</span>
            <span className="xs:hidden truncate">Emails</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="instant" className="mt-0">
          <InstantMessages onClose={() => setActiveTab('email')} />
        </TabsContent>
        
        <TabsContent value="groups" className="mt-0">
          <GroupDiscussions onClose={() => setActiveTab('email')} />
        </TabsContent>
        
        <TabsContent value="email" className="mt-0">
          <EmailClient />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
