import Link from 'next/link';
import type { SiteContent } from '../lib/content';

interface FooterProps {
  content: SiteContent['footer'];
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-text">
            {content.summary}
          </p>
          <p className="text-sm text-muted">{content.copyright}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
          {content.links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-text">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
