import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import logo from '@/assets/logo.svg';
import {
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  FolderKanban,
  GraduationCap,
  User,
  FileText,
  Target,
  File,
  Users,
  Settings,
  Building2,
  BookOpen,
  MessageSquare,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = {
  favorites: [
    { name: 'Overview', path: '/dashboard', icon: Star },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
  ],
  dashboards: [
    { name: 'Default', path: '/dashboard', icon: LayoutDashboard },
    { name: 'eCommerce', path: '/orders', icon: ShoppingCart },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Online Courses', path: '/courses', icon: GraduationCap },
  ],
  pages: {
    'User Profile': {
      icon: User,
      children: [
        { name: 'Overview', path: '/profile' },
        { name: 'Projects', path: '/profile/projects' },
        { name: 'Campaigns', path: '/profile/campaigns' },
        { name: 'Documents', path: '/profile/documents' },
        { name: 'Followers', path: '/profile/followers' },
      ]
    },
    'Account': { icon: Settings, path: '/account' },
    'Corporate': { icon: Building2, path: '/corporate' },
    'Blog': { icon: BookOpen, path: '/blog' },
    'Social': { icon: MessageSquare, path: '/social' },
  }
};

export function Sidebar({ collapsed }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['User Profile']);

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={cn(
      "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-[250px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground">
          <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" />
        </div>
        {!collapsed && (
          <span className="text-foreground font-semibold text-lg">ByeWind</span>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {/* Favorites Section */}
        <div className="mb-6">
          {!collapsed && (
            <div className="flex items-center gap-4 px-3 mb-2">
              <span className="text-xs font-medium text-sidebar-muted uppercase tracking-wider">Favorites</span>
              <span className="text-xs text-sidebar-muted">Recently</span>
            </div>
          )}
          <nav className="space-y-0.5">
            {navItems.favorites.map((item) => (
              <NavItem
                key={item.path + item.name}
                item={item}
                collapsed={collapsed}
                isActive={isActive(item.path)}
                isFavorite
              />
            ))}
          </nav>
        </div>

        {/* Dashboards Section */}
        <div className="mb-6">
          {!collapsed && (
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-sidebar-muted uppercase tracking-wider">Dashboards</span>
            </div>
          )}
          <nav className="space-y-0.5">
            {navItems.dashboards.map((item) => (
              <NavItem
                key={item.path + item.name}
                item={item}
                collapsed={collapsed}
                isActive={isActive(item.path)}
              />
            ))}
          </nav>
        </div>

        {/* Pages Section */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-sidebar-muted uppercase tracking-wider">Pages</span>
            </div>
          )}
          <nav className="space-y-0.5">
            {Object.entries(navItems.pages).map(([name, item]) => (
              <div key={name}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSection(name)}
                      className={cn(
                        "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        "text-sidebar-foreground hover:bg-sidebar-active"
                      )}
                    >
                      <item.icon className="w-4 h-4 text-sidebar-muted" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{name}</span>
                          {expandedSections.includes(name) ? (
                            <ChevronDown className="w-4 h-4 text-sidebar-muted" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-sidebar-muted" />
                          )}
                        </>
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.includes(name) && !collapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-7 mt-1 space-y-0.5">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                  isActive(child.path)
                                    ? "text-sidebar-foreground bg-sidebar-active"
                                    : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-active"
                                )}
                              >
                                {child.name}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive(item.path)
                        ? "text-sidebar-foreground bg-sidebar-active"
                        : "text-sidebar-foreground hover:bg-sidebar-active"
                    )}
                  >
                    <ChevronRight className="w-4 h-4 text-sidebar-muted" />
                    <item.icon className="w-4 h-4 text-sidebar-muted" />
                    {!collapsed && <span>{name}</span>}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}

function NavItem({ item, collapsed, isActive, isFavorite }) {
  const Icon = item.icon;
  
  return (
    <NavLink
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        isActive
          ? "text-sidebar-foreground bg-sidebar-active border-l-2 border-sidebar-accent -ml-0.5 pl-[calc(0.75rem+0.125rem)]"
          : "text-sidebar-foreground hover:bg-sidebar-active",
        isFavorite && !isActive && "text-sidebar-muted"
      )}
    >
      {isFavorite && !collapsed && (
        <span className="w-1.5 h-1.5 rounded-full bg-sidebar-muted" />
      )}
      {!isFavorite && <Icon className="w-4 h-4 text-sidebar-muted" />}
      {!collapsed && <span>{item.name}</span>}
    </NavLink>
  );
}
