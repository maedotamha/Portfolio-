'use client';

import { useEffect, useRef, useState } from 'react';
import { Experience } from '@/types';
import { AnimatedSection } from '../AnimatedSection';
import { AnimatePresence, motion } from 'framer-motion';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? '');
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const elements = Object.values(rowRefs.current).filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
          );
          const id = topMost.target.getAttribute('data-exp-id');
          if (id) setActiveId(id);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [experiences]);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-subtle/40 relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, rgb(var(--primary)) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">02.</span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">Experience</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

          <div className="space-y-3">
            {experiences.map((exp, index) => {
              const isActive = exp.id === activeId;
              return (
                <div
                  key={exp.id}
                  ref={(el) => {
                    rowRefs.current[exp.id] = el;
                  }}
                  data-exp-id={exp.id}
                  className="relative pl-11"
                >
                  {/* Index dot */}
                  <button
                    onClick={() => {
                      setActiveId(exp.id);
                      rowRefs.current[exp.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    data-cursor="hover"
                    aria-label={`Jump to ${exp.company} entry`}
                    className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs transition-colors duration-300 z-10 ${
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-fg-tertiary hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>

                  <div className="glow-card overflow-hidden">
                    <button
                      onClick={() => setActiveId(exp.id)}
                      data-cursor="hover"
                      className="w-full text-left px-5 py-4"
                      aria-expanded={isActive}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h3 className={`font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {exp.role} <span className="text-fg-tertiary font-normal">— {exp.company}</span>
                        </h3>
                        <span className="text-xs font-mono text-fg-tertiary shrink-0">{exp.duration}</span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-4 border-t border-border">
                            {exp.location && (
                              <p className="text-xs text-fg-tertiary font-mono mb-3">{exp.location}</p>
                            )}
                            <ul className="space-y-2 mb-4">
                              {exp.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-fg-secondary leading-relaxed">
                                  <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                                  {r}
                                </li>
                              ))}
                            </ul>
                            {exp.technologies?.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {exp.technologies.map((t) => (
                                  <span key={t} className="tech-tag">{t}</span>
                                ))}
                              </div>
                            )}
                            {exp.companyUrl && (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="hover"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-4"
                              >
                                Visit {exp.company}
                                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
