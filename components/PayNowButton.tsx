import clsx from 'clsx';

type PayNowButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export function PayNowButton({
  href,
  label,
  className,
}: PayNowButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
        className
      )}
    >
      {label}
    </a>
  );
}
