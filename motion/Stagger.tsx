'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { createStaggerContainer } from './variants';

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  const reducedMotion = useReducedMotion();
  const variants = createStaggerContainer(reducedMotion);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={motionTokens.viewport}
    >
      {children}
    </motion.div>
  );
}
