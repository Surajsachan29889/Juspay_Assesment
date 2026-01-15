import React from 'react';
import { motion } from 'framer-motion';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { ProjectionsChart } from '@/components/dashboard/ProjectionsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RevenueByLocation } from '@/components/dashboard/RevenueByLocation';
import { TopSellingProducts } from '@/components/dashboard/TopSellingProducts';
import { TotalSalesChart } from '@/components/dashboard/TotalSalesChart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.h1 
        variants={itemVariants}
        className="text-lg font-semibold text-foreground"
      >
        eCommerce
      </motion.h1>

      {/* Top Row - Metrics and Projections */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Metric Cards */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCards />
        </div>
        
        {/* Right - Projections vs Actuals */}
        <ProjectionsChart />
      </motion.div>

      {/* Middle Row - Revenue and Location */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Chart - Takes 3 columns */}
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        
        {/* Revenue by Location - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueByLocation />
        </div>
      </motion.div>

      {/* Bottom Row - Products and Sales */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top Selling Products - Takes 3 columns */}
        <div className="lg:col-span-3">
          <TopSellingProducts />
        </div>
        
        {/* Total Sales - Takes 2 columns */}
        <div className="lg:col-span-2">
          <TotalSalesChart />
        </div>
      </motion.div>
    </motion.div>
  );
}
