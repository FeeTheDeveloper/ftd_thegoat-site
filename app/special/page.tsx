import { Metadata } from 'next';
import Link from 'next/link';
import { siteContent } from '../../lib/content';
import { Footer } from '../../components/Footer';
import { LaunchSplash } from '../../components/LaunchSplash';
import { StickyHeader } from '../../components/StickyHeader';

export const metadata: Metadata = {
  title: 'Consultation‑First Services | Fee The Developer',
  description:
    'Every project begins with a consultation. Pricing starts at $150 and scales up to $2,500 depending on your needs.',
};

export default function SpecialPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <LaunchSplash />
      <StickyHeader content={siteContent.site} />
      <main>
        <section className="bg-gradient-to-br from-[#0b0b0c] to-[#1c1c1e] py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Consultation‑First Services
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted">
              Every project begins with a consultation. Pricing starts at $150
              and scales up to $2,500 depending on your needs. Book a
              consultation to get a precise quote.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Book Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
