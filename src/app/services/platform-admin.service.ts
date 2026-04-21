import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL, CLOUDINARY_CLOUD_NAME } from '../config/api.config';

export type PlatformFeatureSettings = {
  imageGalleryEnabled: boolean;
  eLearningEnabled: boolean;
  premiumThemePrice: number;
};

export type PlatformAnalytics = {
  totalSignups: number | null;
  activePortfolios: number | null;
  totalPremiumImages: number | null;
  lastUpdatedAt: string | null;
  source: 'api' | 'local';
};

const SUPER_ADMIN_EMAIL = 'sharmamahima0510@gmail.com';
const SETTINGS_STORAGE_KEY = 'portfolio_platform_settings';
const PREMIUM_UNLOCKS_STORAGE_KEY = 'portfolio_premium_unlocks';
const DEFAULT_SETTINGS: PlatformFeatureSettings = {
  imageGalleryEnabled: true,
  eLearningEnabled: true,
  premiumThemePrice: 1499,
};

type PremiumUnlockRecord = Record<
  string,
  {
    unlocked: boolean;
    amountPaid: number;
    unlockedAt: string;
  }
>;

@Injectable({ providedIn: 'root' })
export class PlatformAdminService {
  private http = inject(HttpClient);

  settings = signal<PlatformFeatureSettings>(this.readStoredSettings());
  analytics = signal<PlatformAnalytics>({
    totalSignups: null,
    activePortfolios: null,
    totalPremiumImages: null,
    lastUpdatedAt: null,
    source: 'local',
  });
  isLoading = signal(false);
  error = signal<string | null>(null);

  isSuperAdminEmail(email?: string | null) {
    return (email ?? '').trim().toLowerCase() === SUPER_ADMIN_EMAIL;
  }

  imageGalleryEnabled = computed(() => this.settings().imageGalleryEnabled);
  eLearningEnabled = computed(() => this.settings().eLearningEnabled);
  premiumThemePrice = computed(() => this.settings().premiumThemePrice);

  async loadPlatformOverview(headers?: HttpHeaders, profileSlug?: string) {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const [settings, analytics] = await Promise.all([
        this.fetchSettings(headers),
        this.fetchAnalytics(headers),
      ]);

      if (settings) {
        this.settings.set(settings);
        this.persistSettings(settings);
      }

      if (analytics) {
        this.analytics.set({
          ...analytics,
          source: 'api',
        });
      } else {
        this.analytics.set(await this.buildLocalAnalytics(profileSlug));
      }
    } catch (error: any) {
      this.error.set(error?.message ?? 'Platform insights could not be loaded from the server.');
      this.analytics.set(await this.buildLocalAnalytics(profileSlug));
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateSettings(nextSettings: PlatformFeatureSettings, headers?: HttpHeaders) {
    this.settings.set(nextSettings);
    this.persistSettings(nextSettings);
    this.analytics.update((analytics) => ({
      ...analytics,
      lastUpdatedAt: new Date().toISOString(),
    }));

    try {
      const response = await firstValueFrom(
        this.http.put<{ success?: boolean; data?: any }>(
          `${API_BASE_URL}/admin/platform-settings`,
          nextSettings,
          { headers }
        )
      );

      const savedSettings = this.mapSettingsPayload(response?.data);
      if (savedSettings) {
        this.settings.set(savedSettings);
        this.persistSettings(savedSettings);
      }
    } catch {
      this.error.set('Settings saved in this browser. Add backend endpoints to sync them for all users.');
    }
  }

  private async fetchSettings(headers?: HttpHeaders) {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success?: boolean; data?: any }>(`${API_BASE_URL}/admin/platform-settings`, {
          headers,
        })
      );

      return this.mapSettingsPayload(response?.data);
    } catch {
      return null;
    }
  }

  private async fetchAnalytics(headers?: HttpHeaders) {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success?: boolean; data?: any }>(`${API_BASE_URL}/admin/analytics`, {
          headers,
        })
      );

      return this.mapAnalyticsPayload(response?.data);
    } catch {
      return null;
    }
  }

  private mapSettingsPayload(data: any): PlatformFeatureSettings | null {
    if (!data) {
      return null;
    }

    return {
      imageGalleryEnabled: Boolean(data.imageGalleryEnabled ?? data.image_gallery_enabled ?? true),
      eLearningEnabled: Boolean(data.eLearningEnabled ?? data.e_learning_enabled ?? true),
      premiumThemePrice: this.toPositiveNumber(
        data.premiumThemePrice ?? data.premium_theme_price ?? DEFAULT_SETTINGS.premiumThemePrice,
        DEFAULT_SETTINGS.premiumThemePrice
      ),
    };
  }

  private mapAnalyticsPayload(data: any): PlatformAnalytics | null {
    if (!data) {
      return null;
    }

    return {
      totalSignups: this.toNullableNumber(data.totalSignups ?? data.total_signups ?? data.signupCount),
      activePortfolios: this.toNullableNumber(
        data.activePortfolios ?? data.active_portfolios ?? data.portfolioCount
      ),
      totalPremiumImages: this.toNullableNumber(
        data.totalPremiumImages ?? data.total_premium_images ?? data.premiumImageCount
      ),
      lastUpdatedAt: data.lastUpdatedAt ?? data.last_updated_at ?? new Date().toISOString(),
      source: 'api',
    };
  }

  private async buildLocalAnalytics(profileSlug?: string): Promise<PlatformAnalytics> {
    const slugs = await this.fetchPortfolioSlugs(profileSlug);
    const portfolioCount = slugs.length || null;
    const imageCount = await this.fetchPremiumImageCount(slugs);

    return {
      totalSignups: portfolioCount,
      activePortfolios: portfolioCount,
      totalPremiumImages: imageCount,
      lastUpdatedAt: new Date().toISOString(),
      source: 'local',
    };
  }

  private async fetchPortfolioSlugs(profileSlug?: string): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success?: boolean; data?: any }>(`${API_BASE_URL}/portfolio`)
      );

      const slugs = this.extractSlugs(response?.data);
      if (slugs.length) {
        return slugs;
      }

      const fallbackSlug = (profileSlug ?? '').trim().toLowerCase();
      return fallbackSlug ? [fallbackSlug] : [];
    } catch {
      const fallbackSlug = (profileSlug ?? '').trim().toLowerCase();
      return fallbackSlug ? [fallbackSlug] : [];
    }
  }

  private async fetchPremiumImageCount(slugs: string[]): Promise<number | null> {
    const normalizedSlugs = [...new Set(slugs.map((slug) => slug.trim().toLowerCase()).filter(Boolean))];
    if (!normalizedSlugs.length || !CLOUDINARY_CLOUD_NAME) {
      return null;
    }

    try {
      const responses = await Promise.all(
        normalizedSlugs.map(async (slug) => {
          const tag = encodeURIComponent(`premium-gallery-${slug}`);
          try {
            return await firstValueFrom(
              this.http.get<{ resources?: any[] }>(
                `https://res.cloudinary.com/${encodeURIComponent(CLOUDINARY_CLOUD_NAME)}/image/list/${tag}.json?ts=${Date.now()}`
              )
            );
          } catch {
            return { resources: [] };
          }
        })
      );

      return responses.reduce((total, response) => {
        return total + (Array.isArray(response?.resources) ? response.resources.length : 0);
      }, 0);
    } catch {
      return null;
    }
  }

  private readStoredSettings(): PlatformFeatureSettings {
    if (typeof localStorage === 'undefined') {
      return DEFAULT_SETTINGS;
    }

    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return DEFAULT_SETTINGS;
      }

      const parsed = JSON.parse(raw);
      return {
        imageGalleryEnabled: parsed.imageGalleryEnabled !== false,
        eLearningEnabled: parsed.eLearningEnabled !== false,
        premiumThemePrice: this.toPositiveNumber(
          parsed.premiumThemePrice,
          DEFAULT_SETTINGS.premiumThemePrice
        ),
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  private persistSettings(settings: PlatformFeatureSettings) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }

  private toNullableNumber(value: unknown) {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
  }

  hasPremiumAccess(slug?: string | null) {
    const normalizedSlug = (slug ?? '').trim().toLowerCase();
    if (!normalizedSlug) {
      return false;
    }

    const unlocks = this.readPremiumUnlocks();
    return Boolean(unlocks[normalizedSlug]?.unlocked);
  }

  unlockPremiumAccess(slug: string, amountPaid?: number) {
    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) {
      return;
    }

    const unlocks = this.readPremiumUnlocks();
    unlocks[normalizedSlug] = {
      unlocked: true,
      amountPaid: this.toPositiveNumber(amountPaid, this.premiumThemePrice()),
      unlockedAt: new Date().toISOString(),
    };
    this.persistPremiumUnlocks(unlocks);
  }

  getPremiumUnlockDetails(slug?: string | null) {
    const normalizedSlug = (slug ?? '').trim().toLowerCase();
    if (!normalizedSlug) {
      return null;
    }

    return this.readPremiumUnlocks()[normalizedSlug] ?? null;
  }

  private extractCollectionLength(data: any): number | null {
    if (Array.isArray(data)) {
      return data.length;
    }

    if (Array.isArray(data?.items)) {
      return data.items.length;
    }

    if (Array.isArray(data?.rows)) {
      return data.rows.length;
    }

    if (Array.isArray(data?.portfolios)) {
      return data.portfolios.length;
    }

    if (Array.isArray(data?.users)) {
      return data.users.length;
    }

    return null;
  }

  private extractSlugs(data: any): string[] {
    const collections = [
      Array.isArray(data) ? data : null,
      Array.isArray(data?.items) ? data.items : null,
      Array.isArray(data?.rows) ? data.rows : null,
      Array.isArray(data?.portfolios) ? data.portfolios : null,
      Array.isArray(data?.users) ? data.users : null,
    ].filter(Array.isArray) as any[][];

    for (const collection of collections) {
      const slugs = collection
        .map((item) =>
          item?.slug ??
          item?.profile?.slug ??
          item?.portfolio?.slug ??
          item?.username
        )
        .map((slug) => String(slug ?? '').trim().toLowerCase())
        .filter(Boolean);

      if (slugs.length) {
        return [...new Set(slugs)];
      }
    }

    return [];
  }

  private readPremiumUnlocks(): PremiumUnlockRecord {
    if (typeof localStorage === 'undefined') {
      return {};
    }

    try {
      const raw = localStorage.getItem(PREMIUM_UNLOCKS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private persistPremiumUnlocks(unlocks: PremiumUnlockRecord) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(PREMIUM_UNLOCKS_STORAGE_KEY, JSON.stringify(unlocks));
  }

  private toPositiveNumber(value: unknown, fallback: number) {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : fallback;
  }
}
