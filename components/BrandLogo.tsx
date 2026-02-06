import Image from 'next/image';

interface BrandLogoProps {
  size?: number;
  className?: string;
  variant?: 'icon' | 'lockup';
}

export function BrandLogo({
  size = 40,
  className,
  variant = 'icon',
}: BrandLogoProps) {
  return (
    <Image
      src="/brand/logos/ftd-logo.png"
      alt="FTD Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
