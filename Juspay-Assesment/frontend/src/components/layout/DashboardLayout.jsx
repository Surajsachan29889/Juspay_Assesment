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
      {/* Left Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          onToggleRightSidebar={() => setRightSidebarVisible(!rightSidebarVisible)}
          rightSidebarVisible={rightSidebarVisible}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <motion.main 
            className="flex-1 overflow-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.main>
          
          {/* Right Sidebar */}
          {rightSidebarVisible && (
            <RightSidebar />
          )}
        </div>
      </div>
    </div>
  );
}
