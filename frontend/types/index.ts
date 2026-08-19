
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
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
  companyUrl?: string;
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
  githubUrl?: string;
  liveUrl?: string;
  isTeamProject?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
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
  highlights?: string[];
}

export interface ExtraEducation {
  id: string;
  institution: string;
  program: string;
  period: string;
  description: string;
  tags: string[];
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface CodingStats {
  leetcodeSolved: number;
  codeforcesSolved: number;
  yearsBuilding: number;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education;
  extraEducation: ExtraEducation[];
  achievements: Achievement[];
  codingStats: CodingStats;
}

export interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
