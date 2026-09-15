'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn';
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, no SSR-safe alternative
    setIsClient(true);
  }, []);

  // If reduced motion is preferred or not on client, render without animation
  if (!isClient || shouldReduceMotion) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
}
