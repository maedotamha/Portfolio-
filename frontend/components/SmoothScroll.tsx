'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProps {
  children: ReactNode;
}

function LenisScrollTriggerBridge() {
  const onScroll = useCallback(() => {
    ScrollTrigger.update();
  }, []);

  useLenis(onScroll);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, no SSR-safe alternative
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  if (!mounted || !enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true }}>
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
