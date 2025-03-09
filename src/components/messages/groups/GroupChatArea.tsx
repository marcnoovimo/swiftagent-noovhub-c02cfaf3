
import React from 'react';
import { X } from 'lucide-react';
import { Group, GroupMessage } from '@/types/group';
import { Button } from '@/components/ui/button';
import GroupChatHeader from './GroupChatHeader';
import GroupMessageList from './GroupMessageList';
import GroupMessageInput from './GroupMessageInput';

interface GroupChatAreaProps {
  group: Group;
  messages: GroupMessage[];
  onClose?: () => void;
  onSendMessage: (message: string) => void;
  onJoinGroup: (groupId: string) => Promise<boolean>;
}

const GroupChatArea = ({ group, messages, onClose, onSendMessage, onJoinGroup }: GroupChatAreaProps) => {
  const handleSendMessage = (message: string) => {
    onSendMessage(message);
  };

  return (
    <div className="md:col-span-2 flex flex-col h-[600px]">
      {/* Close button for mobile */}
      {onClose && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <GroupChatHeader 
        group={group} 
        onJoinGroup={onJoinGroup} 
      />
      
      <GroupMessageList 
        groupMessages={messages} 
        groupName={group.name}
        groupDescription={group.description}
      />
      
      <GroupMessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default GroupChatArea;
