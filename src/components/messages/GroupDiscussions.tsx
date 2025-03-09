
import React from 'react';
import { X } from 'lucide-react';
import { useGroups } from '@/hooks/useGroups';
import { useAuth } from '@/context/auth-hooks';
import { Button } from "@/components/ui/button";
import GroupSidebar from './groups/GroupSidebar';
import GroupChatArea from './groups/GroupChatArea';
import NoGroupSelected from './groups/NoGroupSelected';

interface GroupDiscussionsProps {
  onClose?: () => void;
}

const GroupDiscussions = ({ onClose }: GroupDiscussionsProps) => {
  const { user } = useAuth();
  const { 
    groups, 
    activeGroup, 
    setActiveGroup, 
    groupMessages, 
    loading, 
    sendMessage, 
    createGroup,
    joinGroup 
  } = useGroups();

  const handleSendMessage = async (message: string) => {
    if (!activeGroup) return;
    await sendMessage(activeGroup.id, message);
  };

  const handleCreateGroup = async (name: string, description: string) => {
    return await createGroup(name, description);
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-3 relative">
      {/* Close button only for mobile and only if onClose is provided */}
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 md:hidden" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {/* Groups list sidebar */}
      <GroupSidebar 
        groups={groups} 
        activeGroup={activeGroup} 
        setActiveGroup={setActiveGroup}
        onCreateGroup={handleCreateGroup}
      />
      
      {/* Group chat or placeholder */}
      {activeGroup ? (
        <GroupChatArea 
          group={activeGroup}
          messages={groupMessages}
          onClose={onClose}
          onSendMessage={handleSendMessage}
          onJoinGroup={joinGroup}
        />
      ) : (
        <NoGroupSelected />
      )}
    </div>
  );
};

export default GroupDiscussions;
