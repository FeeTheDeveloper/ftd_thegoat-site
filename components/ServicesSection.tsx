import type { SiteContent } from '../lib/content';
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
        <div className="grid gap-6 md:grid-cols-2">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-panel p-6"
            >
              <h3 className="text-lg font-semibold text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
