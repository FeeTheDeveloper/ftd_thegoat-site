'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './tokens';
import { createFadeIn, createFadeUp, createScaleIn } from './variants';

const variantMap = {
  fadeUp: createFadeUp,
  fadeIn: createFadeIn,
  scaleIn: createScaleIn,
};

type VariantName = keyof typeof variantMap;

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: VariantName;
  useParent?: boolean;
}

export function Reveal({
  children,
  className,
  variant = 'fadeUp',
  useParent = false,
}: RevealProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const variants = variantMap[variant](reducedMotion);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={useParent ? undefined : 'hidden'}
      whileInView={useParent ? undefined : 'show'}
      viewport={useParent ? undefined : motionTokens.viewport}
    >
      {children}
    </motion.div>
  );
}
