/**
 * Cloudflare Turnstile server-side verification.
 *
 * Call verifyTurnstile() in API routes that accept form submissions.
 * Returns true if the token is valid, false otherwise.
 *
 * Turnstile docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * @param token - The cf-turnstile-response token from the client
 * @param remoteIp - The client's IP address (optional but recommended)
 * @returns true if verification succeeds
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured, skip verification (development mode)
  // In production, TURNSTILE_SECRET_KEY should always be set
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        'TURNSTILE_SECRET_KEY is not configured in production — rejecting request'
      );
      return false;
    }
    console.warn('TURNSTILE_SECRET_KEY not set — skipping Turnstile verification (dev mode)');
    return true;
  }

  if (!token || typeof token !== 'string' || token.length > 2048) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.set('remoteip', remoteIp);
    }

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!res.ok) {
      console.error(`Turnstile verification HTTP error: ${res.status}`);
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.warn('Turnstile verification failed:', data['error-codes']);
    }

    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}
