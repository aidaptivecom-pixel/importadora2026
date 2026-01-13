// ============ ANIMATION VARIANTS ============
// Variantes de animación reutilizables para Framer Motion

import { Variants, Transition } from 'framer-motion';

// ============ TRANSITIONS ============
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3
};

export const fastTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2
};

export const slowTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.5
};

// ============ PAGE TRANSITIONS ============
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

export const pageSlideVariants: Variants = {
  initial: {
    opacity: 0,
    x: 30
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// ============ CARD ANIMATIONS ============
export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: fastTransition
  },
  hover: {
    y: -4,
    boxShadow: '0 12px 40px -8px rgba(0, 0, 0, 0.15)',
    transition: springTransition
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const kpiCardVariants: Variants = {
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
    boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.25)',
    transition: springTransition
  }
};

// ============ LIST/STAGGER ANIMATIONS ============
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    x: -10
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: smoothTransition
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: fastTransition
  }
};

export const tableRowVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut'
    }
  }),
  hover: {
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    x: 4,
    transition: { duration: 0.2 }
  }
};

// ============ MODAL ANIMATIONS ============
export const modalOverlayVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

export const modalContentVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 50
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  }
};

// ============ SIDEBAR ANIMATIONS ============
export const sidebarItemVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3
    }
  }),
  hover: {
    x: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    transition: { duration: 0.2 }
  },
  active: {
    x: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  }
};

export const sidebarBadgeVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      delay: 0.2
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

// ============ BUTTON ANIMATIONS ============
export const buttonVariants: Variants = {
  initial: {
    scale: 1
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 4px 20px -4px rgba(59, 130, 246, 0.4)',
    transition: springTransition
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const iconButtonVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: springTransition
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 }
  }
};

// ============ DROPDOWN/POPOVER ANIMATIONS ============
export const dropdownVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// ============ NOTIFICATION/TOAST ANIMATIONS ============
export const notificationVariants: Variants = {
  initial: {
    opacity: 0,
    y: -50,
    x: 50,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: springTransition
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.3 }
  }
};

// ============ SKELETON/LOADING ANIMATIONS ============
export const skeletonVariants: Variants = {
  initial: {
    opacity: 0.5
  },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ============ COUNTER ANIMATION ============
export const counterVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// ============ KANBAN CARD ANIMATIONS ============
export const kanbanCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    rotateX: -10
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }),
  hover: {
    y: -8,
    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)',
    transition: springTransition
  },
  dragging: {
    scale: 1.05,
    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
    zIndex: 100
  }
};

// ============ CHART ANIMATIONS ============
export const chartVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2
    }
  }
};

// ============ PROGRESS BAR ANIMATION ============
export const progressVariants: Variants = {
  initial: {
    width: 0
  },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.3
    }
  })
};
