import Link from 'next/link';
import type { SiteContent } from '../lib/content';
import { PayNowButton } from './PayNowButton';
import { Section } from './Section';

interface OffersSectionProps {
  content: SiteContent['offers'];
  specialOffer: SiteContent['specialOffer'];
}

const offerCards = [
  {
    key: 'website-special',
    title: '$150 Website Special',
    highlights: ['1-3 page custom site build', '2 years hosting + domain included'],
    ctaLabel: 'Pay Now',
    type: 'pay' as const,
  },
  {
    key: 'strategic-sprint',
    title: 'Strategic Sprint',
    highlights: ['Single high-leverage product objective', 'Executive updates with launch handoff'],
    ctaLabel: 'Request Access',
    type: 'contact' as const,
  },
  {
    key: 'operating-partner',
    title: 'Operating Partner',
    highlights: ['Embedded senior engineering leadership', 'Weekly shipping cadence with reliability ownership'],
    ctaLabel: 'Request Access',
    type: 'contact' as const,
  },
];

export function OffersSection({ content, specialOffer }: OffersSectionProps) {
  return (
    <Section id="offers" className="bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">{content.subtitle}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {offerCards.map((offer) => (
            <article
              key={offer.key}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {offer.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {offer.type === 'pay' ? (
                  <PayNowButton href={specialOffer.checkoutUrl} label={offer.ctaLabel} />
                ) : (
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    {offer.ctaLabel}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
