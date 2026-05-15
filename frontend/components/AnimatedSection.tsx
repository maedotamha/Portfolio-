'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn';
  delay?: number;
}

export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If reduced motion is preferred or not on client, render without animation
  if (!isClient || shouldReduceMotion) {
    return <>{children}</>;
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
}
