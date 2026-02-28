/**
 * Sentry server-side configuration.
 *
 * This file configures Sentry for the Node.js server runtime.
 * Uses SENTRY_DSN (server-only, no NEXT_PUBLIC_ prefix needed here).
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || '',

  enabled: !!SENTRY_DSN,

  environment:
    process.env.SENTRY_ENVIRONMENT ||
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
    process.env.NODE_ENV ||
    'development',

  release: process.env.VERCEL_GIT_COMMIT_SHA || undefined,

  // Performance monitoring
  tracesSampleRate:
    process.env.NODE_ENV === 'production'
      ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1')
      : 1.0,

  // Privacy: do NOT send PII or request bodies
  sendDefaultPii: false,

  // Tag every event with the Vercel deployment URL
  initialScope: {
    tags: {
      'vercel.url': process.env.VERCEL_URL || 'localhost',
      'vercel.env': process.env.VERCEL_ENV || 'development',
    },
  },

  beforeSend(event) {
    // Never send request bodies
    if (event.request) {
      delete event.request.data;
      delete event.request.cookies;
    }
    return event;
  },
});
