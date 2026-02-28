'use client';

/**
 * Root error boundary for the App Router.
 *
 * Catches unhandled errors in routes and reports them to Sentry.
 * Shows a clean fallback UI — never exposes stack traces to users.
 */
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text flex items-center justify-center">
        <div className="max-w-md text-center px-6">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted mb-6">
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
