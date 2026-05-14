'use client';

import { Project } from '@/types';
import { AnimatedSection } from '../AnimatedSection';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">03.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Projects</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} animation="slideUp" delay={index * 0.07}>
              <div className="glow-card p-6 md:p-8 h-full flex flex-col group">

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {project.name}
                  </h3>
                  <div className="flex gap-3 ml-4 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/35 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/8"
                        aria-label="Live demo"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/35 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/8"
                        aria-label="Source code"
                      >
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-foreground/60 mb-5 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {project.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/65">
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

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border mt-auto">
                  {project.techStack.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
