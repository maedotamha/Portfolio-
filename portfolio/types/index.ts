import { IconType } from 'react-icons';

// Personal Information
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
  icon: IconType;
}

// Experience
export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
}

// Projects
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

export interface ProjectFeature {
  description: string;
  metric?: string;
}

// Skills
export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: IconType;
}

// Education
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

// Portfolio Data
export interface PortfolioData {
  personal: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

// Navigation
export interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

// Theme
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
