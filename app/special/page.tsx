import { Metadata } from 'next';
import { siteContent } from '../../lib/content';
import { Footer } from '../../components/Footer';
import { LaunchSplash } from '../../components/LaunchSplash';
import { PayNowButton } from '../../components/PayNowButton';
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

        <SpecialOfferSection content={specialOffer} />

        <section className="bg-slate-100 px-6 py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900">Pay &amp; Lock Your Spot</h2>
            <p className="mt-4 text-slate-600">
              Complete checkout in under a minute to reserve your build slot.
            </p>
            <div className="mt-8 flex justify-center">
              <PayNowButton href={specialOffer.checkoutUrl} label="Pay $150 Securely" />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Secure Square checkout. Receipt emailed instantly.
            </p>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-6 py-10">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">After payment</p>
              <p className="mt-2 text-sm text-slate-600">
                You get an instant receipt plus a kickoff email with next steps.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Discovery intake</p>
              <p className="mt-2 text-sm text-slate-600">
                Share goals, branding, and examples so the build starts clean.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Delivery cadence</p>
              <p className="mt-2 text-sm text-slate-600">
                Initial draft ships fast, then polish and launch prep follow.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
