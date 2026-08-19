'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!pointerFine || reducedMotion) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, no SSR-safe alternative
    setActive(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [data-cursor="hover"]'));
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 1 : 0.6,
          transition: 'width 0.25s var(--ease), height 0.25s var(--ease), opacity 0.25s var(--ease)',
        }}
      />
    </div>
  );
}
