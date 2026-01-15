import React from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

const data = [
  { month: 'Jan', currentWeek: 8, previousWeek: 12 },
  { month: 'Feb', currentWeek: 7, previousWeek: 14 },
  { month: 'Mar', currentWeek: 10, previousWeek: 13 },
  { month: 'Apr', currentWeek: 12, previousWeek: 16 },
  { month: 'May', currentWeek: 18, previousWeek: 17 },
  { month: 'Jun', currentWeek: 22, previousWeek: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">${entry.value}M</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <Card className="p-5 bg-card border border-border rounded-xl">
      {/* Header with Legend */}
      <div className="flex items-center gap-6 mb-4">
        <h3 className="text-sm font-semibold text-foreground">Revenue</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-foreground rounded-full" />
            <span className="text-xs text-muted-foreground">Current Week</span>
            <span className="text-xs font-semibold text-foreground">$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t border-dashed border-muted-foreground" />
            <span className="text-xs text-muted-foreground">Previous Week</span>
            <span className="text-xs font-semibold text-foreground">$68,768</span>
          </div>
        </div>
      </div>
      
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A8D4E6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#A8D4E6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="currentWeek"
              stroke="transparent"
              fill="url(#colorCurrent)"
            />
            <Line 
              type="monotone" 
              dataKey="currentWeek" 
              name="Current Week"
              stroke="#1a1a2e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#1a1a2e' }}
            />
            <Line 
              type="monotone" 
              dataKey="previousWeek" 
              name="Previous Week"
              stroke="#888888"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, fill: '#888888' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
