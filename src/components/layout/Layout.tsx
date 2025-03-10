
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
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Global fix for all dialog and menu backgrounds */
        [role="dialog"] > div,
        [data-radix-popper-content-wrapper] > div,
        [data-radix-dropdown-menu-content],
        [data-radix-select-content],
        .radix-dialog-content,
        .dialog-content,
        .popover-content,
        .dropdown-content,
        .document-upload-dialog {
          background-color: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          backdrop-filter: none !important;
        }

        /* Force high z-index for all dialogs and dropdown contents */
        [data-radix-portal] {
          z-index: 9999 !important;
        }
        
        /* Fix for all Radix-based components */
        [data-radix-menu-content],
        [data-radix-dropdown-menu-content],
        [data-radix-select-content],
        [data-radix-popover-content] {
          background-color: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          backdrop-filter: none !important;
        }
        
        /* Ensure all dialogs have solid backgrounds */
        .radix-dialog-content,
        .MuiDialog-paper,
        .MuiPopover-paper,
        .MuiMenu-paper {
          background-color: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          backdrop-filter: none !important;
        }
      `}} />
    </div>
  );
};

export default Layout;
