import { IconType } from "react-icons";

export interface PersonalInfo {
    name: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    socialLinks: SocialLink[];
}

export interface SocialLink {
    platform: string;
    url: string;
    iconName: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
    technologies: string[];
    location?: string;
}

export interface ProjectFeature {
    description: string;
    metric?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    duration: string;
    techStack: string[];
    features: ProjectFeature[];
    liveUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
}

export interface Skill {
    name: string;
    iconName: string;
}

export interface SkillCategory {
    category: string;
    skills: Skill[];
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    coursework?: string[];
    location?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date?: string;
}

export interface PortfolioData {
    personal: PersonalInfo;
    experiences: Experience[];
    projects: Project[];
    skillCategories: SkillCategory[];
    education: Education[];
    certifications: Certification[];
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
}
