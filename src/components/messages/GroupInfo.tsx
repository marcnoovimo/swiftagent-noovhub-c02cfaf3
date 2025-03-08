
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Group } from '@/types/group';
import { Info, Users } from 'lucide-react';

interface GroupInfoProps {
  group: Group;
}

const GroupInfo = ({ group }: GroupInfoProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Info size={18} className="text-muted-foreground" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Informations du groupe</SheetTitle>
          <SheetDescription>
            Détails et membres du groupe
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <div className="flex flex-col items-center space-y-3">
            <img 
              src={group.avatar} 
              alt={group.name} 
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="font-semibold text-lg">{group.name}</h3>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
            <p>{group.description || "Aucune description disponible."}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <h4 className="font-medium text-sm">{group.members} membres</h4>
            </div>
            {/* Dans une version future, on pourrait lister les membres ici */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GroupInfo;
