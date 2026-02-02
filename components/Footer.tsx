import Link from 'next/link';
import type { SiteContent } from '../lib/content';

interface FooterProps {
  content: SiteContent['footer'];
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-slate-900">
            {content.summary}
          </p>
          <p className="text-sm text-slate-500">{content.copyright}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {content.links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
