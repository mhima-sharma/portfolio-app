import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Skill,
  Project,
  Experience,
  AboutData,
  ContactData,
  ProfileData,
  PortfolioData,
  PortfolioTheme,
  PremiumGalleryImage,
} from '../models/portfolio.model';
import {
  API_BASE_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  HEALTH_URL,
} from '../config/api.config';
import { firstValueFrom } from 'rxjs';
import { isFreefolioTheme } from '../themes/freefolio/freefolio-theme.registry';

const DEFAULT_CONTACT: ContactData = {
  email: 'dev.nest.ms@gmail.com',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  medium: '',
  tableau: '',
  leetcode: '',
  instagram: '',
  youtube: '',
  portfolio: '',
};

const DEFAULT_PROFILE: ProfileData = {
  slug: '',
  name: '',
  title: '',
  displayName: '',
  brandName: '',
  brandLogo: '',
  aboutText: '',
  contactData: {},
  selectedTheme: 'modern-minimal',
};

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private activeLoadRequestId = 0;

  private skillsData = signal<Skill[]>([]);
  private projectsData = signal<Project[]>([]);
  private experienceData = signal<Experience[]>([]);
  private premiumGalleryData = signal<PremiumGalleryImage[]>([]);
  currentProfile = signal<ProfileData>({ ...DEFAULT_PROFILE });
  selectedTheme = signal<PortfolioTheme>('modern-minimal');
  isUsingDefaultThemeFallback = signal(false);

  about = signal<AboutData>({
    bio: '',
    description: '',
    yearsExperience: 0,
  });

  contact = signal<ContactData>({ ...DEFAULT_CONTACT });

  isLoading = signal(false);
  error = signal<string | null>(null);

  getSkills = this.skillsData.asReadonly();
  getProjects = this.projectsData.asReadonly();
  getExperience = this.experienceData.asReadonly();
  getPremiumGallery = this.premiumGalleryData.asReadonly();

  constructor() {}

  checkHealth() {
    return this.http.get<{ success?: boolean; message?: string }>(HEALTH_URL);
  }

  async getUserProfile(profileSlug?: string): Promise<PortfolioData> {
    const normalizedSlug = this.normalizeSlug(profileSlug);
    const endpoint = normalizedSlug
      ? `${API_BASE_URL}/portfolio/${encodeURIComponent(normalizedSlug)}`
      : `${API_BASE_URL}/portfolio`;

    const response = await firstValueFrom(
      this.http.get<{ success: boolean; message: string; data: any }>(endpoint)
    );

    return this.mapPortfolioResponse(response?.data, normalizedSlug);
  }

  loadPortfolio(profileSlug?: string) {
    const requestId = ++this.activeLoadRequestId;
    const normalizedSlug = this.normalizeSlug(profileSlug);
    this.isLoading.set(true);
    this.error.set(null);

    this.getUserProfile(profileSlug)
      .then((portfolio) => {
          if (requestId !== this.activeLoadRequestId) {
            return;
          }

          this.applyPortfolioData(portfolio);
          void this.loadPremiumGallery(portfolio.profile.slug || normalizedSlug);
          this.isLoading.set(false);
        })
      .catch((error) => {
          if (requestId !== this.activeLoadRequestId) {
            return;
          }

          console.error('Failed to load portfolio data:', error);
          this.error.set('Unable to load live portfolio data.');
          this.currentProfile.set({
            slug: normalizedSlug,
            name: '',
            title: '',
            displayName: '',
            brandName: '',
            brandLogo: '',
            aboutText: '',
            contactData: {},
            selectedTheme: 'modern-dark',
          });
          this.selectedTheme.set('modern-dark');
          this.isUsingDefaultThemeFallback.set(true);
          this.skillsData.set([]);
          this.projectsData.set([]);
          this.experienceData.set([]);
          this.premiumGalleryData.set([]);
          this.about.set({ bio: '', description: '', yearsExperience: 0 });
          this.contact.set({ ...DEFAULT_CONTACT });
          this.isLoading.set(false);
      });
  }

  async getLoggedInUserTheme(userId: number, headers: HttpHeaders): Promise<PortfolioTheme> {
    const response = await firstValueFrom(
      this.http.get<{ success: boolean; message?: string; data: any }>(`${API_BASE_URL}/user/${userId}`, {
        headers,
      })
    );

    const rawTheme = response?.data?.profile?.selected_theme;
    const theme = this.normalizeTheme(rawTheme);
    this.isUsingDefaultThemeFallback.set(!this.hasSavedThemeValue(rawTheme));
    this.selectedTheme.set(theme);
    this.currentProfile.update((profile) => ({
      ...profile,
      selectedTheme: theme,
      slug: response?.data?.profile?.slug ?? profile.slug,
      title: response?.data?.profile?.title ?? profile.title,
      name: response?.data?.profile?.display_name ?? response?.data?.name ?? profile.name,
      displayName: response?.data?.profile?.display_name ?? profile.displayName,
      brandName: response?.data?.profile?.brand_name ?? profile.brandName,
      brandLogo: response?.data?.profile?.brand_logo ?? profile.brandLogo,
      aboutText: response?.data?.profile?.about_text ?? profile.aboutText,
      contactData: response?.data?.profile?.contact_data ?? profile.contactData,
    }));

    return theme;
  }

  async updateTheme(slug: string, selectedTheme: PortfolioTheme, headers: HttpHeaders): Promise<PortfolioTheme> {
    const response = await firstValueFrom(
      this.http.put<{ success: boolean; message?: string; data: any }>(
        `${API_BASE_URL}/user/theme`,
        { slug, selectedTheme },
        { headers }
      )
    );

    const theme = this.normalizeTheme(
      response?.data?.selectedTheme ??
        response?.data?.selected_theme ??
        response?.data?.profile?.selectedTheme ??
        response?.data?.profile?.selected_theme ??
        selectedTheme
    );

    this.selectedTheme.set(theme);
    this.isUsingDefaultThemeFallback.set(false);
    this.currentProfile.update((profile) => ({
      ...profile,
      selectedTheme: theme,
      slug: response?.data?.profile?.slug ?? profile.slug,
      displayName: response?.data?.profile?.display_name ?? profile.displayName,
      brandName: response?.data?.profile?.brand_name ?? profile.brandName,
      brandLogo: response?.data?.profile?.brand_logo ?? profile.brandLogo,
      aboutText: response?.data?.profile?.about_text ?? profile.aboutText,
      contactData: response?.data?.profile?.contact_data ?? profile.contactData,
    }));

    return theme;
  }

  async loadPremiumGallery(slug?: string) {
    const normalizedSlug = this.normalizeSlug(slug);
    if (!normalizedSlug) {
      this.premiumGalleryData.set([]);
      return [];
    }

    try {
      const response = await firstValueFrom(
        this.http.get<{ resources?: any[] }>(this.getPremiumGalleryListUrl(normalizedSlug))
      );

      const rawItems = response?.resources ?? [];
      const gallery = Array.isArray(rawItems)
        ? rawItems.map((item: any) => this.mapCloudinaryGalleryItem(item, normalizedSlug))
        : [];

      this.premiumGalleryData.set(this.sortPremiumGallery(gallery));
      return this.premiumGalleryData();
    } catch {
      this.premiumGalleryData.set([]);
      return [];
    }
  }

  async uploadPremiumGalleryImageToCloudinary(
    file: File,
    options?: { slug?: string; title?: string; altText?: string; isFeatured?: boolean }
  ): Promise<string> {
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'your-cloud-name') {
      throw new Error('Cloudinary cloud name is not configured yet.');
    }

    if (!CLOUDINARY_UPLOAD_PRESET || CLOUDINARY_UPLOAD_PRESET === 'your-upload-preset') {
      throw new Error('Cloudinary upload preset is not configured yet.');
    }

    const formData = new FormData();
    const normalizedSlug = this.normalizeSlug(options?.slug);
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    if (normalizedSlug) {
      formData.append('folder', this.getPremiumGalleryFolder(normalizedSlug));
      formData.append('tags', this.getPremiumGalleryTag(normalizedSlug));

      const contextEntries = [
        ['title', options?.title?.trim() ?? ''],
        ['alt', options?.altText?.trim() ?? ''],
        ['slug', normalizedSlug],
        ['isFeatured', options?.isFeatured ? 'true' : 'false'],
      ].filter(([, value]) => Boolean(value));

      if (contextEntries.length) {
        formData.append(
          'context',
          contextEntries.map(([key, value]) => `${key}=${this.escapeCloudinaryContextValue(value)}`).join('|')
        );
      }
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Cloudinary upload failed.');
    }

    const data = await response.json();
    if (!data?.secure_url) {
      throw new Error('Cloudinary did not return an image URL.');
    }

    return data.secure_url;
  }

  async createPremiumGalleryItem(
    slug: string,
    payload: { imageUrl: string; title: string; altText: string; isFeatured?: boolean },
    headers?: HttpHeaders
  ) {
    void headers;
    const item = this.mapPremiumGalleryItem(
      {
        ...payload,
        slug,
        id: `${slug}-${Date.now()}`,
      },
      slug
    );

    this.premiumGalleryData.update((items) => this.sortPremiumGallery([...items, item]));
    return item;
  }

  async deletePremiumGalleryItem(slug: string, imageId: string | number, headers?: HttpHeaders) {
    void slug;
    void imageId;
    void headers;
    throw new Error('Direct Cloudinary gallery mode cannot delete images from the frontend. Delete them from Cloudinary Media Library.');
  }

  async updateAbout(payload: AboutData, headers: HttpHeaders): Promise<void> {
    const response = await this.http
      .put<{ success: boolean; data: any }>(`${API_BASE_URL}/about`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.about.set({
        bio: response.data.bio ?? '',
        description: response.data.description ?? '',
        yearsExperience: Number(response.data.yearsExperience ?? 0),
      });
    }
  }

  async updateContact(payload: ContactData, headers: HttpHeaders): Promise<void> {
    const response = await this.http
      .put<{ success: boolean; data: any }>(`${API_BASE_URL}/contact`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.contact.set({
        email: response.data.email ?? DEFAULT_CONTACT.email,
        phone: response.data.phone ?? DEFAULT_CONTACT.phone,
        location: response.data.location ?? DEFAULT_CONTACT.location,
        github: response.data.github ?? DEFAULT_CONTACT.github,
        linkedin: response.data.linkedin ?? DEFAULT_CONTACT.linkedin,
        medium: response.data.medium ?? DEFAULT_CONTACT.medium,
        tableau: response.data.tableau ?? DEFAULT_CONTACT.tableau,
        leetcode: response.data.leetcode ?? DEFAULT_CONTACT.leetcode,
        instagram: response.data.instagram ?? DEFAULT_CONTACT.instagram,
        youtube: response.data.youtube ?? DEFAULT_CONTACT.youtube,
        portfolio: response.data.portfolio ?? DEFAULT_CONTACT.portfolio,
      });
    }
  }

  async createSkill(payload: { name: string; category: string; level: number }, headers: HttpHeaders) {
    const response = await this.http
      .post<{ success: boolean; data: any }>(`${API_BASE_URL}/skills`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.skillsData.update((skills) => [...skills, this.mapSkill(response.data)]);
    }
  }

  async updateSkill(
    id: string | number,
    payload: { name: string; category: string; level: number },
    headers: HttpHeaders
  ) {
    const response = await this.http
      .put<{ success: boolean; data: any }>(`${API_BASE_URL}/skills/${id}`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.skillsData.update((skills) =>
        skills.map((skill) => (skill.id === id ? this.mapSkill(response.data) : skill))
      );
    }
  }

  async deleteSkill(id: string | number, headers: HttpHeaders) {
    await this.http.delete(`${API_BASE_URL}/skills/${id}`, { headers }).toPromise();
    this.skillsData.update((skills) => skills.filter((skill) => skill.id !== id));
  }

  async createProject(payload: any, headers: HttpHeaders) {
    const response = await this.http
      .post<{ success: boolean; data: any }>(`${API_BASE_URL}/projects`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.projectsData.update((projects) => [...projects, this.mapProject(response.data)]);
    }
  }

  async updateProject(id: string | number, payload: any, headers: HttpHeaders) {
    const response = await this.http
      .put<{ success: boolean; data: any }>(`${API_BASE_URL}/projects/${id}`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.projectsData.update((projects) =>
        projects.map((project) => (project.id === id ? this.mapProject(response.data) : project))
      );
    }
  }

  async deleteProject(id: string | number, headers: HttpHeaders) {
    await this.http.delete(`${API_BASE_URL}/projects/${id}`, { headers }).toPromise();
    this.projectsData.update((projects) => projects.filter((project) => project.id !== id));
  }

  async createExperience(payload: any, headers: HttpHeaders) {
    const response = await this.http
      .post<{ success: boolean; data: any }>(`${API_BASE_URL}/experience`, payload, { headers })
      .toPromise();

    if (response?.data) {
      this.experienceData.update((items) =>
        this.sortExperience([...items, this.mapExperience(response.data)])
      );
    }
  }

  async updateExperience(id: string | number, payload: any, headers: HttpHeaders) {
    const response = await this.http
      .put<{ success: boolean; data: any }>(`${API_BASE_URL}/experience/${id}`, payload, {
        headers,
      })
      .toPromise();

    if (response?.data) {
      this.experienceData.update((items) =>
        this.sortExperience(
          items.map((item) => (item.id === id ? this.mapExperience(response.data) : item))
        )
      );
    }
  }

  async deleteExperience(id: string | number, headers: HttpHeaders) {
    await this.http.delete(`${API_BASE_URL}/experience/${id}`, { headers }).toPromise();
    this.experienceData.update((items) => items.filter((item) => item.id !== id));
  }

  getAbout() {
    return this.http.get<{ success: boolean; message?: string; data: any }>(`${API_BASE_URL}/about`);
  }

  getContact() {
    return this.http.get<{ success: boolean; message?: string; data: any }>(`${API_BASE_URL}/contact`);
  }

  getSkillsList() {
    return this.http.get<{ success: boolean; message?: string; data: any[] }>(`${API_BASE_URL}/skills`);
  }

  getSkillById(id: string | number) {
    return this.http.get<{ success: boolean; message?: string; data: any }>(
      `${API_BASE_URL}/skills/${id}`
    );
  }

  getProjectsList() {
    return this.http.get<{ success: boolean; message?: string; data: any[] }>(`${API_BASE_URL}/projects`);
  }

  getProjectById(id: string | number) {
    return this.http.get<{ success: boolean; message?: string; data: any }>(
      `${API_BASE_URL}/projects/${id}`
    );
  }

  getExperienceList() {
    return this.http.get<{ success: boolean; message?: string; data: any[] }>(
      `${API_BASE_URL}/experience`
    );
  }

  getExperienceById(id: string | number) {
    return this.http.get<{ success: boolean; message?: string; data: any }>(
      `${API_BASE_URL}/experience/${id}`
    );
  }

  getSkillsByCategory(category: string) {
    return this.skillsData().filter((skill) => skill.category === category);
  }

  getFeaturedProjects() {
    return this.projectsData().filter((project) => project.featured);
  }

  getProjectsByTech(tech: string) {
    return this.projectsData().filter((project) =>
      project.technologies.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
    );
  }

  private mapSkill(skill: any): Skill {
    return {
      id: skill.id,
      name: skill.name ?? '',
      category: this.normalizeCategory(skill.category),
      level: Number(skill.level ?? 0),
    };
  }

  private mapProject(project: any): Project {
    return {
      id: project.id,
      title: project.title ?? '',
      description: project.description ?? '',
      image: project.image ?? '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.map((tech: any) =>
            typeof tech === 'string' ? tech : tech.technologyName ?? ''
          )
        : [],
      liveLink: project.liveLink ?? '',
      githubLink: project.githubLink ?? '',
      featured: Boolean(project.featured),
    };
  }

  private mapExperience(experience: any): Experience {
    return {
      id: experience.id,
      company: experience.company ?? '',
      position: experience.position ?? '',
      duration: experience.duration ?? '',
      description: experience.description ?? '',
      startDate: experience.startDate ?? '',
      endDate: experience.endDate ?? '',
    };
  }

  private sortExperience(items: Experience[]): Experience[] {
    return [...items].sort((a, b) => {
      const aIsCurrent = this.isCurrentExperience(a);
      const bIsCurrent = this.isCurrentExperience(b);

      if (aIsCurrent !== bIsCurrent) {
        return aIsCurrent ? -1 : 1;
      }

      const endDateDiff = this.toTimestamp(b.endDate) - this.toTimestamp(a.endDate);
      if (endDateDiff !== 0) {
        return endDateDiff;
      }

      return this.toTimestamp(b.startDate) - this.toTimestamp(a.startDate);
    });
  }

  private mapPremiumGalleryItem(item: any, fallbackSlug: string): PremiumGalleryImage {
    return {
      id: item.id ?? item._id ?? item.imageId ?? `${fallbackSlug}-${item.imageUrl ?? Math.random()}`,
      slug: item.slug ?? fallbackSlug,
      imageUrl: item.imageUrl ?? item.url ?? '',
      title: item.title ?? '',
      altText: item.altText ?? item.alt ?? '',
      sortOrder: Number(item.sortOrder ?? 0),
      isFeatured: Boolean(item.isFeatured),
    };
  }

  private mapCloudinaryGalleryItem(item: any, fallbackSlug: string): PremiumGalleryImage {
    const customContext = item?.context?.custom ?? {};

    return this.mapPremiumGalleryItem(
      {
        id: item.public_id ?? item.asset_id ?? item.asset_folder ?? item.secure_url,
        slug: customContext.slug ?? fallbackSlug,
        imageUrl: this.buildCloudinaryDeliveryUrl(item),
        title: customContext.title ?? item.display_name ?? '',
        altText: customContext.alt ?? '',
        sortOrder: this.toTimestamp(item.created_at),
        isFeatured: customContext.isFeatured === 'true',
      },
      fallbackSlug
    );
  }

  private sortPremiumGallery(items: PremiumGalleryImage[]) {
    return [...items].sort((a, b) => b.sortOrder - a.sortOrder);
  }

  private isCurrentExperience(item: Experience): boolean {
    const duration = item.duration.trim().toLowerCase();
    return !item.endDate || duration.includes('present') || duration.includes('current');
  }

  private toTimestamp(value: string): number {
    if (!value) {
      return 0;
    }

    const timestamp = new Date(value).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  private normalizeCategory(category: string): Skill['category'] {
    switch ((category ?? '').toLowerCase()) {
      case 'frontend':
      case 'front-end':
      case 'ui':
        return 'frontend';
      case 'backend':
      case 'back-end':
      case 'api':
        return 'backend';
      case 'database':
      case 'databases':
      case 'db':
        return 'database';
      case 'tools':
      case 'tooling':
      case 'platform':
      case 'platforms':
        return 'tools';
      case 'programming':
        return 'frontend';
      default:
        return 'tools';
    }
  }

  private normalizeSlug(profileSlug?: string): string {
    return (profileSlug ?? '').trim().toLowerCase();
  }

  private getPremiumGalleryFolder(slug: string): string {
    return `premium-gallery/${slug}`;
  }

  private getPremiumGalleryTag(slug: string): string {
    return `premium-gallery-${slug}`;
  }

  private getPremiumGalleryListUrl(slug: string): string {
    const tag = encodeURIComponent(this.getPremiumGalleryTag(slug));
    const cacheBuster = Date.now();
    return `https://res.cloudinary.com/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/list/${tag}.json?ts=${cacheBuster}`;
  }

  private buildCloudinaryDeliveryUrl(item: any): string {
    if (item?.secure_url) {
      return item.secure_url;
    }

    if (item?.url?.startsWith('https://')) {
      return item.url;
    }

    const publicId = item?.public_id ?? '';
    if (!publicId) {
      return item?.url ?? '';
    }

    const versionSegment = item?.version ? `/v${item.version}` : '';
    const formatSegment = item?.format ? `.${item.format}` : '';
    return `https://res.cloudinary.com/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/upload${versionSegment}/${publicId}${formatSegment}`;
  }

  private escapeCloudinaryContextValue(value: string): string {
    return value.replace(/[=|]/g, ' ').trim();
  }

  private mapPortfolioResponse(data: any, normalizedSlug: string): PortfolioData {
    const profileContact = data?.profile?.contact_data ?? data?.contact_data ?? {};
    const contact = data?.contact ?? data?.profile?.contact_data ?? data?.contact_data ?? {};
    const profile: ProfileData = {
      slug: data?.profile?.slug ?? normalizedSlug,
      name: data?.profile?.display_name ?? data?.profile?.name ?? data?.about?.name ?? '',
      title: data?.profile?.brand_name ?? data?.profile?.title ?? data?.about?.title ?? '',
      displayName: data?.profile?.display_name ?? data?.profile?.name ?? '',
      brandName: data?.profile?.brand_name ?? data?.profile?.title ?? '',
      brandLogo: data?.profile?.brand_logo ?? '',
      aboutText: data?.profile?.about_text ?? '',
      contactData: profileContact,
      selectedTheme: this.normalizeTheme(
        data?.profile?.selectedTheme ??
          data?.profile?.selected_theme ??
          data?.selectedTheme ??
          data?.selected_theme
      ),
    };

    return {
      profile,
      about: {
        bio: data?.about?.bio ?? data?.profile?.about_text ?? '',
        description: data?.about?.description ?? data?.profile?.about_text ?? '',
        yearsExperience: Number(data?.about?.yearsExperience ?? 0),
      },
      contact: {
        email: contact?.email ?? DEFAULT_CONTACT.email,
        phone: contact?.phone ?? DEFAULT_CONTACT.phone,
        location: contact?.location ?? DEFAULT_CONTACT.location,
        github: contact?.github ?? DEFAULT_CONTACT.github,
        linkedin: contact?.linkedin ?? DEFAULT_CONTACT.linkedin,
        medium: contact?.medium ?? DEFAULT_CONTACT.medium,
        tableau: contact?.tableau ?? DEFAULT_CONTACT.tableau,
        leetcode: contact?.leetcode ?? DEFAULT_CONTACT.leetcode,
        instagram: contact?.instagram ?? DEFAULT_CONTACT.instagram,
        youtube: contact?.youtube ?? DEFAULT_CONTACT.youtube,
        portfolio: contact?.portfolio ?? DEFAULT_CONTACT.portfolio,
      },
      skills: Array.isArray(data?.skills) ? data.skills.map((skill: any) => this.mapSkill(skill)) : [],
      projects: Array.isArray(data?.projects)
        ? data.projects.map((project: any) => this.mapProject(project))
        : [],
      experience: Array.isArray(data?.experience)
        ? this.sortExperience(
            data.experience.map((experience: any) => this.mapExperience(experience))
          )
        : [],
    };
  }

  private applyPortfolioData(portfolio: PortfolioData) {
    this.currentProfile.set(portfolio.profile);
    this.selectedTheme.set(portfolio.profile.selectedTheme);
    this.about.set(portfolio.about);
    this.contact.set(portfolio.contact);
    this.skillsData.set(portfolio.skills);
    this.projectsData.set(portfolio.projects);
    this.experienceData.set(portfolio.experience);
  }

  private normalizeTheme(theme?: string): PortfolioTheme {
    const normalizedTheme = (theme ?? '').trim().toLowerCase() as PortfolioTheme;

    if (isFreefolioTheme(normalizedTheme)) {
      return normalizedTheme;
    }

    switch (normalizedTheme) {
      case 'modern-minimal':
        return 'modern-minimal';
      case 'modern-dark':
        return 'developer-dark';
      case 'minimal-light':
        return 'modern-minimal';
      case 'creative-designer':
      case 'creator-orange':
        return 'creative-designer';
      case 'developer-dark':
        return 'developer-dark';
      case 'premium-signature':
        return 'premium-signature';
      case 'theme-5-boys':
      case 'theme-5':
        return 'theme-5-boys';
      case 'corporate-professional':
      case 'corporate-resume':
        return 'corporate-professional';
      case 'personal-branding':
        return 'personal-branding';
      default:
        return 'modern-minimal';
    }
  }

  private hasSavedThemeValue(theme?: string | null): boolean {
    return Boolean((theme ?? '').trim());
  }
}
