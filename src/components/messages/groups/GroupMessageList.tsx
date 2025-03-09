
import React from 'react';
import { Users } from 'lucide-react';
import { GroupMessage } from '@/types/group';

interface GroupMessageListProps {
  groupMessages: GroupMessage[];
  groupName: string;
  groupDescription: string;
}

const GroupMessageList = ({ groupMessages, groupName, groupDescription }: GroupMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-container">
      {groupMessages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[75%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
            {!message.isOwn && (
              <div className="flex items-center mb-1">
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className="w-6 h-6 rounded-full object-cover mr-2"
                />
                <span className="text-xs font-medium">{message.sender.name}</span>
              </div>
            )}
            
            <div className={`
              p-3 rounded-lg 
              ${message.isOwn 
                ? 'bg-[#d72345] text-white rounded-tr-none' 
                : 'bg-secondary/70 rounded-tl-none'
              }
            `}>
              <p className="text-sm">{message.content}</p>
            </div>
            
            <p className="text-xs text-muted-foreground mt-1">
              {message.timestamp}
            </p>
          </div>
        </div>
      ))}

      {groupMessages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Users size={40} className="mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Bienvenue dans {groupName}</h3>
            <p className="text-muted-foreground mt-1">{groupDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupMessageList;
