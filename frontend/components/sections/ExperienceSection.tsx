'use client';

import { Experience } from '@/types';
import { AnimatedSection } from '../AnimatedSection';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sorted = [...experiences].sort((a, b) => {
    if (a.endDate.toLowerCase() === 'present') return -1;
    if (b.endDate.toLowerCase() === 'present') return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 opacity-[0.06] dark:opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, rgb(var(--primary)) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">02.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Experience</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

          <div className="space-y-6 pl-8">
            {sorted.map((exp, index) => (
              <AnimatedSection key={exp.id} animation="slideIn" delay={index * 0.08}>
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.15rem] top-5 w-3 h-3 rounded-full bg-primary ring-4 ring-background shadow-sm" />

                  <div className="glow-card p-6 md:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold text-sm mt-0.5 hover:underline inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        ) : (
                          <p className="text-primary font-semibold text-sm mt-0.5">{exp.company}</p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-mono font-medium">
                          {exp.duration}
                        </span>
                        {exp.location && (
                          <p className="text-xs text-foreground/45 mt-1 font-mono">{exp.location}</p>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/65 leading-relaxed">
                          <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                        {exp.technologies.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
