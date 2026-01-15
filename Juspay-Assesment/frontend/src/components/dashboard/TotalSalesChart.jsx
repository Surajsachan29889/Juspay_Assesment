import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Direct', value: 300.56, color: '#1C1C1C' }, // Black
  { name: 'Affiliate', value: 135.18, color: '#93E088' }, // Green
  { name: 'Sponsored', value: 154.02, color: '#A8A4FF' }, // Purple/Blue
  { name: 'E-mail', value: 48.96, color: '#98D7E8' }, // Light cyan
];

const COLORS = ['#1C1C1C', '#93E088', '#A8A4FF', '#98D7E8'];

export function TotalSalesChart() {
  return (
    <Card className="p-5 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Total Sales</h3>
      
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-44 h-44 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                cornerRadius={10}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label with dark badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: '#404040' }}
            >
              <span className="text-lg font-bold text-white">38.6%</span>
            </div>
          </div>
        </div>

        {/* Legend - Vertical Layout */}
        <div className="w-full space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">${item.value.toFixed(2)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
