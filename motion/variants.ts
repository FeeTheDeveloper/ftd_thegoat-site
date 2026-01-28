import type { Variants } from 'framer-motion';
import { motionTokens } from './tokens';

const transition = (reduced: boolean, duration: number) => ({
  duration: reduced ? 0 : duration,
  ease: motionTokens.easing.standard,
});

export const createFadeUp = (reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : motionTokens.distance.medium,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: transition(reduced, motionTokens.duration.base),
  },
});

export const createFadeIn = (reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: transition(reduced, motionTokens.duration.fast),
  },
});

export const createScaleIn = (reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
    scale: reduced ? 1 : motionTokens.scale.enter,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: transition(reduced, motionTokens.duration.base),
  },
});

export const createStaggerContainer = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduced ? 0 : motionTokens.stagger.base,
      delayChildren: reduced ? 0 : motionTokens.duration.fast,
    },
  },
});
