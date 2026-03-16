import { SkillCategory } from '@/types';
import { AnimatedSection } from '../AnimatedSection';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Skills & Technologies
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedSection key={category.category} animation="slideUp" delay={categoryIndex * 0.1}>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">{category.category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                      >
                        <Icon className="w-8 h-8 text-primary" />
                        <span className="text-sm text-foreground text-center">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
