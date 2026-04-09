'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Lightweight top-of-page loading bar for route changes.
 * Uses pure CSS + transform for 60fps GPU-accelerated animation.
 * No external dependencies needed — replaces heavier solutions like nprogress.
 */
export default function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Clear any pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(0)';
    bar.style.opacity = '1';

    // Force reflow
    bar.offsetHeight;

    // Animate to ~90%
    bar.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)';
    bar.style.transform = 'scaleX(0.9)';

    // Complete
    const t1 = setTimeout(() => {
      bar.style.transition = 'transform 200ms ease-out';
      bar.style.transform = 'scaleX(1)';
    }, 100);

    const t2 = setTimeout(() => {
      bar.style.transition = 'opacity 300ms ease-out';
      bar.style.opacity = '0';
    }, 400);

    timeoutsRef.current = [t1, t2];

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [pathname, searchParams]);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        opacity: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    />
  );
}
