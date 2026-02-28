'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

interface ContactSectionProps {
  content: SiteContent['contact'];
  primaryCta: SiteContent['site']['primaryCta'];
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection({ content, primaryCta }: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState('');

  // Load Turnstile widget
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || typeof window === 'undefined') return;

    // Check if script already loaded
    if (document.querySelector('script[src*="challenges.cloudflare.com"]')) {
      renderTurnstile();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;
    script.defer = true;

    (window as unknown as Record<string, unknown>).onTurnstileLoad = () => {
      renderTurnstile();
    };

    document.head.appendChild(script);

    return () => {
      delete (window as unknown as Record<string, unknown>).onTurnstileLoad;
    };
  }, []);

  function renderTurnstile() {
    const turnstile = (window as unknown as Record<string, unknown>).turnstile as
      | { render: (el: HTMLElement, opts: Record<string, unknown>) => void }
      | undefined;

    if (turnstile && turnstileRef.current && !turnstileRef.current.hasChildNodes()) {
      turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        theme: 'dark',
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      engagement: String(formData.get('engagement') || ''),
      timeline: String(formData.get('timeline') || ''),
      outcomes: String(formData.get('outcomes') || ''),
      pageUrl: window.location.href,
      'cf-turnstile-response': turnstileToken,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || 'Unable to submit your request right now.');
      }

      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your request right now.'
      );
    }
  }

  return (
    <Section id="contact" className="bg-panel">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <SectionHeading title={content.title} subtitle={content.subtitle} />
          <div className="flex items-start">
            <Button href={primaryCta.href} label={primaryCta.label} />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.methods.map((method) => (
            <div
              key={method.label}
              className="rounded-2xl border border-border bg-bg p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {method.label}
              </p>
              {method.href ? (
                <Link
                  href={method.href}
                  className="mt-3 block text-sm font-semibold text-text hover:text-primary"
                >
                  {method.value}
                </Link>
              ) : (
                <p className="mt-3 text-sm font-semibold text-text">
                  {method.value}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-bg p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {content.form.title}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-text">
                {content.title}
              </h3>
              <p className="mt-3 text-sm text-muted">
                {content.form.description}
              </p>
            </div>
            <form className="grid w-full gap-4 lg:max-w-xl" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-xl border border-border bg-panel px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className="rounded-xl border border-border bg-panel px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Engagement type
                  </label>
                  <input
                    name="engagement"
                    placeholder="Sprint, Operating Partner, Transformation"
                    className="rounded-xl border border-border bg-panel px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Timeline
                  </label>
                  <input
                    name="timeline"
                    placeholder="Target start date"
                    className="rounded-xl border border-border bg-panel px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Outcomes
                </label>
                <textarea
                  name="outcomes"
                  rows={4}
                  required
                  placeholder="Share the outcomes, constraints, or targets."
                  className="rounded-xl border border-border bg-panel px-4 py-2 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {TURNSTILE_SITE_KEY ? (
                  <div ref={turnstileRef} className="mb-2 sm:mb-0" />
                ) : null}
                <p className="text-xs text-muted">
                  Engagement requests are reviewed daily.
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting...' : content.form.buttonLabel}
                </button>
              </div>
              {status === 'success' ? (
                <p className="text-sm font-medium text-emerald-600">
                  Thanks — your request is in. Expect a response within two business days.
                </p>
              ) : null}
              {status === 'error' ? (
                <p className="text-sm font-medium text-rose-600">{errorMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
