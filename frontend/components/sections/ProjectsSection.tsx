import { Project } from '@/types';
import { Card } from '../Card';
import { Button } from '../Button';
import { AnimatedSection } from '../AnimatedSection';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Featured Projects
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} animation="slideUp" delay={index * 0.1}>
              <Card hoverable className="h-full flex flex-col">
                <h3 className="text-2xl font-bold text-foreground mb-3">{project.name}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex-grow">
                  <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
                  <ul className="space-y-1 text-foreground/80">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          {feature.description}
                          {feature.metric && (
                            <span className="font-semibold text-primary ml-1">
                              ({feature.metric})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FiExternalLink /> Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FiGithub /> Source Code
                    </Button>
                  )}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
