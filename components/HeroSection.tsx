import type { SiteContent } from '../lib/content';
import { Button } from './Button';
import { Reveal } from '../motion/Reveal';
import { Stagger } from '../motion/Stagger';

interface HeroSectionProps {
  hero: SiteContent['hero'];
  site: SiteContent['site'];
}

export function HeroSection({ hero, site }: HeroSectionProps) {
  return (
    <section id="top" className="pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <Stagger className="space-y-6">
          <Reveal isChild>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal isChild>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {hero.heading}
            </h1>
          </Reveal>
          <Reveal isChild>
            <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
              {hero.subheading}
            </p>
          </Reveal>
          <Reveal isChild>
            <div className="flex flex-wrap gap-3">
              <Button href={site.primaryCta.href} label={site.primaryCta.label} />
              <Button
                href={site.secondaryCta.href}
                label={site.secondaryCta.label}
                variant="secondary"
              />
            </div>
          </Reveal>
        </Stagger>
        <Stagger className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
          {hero.highlights.map((highlight) => (
            <Reveal key={highlight} isChild>
              <div className="space-y-2">
                <div className="h-2 w-2 rounded-full bg-slate-900" />
                <p className="text-sm font-medium text-slate-700">
                  {highlight}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
