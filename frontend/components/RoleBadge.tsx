'use client';

import { motion } from 'framer-motion';
import { FiLayers, FiMonitor } from 'react-icons/fi';

const VARIANTS = {
  fullstack: { Icon: FiLayers, className: 'bg-primary/10 text-primary border-primary/25' },
  frontend: { Icon: FiMonitor, className: 'bg-secondary/10 text-secondary border-secondary/25' },
} as const;

interface RoleBadgeProps {
  variant: keyof typeof VARIANTS;
  size?: number;
  className?: string;
}

export function RoleBadge({ variant, size = 26, className = '' }: RoleBadgeProps) {
  const { Icon, className: variantClass } = VARIANTS[variant];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className={`inline-flex items-center justify-center shrink-0 rounded-full border ${variantClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} />
    </motion.span>
  );
}
