import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1000;
const MAX_TOTAL_CHARS = 6000;
const MAX_BODY_BYTES = 12000;
const COOLDOWN_MS = 15000;

const SYSTEM_PROMPT = `You are Fee The Developer’s assistant concierge. Voice: confident, concise, executive. High-trust guidance.
Goals:
- Answer clearly and quickly.
- Qualify scope, timeline, and budget band.
- Ask one question at a time.
- When qualified, route to “Request Access / Engagement” and ask for email + timeline in a single sentence.
Avoid: begging, discounting, or “hire me” language.`;

const rateLimitByIp = new Map<string, number>();

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

function validateMessages(messages: unknown): ChatMessage[] | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  if (messages.length > MAX_MESSAGES) {
    return null;
  }

  let totalChars = 0;
  const cleaned: ChatMessage[] = [];

  for (const message of messages) {
    if (
      !message ||
      typeof message !== 'object' ||
      !('role' in message) ||
      !('content' in message)
    ) {
      return null;
    }

    const role = message.role;
    const content = message.content;

    if (
      (role !== 'user' && role !== 'assistant' && role !== 'system') ||
      typeof content !== 'string'
    ) {
      return null;
    }

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_CONTENT_LENGTH) {
      return null;
    }

    totalChars += trimmed.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      return null;
    }

    cleaned.push({ role, content: trimmed });
  }

  return cleaned;
}

export async function POST(request: Request) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  const ipHeader =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const clientIp = ipHeader.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const lastSeen = rateLimitByIp.get(clientIp);
  if (lastSeen && now - lastSeen < COOLDOWN_MS) {
    const retryAfter = Math.ceil((COOLDOWN_MS - (now - lastSeen)) / 1000);
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }
  rateLimitByIp.set(clientIp, now);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Server is missing OpenAI credentials.' },
      { status: 500 }
    );
  }

  let payload: { messages?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const messages = validateMessages(payload.messages);
  if (!messages) {
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

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to reach OpenAI.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
