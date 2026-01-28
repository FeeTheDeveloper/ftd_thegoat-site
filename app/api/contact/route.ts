import { NextResponse } from 'next/server';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_FIELD_LENGTH = 200;
const COOLDOWN_MS = 30_000;

const cooldownByIp = new Map<string, number>();

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  budget: string;
  timeline: string;
  message: string;
  pageUrl: string;
  userAgent: string;
  createdAt: string;
};

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
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

async function readBody(request: Request) {
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
      return Object.fromEntries(form.entries());
    } catch {
      return null;
    }
  }

  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const lastSeen = cooldownByIp.get(ip);
  if (lastSeen && Date.now() - lastSeen < COOLDOWN_MS) {
    return NextResponse.json(
      { error: 'Please wait before sending another request.' },
      { status: 429 }
    );
  }

  const body = await readBody(request);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  const name = cleanString((body as Record<string, unknown>).name, MAX_FIELD_LENGTH);
  const email = cleanString((body as Record<string, unknown>).email, MAX_FIELD_LENGTH);
  const company = cleanString(
    (body as Record<string, unknown>).company,
    MAX_FIELD_LENGTH
  );
  const budget = cleanString(
    (body as Record<string, unknown>).budget ??
      (body as Record<string, unknown>).engagement,
    MAX_FIELD_LENGTH
  );
  const timeline = cleanString(
    (body as Record<string, unknown>).timeline,
    MAX_FIELD_LENGTH
  );
  const message = cleanString(
    (body as Record<string, unknown>).message ??
      (body as Record<string, unknown>).outcomes,
    MAX_MESSAGE_LENGTH
  );

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email is invalid.' }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  cooldownByIp.set(ip, Date.now());

  const pageUrl = cleanString(
    (body as Record<string, unknown>).pageUrl ?? request.headers.get('referer'),
    500
  );
  const userAgent = cleanString(request.headers.get('user-agent'), 500);

  const payload: ContactPayload = {
    name,
    email,
    company,
    budget,
    timeline,
    message,
    pageUrl,
    userAgent,
    createdAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.POWER_AUTOMATE_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('POWER_AUTOMATE_LEAD_WEBHOOK_URL is not configured.');
    return NextResponse.json({ success: true });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook failed.';
    console.error(`Contact webhook error: ${message}`);
  }

  return NextResponse.json({ success: true });
}
