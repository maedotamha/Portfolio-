import { Education } from '@/types';
import { Card } from '../Card';
import { AnimatedSection } from '../AnimatedSection';
import { FaGraduationCap } from 'react-icons/fa';

interface EducationSectionProps {
  education: Education;
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Education
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp">
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FaGraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {education.degree} in {education.field}
                </h3>
                <p className="text-lg text-primary mb-2">{education.institution}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-foreground/70">
                  <span>{education.startDate} - {education.endDate}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-semibold text-primary">GPA: {education.gpa}</span>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
