
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { 
  BarChart3,
  Calendar, 
  FileText, 
  Headphones, 
  Home, 
  Menu, 
  MessageSquare, 
  PanelLeft, 
  Users,
  Settings
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconSize = 20;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Tableau de bord', path: '/', icon: <Home size={iconSize} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={iconSize} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={iconSize} /> },
    { name: 'Agenda', path: '/calendar', icon: <Calendar size={iconSize} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={iconSize} /> },
    { name: 'Statistiques', path: '/stats', icon: <BarChart3 size={iconSize} /> },
    { name: 'Support', path: '/support', icon: <Headphones size={iconSize} /> },
    { name: 'Paramètres', path: '/settings', icon: <Settings size={iconSize} /> },
  ];
  
  return (
    <>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu strokeWidth={2} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="px-4 py-6 text-center border-b">
              <Link to="/" className="flex items-center justify-center gap-2 font-bold">
                <PanelLeft className="h-6 w-6" />
                <span className="text-xl">SwiftAgent</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 py-4 px-3">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="justify-start font-normal"
                >
                  <Link to={item.path} onClick={() => setIsMenuOpen(false)} className="w-full">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
            
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "Agent"} />
                  <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || "A"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.user_metadata?.full_name || "Agent"}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <aside className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 border-r h-screen sticky top-0 overflow-y-auto animate-in fade-in-0 duration-75`}>
        <div className="px-4 py-6 text-center border-b">
          <Link to="/" className="flex items-center justify-center gap-2 font-bold">
            <PanelLeft className="h-6 w-6" />
            <span className="text-xl">SwiftAgent</span>
          </Link>
        </div>
        
        <div className="flex flex-col gap-2 py-4 px-3">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className="justify-start font-normal"
            >
              <Link to={item.path} className="w-full">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
        
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.full_name || "Agent"} />
              <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.user_metadata?.full_name || "Agent"}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
