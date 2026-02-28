import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { createRateLimiter } from '@/lib/rate-limit';
import { securityLog } from '@/lib/security-logger';
import { validateEnv } from '@/lib/env-check';

// Run env validation on first import (server-side only)
validateEnv();

// ---------------------------------------------------------------------------
// Rate limiter: 10 requests per 60 seconds per IP
// ---------------------------------------------------------------------------
const rateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 10,
  prefix: 'chat',
});

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1000;
const MAX_TOTAL_CHARS = 6000;

const SYSTEM_PROMPT = `You are Fee The Developer’s concierge. Voice: confident, concise, executive, high-trust operator tone.
Goal: answer clearly, qualify the engagement, and drive a decisive next step.
Rules:
- Ask at most ONE question when qualifying; if you already have enough context, ask none.
- Default to action-oriented next steps: "Book Consultation" or "Engagement."
- If asked about pricing, give a range and list the key factors that move the range.
- No begging, no "hire me," no insecurity.`;

// Tone regression test (manual):
// 1) User: "What do you actually do?"
//    Expected: crisp capabilities overview, then one qualifying question or a direct next step.
// 2) User: "How much does a build like this cost?"
//    Expected: range + drivers (scope, timeline, integrations), then "Book Consultation" or "Engagement."
// 3) User: "We need this in two weeks. Can you do it?"
//    Expected: decisive feasibility framing, single clarifying question (only one), then next step.

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// ---------------------------------------------------------------------------
// Zod schema for chat messages
// ---------------------------------------------------------------------------
const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(MAX_CONTENT_LENGTH, `Message exceeds ${MAX_CONTENT_LENGTH} characters`)
    .transform((v) => v.trim()),
});

const chatPayloadSchema = z.object({
  messages: z
    .array(chatMessageSchema)
    .min(1, 'At least one message is required')
    .max(MAX_MESSAGES, `Maximum ${MAX_MESSAGES} messages allowed`),
});

function validateMessages(messages: ChatMessage[]): ChatMessage[] | null {
  let totalChars = 0;
  const cleaned: ChatMessage[] = [];

  for (const message of messages) {
    totalChars += message.content.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      return null;
    }
    cleaned.push({ role: message.role, content: message.content });
  }

  return cleaned;
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

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // Rate limit check
  const rateResult = await rateLimiter.check(ip);
  if (!rateResult.allowed) {
    securityLog.rateLimited(request, '/api/chat');
    return NextResponse.json(
      { error: 'Too many requests. Please wait before sending another message.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateResult.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Server is missing OpenAI credentials.' },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    securityLog.validationFailed(request, 'invalid_json');
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  // Zod validation
  const parsed = chatPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Invalid message payload.';
    securityLog.validationFailed(request, firstError);
    return NextResponse.json({ error: 'Invalid message payload.' }, { status: 400 });
  }

  // Additional total-chars validation
  const messages = validateMessages(parsed.data.messages);
  if (!messages) {
    securityLog.validationFailed(request, 'total_chars_exceeded');
    return NextResponse.json({ error: 'Invalid message payload.' }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.2,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'OpenAI did not return a response.' },
        { status: 502 }
      );
    }

    securityLog.chatProcessed(request);
    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to reach OpenAI.';
    securityLog.webhookFailed(request, `OpenAI error: ${message}`);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
