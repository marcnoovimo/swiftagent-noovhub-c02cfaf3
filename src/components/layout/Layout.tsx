
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/use-mobile';
import NotificationCenter from '@/components/notification/NotificationCenter';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  // Close sidebar on route change if on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Set sidebar state based on screen size on initial load
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className={`sidebar-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar />
      </div>
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <main className="flex-1 p-2 sm:p-4 md:p-6" onClick={isMobile ? closeSidebar : undefined}>
          <Outlet />
          {children}
        </main>
      </div>
      
      {/* Always include ChatbotInterface for global access */}
      <ChatbotInterface />
    </div>
  );
};

export default Layout;
