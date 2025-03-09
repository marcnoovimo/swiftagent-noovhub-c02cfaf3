
import React from 'react';
import { Users, Search } from 'lucide-react';
import { Group } from '@/types/group';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import GroupInfo from '../GroupInfo';
import { toast } from 'sonner';

interface GroupChatHeaderProps {
  group: Group;
  onJoinGroup: (groupId: string) => Promise<boolean>;
}

const GroupChatHeader = ({ group, onJoinGroup }: GroupChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-border/50 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative mr-3">
          <img
            src={group.avatar}
            alt={group.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        
        <div>
          <h3 className="font-medium">{group.name}</h3>
          <p className="text-xs text-muted-foreground">
            {group.members} membres
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => {
                  onJoinGroup(group.id);
                  toast("Vous avez rejoint le groupe");
                }}
              >
                <Users size={16} className="text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rejoindre le groupe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <Search size={16} className="text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rechercher dans les messages</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <GroupInfo group={group} />
      </div>
    </div>
  );
};

export default GroupChatHeader;
