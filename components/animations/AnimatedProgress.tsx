import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  height?: string;
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  color?: string;
  animated?: boolean;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max = 100,
  className = '',
  barClassName = '',
  height = 'h-2',
  showLabel = false,
  labelPosition = 'outside',
  color = 'bg-blue-500',
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={`relative ${className}`}>
      {showLabel && labelPosition === 'outside' && (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{value}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <motion.div
          className={`${height} ${color} rounded-full ${barClassName}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 1 : 0,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2
          }}
        >
          {showLabel && labelPosition === 'inside' && percentage > 15 && (
            <span className="text-[10px] text-white font-medium px-2">
              {percentage.toFixed(0)}%
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedProgress;
