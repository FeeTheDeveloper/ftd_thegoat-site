'use client';

import Link from 'next/link';
import { HoverLift } from '../motion/HoverLift';

interface ButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900',
  secondary:
    'border border-slate-300 text-slate-900 hover:border-slate-400 hover:text-slate-700',
};

export function Button({ href, label, variant = 'primary' }: ButtonProps) {
  return (
    <HoverLift className="inline-flex">
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
          variantStyles[variant]
        }`}
      >
        {label}
      </Link>
    </HoverLift>
  );
}
