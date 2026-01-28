import Link from 'next/link';
import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

interface ContactSectionProps {
  content: SiteContent['contact'];
  primaryCta: SiteContent['site']['primaryCta'];
}

export function ContactSection({ content, primaryCta }: ContactSectionProps) {
  return (
    <Section id="contact" className="bg-slate-50">
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
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {method.label}
              </p>
              {method.href ? (
                <Link
                  href={method.href}
                  className="mt-3 block text-sm font-semibold text-slate-900 hover:text-slate-700"
                >
                  {method.value}
                </Link>
              ) : (
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {method.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
