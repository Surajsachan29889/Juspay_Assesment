import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const data = [
  { name: 'Direct', value: 300.56, color: '#1C1C1C' },
  { name: 'Affiliate', value: 135.18, color: '#93E088' },
  { name: 'Sponsored', value: 154.02, color: '#A8A4FF' },
  { name: 'E-mail', value: 48.96, color: '#98D7E8' },
];

const COLORS = ['#1C1C1C', '#93E088', '#A8A4FF', '#98D7E8'];

const total = data.reduce((sum, item) => sum + item.value, 0);

const calculateAngles = () => {
  let currentAngle = 90;
  return data.map((item) => {
    const angle = (item.value / total) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    };
    currentAngle += angle;
    return segment;
  });
};

const segmentsWithAngles = calculateAngles();

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    const percentage = ((item.value / total) * 100).toFixed(1);
    return (
      <div 
        className="px-3 py-2 rounded-lg shadow-lg"
        style={{ backgroundColor: '#404040' }}
      >
        <p className="text-sm font-medium text-white">{item.name}</p>
        <p className="text-lg font-bold text-white">{percentage}%</p>
      </div>
    );
  }
  return null;
};

export const TotalSalesChart = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex-1 flex flex-col min-h-0"
    >
      <Card className="p-4 md:p-5 bg-card rounded-xl flex flex-col flex-1 min-h-0">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex-shrink-0">Total Sales</h3>
        
        <div className="flex flex-col items-center flex-1 min-h-0 justify-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 md:mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {[0, 1, 2, 3].map((index) => {
                const segment = segmentsWithAngles[index];
                return (
                  <Pie
                    key={`pie-${index}`}
                    data={[{ ...segment, value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    dataKey="value"
                    startAngle={segment.startAngle - 12}
                    endAngle={segment.endAngle}
                    cornerRadius={15}
                    isAnimationActive={false}
                    stroke={strokeColor}
                    strokeWidth={isDark ? 2 : 4}
                  >
                    <Cell 
                      fill={COLORS[index]}
                      className="cursor-pointer transition-opacity"
                    />
                  </Pie>
                );
              })}
              
              <Pie
                data={[{ ...segmentsWithAngles[0], value: 1 }]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                startAngle={segmentsWithAngles[0].startAngle - 12}
                endAngle={segmentsWithAngles[0].startAngle + 12}
                cornerRadius={15}
                isAnimationActive={false}
                stroke={strokeColor}
                strokeWidth={isDark ? 2 : 4}
              >
                <Cell 
                  fill={COLORS[0]}
                  className="cursor-pointer transition-opacity"
                />
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

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
    </motion.div>
  );
});

TotalSalesChart.displayName = 'TotalSalesChart';
