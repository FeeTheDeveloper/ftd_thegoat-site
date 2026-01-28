import { NextResponse } from 'next/server';

const MAX_BODY_BYTES = 4000;

type ContactPayload = {
  email?: string;
  timeline?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const email = payload.email?.trim() ?? '';
  const timeline = payload.timeline?.trim() ?? '';

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }

  if (!timeline) {
    return NextResponse.json(
      { error: 'Timeline is required.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
