/**
 * CSP and security headers allowlist configuration.
 *
 * Add third-party domains here when integrating external services.
 * Keep this list minimal — only add domains you actively use.
 */
export const cspConfig = {
  /** Domains allowed to serve scripts */
  scriptSrc: [
    "'self'",
    // Cloudflare Turnstile
    'https://challenges.cloudflare.com',
    // Sentry browser SDK
    'https://browser.sentry-cdn.com',
  ],

  /** Domains allowed for styles */
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind/Next.js inline styles
  ],

  /** Domains allowed for images */
  imgSrc: [
    "'self'",
    'data:',
    'blob:',
  ],

  /** Domains allowed for fonts */
  fontSrc: [
    "'self'",
  ],

  /** Domains allowed for fetch/XHR/WebSocket */
  connectSrc: [
    "'self'",
    // Cloudflare Turnstile verification
    'https://challenges.cloudflare.com',
    // Sentry error reporting and performance data
    'https://*.ingest.sentry.io',
  ],

  /** Worker sources (Sentry uses a web worker for session replay) */
  workerSrc: [
    "'self'",
    'blob:',
  ],

  /** Domains allowed to frame this site (embedding) */
  frameSrc: [
    // Cloudflare Turnstile widget
    'https://challenges.cloudflare.com',
  ],

  /** Domains allowed as form action targets */
  formAction: [
    "'self'",
  ],

  /** Base URI restriction */
  baseUri: [
    "'self'",
  ],
} as const;

/**
 * Build the full Content-Security-Policy header value.
 */
export function buildCsp(): string {
  const directives = [
    `default-src 'self'`,
    `script-src ${cspConfig.scriptSrc.join(' ')}`,
    `style-src ${cspConfig.styleSrc.join(' ')}`,
    `img-src ${cspConfig.imgSrc.join(' ')}`,
    `font-src ${cspConfig.fontSrc.join(' ')}`,
    `connect-src ${cspConfig.connectSrc.join(' ')}`,
    `frame-src ${cspConfig.frameSrc.join(' ')}`,
    `worker-src ${cspConfig.workerSrc.join(' ')}`,
    `form-action ${cspConfig.formAction.join(' ')}`,
    `base-uri ${cspConfig.baseUri.join(' ')}`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ];

  return directives.join('; ');
}

/**
 * All security response headers applied to every request.
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': buildCsp(),
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self)',
    'X-DNS-Prefetch-Control': 'on',
  };
}
