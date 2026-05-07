import { PortfolioData, Project, Skill } from '../../models/portfolio.model';

export interface FreefolioThemeSkill {
  name: string;
  level: number;
}

export interface FreefolioThemeProject {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

export interface FreefolioThemeData {
  full_name: string;
  title: string;
  about: string;
  projects: FreefolioThemeProject[];
  skills: FreefolioThemeSkill[];
}

function mapSkill(skill: Skill): FreefolioThemeSkill {
  return {
    name: skill.name,
    level: skill.level ?? 0,
  };
}

function mapProject(project: Project): FreefolioThemeProject {
  return {
    title: project.title,
    description: project.description,
    image: project.image || undefined,
    technologies: project.technologies ?? [],
    liveLink: project.liveLink || undefined,
    githubLink: project.githubLink || undefined,
  };
}

export function toFreefolioThemeData(data: PortfolioData): FreefolioThemeData {
  const about = [data.about.description, data.about.bio].filter(Boolean).join('\n\n');

  return {
    full_name: data.profile.name,
    title: data.profile.title,
    about,
    projects: (data.projects ?? []).map(mapProject),
    skills: (data.skills ?? []).map(mapSkill),
  };
}
