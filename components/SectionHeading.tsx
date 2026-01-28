'use client';

import { Reveal } from '../motion/Reveal';
import { Stagger } from '../motion/Stagger';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Stagger className="space-y-3">
      {eyebrow ? (
        <Reveal useParent>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal useParent>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal useParent>
          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </Stagger>
  );
}
