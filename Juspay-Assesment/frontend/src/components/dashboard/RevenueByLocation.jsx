import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const locations = [
  { city: 'New York', value: 72, percentage: 100 },
  { city: 'San Francisco', value: 39, percentage: 54 },
  { city: 'Sydney', value: 25, percentage: 35 },
  { city: 'Singapore', value: 61, percentage: 85 },
];

// World Map with location markers overlay
function WorldMap() {
  return (
    <div className="relative w-full h-full">
      {/* World Map Image */}
      <img 
        src="https://customer-assets.emergentagent.com/job_pixel-dash-11/artifacts/ckuvvsw6_World%20Map%20%281%29.png"
        alt="World Map"
        className="w-full h-full object-contain opacity-60"
      />
      
      {/* Location Markers Overlay */}
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
        {/* New York - East Coast USA */}
        <g>
          <circle cx="95" cy="65" r="5" fill="#1a1a2e" />
          <circle cx="95" cy="65" r="8" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.4" />
        </g>
        
        {/* San Francisco - West Coast USA */}
        <g>
          <circle cx="55" cy="72" r="5" fill="#1a1a2e" />
          <circle cx="55" cy="72" r="8" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.4" />
        </g>
        
        {/* Singapore - Southeast Asia */}
        <g>
          <circle cx="305" cy="115" r="5" fill="#1a1a2e" />
          <circle cx="305" cy="115" r="8" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.4" />
        </g>
        
        {/* Sydney - Australia */}
        <g>
          <circle cx="355" cy="160" r="5" fill="#1a1a2e" />
          <circle cx="355" cy="160" r="8" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

export function RevenueByLocation() {
  return (
    <Card className="p-5 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Location</h3>
      
      {/* World Map */}
      <div className="h-[100px] mb-4">
        <WorldMap />
      </div>

      {/* Location List */}
      <div className="space-y-3">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-foreground w-28 truncate">{location.city}</span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${location.percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full bg-muted-foreground/40 rounded-full"
              />
            </div>
            <span className="text-sm font-semibold text-foreground w-12 text-right">{location.value}K</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
