import { ContactSection } from '../components/ContactSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { PricingSection } from '../components/PricingSection';
import { ProcessSection } from '../components/ProcessSection';
import { ServicesSection } from '../components/ServicesSection';
import { StickyHeader } from '../components/StickyHeader';
import { siteContent } from '../lib/content';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StickyHeader content={siteContent.site} />
      <main>
        <HeroSection hero={siteContent.hero} site={siteContent.site} />
        <ServicesSection content={siteContent.services} />
        <ProcessSection content={siteContent.process} />
        <PortfolioSection content={siteContent.portfolio} />
        <PricingSection content={siteContent.pricing} />
        <FaqSection content={siteContent.faq} />
        <ContactSection
          content={siteContent.contact}
          primaryCta={siteContent.site.primaryCta}
        />
      </main>
      <Footer content={siteContent.footer} />
    </div>
  );
}
