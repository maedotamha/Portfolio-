'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { SkillCategory } from '@/types';

const SkillSphereCanvas = dynamic(() => import('./SkillSphereCanvas'), { ssr: false });

interface SkillClusterProps {
  skillCategories: SkillCategory[];
}

export function SkillCluster({ skillCategories }: SkillClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[420px] md:h-[560px] w-full">
      <SkillSphereCanvas skillCategories={skillCategories} active={inView} />
    </div>
  );
}
