'use client';

import { PersonalInfo } from '@/types';
import { motion, type Variants } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll-utils';
import { getIcon } from '@/lib/icons';
import { Button } from '@/components/Button';
import { HeroScene } from '@/components/three/HeroScene';
import { FiArrowDown, FiMail, FiMapPin } from 'react-icons/fi';

interface HeroSectionProps {
  personal: PersonalInfo;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
};

export function HeroSection({ personal }: HeroSectionProps) {
  const [firstName, ...rest] = personal.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      <HeroScene />
      <div className="grain-overlay" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-fg-secondary text-xs font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Open to opportunities
            </div>
          </motion.div>

          {/* Name — big mixed serif/sans statement */}
          <motion.h1
            variants={item}
            className="font-display leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            <span className="block text-foreground font-normal">{firstName}</span>
            <span className="block gradient-text italic font-normal">{lastName}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="font-mono text-fg-secondary uppercase tracking-wide mb-6 max-w-2xl"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {personal.title}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-fg-secondary leading-relaxed mb-8 max-w-2xl"
            style={{ fontSize: 'var(--text-lg)' }}
          >
            {personal.description}
          </motion.p>

          {/* Contact chips */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: FiMail, label: personal.email },
              { icon: FiMapPin, label: personal.location },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-fg-secondary"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
            <Button onClick={() => scrollToSection({ sectionId: 'projects' })}>
              View Projects
            </Button>
            <Button variant="outline" onClick={() => scrollToSection({ sectionId: 'contact' })}>
              Contact Me
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex gap-3">
            {personal.socialLinks.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border
                             text-fg-secondary hover:text-primary hover:border-primary/50
                             transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   text-fg-tertiary hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        onClick={() => scrollToSection({ sectionId: 'about' })}
        aria-label="Scroll down"
        data-cursor="hover"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
