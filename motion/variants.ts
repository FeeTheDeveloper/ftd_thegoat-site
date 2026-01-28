import type { Variants } from 'framer-motion';
import { motionTokens } from './tokens';

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: motionTokens.distance.sm,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.easing.standard,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.easing.standard,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: motionTokens.scale.subtle,
  },
  show: {
    opacity: 1,
    scale: motionTokens.scale.full,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.easing.standard,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: motionTokens.stagger.children,
      delayChildren: motionTokens.stagger.delay,
    },
  },
};

export const reducedMotion: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
    scale: motionTokens.scale.full,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: motionTokens.scale.full,
  },
};
