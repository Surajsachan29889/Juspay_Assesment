import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Sun,
  Moon,
  Clock,
  Bell,
  PanelRightClose,
  PanelRightOpen,
  Star,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header({ onToggleRightSidebar, rightSidebarVisible }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Generate breadcrumb based on current path
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { section: 'Dashboards', page: 'Default' };
    if (path === '/orders') return { section: 'Dashboards', page: 'Default' };
    return { section: 'Dashboards', page: 'Default' };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-background">
      {/* Left Side - Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Layers className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Star className="h-4 w-4 text-muted-foreground" />
        </Button>
        <nav className="flex items-center text-sm">
          <Link 
            to="/dashboard" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {breadcrumb.section}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{breadcrumb.page}</span>
        </nav>
      </div>

      {/* Right Side - Search and Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            className="w-[200px] pl-9 h-9 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-ring"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-muted-foreground">
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium bg-background rounded border border-border">⌘</kbd>
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium bg-background rounded border border-border">/</kbd>
          </div>
        </div>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9" 
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>

        {/* Clock/History */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Clock className="h-4 w-4 text-muted-foreground" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* Toggle Right Sidebar */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          onClick={onToggleRightSidebar}
        >
          {rightSidebarVisible ? (
            <PanelRightClose className="h-4 w-4 text-muted-foreground" />
          ) : (
            <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
}
