import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../../utils/animations';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol';
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ 
  children, 
  className = '',
  as = 'div'
}) => {
  const Component = motion[as];
  
  return (
    <Component
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </Component>
  );
};

interface AnimatedListItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'li';
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({ 
  children, 
  className = '',
  onClick,
  as = 'div'
}) => {
  const Component = motion[as];
  
  return (
    <Component
      variants={staggerItemVariants}
      whileHover={{ x: 4, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </Component>
  );
};

export default AnimatedList;
