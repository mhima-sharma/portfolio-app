import { BlogItem, ServiceItem, TestimonialItem } from '../../models/dashboard.models';
import { ContactData, Experience, PortfolioData, PremiumGalleryImage, Project, Skill } from '../../models/portfolio.model';

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

export interface FreefolioThemeExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface FreefolioThemeContactItem {
  key: string;
  label: string;
  value: string;
  href?: string;
}

export interface FreefolioThemeService {
  title: string;
  shortDescription: string;
  longDescription?: string;
  image?: string;
  icon?: string;
  logo?: string;
  price?: string;
}

export interface FreefolioThemeBlog {
  title: string;
  description: string;
  content: string;
  slug?: string;
  thumbnail?: string;
  tags: string[];
  createdAt?: string;
}

export interface FreefolioThemeTestimonial {
  name: string;
  designation?: string;
  company?: string;
  review: string;
  rating: number;
  image?: string;
  logo?: string;
}

export interface FreefolioThemeGalleryImage {
  title: string;
  altText: string;
  imageUrl: string;
  isFeatured: boolean;
}

export interface FreefolioThemeData {
  slug: string;
  full_name: string;
  display_name: string;
  brand_name: string;
  brand_logo?: string;
  title: string;
  about: string;
  about_text: string;
  years_experience: number;
  projects: FreefolioThemeProject[];
  skills: FreefolioThemeSkill[];
  experience: FreefolioThemeExperience[];
  contactItems: FreefolioThemeContactItem[];
  services: FreefolioThemeService[];
  blogs: FreefolioThemeBlog[];
  testimonials: FreefolioThemeTestimonial[];
  gallery: FreefolioThemeGalleryImage[];
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

function mapExperience(experience: Experience): FreefolioThemeExperience {
  return {
    company: experience.company,
    position: experience.position,
    duration: experience.duration,
    description: experience.description,
  };
}

function mapService(service: ServiceItem): FreefolioThemeService {
  return {
    title: service.title,
    shortDescription: service.short_description,
    longDescription: service.long_description || undefined,
    image: service.image || undefined,
    icon: service.icon || undefined,
    logo: service.logo || undefined,
    price: service.price != null && String(service.price).trim() ? String(service.price) : undefined,
  };
}

function mapBlog(blog: BlogItem): FreefolioThemeBlog {
  return {
    title: blog.title,
    description: blog.short_description,
    content: blog.content,
    slug: blog.slug || undefined,
    thumbnail: blog.thumbnail || undefined,
    tags: String(blog.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    createdAt: blog.created_at || undefined,
  };
}

function mapTestimonial(testimonial: TestimonialItem): FreefolioThemeTestimonial {
  return {
    name: testimonial.client_name,
    designation: testimonial.client_designation || undefined,
    company: testimonial.company_name || undefined,
    review: testimonial.review,
    rating: testimonial.rating ?? 0,
    image: testimonial.client_image || undefined,
    logo: testimonial.company_logo || undefined,
  };
}

function mapGalleryImage(image: PremiumGalleryImage): FreefolioThemeGalleryImage {
  return {
    title: image.title,
    altText: image.altText,
    imageUrl: image.imageUrl,
    isFeatured: image.isFeatured,
  };
}

function mapContactItems(contact: ContactData): FreefolioThemeContactItem[] {
  const items: FreefolioThemeContactItem[] = [
    contact.email ? { key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}` } : null,
    contact.phone ? { key: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` } : null,
    contact.location ? { key: 'location', label: 'Location', value: contact.location } : null,
    contact.website ? { key: 'website', label: 'Website', value: contact.website, href: contact.website } : null,
    contact.portfolio ? { key: 'portfolio', label: 'Portfolio', value: contact.portfolio, href: contact.portfolio } : null,
    contact.linkedin ? { key: 'linkedin', label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin } : null,
    contact.github ? { key: 'github', label: 'GitHub', value: contact.github, href: contact.github } : null,
    contact.twitter ? { key: 'twitter', label: 'Twitter', value: contact.twitter, href: contact.twitter } : null,
    contact.facebook ? { key: 'facebook', label: 'Facebook', value: contact.facebook, href: contact.facebook } : null,
    contact.instagram ? { key: 'instagram', label: 'Instagram', value: contact.instagram, href: contact.instagram } : null,
    contact.youtube ? { key: 'youtube', label: 'YouTube', value: contact.youtube, href: contact.youtube } : null,
    contact.medium ? { key: 'medium', label: 'Medium', value: contact.medium, href: contact.medium } : null,
    contact.tableau ? { key: 'tableau', label: 'Tableau', value: contact.tableau, href: contact.tableau } : null,
    contact.leetcode ? { key: 'leetcode', label: 'LeetCode', value: contact.leetcode, href: contact.leetcode } : null,
  ].filter((item): item is FreefolioThemeContactItem => Boolean(item));

  return items.filter(
    (item, index, collection) =>
      collection.findIndex((candidate) => candidate.key === item.key && candidate.value === item.value) === index
  );
}

export function toFreefolioThemeData(data: PortfolioData): FreefolioThemeData {
  const mergedContact: ContactData = {
    ...(data.profile.contactData ?? {}),
    ...(data.contact ?? {}),
  };
  const about = [data.about.description, data.about.bio, data.profile.aboutText]
    .filter((value, index, items) => Boolean(value) && items.indexOf(value) === index)
    .join('\n\n');
  const fullName = data.profile.displayName || data.profile.name;

  return {
    slug: data.profile.slug,
    full_name: fullName,
    display_name: data.profile.displayName || fullName,
    brand_name: data.profile.brandName || data.profile.title || '',
    brand_logo: data.profile.brandLogo || undefined,
    title: data.profile.title,
    about,
    about_text: data.profile.aboutText || data.about.description || data.about.bio || '',
    years_experience: data.about.yearsExperience ?? 0,
    projects: (data.projects ?? []).map(mapProject),
    skills: (data.skills ?? []).map(mapSkill),
    experience: (data.experience ?? []).map(mapExperience),
    contactItems: mapContactItems(mergedContact),
    services: (data.services ?? []).map(mapService),
    blogs: (data.blogs ?? []).map(mapBlog),
    testimonials: (data.testimonials ?? []).map(mapTestimonial),
    gallery: (data.gallery ?? []).map(mapGalleryImage),
  };
}
