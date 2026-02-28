/**
 * Sentry Edge runtime configuration.
 *
 * Used by middleware and any API routes running on the edge runtime.
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

  tracesSampleRate:
    process.env.NODE_ENV === 'production'
      ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1')
      : 1.0,

  sendDefaultPii: false,
});
