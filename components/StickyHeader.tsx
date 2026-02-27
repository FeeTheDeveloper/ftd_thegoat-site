import Link from 'next/link';
import type { SiteContent } from '../lib/content';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';

interface StickyHeaderProps {
  content: SiteContent['site'];
}

export function StickyHeader({ content }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-panel/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="#top" className="flex items-center gap-3">
          <BrandLogo size={36} className="md:hidden" />
          <BrandLogo size={44} className="hidden md:block" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text">
              {content.name}
            </span>
            <p className="text-xs text-muted">{content.title}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {content.nav.map((item) => (
            <span key={item.href} className="inline-flex">
              <Link href={item.href} className="hover:text-text">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button href={content.primaryCta.href} label={content.primaryCta.label} />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            href={content.primaryCta.href}
            label={content.primaryCta.label}
            variant="secondary"
          />
        </div>
      </div>
    </header>
  );
}
