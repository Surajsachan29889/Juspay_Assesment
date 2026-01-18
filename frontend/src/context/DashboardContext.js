import React, { createContext, useContext, useState, useMemo } from 'react';

const DashboardContext = createContext();

// Mock data for the dashboard
const initialOrders = [
  { id: 'CM9801', user: { name: 'Natali Craig', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }, project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
  { id: 'CM9802', user: { name: 'Kate Morrison', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, project: 'CRM Admin pages', address: 'Larry San Francisco', date: 'A minute ago', status: 'Complete' },
  { id: 'CM9803', user: { name: 'Drew Cano', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }, project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
  { id: 'CM9804', user: { name: 'Orlando Diggs', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }, project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' },
  { id: 'CM9805', user: { name: 'Andi Lane', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }, project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' },
  { id: 'CM9806', user: { name: 'Natali Craig', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }, project: 'Landing Page', address: 'Meadow Lane Oakland', date: 'Just now', status: 'In Progress' },
  { id: 'CM9807', user: { name: 'Kate Morrison', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, project: 'CRM Admin pages', address: 'Larry San Francisco', date: 'A minute ago', status: 'Complete' },
  { id: 'CM9808', user: { name: 'Drew Cano', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }, project: 'Client Project', address: 'Bagwell Avenue Ocala', date: '1 hour ago', status: 'Pending' },
  { id: 'CM9809', user: { name: 'Orlando Diggs', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }, project: 'Admin Dashboard', address: 'Washburn Baton Rouge', date: 'Yesterday', status: 'Approved' },
  { id: 'CM9810', user: { name: 'Andi Lane', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }, project: 'App Landing Page', address: 'Nest Lane Olivette', date: 'Feb 2, 2023', status: 'Rejected' },
  // Additional orders for pagination demo
  { id: 'CM9811', user: { name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }, project: 'E-commerce Site', address: 'Oak Street Denver', date: 'Feb 3, 2023', status: 'In Progress' },
  { id: 'CM9812', user: { name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' }, project: 'Mobile App', address: 'Maple Ave Phoenix', date: 'Feb 4, 2023', status: 'Complete' },
  { id: 'CM9813', user: { name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' }, project: 'Dashboard UI', address: 'Pine Road Seattle', date: 'Feb 5, 2023', status: 'Pending' },
  { id: 'CM9814', user: { name: 'Sarah Wilson', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' }, project: 'API Integration', address: 'Cedar Lane Austin', date: 'Feb 6, 2023', status: 'Approved' },
  { id: 'CM9815', user: { name: 'James Taylor', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' }, project: 'Backend System', address: 'Birch Street Portland', date: 'Feb 7, 2023', status: 'In Progress' },
];

export function DashboardProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.user.name.toLowerCase().includes(query) ||
        order.project.toLowerCase().includes(query) ||
        order.address.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = sortConfig.key === 'user' ? a.user.name : a[sortConfig.key];
        let bValue = sortConfig.key === 'user' ? b.user.name : b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [orders, searchQuery, sortConfig, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllOrders = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  };

  const value = {
    orders: paginatedOrders,
    allOrders: filteredOrders,
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
    itemsPerPage,
    toggleOrderSelection,
    toggleAllOrders,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
