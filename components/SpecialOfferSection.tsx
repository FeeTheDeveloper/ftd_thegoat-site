import type { SiteContent } from '../lib/content';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { PayNowButton } from './PayNowButton';

interface SpecialOfferSectionProps {
  content: SiteContent['specialOffer'];
}

export function SpecialOfferSection({ content }: SpecialOfferSectionProps) {
  return (
    <Section id="special-offer" className="bg-amber-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6">
        <SectionHeading
          eyebrow={content.subtitle}
          title={content.title}
          subtitle={content.description}
        />
        <div className="rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
          <ul className="space-y-3 text-base text-slate-700">
            {content.bulletPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PayNowButton
              href={content.checkoutUrl}
              label="Pay $150 on Square"
            />
            <p className="text-xs text-slate-500">
              Secure Square checkout. Receipt emailed instantly.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
