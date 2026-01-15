import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Filter,
  ArrowUpDown,
  Search,
  Calendar,
  MoreHorizontal,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const statusStyles = {
  'In Progress': 'status-in-progress',
  'Complete': 'status-complete',
  'Pending': 'status-pending',
  'Approved': 'status-approved',
  'Rejected': 'status-rejected',
};

export function OrderListPage() {
  const {
    orders,
    allOrders,
    selectedOrders,
    searchQuery,
    setSearchQuery,
    sortConfig,
    toggleSort,
    filterStatus,
    setFilterStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    toggleOrderSelection,
    toggleAllOrders,
  } = useDashboard();

  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = ['all', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-foreground">Order List</h1>

      {/* Actions Bar */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={cn(
                      "text-sm",
                      filterStatus === status && "bg-accent"
                    )}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => toggleSort('id')}
            >
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] pl-9 h-9 bg-muted border-0"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onCheckedChange={toggleAllOrders}
                  />
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('id')}
                >
                  Order ID
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('user')}
                >
                  User
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('project')}
                >
                  Project
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('address')}
                >
                  Address
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('date')}
                >
                  Date
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort('status')}
                >
                  Status
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    "border-border hover:bg-muted/50 transition-colors",
                    selectedOrders.includes(order.id) && "bg-muted/30"
                  )}
                >
                  <TableCell className="py-3">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                    />
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-muted-foreground">#{order.id}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={order.user.avatar} alt={order.user.name} />
                        <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{order.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-foreground">{order.project}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-foreground">{order.address}</span>
                      {order.address.includes('Nest') && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className={cn("status-badge", statusStyles[order.status])}>
                      <span className="status-dot" />
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon"
              className={cn(
                "h-8 w-8 text-sm",
                currentPage === page 
                  ? "bg-foreground text-background hover:bg-foreground/90" 
                  : "text-muted-foreground"
              )}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
