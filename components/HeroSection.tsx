import type { SiteContent } from '../lib/content';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';

interface HeroSectionProps {
  hero: SiteContent['hero'];
  site: SiteContent['site'];
}

export function HeroSection({ hero, site }: HeroSectionProps) {
  return (
    <section id="top" className="pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex justify-center mb-10 animate-fade-in-scale">
          <BrandLogo size={180} variant="icon" className="md:hidden" />
          <BrandLogo size={260} variant="icon" className="hidden md:block" />
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {hero.eyebrow}
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {hero.heading}
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
              {hero.subheading}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <Button href={site.primaryCta.href} label={site.primaryCta.label} />
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
          {hero.highlights.map((highlight) => (
            <div key={highlight}>
              <div className="space-y-2">
                <div className="h-2 w-2 rounded-full bg-slate-900" />
                <p className="text-sm font-medium text-slate-700">
                  {highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
