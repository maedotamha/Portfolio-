'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PortraitProps {
  name: string;
}

export function Portrait({ name }: PortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 150, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [-16, 16]), springConfig);

  useEffect(() => {
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, no SSR-safe alternative
    setInteractive(pointerFine && !reducedMotion);
  }, []);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-[220px] sm:w-[280px]"
      style={{ perspective: 1000 }}
    >
      {/* Ambient gradient ring glow behind the frame for depth */}
      <motion.div
        aria-hidden
        className="absolute -inset-3 rounded-full blur-2xl opacity-50"
        style={{
          background: 'conic-gradient(from 180deg, rgb(var(--primary) / 0.6), rgb(var(--secondary) / 0.5), rgb(var(--primary) / 0.6))',
          x: glowX,
          y: glowY,
        }}
      />

      {/* Cursor tilt layer */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div className="relative aspect-square w-full rounded-full p-[3px] bg-gradient-to-br from-primary via-secondary to-primary">
          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-background">
            <Image
              src="/images/profile-cutout.png"
              alt={`Portrait of ${name}`}
              fill
              sizes="(min-width: 640px) 280px, 220px"
              className="object-cover select-none"
              priority
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
