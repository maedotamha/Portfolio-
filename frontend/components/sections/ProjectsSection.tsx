'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Project } from '@/types';
import { AnimatedSection } from '../AnimatedSection';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { FiExternalLink, FiGithub, FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="glow-card w-full max-w-4xl p-8 md:p-12">
      <div className="flex items-start justify-between mb-4">
        <span className="font-display text-5xl md:text-6xl text-primary/25 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex gap-3 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-fg-tertiary hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/8"
              aria-label="Live demo"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-fg-tertiary hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-primary/8"
              aria-label="Source code"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h3 className="font-display text-3xl md:text-4xl text-foreground">{project.name}</h3>
        {project.isTeamProject && (
          <span className="team-badge">
            <FiUsers className="w-3 h-3" />
            Team project
          </span>
        )}
      </div>

      <p className="text-base text-fg-secondary mb-6 leading-relaxed max-w-2xl">
        {project.description}
      </p>

      <ul className="space-y-2 mb-6">
        {project.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-fg-secondary">
            <span className="text-primary mt-0.5 shrink-0 text-xs">▸</span>
            <span>
              {f.description}
              {f.metric && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                  {f.metric}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-border">
        {project.techStack.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectControls({
  count,
  activeIndex,
  onGo,
}: {
  count: number;
  activeIndex: number;
  onGo: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onGo(activeIndex - 1)}
        disabled={activeIndex === 0}
        data-cursor="hover"
        aria-label="Previous project"
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-fg-secondary hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGo(i)}
            data-cursor="hover"
            aria-label={`Go to project ${i + 1}`}
            className="p-1.5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-fg-tertiary'
              }`}
            />
          </button>
        ))}
      </div>

      <button
        onClick={() => onGo(activeIndex + 1)}
        disabled={activeIndex === count - 1}
        data-cursor="hover"
        aria-label="Next project"
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-fg-secondary hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>

      <span className="font-mono text-xs text-fg-tertiary ml-1">
        {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const inSectionRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [scrubMode, setScrubMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, no SSR-safe alternative
    setScrubMode(!reduced && wide);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !scrubMode) return;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!pinEl || !track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - pinEl.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${track.scrollWidth - pinEl.clientWidth}`,
          pin: true,
          scrub: 1,
          snap: projects.length > 1 ? 1 / (projects.length - 1) : undefined,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (projects.length - 1));
            setActiveIndex(idx);
          },
        },
      });
      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, pinEl);

    return () => ctx.revert();
  }, [ready, scrubMode, projects.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inSectionRef.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToIndex = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, i));
      if (scrubMode && scrollTriggerRef.current) {
        const st = scrollTriggerRef.current;
        const progress = projects.length > 1 ? clamped / (projects.length - 1) : 0;
        const y = st.start + progress * (st.end - st.start);
        gsap.to(window, { duration: 0.8, scrollTo: { y }, ease: 'power2.inOut' });
      } else {
        const track = trackRef.current;
        const slide = track?.children[clamped] as HTMLElement | undefined;
        slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
      setActiveIndex(clamped);
    },
    [scrubMode, projects.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!inSectionRef.current) return;
      if (e.key === 'ArrowRight') goToIndex(activeIndex + 1);
      if (e.key === 'ArrowLeft') goToIndex(activeIndex - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goToIndex, activeIndex]);

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <span className="section-num">03.</span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">Projects</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>
      </div>

      {!ready ? (
        <div className="h-screen" />
      ) : scrubMode ? (
        <div ref={pinRef} className="h-screen w-full overflow-hidden relative">
          <div ref={trackRef} className="flex h-full">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="w-full shrink-0 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <ProjectControls count={projects.length} activeIndex={activeIndex} onGo={goToIndex} />
          </div>
        </div>
      ) : (
        <div className="pb-16">
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 gap-6 pb-6 no-scrollbar"
          >
            {projects.map((project, i) => (
              <div key={project.id} className="snap-start shrink-0 w-[88vw] sm:w-[70vw] md:w-[55vw] flex">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectControls count={projects.length} activeIndex={activeIndex} onGo={goToIndex} />
          </div>
        </div>
      )}
    </section>
  );
}
