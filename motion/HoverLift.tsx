'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

export function HoverLift({ children, className }: HoverLiftProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      whileHover={{
        y: -motionTokens.distance.xs,
        transition: {
          duration: motionTokens.duration.fast,
          ease: motionTokens.easing.standard,
        },
      }}
      whileFocusWithin={{
        y: -motionTokens.distance.xs,
        transition: {
          duration: motionTokens.duration.fast,
          ease: motionTokens.easing.standard,
        },
      }}
    >
      {children}
    </motion.span>
  );
}
