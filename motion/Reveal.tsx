'use client';

import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { fadeUp, reducedMotion } from './variants';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  isChild?: boolean;
}

export function Reveal({
  children,
  className,
  variant = fadeUp,
  isChild = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeVariants = shouldReduceMotion ? reducedMotion : variant;

  return (
    <motion.div
      className={className}
      variants={activeVariants}
      initial={isChild ? undefined : shouldReduceMotion ? 'show' : 'hidden'}
      whileInView={isChild ? undefined : 'show'}
      viewport={
        isChild
          ? undefined
          : { once: true, amount: motionTokens.viewport.amount }
      }
    >
      {children}
    </motion.div>
  );
}
