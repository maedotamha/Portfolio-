import { Education, ExtraEducation } from '@/types';
import { AnimatedSection } from '../AnimatedSection';
import { FiBook, FiAward, FiCpu } from 'react-icons/fi';

interface EducationSectionProps {
  education: Education;
  extraEducation: ExtraEducation[];
}

const extraIcons: Record<string, React.ElementType> = {
  'edu-2': FiAward,
  'edu-3': FiCpu,
};

export function EducationSection({ education, extraEducation }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">05.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Education</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <div className="space-y-5">
          {/* Degree */}
          <AnimatedSection animation="slideUp" delay={0.05}>
            <div className="glow-card p-6 md:p-8 flex items-start gap-5">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <FiBook className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {education.degree} in {education.field}
                    </h3>
                    <p className="text-primary font-semibold text-sm mt-0.5">{education.institution}</p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary font-mono text-xs self-start">
                    {education.startDate} — {education.endDate}
                  </span>
                </div>
                {education.gpa && (
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-muted border border-border text-foreground/65 font-semibold text-xs mt-1">
                    GPA: {education.gpa}
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Extra education entries */}
          {extraEducation.map((entry, i) => {
            const Icon = extraIcons[entry.id] ?? FiAward;
            return (
              <AnimatedSection key={entry.id} animation="slideUp" delay={0.1 + i * 0.08}>
                <div className="glow-card p-6 md:p-8 flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{entry.program}</h3>
                        {entry.url ? (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold text-sm mt-0.5 hover:underline inline-flex items-center gap-1"
                          >
                            {entry.institution}
                            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        ) : (
                          <p className="text-primary font-semibold text-sm mt-0.5">{entry.institution}</p>
                        )}
                      </div>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary font-mono text-xs self-start">
                        {entry.period}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
