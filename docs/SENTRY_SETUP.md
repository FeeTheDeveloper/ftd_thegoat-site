# Sentry Setup Guide

> Integration guide for Sentry error monitoring and performance tracking on Vercel.

## Table of Contents

- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [Vercel Setup Steps](#vercel-setup-steps)
- [How It Works](#how-it-works)
- [Verify Events](#verify-events)
- [Test Error Reporting](#test-error-reporting)
- [Disable Temporarily](#disable-temporarily)
- [Performance Tuning](#performance-tuning)
- [Go-Live Verification Steps](#go-live-verification-steps)

---

## Overview

This project uses `@sentry/nextjs` for:

- **Error tracking** — automatically captures unhandled errors on client and server
- **Performance monitoring** — traces requests with configurable sample rates
- **Release tracking** — ties errors to specific Git commits via `VERCEL_GIT_COMMIT_SHA`
- **Source maps** — uploaded at build time for readable stack traces (never exposed publicly)

## Environment Variables

### Required for Production

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | Client + Server | Sentry Data Source Name (safe to expose) |
| `SENTRY_DSN` | Server only | Server-side DSN (optional if `NEXT_PUBLIC_SENTRY_DSN` is set) |
| `SENTRY_AUTH_TOKEN` | **Build-time only** | Uploads source maps. **Never expose to client.** |
| `SENTRY_ORG` | Build-time | Your Sentry organization slug |
| `SENTRY_PROJECT` | Build-time | Your Sentry project slug |

### Optional

| Variable | Default | Purpose |
|---|---|---|
| `SENTRY_ENVIRONMENT` | `NODE_ENV` | Override environment tag (production/preview/development) |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | `NODE_ENV` | Client-side environment tag |
| `SENTRY_TRACES_SAMPLE_RATE` | `0.1` | Server-side performance sample rate (0.0 - 1.0) |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | `0.1` | Client-side performance sample rate |

## Vercel Setup Steps

1. **Go to** your Vercel project → Settings → Environment Variables.

2. **Add these variables** for the **Production** environment:

   ```text
   NEXT_PUBLIC_SENTRY_DSN    = https://xxx@xxx.ingest.sentry.io/xxx
   SENTRY_AUTH_TOKEN          = sntrys_xxx  (Sensitive — check "Sensitive" box)
   SENTRY_ORG                 = your-org-slug
   SENTRY_PROJECT             = your-project-slug
   SENTRY_ENVIRONMENT         = production
   ```

3. **For Preview** deployments, you can either:
   - Use the same DSN with `SENTRY_ENVIRONMENT=preview`
   - Or leave DSN unset to disable Sentry in previews

4. **SENTRY_AUTH_TOKEN** must be:
   - Set as **Sensitive** in Vercel (hidden after save)
   - Scoped to `project:releases` and `org:read` permissions only
   - **Never** prefixed with `NEXT_PUBLIC_`

5. Redeploy after adding variables.

## How It Works

| File | Purpose |
|---|---|
| `sentry.client.config.ts` | Initializes Sentry in the browser |
| `sentry.server.config.ts` | Initializes Sentry in Node.js server |
| `sentry.edge.config.ts` | Initializes Sentry in Edge runtime (middleware) |
| `instrumentation.ts` | Next.js hook that loads the correct config per runtime |
| `next.config.ts` | Wraps config with `withSentryConfig` for source map upload |
| `app/error.tsx` | Route-level error boundary (reports to Sentry) |
| `app/global-error.tsx` | Root error boundary (reports to Sentry) |

## Verify Events

After deploying with Sentry configured:

1. Open your Sentry dashboard → select the project
2. Navigate to **Issues** — you should see a test event within minutes
3. Check **Performance** → **Transactions** for request traces
4. Verify **Releases** shows your latest `VERCEL_GIT_COMMIT_SHA`

## Test Error Reporting

To test that Sentry is working, you can temporarily add a test route:

```typescript
// app/api/sentry-test/route.ts (REMOVE AFTER TESTING)
export function GET() {
  throw new Error('Sentry test error — remove this route after verifying');
}
```

Then visit `/api/sentry-test` and check your Sentry dashboard for the error.

**Important:** Remove the test route after verifying.

## Disable Temporarily

To disable Sentry without removing the code:

1. **Remove `NEXT_PUBLIC_SENTRY_DSN`** from Vercel environment variables
2. Redeploy

Sentry initializes with `enabled: !!SENTRY_DSN`, so without a DSN, all Sentry calls become no-ops with zero overhead.

To disable source map uploads only, remove `SENTRY_AUTH_TOKEN`.

## Performance Tuning

### Sample Rates

| Environment | `tracesSampleRate` | Recommendation |
|---|---|---|
| Development | `1.0` (hardcoded) | Capture everything for debugging |
| Production | `0.1` (default) | 10% of transactions — good starting point |
| High traffic | `0.01` - `0.05` | Reduce if hitting Sentry quotas |

Adjust via environment variable:

```text
SENTRY_TRACES_SAMPLE_RATE=0.05
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.05
```

### Cost Optimization

- **Replay** is disabled by default (`replaysSessionSampleRate: 0`)
- **Error replays** are also disabled (`replaysOnErrorSampleRate: 0`)
- Enable selectively if needed for debugging:
  ```text
  # In sentry.client.config.ts, change:
  replaysOnErrorSampleRate: 1.0  # Capture replay only on errors
  ```

### Filtering Noise

The client config already filters common browser noise:
- `ResizeObserver` errors (browser extension artifacts)
- Chunk loading failures (network issues)
- Non-Error promise rejections

Add additional `ignoreErrors` patterns in `sentry.client.config.ts` as needed.

## Go-Live Verification Steps

- [ ] `NEXT_PUBLIC_SENTRY_DSN` is set in Vercel Production environment
- [ ] `SENTRY_AUTH_TOKEN` is set as **Sensitive** in Vercel (build-time only)
- [ ] `SENTRY_ORG` and `SENTRY_PROJECT` are set in Vercel
- [ ] Deploy succeeds — check Vercel build logs for "Sentry source maps upload"
- [ ] Visit the live site and check Sentry dashboard for a session/pageview event
- [ ] Trigger a test error and confirm it appears in Sentry Issues
- [ ] Verify stack traces show readable source (source maps working)
- [ ] Confirm `SENTRY_AUTH_TOKEN` is NOT in any `NEXT_PUBLIC_*` variable
- [ ] Confirm source maps are NOT publicly accessible (try `/_next/static/*.map` — should 404)
- [ ] Performance transactions appear in Sentry Performance tab
