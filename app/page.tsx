import { portfolioData } from "@/data/portfolio";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function Home() {
    const { personal } = portfolioData;

    return (
        <>
            <HeroSection />

            <div id="about" className="py-20 bg-background overflow-hidden">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <AnimatedSection animation="fadeIn">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About Me</h2>
                        <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-primary" />
                        <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            {personal.description}
                        </p>
                    </AnimatedSection>
                </div>
            </div>

            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
        </>
    );
}
