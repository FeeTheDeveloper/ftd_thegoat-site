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
    <div className="min-h-screen bg-white text-slate-900">
      <LaunchSplash />
      <StickyHeader content={siteContent.site} />
      <main>
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Consultation‑First Services
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
              Every project begins with a consultation. Pricing starts at $150
              and scales up to $2,500 depending on your needs. Book a
              consultation to get a precise quote.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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
