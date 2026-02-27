import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

interface ProcessSectionProps {
  content: SiteContent['process'];
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <Section id="process" className="bg-panel">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {content.steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border bg-bg p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {content.stepLabel} {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
