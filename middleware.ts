import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders } from './lib/security-headers';

/**
 * Next.js middleware — runs on every request.
 *
 * Responsibilities:
 * 1. Attach security headers to all responses
 * 2. Block HTTP methods that shouldn't reach the app
 */

const ALLOWED_METHODS = new Set([
  'GET',
  'POST',
  'HEAD',
  'OPTIONS',
]);

export function middleware(request: NextRequest) {
  // Block unexpected HTTP methods
  if (!ALLOWED_METHODS.has(request.method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  const response = NextResponse.next();

  // Apply security headers to every response
  const securityHeaders = getSecurityHeaders();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and Next.js internals.
     * This ensures security headers are applied to pages AND API routes.
     */
    '/((?!_next/static|_next/image|favicon\\.ico|brand/).*)',
  ],
};
