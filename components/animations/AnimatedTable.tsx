import React from 'react';
import { motion } from 'framer-motion';
import { tableRowVariants, staggerContainerVariants } from '../../utils/animations';

interface AnimatedTableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTableBody: React.FC<AnimatedTableBodyProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <motion.tbody
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.tbody>
  );
};

interface AnimatedTableRowProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  onClick?: () => void;
}

export const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({ 
  children, 
  index,
  className = '',
  onClick
}) => {
  return (
    <motion.tr
      variants={tableRowVariants}
      custom={index}
      whileHover="hover"
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.tr>
  );
};
