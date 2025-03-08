
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Tableau de bord', icon: Home, path: '/' },
    { name: 'Messages', icon: MessageCircle, path: '/messages' },
    { name: 'Documents', icon: FileText, path: '/documents' },
    { name: 'Performance', icon: BarChart3, path: '/stats' },
    { name: 'Équipe', icon: Users, path: '/team' },
    { name: 'Paramètres', icon: Settings, path: '/settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-border/50 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="h-16 flex items-center justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-primary">Noovimo</span>
              <span className="text-sm font-medium text-muted-foreground">Intranet</span>
            </Link>
          </div>
          
          <nav className="flex-1 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 space-y-1 border-t border-border/50">
            <Link to="/help" className="nav-item" onClick={closeSidebar}>
              <HelpCircle size={20} />
              <span>Aide & Support</span>
            </Link>
            <button className="nav-item w-full text-left text-muted-foreground hover:text-destructive">
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
