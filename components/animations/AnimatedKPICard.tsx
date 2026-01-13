import React from 'react';
import { motion, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedKPICardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  valueColor?: string;
  subtitle?: string;
  index?: number;
  onClick?: () => void;
  format?: 'number' | 'currency' | 'percent' | 'compact';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

const cardVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }),
  hover: {
    y: -6,
    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  tap: {
    scale: 0.98
  }
};

const AnimatedKPICard: React.FC<AnimatedKPICardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
  valueColor = 'text-slate-800',
  subtitle,
  index = 0,
  onClick,
  format = 'number',
  trend
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animated counter
  React.useEffect(() => {
    if (!isInView || typeof value !== 'number') return;
    
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(startValue + (endValue - startValue) * eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  const formatValue = (val: number): string => {
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
      case 'percent':
        return `${val.toFixed(1)}%`;
      case 'compact':
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
        return val.toFixed(0);
      default:
        return val.toLocaleString('es-AR', { maximumFractionDigits: 0 });
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-xl p-5 border border-slate-100 shadow-sm ${onClick ? 'cursor-pointer' : ''}`}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover={onClick ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      custom={index}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div 
          className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center ${iconColor}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Icon size={20} />
        </motion.div>
        <span className="text-sm font-medium text-slate-500">{title}</span>
      </div>
      
      <div className="flex items-baseline gap-2">
        <motion.p 
          className={`text-2xl font-bold ${valueColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {prefix}
          {typeof value === 'number' ? formatValue(displayValue) : value}
          {suffix}
        </motion.p>
        
        {trend && (
          <motion.span 
            className={`text-xs font-medium flex items-center gap-0.5 ${
              trend.direction === 'up' ? 'text-emerald-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {trend.direction === 'up' ? '↑' : '↓'}
            {trend.value}%
          </motion.span>
        )}
      </div>
      
      {subtitle && (
        <motion.p 
          className="text-xs text-slate-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

// Grid wrapper for multiple KPIs with stagger effect
interface AnimatedKPIGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export const AnimatedKPIGrid: React.FC<AnimatedKPIGridProps> = ({ 
  children, 
  columns = 4,
  className = ''
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'
  };

  return (
    <motion.div 
      className={`grid ${gridCols[columns]} gap-4 ${className}`}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedKPICard;
