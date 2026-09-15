'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const MachineOrb = dynamic(() => import('./three/MachineOrb'), { ssr: false });

interface MachineBadgeProps {
  size?: number;
  className?: string;
}

export function MachineBadge({ size = 32, className = '' }: MachineBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className={`pointer-events-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <MachineOrb />
    </motion.div>
  );
}
