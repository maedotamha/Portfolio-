'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useShouldRender3D } from '@/lib/use-should-render-3d';

const GradientCanvas = dynamic(() => import('./GradientCanvas'), { ssr: false });

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ready, enabled } = useShouldRender3D();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {ready && enabled ? (
        <GradientCanvas active={inView} />
      ) : (
        <div className="hero-mesh absolute inset-0" />
      )}
    </div>
  );
}
