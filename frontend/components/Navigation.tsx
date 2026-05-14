'use client';

import { useState, useEffect } from 'react';
import { NavigationSection } from '@/types';
import { ThemeToggle } from './ThemeToggle';
import { scrollToSection } from '@/lib/scroll-utils';
import { HiMenu, HiX } from 'react-icons/hi';

interface NavigationProps {
  sections: NavigationSection[];
}

export function Navigation({ sections }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection({ sectionId });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors focus:outline-none"
          >
            Maedot<span className="text-primary">.</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {sections.filter(s => s.id !== 'hero').map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="px-4 py-2 text-sm text-foreground/60 hover:text-foreground rounded-lg hover:bg-muted
                           transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {section.label}
              </button>
            ))}
            <div className="ml-3 pl-3 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {sections.filter(s => s.id !== 'hero').map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="block w-full text-left px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground
                           hover:bg-muted rounded-xl transition-colors"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
