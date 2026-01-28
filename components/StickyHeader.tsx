import Link from 'next/link';
import type { SiteContent } from '../lib/content';
import { Button } from './Button';

interface StickyHeaderProps {
  content: SiteContent['site'];
}

export function StickyHeader({ content }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div>
          <div className="inline-flex flex-col">
            <Link href="#top" className="text-sm font-semibold text-slate-900">
              {content.name}
            </Link>
            <p className="text-xs text-slate-500">{content.title}</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {content.nav.map((item) => (
            <span key={item.href} className="inline-flex">
              <Link href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href={content.primaryCta.href} label={content.primaryCta.label} />
        </div>
        <div className="md:hidden">
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
