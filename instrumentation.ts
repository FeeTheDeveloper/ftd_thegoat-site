/**
 * Next.js instrumentation hook.
 *
 * This file is loaded by Next.js to initialize monitoring before any
 * request handling occurs. It imports the appropriate Sentry config
 * based on the runtime (Node.js server or Edge).
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = async (...args: unknown[]) => {
  // Dynamically import to avoid bundling Sentry in runtimes where it's not needed
  const Sentry = await import('@sentry/nextjs');
  // @ts-expect-error — Sentry types may not match the Next.js onRequestError signature exactly
  return Sentry.captureRequestError(...args);
};
