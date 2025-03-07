
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageCircle, Users } from 'lucide-react';
import InstantMessages from '@/components/messages/InstantMessages';
import GroupDiscussions from '@/components/messages/GroupDiscussions';
import EmailClient from '@/components/messages/EmailClient';

const Messages = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">Gérez vos communications</p>
      </div>
      
      <Tabs defaultValue="instant" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="instant" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>Messages instantanés</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users size={18} />
            <span>Groupes de discussion</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={18} />
            <span>Emails @noovimo.fr</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="instant" className="mt-0">
          <InstantMessages />
        </TabsContent>
        
        <TabsContent value="groups" className="mt-0">
          <GroupDiscussions />
        </TabsContent>
        
        <TabsContent value="email" className="mt-0">
          <EmailClient />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
