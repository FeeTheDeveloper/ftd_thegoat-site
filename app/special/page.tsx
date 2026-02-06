import { Metadata } from 'next';
import { siteContent } from '../../lib/content';
import { Footer } from '../../components/Footer';
import { LaunchSplash } from '../../components/LaunchSplash';
import { SpecialOfferSection } from '../../components/SpecialOfferSection';
import { StickyHeader } from '../../components/StickyHeader';

export const metadata: Metadata = {
  title: '$150 Website Special | Fee The Developer',
  description:
    'Celebrate our Top 10 Yelp Dallas ranking with a professional website for just $150. Includes 2 years of hosting and domain registration.',
};

export default function SpecialPage() {
  const { specialOffer } = siteContent;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LaunchSplash />
      <StickyHeader content={siteContent.site} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-400">
              🎉 {specialOffer.subtitle}
            </p>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              {specialOffer.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
              {specialOffer.description}
            </p>
          </div>
        </section>

        {/* What's Included */}
        <SpecialOfferSection content={specialOffer} />

        {/* CTA Section */}
        <section className="bg-slate-100 py-20 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-slate-600">
              This special offer is available for a limited time. Secure your
              spot today.
            </p>
          </div>
        </section>
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
