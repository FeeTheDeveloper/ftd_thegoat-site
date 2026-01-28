'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { createFadeIn } from './variants';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const reducedMotion = useReducedMotion();
  const variants = createFadeIn(reducedMotion);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{
        duration: reducedMotion ? 0 : motionTokens.duration.page,
        ease: motionTokens.easing.emphasized,
      }}
    >
      {children}
    </motion.div>
  );
}
