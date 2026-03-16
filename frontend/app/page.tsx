import { portfolioData } from '@/data/portfolio';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

const navigationSections = [
  { id: 'hero', label: 'Home', href: '#hero' },
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
        <ExperienceSection experiences={portfolioData.experiences} />
        <ProjectsSection projects={portfolioData.projects} />
        <SkillsSection skillCategories={portfolioData.skills} />
        <EducationSection education={portfolioData.education} />
        <ContactSection />
      </main>
      <Footer
        socialLinks={portfolioData.personal.socialLinks}
        email={portfolioData.personal.email}
      />
    </>
  );
}
