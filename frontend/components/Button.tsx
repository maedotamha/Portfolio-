'use client';

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MotionConflicts =
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd';

type ButtonAsButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicts> & {
  as?: 'button';
};

type ButtonAsAnchor = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflicts> & {
  as: 'a';
};

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-bright',
  outline: 'border border-border text-foreground hover:border-primary/50 hover:text-primary',
  ghost: 'text-foreground/70 hover:text-primary hover:bg-subtle',
};

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

const MAGNET_STRENGTH = 0.3;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200, mass: 0.3 });
  const springY = useSpring(y, { damping: 15, stiffness: 200, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * MAGNET_STRENGTH);
    y.set((e.clientY - rect.top - rect.height / 2) * MAGNET_STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'data-cursor': 'hover',
  };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref}
        className={baseStyles}
        {...motionProps}
        {...(props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflicts>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      className={baseStyles}
      {...motionProps}
      {...(props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicts>)}
    >
      {children}
    </motion.button>
  );
}
