import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
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

export const OrderListPage = memo(() => {
  const {
    orders,
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

  const statusOptions = ['all', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'];

  const handleSort = useCallback((key) => {
    toggleSort(key);
  }, [toggleSort]);

  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
  }, [setFilterStatus]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h1 className="text-lg font-semibold text-foreground">Order List</h1>

      <div className="bg-transparent">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-transparent border-0 rounded-t-xl border-b border-border/30">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              aria-label="Add new order"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  aria-label="Filter orders"
                >
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    className={cn(
                      "text-sm",
                      filterStatus === status && "bg-accent"
                    )}
                    role="option"
                    aria-selected={filterStatus === status}
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
              onClick={() => handleSort('id')}
              aria-label={`Sort by ID ${sortConfig.key === 'id' && sortConfig.direction === 'asc' ? '(descending)' : '(ascending)'}`}
            >
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="relative flex-1 sm:flex-initial">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[200px] pl-9 h-9 bg-muted border-0 rounded-lg"
              aria-label="Search orders"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-transparent">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onCheckedChange={toggleAllOrders}
                    className="data-[state=checked]:bg-[#A8A4FF] data-[state=checked]:border-[#A8A4FF] data-[state=checked]:text-white"
                  />
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('id')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('id');
                    }
                  }}
                >
                  Order ID
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('user')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'user' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('user');
                    }
                  }}
                >
                  User
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors hidden md:table-cell"
                  onClick={() => handleSort('project')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'project' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('project');
                    }
                  }}
                >
                  Project
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors hidden lg:table-cell"
                  onClick={() => handleSort('address')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('address');
                    }
                  }}
                >
                  Address
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('date')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('date');
                    }
                  }}
                >
                  Date
                </TableHead>
                <TableHead 
                  className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('status')}
                  role="columnheader"
                  aria-sort={sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('status');
                    }
                  }}
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
                  transition={{ delay: index * 0.03, type: 'spring', stiffness: 100 }}
                  className={cn(
                    "border-0 transition-colors",
                    selectedOrders.includes(order.id) ? "bg-muted/50" : "hover:bg-muted/30"
                  )}
                >
                  <TableCell className="py-2">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                      className={cn(
                        selectedOrders.includes(order.id) && 
                        "data-[state=checked]:bg-[#A8A4FF] data-[state=checked]:border-[#A8A4FF] data-[state=checked]:text-white"
                      )}
                    />
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-sm text-muted-foreground">#{order.id}</span>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={order.user.avatar} alt={order.user.name} />
                        <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">{order.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 hidden md:table-cell">
                    <span className="text-sm text-foreground">{order.project}</span>
                  </TableCell>
                  <TableCell className="py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-foreground">{order.address}</span>
                      {order.address.includes('Nest') && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <span className={cn("status-badge", statusStyles[order.status])}>
                      <span className="status-dot" />
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      aria-label={`More options for order ${order.id}`}
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <nav 
          className="flex items-center justify-end gap-2 px-4 py-3 bg-transparent border-t border-border/30"
          aria-label="Pagination"
        >
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 text-sm rounded-full",
                  currentPage === page 
                    ? "bg-muted text-foreground hover:bg-muted" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setCurrentPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
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
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </nav>
      </div>
    </motion.div>
  );
});

OrderListPage.displayName = 'OrderListPage';
