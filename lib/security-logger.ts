/**
 * Structured request logger for security-relevant events.
 *
 * Logs authentication events, admin actions, rate-limit hits, and errors.
 * No PII (names, emails, etc.) is included in logs.
 *
 * In production, logs go to Vercel's runtime logs and can be forwarded
 * to external providers via Vercel Log Drains.
 */

type LogLevel = 'info' | 'warn' | 'error';

interface SecurityLogEntry {
  level: LogLevel;
  event: string;
  path: string;
  method: string;
  ip: string;
  userAgent?: string;
  statusCode?: number;
  /** Additional structured context (no PII) */
  meta?: Record<string, string | number | boolean>;
  timestamp: string;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function buildEntry(
  level: LogLevel,
  event: string,
  request: Request,
  meta?: Record<string, string | number | boolean>
): SecurityLogEntry {
  const url = new URL(request.url);
  return {
    level,
    event,
    path: url.pathname,
    method: request.method,
    ip: getClientIp(request),
    userAgent: request.headers.get('user-agent')?.slice(0, 200) || undefined,
    meta,
    timestamp: new Date().toISOString(),
  };
}

function emit(entry: SecurityLogEntry): void {
  const line = JSON.stringify(entry);
  switch (entry.level) {
    case 'error':
      console.error(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    default:
      console.log(line);
  }
}

/**
 * Log a security-relevant event.
 */
export function logSecurityEvent(
  level: LogLevel,
  event: string,
  request: Request,
  meta?: Record<string, string | number | boolean>
): void {
  emit(buildEntry(level, event, request, meta));
}

/**
 * Pre-built event loggers for common security events.
 */
export const securityLog = {
  /** Rate limit triggered */
  rateLimited(request: Request, endpoint: string): void {
    logSecurityEvent('warn', 'rate_limited', request, { endpoint });
  },

  /** Turnstile verification failed */
  turnstileFailed(request: Request): void {
    logSecurityEvent('warn', 'turnstile_verification_failed', request);
  },

  /** Invalid input / validation failure */
  validationFailed(request: Request, reason: string): void {
    logSecurityEvent('warn', 'validation_failed', request, { reason });
  },

  /** Successful form submission (no PII) */
  contactSubmitted(request: Request): void {
    logSecurityEvent('info', 'contact_form_submitted', request);
  },

  /** Chat message processed */
  chatProcessed(request: Request, tokenCount?: number): void {
    logSecurityEvent('info', 'chat_message_processed', request, {
      ...(tokenCount !== undefined ? { tokenCount } : {}),
    });
  },

  /** Webhook delivery failure */
  webhookFailed(request: Request, error: string): void {
    logSecurityEvent('error', 'webhook_delivery_failed', request, {
      error: error.slice(0, 200),
    });
  },

  /** Auth event (for future use) */
  authAttempt(request: Request, success: boolean): void {
    logSecurityEvent(success ? 'info' : 'warn', 'auth_attempt', request, {
      success,
    });
  },

  /** Admin action (for future use) */
  adminAction(request: Request, action: string): void {
    logSecurityEvent('info', 'admin_action', request, { action });
  },

  /** Suspicious activity detected */
  suspicious(request: Request, reason: string): void {
    logSecurityEvent('warn', 'suspicious_activity', request, {
      reason: reason.slice(0, 200),
    });
  },
};
