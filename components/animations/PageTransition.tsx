import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '../../utils/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey, className = '' }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
