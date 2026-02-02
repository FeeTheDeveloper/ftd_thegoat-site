import Link from 'next/link';
import type { SiteContent } from '../lib/content';

interface PromoBannerProps {
  content: SiteContent['specialOffer'];
}

export function PromoBanner({ content }: PromoBannerProps) {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6 py-3 text-center text-sm font-medium">
        <span>
          🎉 <strong>Limited Time:</strong> {content.title} — {content.subtitle}
        </span>
        <Link
          href="/special"
          className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
