export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
    page: 0.5,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1],
    emphasized: [0.4, 0, 0.2, 1],
  },
  distance: {
    small: 12,
    medium: 20,
    large: 32,
  },
  scale: {
    enter: 0.96,
    hover: 1.02,
    press: 0.98,
  },
  hover: {
    lift: 4,
  },
  stagger: {
    base: 0.08,
  },
  viewport: {
    amount: 0.3,
    margin: '0px 0px -10% 0px',
  },
} as const;
