
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/use-mobile';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <main 
          className="flex-1 p-4 md:p-6 bg-background" 
          onClick={isMobile && sidebarOpen ? () => setSidebarOpen(false) : undefined}
        >
          <Outlet />
          {children}
        </main>
      </div>
      
      {/* Chatbot Interface for global access */}
      <ChatbotInterface />
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* CSS overlay to ensure all dialogs and menus have proper backgrounds */}
      <style jsx global>{`
        [role="dialog"] > div,
        [data-radix-popper-content-wrapper] > div {
          background-color: hsl(var(--background)) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        .radix-dialog-content,
        .dialog-content,
        .popover-content,
        .dropdown-content {
          background-color: hsl(var(--background)) !important;
        }
      `}</style>
    </div>
  );
};

export default Layout;
