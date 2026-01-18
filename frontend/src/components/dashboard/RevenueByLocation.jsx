import React, { memo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  { city: 'New York', value: 72, percentage: 100, x: 95, y: 65 },
  { city: 'San Francisco', value: 39, percentage: 54, x: 55, y: 72 },
  { city: 'Sydney', value: 25, percentage: 35, x: 355, y: 160 },
  { city: 'Singapore', value: 61, percentage: 85, x: 305, y: 115 },
];

function WorldMap({ onMarkerHover, hoveredLocation }) {
  return (
    <div className="relative w-full h-full">
      <img 
        src="https://customer-assets.emergentagent.com/job_pixel-dash-11/artifacts/ckuvvsw6_World%20Map%20%281%29.png"
        alt="World Map"
        className="w-full h-full object-contain opacity-60"
      />
      
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
        <g
          onMouseEnter={() => onMarkerHover(0)}
          onMouseLeave={() => onMarkerHover(null)}
          className="cursor-pointer"
        >
          <circle 
            cx="95" 
            cy="65" 
            r={hoveredLocation === 0 ? "7" : "5"} 
            fill="#1a1a2e"
            className="transition-all duration-200"
          />
          <circle 
            cx="95" 
            cy="65" 
            r={hoveredLocation === 0 ? "12" : "8"} 
            fill="none" 
            stroke="#1a1a2e" 
            strokeWidth="1.5" 
            opacity={hoveredLocation === 0 ? "0.6" : "0.4"}
            className="transition-all duration-200"
          />
        </g>
        
        <g
          onMouseEnter={() => onMarkerHover(1)}
          onMouseLeave={() => onMarkerHover(null)}
          className="cursor-pointer"
        >
          <circle 
            cx="55" 
            cy="72" 
            r={hoveredLocation === 1 ? "7" : "5"} 
            fill="#1a1a2e"
            className="transition-all duration-200"
          />
          <circle 
            cx="55" 
            cy="72" 
            r={hoveredLocation === 1 ? "12" : "8"} 
            fill="none" 
            stroke="#1a1a2e" 
            strokeWidth="1.5" 
            opacity={hoveredLocation === 1 ? "0.6" : "0.4"}
            className="transition-all duration-200"
          />
        </g>
        
        <g
          onMouseEnter={() => onMarkerHover(3)}
          onMouseLeave={() => onMarkerHover(null)}
          className="cursor-pointer"
        >
          <circle 
            cx="305" 
            cy="115" 
            r={hoveredLocation === 3 ? "7" : "5"} 
            fill="#1a1a2e"
            className="transition-all duration-200"
          />
          <circle 
            cx="305" 
            cy="115" 
            r={hoveredLocation === 3 ? "12" : "8"} 
            fill="none" 
            stroke="#1a1a2e" 
            strokeWidth="1.5" 
            opacity={hoveredLocation === 3 ? "0.6" : "0.4"}
            className="transition-all duration-200"
          />
        </g>
        
        <g
          onMouseEnter={() => onMarkerHover(2)}
          onMouseLeave={() => onMarkerHover(null)}
          className="cursor-pointer"
        >
          <circle 
            cx="355" 
            cy="160" 
            r={hoveredLocation === 2 ? "7" : "5"} 
            fill="#1a1a2e"
            className="transition-all duration-200"
          />
          <circle 
            cx="355" 
            cy="160" 
            r={hoveredLocation === 2 ? "12" : "8"} 
            fill="none" 
            stroke="#1a1a2e" 
            strokeWidth="1.5" 
            opacity={hoveredLocation === 2 ? "0.6" : "0.4"}
            className="transition-all duration-200"
          />
        </g>
      </svg>
    </div>
  );
}

export const RevenueByLocation = memo(() => {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex-1 flex flex-col min-h-0"
    >
      <Card className="p-4 md:p-5 bg-card rounded-xl flex flex-col flex-1 min-h-0">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex-shrink-0">Revenue by Location</h3>
        
        <div className="h-[80px] md:h-[100px] mb-5 flex-shrink-0 relative">
          <WorldMap onMarkerHover={setHoveredLocation} hoveredLocation={hoveredLocation} />
          
          <AnimatePresence>
            {hoveredLocation !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 px-3 py-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: '#404040',
                  left: `${(locations[hoveredLocation].x / 400) * 100}%`,
                  top: `${(locations[hoveredLocation].y / 200) * 100}%`,
                  transform: 'translate(-50%, -120%)',
                  pointerEvents: 'none',
                }}
              >
                <p className="text-sm font-medium text-white">{locations[hoveredLocation].city}</p>
                <p className="text-lg font-bold text-white">{locations[hoveredLocation].value}K</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      <div className="space-y-4 flex-1 min-h-0">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{location.city}</span>
              <span className="text-sm font-medium text-foreground">{location.value}K</span>
            </div>
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${location.percentage}%` }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="h-full rounded-full"
                style={{ backgroundColor: '#A8C5DA' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      </Card>
    </motion.div>
  );
});

RevenueByLocation.displayName = 'RevenueByLocation';
