import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { PortfolioTheme } from '../models/portfolio.model';
import { ThemeModernMinimalComponent } from '../themes/modern-minimal/theme.component';
import { ThemeCreativeDesignerComponent } from '../themes/creative-designer/theme.component';
import { ThemeDeveloperDarkComponent } from '../themes/developer-dark/theme.component';
import { ThemeCorporateProfessionalComponent } from '../themes/corporate-professional/theme.component';
import { ThemePersonalBrandingComponent } from '../themes/personal-branding/theme.component';
import { Theme5Component } from './themes/theme5.component';
import { Theme6Component } from './themes/theme6.component';
import { ThemeFreefolioAnimeComponent } from '../themes/freefolio-anime/theme.component';
import { isFreefolioTheme } from '../themes/freefolio/freefolio-theme.registry';
import {
  buildThemePreviewData,
  isPagedPreviewTheme,
  normalizePreviewTheme,
} from './theme-selector/theme-preview.data';

@Component({
  selector: 'app-theme-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ThemeModernMinimalComponent,
    ThemeCreativeDesignerComponent,
    ThemeDeveloperDarkComponent,
    ThemeCorporateProfessionalComponent,
    ThemePersonalBrandingComponent,
    Theme5Component,
    Theme6Component,
    ThemeFreefolioAnimeComponent,
  ],
  template: `
    <div class="min-h-screen bg-slate-100 text-slate-900">
      <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Theme Preview</p>
            <h1 class="mt-1 text-2xl font-bold text-slate-900">{{ previewTitle() }}</h1>
            <p class="mt-2 text-sm text-slate-600">User pehle preview dekh sakta hai, phir admin dashboard se theme apply kar sakta hai.</p>
          </div>

          <div class="flex flex-wrap gap-3">
            <a routerLink="/admin/dashboard" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Back to dashboard
            </a>
          </div>
        </div>

        @if (isPagedTheme()) {
          <div class="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 pb-4 sm:px-6 lg:px-8">
            @for (item of previewPages(); track item.id) {
              <a
                [routerLink]="['/theme-preview', rawThemeId()]"
                [queryParams]="{ page: item.id }"
                class="rounded-full border px-4 py-2 text-sm font-semibold transition"
                [ngClass]="previewPage() === item.id ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'"
              >
                {{ item.label }}
              </a>
            }
          </div>
        }
      </header>

      <main>
        <div class="pointer-events-none select-none">
          @if (renderTheme() === 'freefolio-anime') {
            <app-freefolio-anime-theme [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-freefolio-anime-theme>
          } @else if (isFreefolioTheme(renderTheme())) {
            <div class="mx-auto max-w-3xl px-4 py-16 text-center text-slate-600">
              This legacy Freefolio theme is temporarily hidden while it is being rebuilt in Angular.
            </div>
          } @else {
            <div [ngSwitch]="renderTheme()">
              <app-modern-minimal-theme *ngSwitchCase="'modern-minimal'" [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-modern-minimal-theme>
              <app-creative-designer-theme *ngSwitchCase="'creative-designer'" [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-creative-designer-theme>
              <app-developer-dark-theme *ngSwitchCase="'developer-dark'" [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-developer-dark-theme>
              <app-corporate-professional-theme *ngSwitchCase="'corporate-professional'" [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-corporate-professional-theme>
              <app-personal-branding-theme *ngSwitchCase="'personal-branding'" [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-personal-branding-theme>
              <app-theme5 *ngSwitchCase="'theme-5-boys'" [data]="previewData()"></app-theme5>
              <app-theme6 *ngSwitchCase="'premium-signature'" [data]="previewData()"></app-theme6>
              <app-modern-minimal-theme *ngSwitchDefault [data]="previewData()" [profileSlug]="previewSlug()" [page]="previewPage()"></app-modern-minimal-theme>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePreviewComponent {
  private route = inject(ActivatedRoute);

  private readonly defaultPreviewPages = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  private readonly animePreviewPages = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  private themeParam = toSignal(
    this.route.paramMap.pipe(map((params) => (params.get('themeId') as PortfolioTheme | null) ?? 'modern-minimal')),
    { initialValue: 'modern-minimal' as PortfolioTheme }
  );

  private pageParam = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('page') ?? 'home')), {
    initialValue: 'home',
  });

  protected rawThemeId = computed(() => this.themeParam());
  protected renderTheme = computed(() => normalizePreviewTheme(this.rawThemeId()));
  protected previewData = computed(() => buildThemePreviewData(this.rawThemeId()));
  protected previewSlug = computed(() => this.previewData().profile.slug);
  protected previewTitle = computed(() => `${this.renderTheme()} preview`);
  protected isPagedTheme = computed(() => isPagedPreviewTheme(this.rawThemeId()));
  protected previewPages = computed(() =>
    this.renderTheme() === 'freefolio-anime' ? this.animePreviewPages : this.defaultPreviewPages
  );
  protected previewPage = computed(() => (this.isPagedTheme() ? this.pageParam() : 'home'));
  protected isFreefolioTheme = isFreefolioTheme;
}
