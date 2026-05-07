import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioTheme } from '../../models/portfolio.model';
import { FREEFOLIO_THEMES } from '../../themes/freefolio/freefolio-theme.registry';

type ThemePreview = {
  id: PortfolioTheme;
  name: string;
  badge: string;
  summary: string;
  accent: string;
  surface: string;
  previewClasses: string[];
  previewImage?: string;
};

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.32em] text-orange-500">Layout Studio</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Choose your public page layout</h2>
          <p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Jo layout yahan select hoga, wahi aapke public page par render hoga.
          </p>
        </div>
        <div class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
          Active layout: <span class="text-slate-950 dark:text-white">{{ activeTheme() }}</span>
        </div>
      </div>

      <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        @for (theme of previews; track theme.id) {
          <article
            class="rounded-[1.75rem] border p-4 transition-all duration-200"
            [ngClass]="
              activeTheme() === theme.id
                ? 'border-orange-400 bg-white shadow-xl dark:bg-slate-900/80'
                : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900/80'
            "
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ theme.name }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ theme.summary }}</p>
                @if (isPremiumTheme(theme.id)) {
                  <p class="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Premium theme
                    @if (!hasPremiumAccess()) {
                      • Unlock for INR {{ premiumPrice() }}
                    }
                  </p>
                }
              </div>
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white"
                [style.background]="theme.accent"
              >
                {{ theme.badge }}
              </span>
            </div>

            <div class="mt-4 overflow-hidden rounded-[1.5rem] p-4" [style.background]="theme.surface">
              @if (theme.previewImage) {
                <img [src]="theme.previewImage" [alt]="theme.name" class="h-40 w-full rounded-[1.1rem] object-cover" />
              } @else {
                <div class="space-y-3">
                  @for (previewClass of theme.previewClasses; track previewClass) {
                    <div class="rounded-full bg-white/80 dark:bg-white/10" [class]="previewClass"></div>
                  }
                </div>
              }
            </div>

            <button
              type="button"
              class="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-colors"
              [ngClass]="
                activeTheme() === theme.id
                  ? 'bg-orange-500'
                  : isPremiumTheme(theme.id) && !hasPremiumAccess()
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400'
                    : 'bg-slate-950 hover:bg-slate-800'
              "
              [disabled]="isSaving()"
              (click)="themeSelected.emit(theme.id)"
            >
              {{
                activeTheme() === theme.id
                  ? 'Current layout'
                  : isPremiumTheme(theme.id) && !hasPremiumAccess()
                    ? 'View Premium Access'
                    : 'Use this layout'
              }}
            </button>
          </article>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  activeTheme = input<PortfolioTheme>('modern-dark');
  isSaving = input(false);
  premiumPrice = input(1499);
  hasPremiumAccess = input(false);
  themeSelected = output<PortfolioTheme>();

  protected premiumThemes: PortfolioTheme[] = ['premium-signature', 'theme-5-boys'];

  protected isPremiumTheme(themeId: PortfolioTheme) {
    return this.premiumThemes.includes(themeId);
  }

  protected previews: ThemePreview[] = [
    {
      id: 'modern-dark',
      name: 'Modern Dark',
      badge: 'MD',
      summary: 'Minimal dark presentation with a sharp shell and clean hierarchy.',
      accent: '#f97316',
      surface: 'linear-gradient(135deg, #0f172a, #111827)',
      previewClasses: ['h-3 w-24', 'h-14 w-full rounded-3xl', 'h-3 w-36', 'h-3 w-28'],
    },
    {
      id: 'minimal-light',
      name: 'Minimal Light',
      badge: 'ML',
      summary: 'Lightweight portfolio layout with open spacing and modern cards.',
      accent: '#ec4899',
      surface: 'linear-gradient(135deg, #fdf2f8, #fae8ff)',
      previewClasses: ['h-12 w-12 rounded-2xl', 'h-3 w-28', 'h-20 w-full rounded-[1.5rem]', 'h-3 w-20'],
    },
    {
      id: 'corporate-resume',
      name: 'Corporate Resume',
      badge: 'CR',
      summary: 'Structured professional layout focused on trust and clarity.',
      accent: '#0f766e',
      surface: 'linear-gradient(135deg, #ecfeff, #f0fdf4)',
      previewClasses: ['h-4 w-40', 'h-3 w-24', 'h-10 w-full rounded-xl', 'h-10 w-full rounded-xl'],
    },
    {
      id: 'creator-orange',
      name: 'Creator Orange',
      badge: 'CO',
      summary: 'Bold visual layout with dark gradients, spotlight stats, and direct contact CTA.',
      accent: '#f97316',
      surface: 'linear-gradient(135deg, #1e293b, #0f172a)',
      previewClasses: ['h-3 w-20', 'h-16 w-full rounded-[1.5rem]', 'h-10 w-10 rounded-2xl', 'h-3 w-32'],
    },
    {
      id: 'theme-5',
      name: 'Theme 5',
      badge: 'T5',
      summary: 'Editorial presentation style with a cream canvas, bold typography, and an illustrated hero.',
      accent: '#111111',
      surface: 'linear-gradient(135deg, #f8f4ec, #efe6d5)',
      previewClasses: ['h-4 w-28', 'h-20 w-full rounded-[1.5rem]', 'h-24 w-16 rounded-[1.25rem]', 'h-3 w-24'],
    },
    {
      id: 'premium-signature',
      name: 'Premium Signature',
      badge: 'PS',
      summary: 'Premium presentation with rich dark panels, elegant metrics, and polished showcase blocks.',
      accent: '#c8a56a',
      surface: 'linear-gradient(135deg, #111827, #1f2937)',
      previewClasses: ['h-4 w-24', 'h-16 w-full rounded-[1.4rem]', 'h-8 w-20 rounded-full', 'h-3 w-32'],
    },
    {
      id: 'theme-5-boys',
      name: 'Theme 5 Boys',
      badge: 'TB',
      summary: 'Theme 5 inspired editorial layout with the boys avatar from local assets.',
      accent: '#1d4ed8',
      surface: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      previewClasses: ['h-4 w-28', 'h-20 w-full rounded-[1.5rem]', 'h-24 w-16 rounded-[1.25rem]', 'h-3 w-24'],
    },
    ...FREEFOLIO_THEMES.map((theme) => ({
      id: theme.id,
      name: theme.name,
      badge: theme.badge,
      summary: theme.summary,
      accent: theme.accent,
      surface: theme.surface,
      previewClasses: [],
      previewImage: theme.previewImage,
    })),
  ];
}
