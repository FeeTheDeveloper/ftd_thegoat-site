import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

interface PricingSectionProps {
  content: SiteContent['pricing'];
}

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <Section id="pricing" className="bg-panel">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {content.tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-text">{tier.name}</h3>
                <p className="text-3xl font-semibold text-primary">{tier.price}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  {tier.cadence}
                </p>
                <p className="text-sm text-muted">{tier.description}</p>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href={tier.cta.href} label={tier.cta.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
