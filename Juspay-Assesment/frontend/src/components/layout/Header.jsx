import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

import collapseIcon from '@/assets/collapse.svg';
import starIcon from '@/assets/star.svg';
import themeIcon from '@/assets/theme.svg';
import recentIcon from '@/assets/recent.svg';
import bellIcon from '@/assets/bell.svg';

function SvgIcon({ src, className, alt = '' }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn(className, "dark:brightness-0 dark:invert")}
    />
  );
}

export function Header({ onToggleRightSidebar, rightSidebarVisible }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { section: 'Dashboards', page: 'Default' };
    if (path === '/orders') return { section: 'Dashboards', page: 'eCommerce' };
    return { section: 'Dashboards', page: 'Default' };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header 
      className="flex items-center justify-between h-14 px-3 md:px-4 border-b border-border bg-background"
      role="banner"
    >
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SvgIcon src={collapseIcon} className="h-6 w-6" alt="Menu" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SvgIcon src={starIcon} className="h-6 w-6" alt="Favorites" />
        </Button>
        <nav className="flex items-center text-sm ml-1">
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

      <div className="flex items-center gap-1">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search"
            className="w-[140px] md:w-[180px] pl-9 pr-14 h-9 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-ring rounded-lg"
            aria-label="Search"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-muted-foreground pointer-events-none">
            <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium bg-background rounded border border-border">⌘</kbd>
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-xs font-medium bg-background rounded border border-border">/</kbd>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 sm:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <SvgIcon src={themeIcon} className="h-6 w-6" alt="Theme" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 hidden md:flex"
          aria-label="History"
        >
          <SvgIcon src={recentIcon} className="h-6 w-6" alt="Recent" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 relative"
          aria-label="Notifications"
        >
          <SvgIcon src={bellIcon} className="h-6 w-6" alt="Notifications" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 hidden lg:flex"
          onClick={onToggleRightSidebar}
          aria-label={rightSidebarVisible ? "Hide right sidebar" : "Show right sidebar"}
          aria-expanded={rightSidebarVisible}
        >
          <SvgIcon src={collapseIcon} className="h-6 w-6" alt="Toggle sidebar" />
        </Button>
      </div>
    </header>
  );
}
