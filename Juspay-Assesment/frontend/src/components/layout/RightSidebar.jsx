import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Bug, UserPlus, Bell, Pencil, Trash2 } from 'lucide-react';

const notifications = [
  { id: 1, icon: Bug, message: 'You have a bug that needs...', time: 'Just now', type: 'bug' },
  { id: 2, icon: UserPlus, message: 'New user registered', time: '59 minutes ago', type: 'user' },
  { id: 3, icon: Bug, message: 'You have a bug that needs...', time: '12 hours ago', type: 'bug' },
  { id: 4, icon: Bell, message: 'Andi Lane subscribed to you', time: 'Today, 11:59 AM', type: 'subscribe' },
];

const activities = [
  { id: 1, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', name: 'Natali Craig', message: 'You have a bug that needs...', time: 'Just now' },
  { id: 2, avatar: 'https://randomuser.me/api/portraits/men/2.jpg', name: 'Drew Cano', message: 'Released a new version', time: '59 minutes ago' },
  { id: 3, avatar: 'https://randomuser.me/api/portraits/women/3.jpg', name: 'Kate Morrison', message: 'Submitted a bug', time: '12 hours ago' },
  { id: 4, avatar: 'https://randomuser.me/api/portraits/men/4.jpg', name: 'Orlando Diggs', message: 'Modified A data in Page X', time: 'Today, 11:59 AM' },
  { id: 5, avatar: 'https://randomuser.me/api/portraits/women/5.jpg', name: 'Andi Lane', message: 'Deleted a page in Project X', time: 'Feb 2, 2023' },
];

const contacts = [
  { id: 1, avatar: 'https://randomuser.me/api/portraits/women/1.jpg', name: 'Natali Craig' },
  { id: 2, avatar: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Drew Cano' },
  { id: 3, avatar: 'https://randomuser.me/api/portraits/men/4.jpg', name: 'Orlando Diggs' },
  { id: 4, avatar: 'https://randomuser.me/api/portraits/women/5.jpg', name: 'Andi Lane' },
  { id: 5, avatar: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Kate Morrison' },
  { id: 6, avatar: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'Koray Okumus' },
];

export function RightSidebar() {
  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 280, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-l border-border bg-background overflow-hidden flex-shrink-0"
    >
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Notifications */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Notifications</h3>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <notification.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Activities */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Activities</h3>
            <div className="space-y-2">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.avatar} alt={activity.name} />
                    <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contacts */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3">Contacts</h3>
            <div className="space-y-1">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{contact.name}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </motion.aside>
  );
}
