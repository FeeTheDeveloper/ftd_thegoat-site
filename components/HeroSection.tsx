import type { SiteContent } from '../lib/content';
import { Button } from './Button';

interface HeroSectionProps {
  hero: SiteContent['hero'];
  site: SiteContent['site'];
}

export function HeroSection({ hero, site }: HeroSectionProps) {
  return (
    <section id="top" className="pt-32 lg:pt-36">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              {hero.eyebrow}
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
              {hero.heading}
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg text-muted sm:text-xl">
              {hero.subheading}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <Button href={site.primaryCta.href} label={site.primaryCta.label} />
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-border bg-panel p-6 sm:grid-cols-3">
          {hero.highlights.map((highlight) => (
            <div key={highlight}>
              <div className="space-y-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm font-medium text-text">
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
