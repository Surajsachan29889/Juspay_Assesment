import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RightSidebar } from './RightSidebar';
import { motion } from 'framer-motion';

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header 
          onToggleRightSidebar={() => setRightSidebarVisible(!rightSidebarVisible)}
          rightSidebarVisible={rightSidebarVisible}
        />
        
        <motion.main 
          className="flex-1 overflow-auto p-4 md:p-6 min-w-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          role="main"
          aria-label="Main content"
        >
          <Outlet />
        </motion.main>
      </div>
      
      {rightSidebarVisible && (
        <RightSidebar />
      )}
    </div>
  );
}
