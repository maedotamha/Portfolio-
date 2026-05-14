'use client';

import { SkillCategory } from '@/types';
import { AnimatedSection } from '../AnimatedSection';
import { getIcon } from '@/lib/icons';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 opacity-[0.07] dark:opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, rgb(var(--primary)) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">04.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Skills</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, ci) => (
            <AnimatedSection key={category.category} animation="slideUp" delay={ci * 0.07}>
              <div className="glow-card p-6 h-full">
                {/* Category label with accent line */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full bg-primary" />
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest font-mono">
                    {category.category}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill) => {
                    const Icon = getIcon(skill.icon);
                    return (
                      <div key={skill.name} className="skill-pill">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-xs truncate">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
