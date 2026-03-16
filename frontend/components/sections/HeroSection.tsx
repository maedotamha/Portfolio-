'use client';

import { PersonalInfo } from '@/types';
import { Button } from '../Button';
import { motion } from 'framer-motion';
import { scrollToSection } from '@/lib/scroll-utils';

interface HeroSectionProps {
  personal: PersonalInfo;
}

export function HeroSection({ personal }: HeroSectionProps) {
  const handleViewProjects = () => scrollToSection({ sectionId: 'projects' });
  const handleContact = () => scrollToSection({ sectionId: 'contact' });

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            {personal.name}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-muted mb-6">
            {personal.title}
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            {personal.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button onClick={handleViewProjects} size="lg">
            View Projects
          </Button>
          <Button onClick={handleContact} variant="outline" size="lg">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-foreground/70 mb-8"
        >
          <span className="flex items-center gap-2">
            📧 {personal.email}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            📱 {personal.phone}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            📍 {personal.location}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-6"
        >
          {personal.socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded p-2"
                aria-label={link.platform}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
