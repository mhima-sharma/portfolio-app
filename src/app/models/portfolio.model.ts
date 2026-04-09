export interface Skill {
  id: string | number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: number; // 0-100
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
  featured: boolean;
}

export interface Experience {
  id: string | number;
  company: string;
  position: string;
  duration: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AboutData {
  bio: string;
  description: string;
  yearsExperience: number;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  medium: string;
  tableau: string;
  leetcode: string;
  instagram: string;
  youtube: string;
  portfolio: string;
}

export interface ProfileData {
  slug: string;
  name: string;
  title: string;
  selectedTheme: PortfolioTheme;
}

export type PortfolioTheme = 'modern-dark' | 'minimal-light' | 'corporate-resume';

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  contact: ContactData;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}
