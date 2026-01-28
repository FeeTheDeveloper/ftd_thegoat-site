'use client';

import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { reducedMotion, staggerContainer } from './variants';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  variant?: Variants;
}

export function Stagger({
  children,
  className,
  variant = staggerContainer,
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariants = shouldReduceMotion ? reducedMotion : variant;

  return (
    <motion.div
      className={className}
      variants={activeVariants}
      initial={shouldReduceMotion ? 'show' : 'hidden'}
      whileInView={'show'}
      viewport={{ once: true, amount: motionTokens.viewport.amount }}
    >
      {children}
    </motion.div>
  );
}
