import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

/**
 * Sentry build-time configuration.
 *
 * Source maps are uploaded during production builds only.
 * SENTRY_AUTH_TOKEN, SENTRY_ORG, and SENTRY_PROJECT must be set as
 * Vercel environment variables (build-time only, never exposed to client).
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */
export default withSentryConfig(nextConfig, {
  // Upload source maps to Sentry for production builds only
  sourcemaps: {
    disable: process.env.NODE_ENV !== 'production',
    // Delete .map files after upload so they're never served publicly
    filesToDeleteAfterUpload: ['.next/static/**/*.map'],
  },

  // Suppress noisy build logs
  silent: !process.env.CI,

  // Org/project pulled from env vars — no hardcoded values
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Automatically tree-shake Sentry logger in production
  disableLogger: true,

  // Use VERCEL_GIT_COMMIT_SHA for release tagging
  release: {
    name: process.env.VERCEL_GIT_COMMIT_SHA,
  },

  // Automatically instrument server-side code
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  autoInstrumentAppDirectory: true,
});
