import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioData, PortfolioTheme } from '../../models/portfolio.model';
import { ThemeModernMinimalComponent } from '../../themes/modern-minimal/theme.component';
import { ThemeCreativeDesignerComponent } from '../../themes/creative-designer/theme.component';
import { ThemeDeveloperDarkComponent } from '../../themes/developer-dark/theme.component';
import { ThemeCorporateProfessionalComponent } from '../../themes/corporate-professional/theme.component';
import { ThemePersonalBrandingComponent } from '../../themes/personal-branding/theme.component';
import { Theme5Component } from '../themes/theme5.component';
import { Theme6Component } from '../themes/theme6.component';
import { PlatformAdminService } from '../../services/platform-admin.service';
import { FreefolioThemeComponent } from '../../themes/freefolio/theme.component';
import { isFreefolioTheme } from '../../themes/freefolio/freefolio-theme.registry';
import { toFreefolioThemeData } from '../../themes/freefolio/freefolio-theme.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ThemeModernMinimalComponent,
    ThemeCreativeDesignerComponent,
    ThemeDeveloperDarkComponent,
    ThemeCorporateProfessionalComponent,
    ThemePersonalBrandingComponent,
    Theme5Component,
    Theme6Component,
    FreefolioThemeComponent,
  ],
  template: `
    @if (isLoading()) {
      <div class="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div class="rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-5 text-center">
          <p class="text-sm uppercase tracking-[0.3em] text-sky-300">Loading</p>
          <p class="mt-3 text-lg font-semibold">Fetching portfolio theme and profile data...</p>
        </div>
      </div>
    } @else if (error()) {
      <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div class="max-w-lg rounded-[1.75rem] border border-red-200 bg-white p-8 text-center shadow-sm">
          <p class="text-sm uppercase tracking-[0.3em] text-red-500">Unable to load</p>
          <h2 class="mt-3 text-2xl font-bold text-slate-950">Portfolio data could not be rendered.</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">{{ error() }}</p>
        </div>
      </div>
    } @else if (portfolioData(); as portfolio) {
      @if (isFreefolioTheme(portfolio.profile.selectedTheme)) {
        <app-freefolio-theme [themeId]="portfolio.profile.selectedTheme" [data]="freefolioData(portfolio)"></app-freefolio-theme>
      } @else {
        <div [ngSwitch]="portfolio.profile.selectedTheme">
          <app-modern-minimal-theme *ngSwitchCase="'modern-minimal'" [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-modern-minimal-theme>
          <app-creative-designer-theme *ngSwitchCase="'creative-designer'" [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-creative-designer-theme>
          <app-developer-dark-theme *ngSwitchCase="'developer-dark'" [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-developer-dark-theme>
          <app-corporate-professional-theme *ngSwitchCase="'corporate-professional'" [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-corporate-professional-theme>
          <app-personal-branding-theme *ngSwitchCase="'personal-branding'" [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-personal-branding-theme>
          <app-theme5 *ngSwitchCase="'theme-5'" [data]="portfolio"></app-theme5>
          <app-theme5 *ngSwitchCase="'theme-5-boys'" [data]="portfolio"></app-theme5>
          <app-theme6 *ngSwitchCase="'premium-signature'" [data]="portfolio"></app-theme6>
          <app-modern-minimal-theme *ngSwitchDefault [data]="portfolio" [profileSlug]="profileSlug()" [page]="page()"></app-modern-minimal-theme>
        </div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private portfolioService = inject(PortfolioService);
  private requestId = 0;

  profileSlug = input.required<string>();
  page = input.required<string>();

  portfolioData = signal<PortfolioData | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const slug = this.profileSlug();
      void this.fetchPortfolio(slug);
    });
  }

  private async fetchPortfolio(slug: string) {
    const currentRequestId = ++this.requestId;
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const data = await this.portfolioService.getUserProfile(slug);
      if (currentRequestId !== this.requestId) {
        return;
      }
      await this.portfolioService.loadPremiumGallery(data.profile.slug || slug);
      if (currentRequestId !== this.requestId) {
        return;
      }
      this.portfolioData.set(data);
    } catch (error: any) {
      if (currentRequestId !== this.requestId) {
        return;
      }
      this.error.set(error?.error?.message ?? error?.message ?? 'Unable to load portfolio profile.');
      this.portfolioData.set(null);
    } finally {
      if (currentRequestId !== this.requestId) {
        return;
      }
      this.isLoading.set(false);
    }
  }

  private isPremiumTheme(theme: PortfolioTheme) {
    return theme === 'premium-signature' || theme === 'theme-5-boys';
  }

  protected isFreefolioTheme = isFreefolioTheme;
  protected freefolioData = toFreefolioThemeData;
}
