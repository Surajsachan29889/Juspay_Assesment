import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', projections: 18, actuals: 8 },
  { month: 'Feb', projections: 20, actuals: 10 },
  { month: 'Mar', projections: 10, actuals: 5 },
  { month: 'Apr', projections: 25, actuals: 12 },
  { month: 'May', projections: 15, actuals: 8 },
  { month: 'Jun', projections: 22, actuals: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card rounded-lg p-3">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">{entry.value}M</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ProjectionsChart = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 md:p-5 bg-card rounded-xl">
        <h3 className="text-sm font-semibold text-foreground mb-4">Projections vs Actuals</h3>
        <div className="h-[180px] md:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0} barCategoryGap="60%" barSize={18} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Bar 
              dataKey="actuals" 
              name="Actuals"
              stackId="a"
              fill="#A8C5DA"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="projections" 
              name="Projections"
              stackId="a"
              fill="#E5ECF6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
});

ProjectionsChart.displayName = 'ProjectionsChart';
