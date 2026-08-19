'use client';

import { useEffect, useMemo, useRef } from 'react';
import { PortfolioData } from '@/types';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface StatsSectionProps {
  data: PortfolioData;
}

export function StatsSection({ data }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = useMemo(() => {
    const totalTech = data.skills.reduce((sum, c) => sum + c.skills.length, 0);
    return [
      {
        value: data.codingStats.leetcodeSolved + data.codingStats.codeforcesSolved,
        suffix: '+',
        label: 'Problems Solved',
      },
      { value: data.projects.length, suffix: '', label: 'Projects Shipped' },
      { value: data.codingStats.yearsBuilding, suffix: '+', label: 'Years Building' },
      { value: totalTech, suffix: '+', label: 'Technologies Used' },
    ];
  }, [data]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      numberRefs.current.forEach((el, i) => {
        if (el) el.textContent = String(stats[i].value);
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const el = numberRefs.current[i];
            if (!el) return;
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: stat.value,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = String(Math.round(proxy.val));
              },
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgb(var(--secondary)) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-display text-4xl sm:text-5xl text-foreground leading-none mb-2">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-fg-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
