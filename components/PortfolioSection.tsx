import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

interface PortfolioSectionProps {
  content: SiteContent['portfolio'];
}

export function PortfolioSection({ content }: PortfolioSectionProps) {
  return (
    <Section id="portfolio">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-6 lg:grid-cols-3">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
