'use client';

import { PersonalInfo } from '@/types';
import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll-utils';
import { getIcon } from '@/lib/icons';
import { FiArrowDown, FiMail, FiMapPin } from 'react-icons/fi';

interface HeroSectionProps {
  personal: PersonalInfo;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function HeroSection({ personal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="hero-mesh relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
    >
      {/* Decorative floating orbs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full float opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgb(var(--orb-1)) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full float-delay opacity-20 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, rgb(var(--orb-2)) 0%, transparent 70%)' }}
      />

      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.35] dark:opacity-[0.15]" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shimmer-badge border border-primary/20 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-4"
          >
            <span className="text-foreground">{personal.name.split(' ')[0]} </span>
            <span className="gradient-text">{personal.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="text-xl sm:text-2xl text-foreground/55 font-light mb-6 max-w-2xl"
          >
            {personal.title}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-foreground/65 leading-relaxed mb-8 max-w-2xl"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground/60 shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollToSection({ sectionId: 'projects' })}
              className="group relative px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden
                         hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection({ sectionId: 'contact' })}
              className="px-7 py-3 border border-border text-foreground font-semibold rounded-xl
                         hover:bg-muted hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Contact Me
            </button>
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
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card
                             text-foreground/50 hover:text-primary hover:border-primary/50 hover:bg-primary/5
                             hover:-translate-y-0.5 transition-all duration-200 shadow-sm
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                   text-foreground/30 hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollToSection({ sectionId: 'about' })}
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <FiArrowDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
