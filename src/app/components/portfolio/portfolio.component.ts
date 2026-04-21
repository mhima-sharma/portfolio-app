import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioData, PortfolioTheme } from '../../models/portfolio.model';
import { Theme1Component } from '../themes/theme1.component';
import { Theme2Component } from '../themes/theme2.component';
import { Theme3Component } from '../themes/theme3.component';
import { Theme4Component } from '../themes/theme4.component';
import { Theme5Component } from '../themes/theme5.component';
import { Theme6Component } from '../themes/theme6.component';
import { Theme7Component } from '../themes/theme7.component';
import { PlatformAdminService } from '../../services/platform-admin.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, Theme1Component, Theme2Component, Theme3Component, Theme4Component, Theme5Component, Theme6Component, Theme7Component],
  template: `
    @if (isLoading()) {
      <div class="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div class="rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-5 text-center">
          <p class="text-sm uppercase tracking-[0.3em] text-orange-300">Loading</p>
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
      <div [ngSwitch]="portfolio.profile.selectedTheme">
        <app-theme1 *ngSwitchCase="'modern-dark'" [data]="portfolio"></app-theme1>
        <app-theme2 *ngSwitchCase="'minimal-light'" [data]="portfolio"></app-theme2>
        <app-theme3 *ngSwitchCase="'corporate-resume'" [data]="portfolio"></app-theme3>
        <app-theme4 *ngSwitchCase="'creator-orange'" [data]="portfolio"></app-theme4>
        <app-theme5 *ngSwitchCase="'theme-5'" [data]="portfolio"></app-theme5>
        <app-theme6 *ngSwitchCase="'premium-signature'" [data]="portfolio"></app-theme6>
        <app-theme7 *ngSwitchCase="'theme-5-boys'" [data]="portfolio"></app-theme7>
        <app-theme1 *ngSwitchDefault [data]="portfolio"></app-theme1>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private portfolioService = inject(PortfolioService);
  private platformAdmin = inject(PlatformAdminService);
  private requestId = 0;

  profileSlug = input('');

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
      const portfolio = this.enforcePremiumThemeAccess(data);
      await this.portfolioService.loadPremiumGallery(data.profile.slug || slug);
      if (currentRequestId !== this.requestId) {
        return;
      }
      this.portfolioData.set(portfolio);
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

  private enforcePremiumThemeAccess(portfolio: PortfolioData): PortfolioData {
    if (
      this.isPremiumTheme(portfolio.profile.selectedTheme) &&
      !this.platformAdmin.hasPremiumAccess(portfolio.profile.slug)
    ) {
      return {
        ...portfolio,
        profile: {
          ...portfolio.profile,
          selectedTheme: 'modern-dark',
        },
      };
    }

    return portfolio;
  }

  private isPremiumTheme(theme: PortfolioTheme) {
    return theme === 'premium-signature' || theme === 'theme-5-boys';
  }
}
