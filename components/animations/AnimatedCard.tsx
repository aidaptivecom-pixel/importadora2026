import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants, kpiCardVariants } from '../../utils/animations';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  variant?: 'default' | 'kpi' | 'kanban';
  className?: string;
  onClick?: () => void;
  layoutId?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  index = 0, 
  variant = 'default',
  className = '',
  onClick,
  layoutId
}) => {
  const variants = variant === 'kpi' ? kpiCardVariants : cardVariants;
  
  return (
    <motion.div
      layoutId={layoutId}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      custom={index}
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
