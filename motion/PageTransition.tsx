'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeIn, reducedMotion } from './variants';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariants = shouldReduceMotion ? reducedMotion : fadeIn;

  return (
    <motion.div
      className={className}
      variants={activeVariants}
      initial={shouldReduceMotion ? 'show' : 'hidden'}
      animate={'show'}
      exit={shouldReduceMotion ? undefined : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
