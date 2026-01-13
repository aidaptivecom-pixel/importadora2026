import React from 'react';
import { motion, Variants, useInView } from 'framer-motion';

// ============ ANIMATED SECTION ============
// Wrapper component for animating sections on scroll/mount

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  stagger?: boolean;
  staggerDelay?: number;
  once?: boolean;
}

const animationVariants: Record<string, Variants> = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 }
  },
  none: {
    initial: {},
    animate: {}
  }
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fadeUp',
  stagger = false,
  staggerDelay = 0.1,
  once = true
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  
  const variants = animationVariants[animation];

  const containerVariants: Variants = stagger ? {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  } : {
    ...variants,
    animate: {
      ...variants.animate,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      {stagger ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={variants}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

// ============ ANIMATED GROUP ============
// For animating a group of elements with stagger

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
}

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  animation = 'fadeUp'
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============ ANIMATED ITEM ============
// Individual animated item for use within loops

interface AnimatedItemProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  onClick?: () => void;
  whileHover?: 'lift' | 'scale' | 'glow' | 'none';
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  index = 0,
  className = '',
  animation = 'fadeUp',
  onClick,
  whileHover = 'lift'
}) => {
  const variants = animationVariants[animation];

  const hoverVariants = {
    lift: { y: -4, boxShadow: '0 12px 40px -8px rgba(0, 0, 0, 0.15)' },
    scale: { scale: 1.02 },
    glow: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
    none: {}
  };

  return (
    <motion.div
      className={className}
      variants={{
        initial: variants.initial,
        animate: {
          ...variants.animate,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: index * 0.08
          }
        }
      }}
      initial="initial"
      animate="animate"
      whileHover={whileHover !== 'none' ? hoverVariants[whileHover] : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

// ============ FADE IN ON SCROLL ============
// Simple fade in when element enters viewport

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
