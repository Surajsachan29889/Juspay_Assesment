import React, { memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { RevenueByLocation } from '@/components/dashboard/RevenueByLocation';
import { TopSellingProducts } from '@/components/dashboard/TopSellingProducts';

const ProjectionsChart = lazy(() => import('@/components/dashboard/ProjectionsChart').then(module => ({ default: module.ProjectionsChart })));
const RevenueChart = lazy(() => import('@/components/dashboard/RevenueChart').then(module => ({ default: module.RevenueChart })));
const TotalSalesChart = lazy(() => import('@/components/dashboard/TotalSalesChart').then(module => ({ default: module.TotalSalesChart })));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const ChartSkeleton = () => (
  <div className="h-[200px] bg-muted/50 rounded-xl animate-pulse" />
);

export const DashboardPage = memo(() => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 md:space-y-6"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-lg md:text-xl font-semibold text-foreground"
      >
        eCommerce
      </motion.h1>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <MetricCards />
        </div>
        
        <Suspense fallback={<ChartSkeleton />}>
          <ProjectionsChart />
        </Suspense>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6 [&>div]:flex">
        <div className="lg:col-span-7">
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>
        
        <div className="lg:col-span-3">
          <RevenueByLocation />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6 [&>div]:flex">
        <div className="lg:col-span-7">
          <TopSellingProducts />
        </div>
        
        <div className="lg:col-span-3">
          <Suspense fallback={<ChartSkeleton />}>
            <TotalSalesChart />
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  );
});

DashboardPage.displayName = 'DashboardPage';
