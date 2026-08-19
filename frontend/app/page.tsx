import { portfolioData } from '@/data/portfolio';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

const navigationSections = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Home() {
  return (
    <>
      <Navigation sections={navigationSections} />
      <main>
        <HeroSection personal={portfolioData.personal} />
        <StatsSection data={portfolioData} />
        <AboutSection personal={portfolioData.personal} />
        <ExperienceSection experiences={portfolioData.experiences} />
        <ProjectsSection projects={portfolioData.projects} />
        <SkillsSection skillCategories={portfolioData.skills} />
        <EducationSection
          education={portfolioData.education}
          extraEducation={portfolioData.extraEducation}
          achievements={portfolioData.achievements}
        />
        <ContactSection
          email={portfolioData.personal.email}
          githubUrl={portfolioData.personal.socialLinks.find((l) => l.platform === 'GitHub')?.url ?? ''}
        />
      </main>
      <Footer
        socialLinks={portfolioData.personal.socialLinks}
        email={portfolioData.personal.email}
      />
    </>
  );
}
