'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

export function HoverLift({ children, className }: HoverLiftProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -motionTokens.hover.lift,
              scale: motionTokens.scale.hover,
            }
      }
      whileTap={
        reducedMotion
          ? {}
          : {
              scale: motionTokens.scale.press,
            }
      }
      transition={{
        duration: reducedMotion ? 0 : motionTokens.duration.fast,
        ease: motionTokens.easing.standard,
      }}
    >
      {children}
    </motion.span>
  );
}
