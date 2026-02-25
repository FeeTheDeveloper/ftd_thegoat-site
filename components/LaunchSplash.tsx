'use client';

import { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';

export function LaunchSplash() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const seen = sessionStorage.getItem('ftd_splash_seen');
    if (seen) return;

    setVisible(true);
    sessionStorage.setItem('ftd_splash_seen', 'true');

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 transition-all duration-700 ease-out ${
        fading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="md:hidden">
        <BrandLogo size={320} variant="icon" />
      </div>
      <div className="hidden md:block">
        <BrandLogo size={520} variant="icon" />
      </div>
    </div>
  );
}
