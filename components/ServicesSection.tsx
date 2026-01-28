'use client';

import type { SiteContent } from '../lib/content';
import { Reveal } from '../motion/Reveal';
import { Stagger } from '../motion/Stagger';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

interface ServicesSectionProps {
  content: SiteContent['services'];
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <Section id="services">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <Stagger className="grid gap-6 md:grid-cols-2">
          {content.items.map((item) => (
            <Reveal
              key={item.title}
              useParent
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                {item.description}
              </p>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
