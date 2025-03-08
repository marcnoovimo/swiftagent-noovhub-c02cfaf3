
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/use-mobile';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      <Sidebar />
      
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
