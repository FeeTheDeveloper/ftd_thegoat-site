interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <div>
          <p className="max-w-2xl text-base text-muted sm:text-lg">
            {subtitle}
          </p>
        </div>
      ) : null}
    </div>
  );
}
