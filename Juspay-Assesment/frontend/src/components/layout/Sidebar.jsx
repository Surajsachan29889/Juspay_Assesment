import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import logo from '@/assets/logo.svg';
import {
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import defaultIcon from '@/assets/default.svg';
import eCommerceIcon from '@/assets/eCommerce.svg';
import projectIcon from '@/assets/project.svg';
import coursesIcon from '@/assets/courses.svg';
import profileIcon from '@/assets/profile.svg';
import accountIcon from '@/assets/account.svg';
import corporateIcon from '@/assets/corporate.svg';
import blogIcon from '@/assets/blog.svg';
import socialIcon from '@/assets/social.svg';

function SvgIcon({ src, className, alt = '' }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={cn(className, "dark:brightness-0 dark:invert")}
      style={{ width: '1.25rem', height: '1.25rem' }}
    />
  );
}

const navItems = {
  favorites: [
    { name: 'Overview', path: '/dashboard' },
    { name: 'Projects', path: '/projects' },
  ],
  dashboards: [
    { name: 'Default', path: '/dashboard', icon: defaultIcon },
    { name: 'eCommerce', path: '/orders', icon: eCommerceIcon },
    { name: 'Projects', path: '/projects', icon: projectIcon },
    { name: 'Online Courses', path: '/courses', icon: coursesIcon },
  ],
  pages: {
    'User Profile': {
      icon: profileIcon,
      children: [
        { name: 'Overview', path: '/profile' },
        { name: 'Projects', path: '/profile/projects' },
        { name: 'Campaigns', path: '/profile/campaigns' },
        { name: 'Documents', path: '/profile/documents' },
        { name: 'Followers', path: '/profile/followers' },
      ]
    },
    'Account': { icon: accountIcon, path: '/account' },
    'Corporate': { icon: corporateIcon, path: '/corporate' },
    'Blog': { icon: blogIcon, path: '/blog' },
    'Social': { icon: socialIcon, path: '/social' },
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
    <aside 
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-[250px]",
        "hidden md:flex"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground">
          <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" />
        </div>
        {!collapsed && (
          <span className="text-foreground font-semibold text-lg">ByeWind</span>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="mb-6">
          {!collapsed && (
            <div className="flex items-center gap-4 px-3 mb-3">
              <span className="text-xs font-medium text-sidebar-muted">Favorites</span>
              <span className="text-xs text-sidebar-muted/60">Recently</span>
            </div>
          )}
          <nav className="space-y-1">
            {navItems.favorites.map((item) => (
              <NavLink
                key={item.path + item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                  isActive(item.path)
                    ? "text-sidebar-foreground"
                    : "text-sidebar-muted hover:text-sidebar-foreground"
                )}
              >
                {!collapsed && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mb-6">
          {!collapsed && (
            <div className="px-3 mb-3">
              <span className="text-xs font-medium text-sidebar-muted">Dashboards</span>
            </div>
          )}
          <nav className="space-y-1">
            {navItems.dashboards.map((item) => (
              <NavLink
                key={item.path + item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 py-2 text-sm transition-colors relative",
                  isActive(item.path)
                    ? "text-sidebar-foreground bg-sidebar-active rounded-r-lg pl-3 pr-3 border-l-[3px] border-sidebar-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-active rounded-lg px-3"
                )}
              >
                {!isActive(item.path) && (
                  <ChevronRight className="w-4 h-4 text-sidebar-muted flex-shrink-0" />
                )}
                <SvgIcon src={item.icon} className="w-5 h-5 opacity-70 flex-shrink-0" alt={item.name} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          {!collapsed && (
            <div className="px-3 mb-3">
              <span className="text-xs font-medium text-sidebar-muted">Pages</span>
            </div>
          )}
          <nav className="space-y-1">
            {Object.entries(navItems.pages).map(([name, item]) => (
              <div key={name}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSection(name)}
                      className={cn(
                        "flex items-center w-full gap-2 px-3 py-2 text-sm transition-colors",
                        "text-sidebar-foreground hover:bg-sidebar-active rounded-lg"
                      )}
                    >
                      {expandedSections.includes(name) ? (
                        <ChevronDown className="w-4 h-4 text-sidebar-muted flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-sidebar-muted flex-shrink-0" />
                      )}
                      <SvgIcon src={item.icon} className="w-5 h-5 opacity-70 flex-shrink-0" alt={name} />
                      {!collapsed && <span>{name}</span>}
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
                          <div className="ml-11 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={cn(
                                  "flex items-center py-2 text-sm transition-colors",
                                  isActive(child.path)
                                    ? "text-sidebar-foreground"
                                    : "text-sidebar-muted hover:text-sidebar-foreground"
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
                      "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                      isActive(item.path)
                        ? "text-sidebar-foreground bg-sidebar-active rounded-lg"
                        : "text-sidebar-foreground hover:bg-sidebar-active rounded-lg"
                    )}
                  >
                    <ChevronRight className="w-4 h-4 text-sidebar-muted flex-shrink-0" />
                    <SvgIcon src={item.icon} className="w-5 h-5 opacity-70 flex-shrink-0" alt={name} />
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
