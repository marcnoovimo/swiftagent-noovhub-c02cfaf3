
import React from 'react';
import { Users } from 'lucide-react';
import { Group } from '@/types/group';

interface GroupListItemProps {
  group: Group;
  isActive: boolean;
  onClick: () => void;
}

const GroupListItem = ({ group, isActive, onClick }: GroupListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        isActive
          ? 'bg-noovimo-50 border-l-2 border-[#d72345]'
          : 'hover:bg-secondary/50'
      }`}
    >
      <div className="flex items-center">
        <div className="relative mr-3">
          <img
            src={group.avatar}
            alt={group.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate">{group.name}</h3>
            <span className="text-xs text-muted-foreground">{group.lastMessage.time}</span>
          </div>
          
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground truncate">
              <span className="font-medium">{group.lastMessage.sender}:</span> {group.lastMessage.content}
            </p>
            
            {group.unreadCount > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 bg-[#d72345] text-white text-xs rounded-full px-1.5">
                {group.unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center mt-1">
            <Users size={12} className="text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">{group.members} membres</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupListItem;
