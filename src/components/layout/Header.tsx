
import React, { useState } from 'react';
import { Bell, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [notifications, setNotifications] = useState(3);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
      navigate('/login');
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="icon-button text-muted-foreground"
            aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary">Noovimo</span>
            <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">Intranet</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="icon-button relative" aria-label="Notifications">
            <Bell size={20} className="text-muted-foreground" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-noovimo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {notifications}
              </span>
            )}
          </button>
          
          <Link to="/profile" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-noovimo-100 border border-noovimo-200 overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium hidden md:inline-block">
              {user?.email?.split('@')[0] || 'Agent Noovimo'}
            </span>
          </Link>
          
          <button 
            onClick={handleSignOut}
            className="icon-button text-muted-foreground hover:text-red-500"
            aria-label="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
