import { Experience } from '@/types';
import { Card } from '../Card';
import { AnimatedSection } from '../AnimatedSection';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate === 'Present' ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === 'Present' ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Professional Experience
          </h2>
        </AnimatedSection>

        <div className="space-y-8">
          {sortedExperiences.map((exp, index) => (
            <AnimatedSection key={exp.id} animation="slideUp" delay={index * 0.1}>
              <Card>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-lg text-primary">{exp.company}</p>
                  </div>
                  <span className="text-muted mt-2 md:mt-0">{exp.duration}</span>
                </div>

                <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/80">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
