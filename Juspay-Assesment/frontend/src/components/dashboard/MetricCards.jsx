import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const metrics = [
  {
    title: 'Customers',
    value: '3,781',
    change: '+11.01%',
    trend: 'up',
  },
  {
    title: 'Orders',
    value: '1,219',
    change: '-0.03%',
    trend: 'down',
  },
  {
    title: 'Revenue',
    value: '$695',
    change: '+15.03%',
    trend: 'up',
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    trend: 'up',
  },
];

const MetricCard = memo(({ metric, index }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const getCardStyle = () => {
    if (isLight) {
      if (index === 0) {
        return { backgroundColor: '#E3F5FF' };
      } else if (index === 3) {
        return { backgroundColor: '#E5ECF6' };
      }
      return { backgroundColor: '#F7F9FB' };
    } else {
      if (index === 0) {
        return { backgroundColor: '#E3F5FF' };
      } else if (index === 3) {
        return { backgroundColor: '#E5ECF6' };
      }
      return { backgroundColor: 'rgba(255, 255, 255, 0.05)' };
    }
  };

  const cardStyle = getCardStyle();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "metric-card rounded-xl p-4 md:p-5 transition-all duration-200",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      style={{
        backgroundColor: cardStyle.backgroundColor,
        border: 'none'
      }}
      tabIndex={0}
      role="button"
      aria-label={`${metric.title}: ${metric.value}, ${metric.change}`}
    >
      <div className="space-y-2 md:space-y-3">
        <p 
          className={cn(
            "text-xs md:text-sm font-medium",
            isLight 
              ? "text-muted-foreground" 
              : (index === 0 || index === 3) 
                ? "" 
                : "text-foreground/70"
          )}
          style={!isLight && (index === 0 || index === 3) ? { color: '#1C1C1C' } : {}}
        >{metric.title}</p>
        <div className="flex items-end justify-between">
          <motion.p 
            className={cn(
              "text-2xl md:text-3xl font-bold",
              isLight 
                ? "text-foreground" 
                : (index === 0 || index === 3) 
                  ? "text-foreground" 
                  : "text-foreground"
            )}
            style={!isLight && (index === 0 || index === 3) ? { color: '#1C1C1C' } : {}}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          >
            {metric.value}
          </motion.p>
          <motion.div 
            className="flex items-center gap-1 text-xs md:text-sm font-medium"
            style={{ 
              color: isLight || index === 0 || index === 3 ? '#1C1C1C' : '#ffffff' 
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span>{metric.change}</span>
            {metric.trend === 'up' ? (
              <TrendingUp 
                className="w-3 h-3 md:w-4 md:h-4" 
                style={{ 
                  color: isLight || index === 0 || index === 3 ? '#1C1C1C' : '#ffffff' 
                }} 
              />
            ) : (
              <TrendingDown 
                className="w-3 h-3 md:w-4 md:h-4" 
                style={{ 
                  color: isLight || index === 0 || index === 3 ? '#1C1C1C' : '#ffffff' 
                }} 
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

MetricCard.displayName = 'MetricCard';

export const MetricCards = memo(() => {
  return (
    <>
      {metrics.map((metric, index) => (
        <MetricCard key={metric.title} metric={metric} index={index} />
      ))}
    </>
  );
});

MetricCards.displayName = 'MetricCards';
