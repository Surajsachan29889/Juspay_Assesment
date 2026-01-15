import React from 'react';
import { Card } from '@/components/ui/card';
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
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
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

export function ProjectionsChart() {
  return (
    <Card className="p-5 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Projections vs Actuals</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0} barCategoryGap="20%">
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
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${value}M`}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Bar 
              dataKey="actuals" 
              name="Actuals"
              stackId="a"
              fill="#A8D4D4"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="projections" 
              name="Projections"
              stackId="a"
              fill="#7EC8C8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
