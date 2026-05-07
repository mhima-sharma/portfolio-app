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
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  medium?: string;
  tableau?: string;
  leetcode?: string;
  instagram?: string;
  youtube?: string;
  portfolio?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export interface ProfileData {
  slug: string;
  name: string;
  title: string;
  selectedTheme: PortfolioTheme;
}

export interface PremiumGalleryImage {
  id: string | number;
  slug: string;
  imageUrl: string;
  title: string;
  altText: string;
  sortOrder: number;
  isFeatured: boolean;
}

export type PortfolioTheme =
  | 'modern-dark'
  | 'minimal-light'
  | 'corporate-resume'
  | 'creator-orange'
  | 'theme-5'
  | 'premium-signature'
  | 'theme-5-boys'
  | 'modern-minimal'
  | 'creative-designer'
  | 'developer-dark'
  | 'corporate-professional'
  | 'personal-branding'
  | 'freefolio-anime'
  | 'freefolio-aurora'
  | 'freefolio-basic'
  | 'freefolio-beginner'
  | 'freefolio-classic'
  | 'freefolio-clean'
  | 'freefolio-dark-hack'
  | 'freefolio-deepsea'
  | 'freefolio-easy'
  | 'freefolio-flower'
  | 'freefolio-hacker'
  | 'freefolio-indify'
  | 'freefolio-ingolfur'
  | 'freefolio-outlines'
  | 'freefolio-plain'
  | 'freefolio-simple';

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  contact: ContactData;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  gallery?: PremiumGalleryImage[];
}
