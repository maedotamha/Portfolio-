'use client';

import { useTheme } from './ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full border border-border transition-colors duration-200 hover:border-primary/50 hover:bg-subtle focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-cursor="hover"
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="block"
          >
            <FiMoon className="w-4 h-4 text-foreground/70" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="block"
          >
            <FiSun className="w-4 h-4 text-primary" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
