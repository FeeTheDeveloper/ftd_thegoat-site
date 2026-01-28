import type { Metadata } from 'next';
import '../styles/globals.css';
import { siteContent } from '../lib/content';

export const metadata: Metadata = {
  title: siteContent.site.title,
  description: siteContent.site.description,
  openGraph: {
    title: siteContent.site.title,
    description: siteContent.site.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
