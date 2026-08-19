'use client';

import { PersonalInfo } from '@/types';
import { AnimatedSection } from '../AnimatedSection';

interface AboutSectionProps {
  personal: PersonalInfo;
}

export function AboutSection({ personal }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">01.</span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">About Me</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.1}>
          <div className="glow-card p-8 md:p-10">
            {/* Decorative quote mark */}
            <div className="font-display text-6xl text-primary/20 leading-none mb-2 select-none">&ldquo;</div>
            <p className="text-lg text-fg-secondary leading-relaxed">
              {personal.description}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
