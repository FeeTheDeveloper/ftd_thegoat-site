interface PayNowButtonProps {
  href?: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

const variantStyles: Record<NonNullable<PayNowButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 focus-visible:outline-cyan-500',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:border-cyan-500 hover:text-cyan-700 focus-visible:outline-cyan-500',
};

export function PayNowButton({
  href,
  label,
  variant = 'primary',
}: PayNowButtonProps) {
  const isAvailable = Boolean(href);

  if (!isAvailable) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-400"
      >
        {label} · Unavailable
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        variantStyles[variant]
      }`}
    >
      {label}
    </a>
  );
}
