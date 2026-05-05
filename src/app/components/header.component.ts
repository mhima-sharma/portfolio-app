import { Component, signal, ChangeDetectionStrategy, effect, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-dark-700 dark:bg-dark-950/90">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 text-white shadow-sm">
            {{ displayInitial() }}
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ displayName() }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Modern portfolio</p>
          </div>
        </div>

        <nav class="hidden items-center gap-6 md:flex">
          <a routerLink="/" routerLinkActive="active-nav-link" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">Home</a>
          <a routerLink="/about" routerLinkActive="active-nav-link" class="nav-link">About</a>
          <a routerLink="/projects" routerLinkActive="active-nav-link" class="nav-link">Projects</a>
          <a routerLink="/experience" routerLinkActive="active-nav-link" class="nav-link">Experience</a>
          <a routerLink="/contact" routerLinkActive="active-nav-link" class="nav-link">Contact</a>
        </nav>

        <div class="flex items-center gap-3">
          <button
            type="button"
            (click)="toggleTheme()"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition hover:bg-slate-200 dark:bg-dark-800 dark:text-slate-100 dark:hover:bg-dark-700"
            [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            {{ isDark() ? '☀️' : '🌙' }}
          </button>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition hover:bg-slate-200 dark:bg-dark-800 dark:text-slate-100 dark:hover:bg-dark-700 md:hidden"
            (click)="toggleMobileMenu()"
          >
            {{ isMobileMenuOpen() ? '✕' : '☰' }}
          </button>
        </div>
      </div>

      <div *ngIf="isMobileMenuOpen()" class="md:hidden border-t border-slate-200/80 bg-white/95 px-4 py-4 dark:border-dark-700 dark:bg-dark-950/95">
        <div class="flex flex-col gap-3">
          <a routerLink="/" (click)="toggleMobileMenu()" class="nav-link">Home</a>
          <a routerLink="/about" (click)="toggleMobileMenu()" class="nav-link">About</a>
          <a routerLink="/projects" (click)="toggleMobileMenu()" class="nav-link">Projects</a>
          <a routerLink="/experience" (click)="toggleMobileMenu()" class="nav-link">Experience</a>
          <a routerLink="/contact" (click)="toggleMobileMenu()" class="nav-link">Contact</a>
        </div>
      </div>
    </header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private portfolioService = inject(PortfolioService);

  isMobileMenuOpen = signal(false);
  isDark = signal(this.initializeDarkMode());
  displayName = computed(
    () =>
      this.portfolioService.currentProfile().name?.trim() ||
      this.authService.admin()?.name?.trim() ||
      'Portfolio'
  );
  displayInitial = computed(() => this.displayName().charAt(0).toUpperCase() || 'P');

  constructor() {
    effect(() => {
      const isDarkMode = this.isDark();
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }

  private initializeDarkMode(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
  }
}
