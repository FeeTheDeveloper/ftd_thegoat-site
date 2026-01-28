import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={['scroll-mt-28 py-16', className].filter(Boolean).join(' ')}
    >
      {children}
    </section>
  );
}
