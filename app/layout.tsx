import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'FTD TheGoat',
  description: 'Next.js App Router foundation for FTD TheGoat.',
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
