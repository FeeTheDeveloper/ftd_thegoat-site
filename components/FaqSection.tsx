import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

interface FaqSectionProps {
  content: SiteContent['faq'];
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <Section id="faq">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <SectionHeading title={content.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-border bg-panel p-6"
            >
              <h3 className="text-base font-semibold text-text">
                {item.question}
              </h3>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
