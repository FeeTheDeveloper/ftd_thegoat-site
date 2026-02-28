/**
 * Sentry client-side configuration.
 *
 * This file configures Sentry for the browser runtime.
 * Only NEXT_PUBLIC_SENTRY_DSN is exposed to the client — no auth tokens.
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || '',

  enabled: !!SENTRY_DSN,

  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
    process.env.NODE_ENV ||
    'development',

  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,

  // Performance monitoring
  tracesSampleRate:
    process.env.NODE_ENV === 'production'
      ? parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1')
      : 1.0,

  // Privacy: do NOT send PII by default
  sendDefaultPii: false,

  // Replay (optional — keep sample rate low to avoid cost)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Do not capture request bodies
  maxValueLength: 1024,

  // Filter noisy browser errors
  ignoreErrors: [
    // Browser extensions / bot noise
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Non-Error promise rejection captured',
    /^Loading chunk \d+ failed/,
    /^Loading CSS chunk \d+ failed/,
  ],

  beforeSend(event) {
    // Strip any accidentally captured PII from breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
        if (breadcrumb.data?.url) {
          try {
            const url = new URL(breadcrumb.data.url);
            // Remove query params that may contain tokens
            url.search = '';
            breadcrumb.data.url = url.toString();
          } catch {
            // Not a valid URL, leave as-is
          }
        }
        return breadcrumb;
      });
    }
    return event;
  },

  integrations: [
    Sentry.browserTracingIntegration(),
  ],
});
