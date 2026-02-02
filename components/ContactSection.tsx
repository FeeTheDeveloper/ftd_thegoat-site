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
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {content.form.title}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                {content.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                {content.form.description}
              </p>
            </div>
            <form
              className="grid w-full gap-4 lg:max-w-xl"
              action="mailto:fee@feethedeveloper.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Name
                  </label>
                  <input
                    name="name"
                    placeholder="Your name"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Engagement type
                  </label>
                  <input
                    name="engagement"
                    placeholder="Sprint, Operating Partner, Transformation"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Timeline
                  </label>
                  <input
                    name="timeline"
                    placeholder="Target start date"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Outcomes
                </label>
                <textarea
                  name="outcomes"
                  rows={4}
                  placeholder="Share the outcomes, constraints, or targets."
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Engagement requests are reviewed daily.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {content.form.buttonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
