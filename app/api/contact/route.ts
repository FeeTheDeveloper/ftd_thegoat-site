import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createRateLimiter } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';
import { securityLog } from '@/lib/security-logger';
import { validateEnv } from '@/lib/env-check';

// Run env validation on first import (server-side only)
validateEnv();

// ---------------------------------------------------------------------------
// Rate limiter: 3 requests per 60 seconds per IP
// ---------------------------------------------------------------------------
const rateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 3,
  prefix: 'contact',
});

// ---------------------------------------------------------------------------
// Zod schema for contact form validation
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name is too long')
    .transform((v) => v.trim()),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(200, 'Email is too long')
    .email('Email is invalid')
    .transform((v) => v.trim().toLowerCase()),
  company: z
    .string()
    .max(200, 'Company name is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  engagement: z
    .string()
    .max(200, 'Engagement type is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  budget: z
    .string()
    .max(200, 'Budget is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  timeline: z
    .string()
    .max(200, 'Timeline is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  message: z
    .string()
    .max(2000, 'Message is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  outcomes: z
    .string()
    .max(2000, 'Outcomes is too long')
    .optional()
    .default('')
    .transform((v) => v.trim()),
  pageUrl: z
    .string()
    .max(500)
    .optional()
    .default(''),
  // Cloudflare Turnstile token
  'cf-turnstile-response': z
    .string()
    .max(2048)
    .optional()
    .default(''),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      return await request.json();
    } catch {
      return null;
    }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    try {
      const form = await request.formData();
      return Object.fromEntries(form.entries()) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // Rate limit check
  const rateResult = await rateLimiter.check(ip);
  if (!rateResult.allowed) {
    securityLog.rateLimited(request, '/api/contact');
    return NextResponse.json(
      { error: 'Please wait before sending another request.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateResult.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // Parse body
  const body = await readBody(request);
  if (!body || typeof body !== 'object') {
    securityLog.validationFailed(request, 'invalid_payload');
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  // Zod validation
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Invalid input.';
    securityLog.validationFailed(request, firstError);
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const data = parsed.data;

  // Combine message/outcomes (backwards-compatible with both field names)
  const messageBody = data.message || data.outcomes;
  if (!messageBody) {
    securityLog.validationFailed(request, 'message_required');
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  // Turnstile verification
  const turnstileToken = data['cf-turnstile-response'];
  const turnstileValid = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileValid) {
    securityLog.turnstileFailed(request);
    return NextResponse.json(
      { error: 'Bot verification failed. Please try again.' },
      { status: 403 }
    );
  }

  // Build webhook payload (no raw user input beyond validated fields)
  const pageUrl = data.pageUrl || request.headers.get('referer')?.slice(0, 500) || '';
  const userAgent = (request.headers.get('user-agent') || '').slice(0, 500);

  const payload = {
    name: data.name,
    email: data.email,
    company: data.company,
    budget: data.budget || data.engagement,
    timeline: data.timeline,
    message: messageBody,
    pageUrl,
    userAgent,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.POWER_AUTOMATE_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('POWER_AUTOMATE_LEAD_WEBHOOK_URL is not configured.');
    securityLog.contactSubmitted(request);
    return NextResponse.json({ success: true });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    securityLog.contactSubmitted(request);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Webhook failed.';
    securityLog.webhookFailed(request, errMsg);
  }

  return NextResponse.json({ success: true });
}
