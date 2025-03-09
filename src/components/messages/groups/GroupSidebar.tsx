
import React, { useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { Group } from '@/types/group';
import { Button } from '@/components/ui/button';
import CreateGroupDialog from '../CreateGroupDialog';
import GroupListItem from './GroupListItem';
import { useAuth } from '@/context/auth-hooks';

interface GroupSidebarProps {
  groups: Group[];
  activeGroup: Group | null;
  setActiveGroup: (group: Group) => void;
  onCreateGroup: (name: string, description: string) => Promise<boolean>;
}

const GroupSidebar = ({ groups, activeGroup, setActiveGroup, onCreateGroup }: GroupSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.email?.endsWith('@admin.noovimo.fr') || user?.email?.endsWith('@noovimo.fr');
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border-r border-border/50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="search-bar flex-1 flex items-center">
          <Search size={16} className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Rechercher un groupe..."
            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/70"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {isAdmin && (
          <div className="ml-2">
            <CreateGroupDialog onCreateGroup={onCreateGroup} />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {filteredGroups.map((group) => (
          <GroupListItem 
            key={group.id}
            group={group}
            isActive={activeGroup?.id === group.id}
            onClick={() => setActiveGroup(group)}
          />
        ))}

        {filteredGroups.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            Aucun groupe trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSidebar;
