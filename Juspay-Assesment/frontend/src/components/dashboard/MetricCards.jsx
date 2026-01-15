import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

export function MetricCards() {
  return (
    <>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl p-5 transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: '#E6F4F8',
            border: '1px solid #D4E8ED'
          }}
        >
          <div className="space-y-3">
            <p className="text-sm font-medium" style={{ color: '#535C66' }}>{metric.title}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold" style={{ color: '#1C1C1C' }}>{metric.value}</p>
              <div className="flex items-center gap-1 text-sm font-medium" style={{ color: '#717982' }}>
                <span>{metric.change}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
