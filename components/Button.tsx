import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white hover:bg-red-700 focus-visible:outline-primary',
  secondary:
    'border border-border text-text hover:border-muted hover:text-muted',
};

export function Button({ href, label, variant = 'primary' }: ButtonProps) {
  return (
    <span className="inline-flex">
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
          variantStyles[variant]
        }`}
      >
        {label}
      </Link>
    </span>
  );
}
