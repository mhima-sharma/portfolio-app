import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PortfolioService } from '../services/portfolio.service';
import { AuthService } from '../services/auth.service';
import { IconComponent } from './ui/icon.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    @if (isAdminView()) {
      <div class="admin-shell" [style.--resume-accent]="accentColor()">
        @if (isSidebarOpen()) {
          <button type="button" class="admin-sidebar-backdrop" (click)="closeSidebar()" aria-label="Close menu"></button>
        }

        <aside class="admin-sidebar" [class.is-open]="isSidebarOpen()">
          <div class="admin-brand">
            <div class="admin-brand__badge">PM</div>
            <div>
              <p class="admin-brand__eyebrow">Workspace</p>
              <h1 class="admin-brand__title">Portfolio Studio</h1>
              <p class="admin-brand__copy">Manage your public profile, content, and presentation from one place.</p>
            </div>
          </div>

          <nav class="admin-nav">
            <button type="button" class="admin-nav__item" (click)="goToAdminDashboard()">
              <span class="admin-nav__icon"><app-icon name="dashboard" [size]="18"></app-icon></span>
              <span>
                <span class="admin-nav__label">Dashboard</span>
                <span class="admin-nav__hint">Overview and quick actions.</span>
              </span>
            </button>

            <button type="button" class="admin-nav__item" (click)="goToCreatePortfolio()">
              <span class="admin-nav__icon"><app-icon name="layers" [size]="18"></app-icon></span>
              <span>
                <span class="admin-nav__label">Content Setup</span>
                <span class="admin-nav__hint">Manage the guided setup.</span>
              </span>
            </button>

            <button type="button" class="admin-nav__item active" (click)="goToResumeView()">
              <span class="admin-nav__icon"><app-icon name="file-text" [size]="18"></app-icon></span>
              <span>
                <span class="admin-nav__label">Resume</span>
                <span class="admin-nav__hint">Review and export the resume.</span>
              </span>
            </button>
          </nav>

          <div class="sidebar-actions">
            <button class="btn-secondary w-full" type="button" (click)="goToPortfolio()">Open Public Page</button>
            <button class="btn-primary w-full" type="button" (click)="authService.logout()">Logout</button>
          </div>
        </aside>

        <main class="admin-main">
          <header class="admin-topbar print:hidden">
            <div class="admin-topbar__menu">
              <button type="button" class="mobile-menu-btn" (click)="toggleSidebar()" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div>
              <p class="admin-topbar__eyebrow">Resume</p>
              <h2 class="admin-topbar__title">Resume Preview</h2>
              <p class="admin-topbar__copy">Preview, print and export your resume from one place.</p>
            </div>
          </header>

          <ng-container [ngTemplateOutlet]="resumeWorkspace"></ng-container>
        </main>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="resumeWorkspace"></ng-container>
    }

    <ng-template #resumeWorkspace>
      <div class="min-h-screen bg-slate-200 py-6 print:bg-white print:py-0" [style.--resume-accent]="accentColor()">
        <div class="resume-toolbar max-w-6xl mx-auto px-4 sm:px-6 pb-6 print:hidden">
          <div class="resume-toolbar__inner flex flex-wrap gap-3 justify-between items-center">
            <div class="resume-toolbar__actions flex flex-wrap items-center gap-3">
              @if (!isAdminView()) {
                <a [routerLink]="portfolioHomeLink()" class="btn-secondary">Back to Portfolio</a>
              }
              <button class="btn-primary" (click)="downloadResume()">Download Resume</button>
            </div>

            <div class="resume-color-panel flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <label class="text-sm font-medium text-slate-700">Resume Color</label>
              <div class="flex items-center gap-2">
                @for (preset of colorPresets; track preset) {
                  <button
                    type="button"
                    class="h-7 w-7 rounded-full border border-white shadow ring-1 ring-black/10"
                    [style.background]="preset"
                    (click)="accentColor.set(preset)"
                    [attr.aria-label]="'Use resume color ' + preset"
                  ></button>
                }
              </div>
              <input
                type="color"
                [ngModel]="accentColor()"
                (ngModelChange)="accentColor.set($event)"
                class="h-10 w-12 cursor-pointer rounded border border-slate-300 bg-white p-1"
              />
            </div>
          </div>
        </div>

        <main class="resume-paper max-w-5xl mx-auto overflow-hidden bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] print:shadow-none print:max-w-none">
        <section class="resume-banner px-8 md:px-12 py-10 text-center text-white">
          <div class="flex items-center justify-center gap-4 md:gap-6">
            <span class="banner-line"></span>
            <h1 class="text-4xl md:text-6xl font-black tracking-wide uppercase">{{ displayName() }}</h1>
            <span class="banner-line"></span>
          </div>

          <p class="mt-5 text-xl md:text-2xl font-semibold text-white/95">
            {{ roleLine() }}
          </p>
        </section>

        <section class="px-8 md:px-12 py-6 border-b border-slate-200">
          <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-base text-slate-700">
            @if (contact().location) {
              <span class="resume-contact-item"><app-icon name="map-pin" [size]="16"></app-icon>{{ contact().location }}</span>
            }
            @if (contact().email) {
              <span>|</span>
              <span class="resume-contact-item"><app-icon name="mail" [size]="16"></app-icon>{{ contact().email }}</span>
            }
            @if (contact().phone) {
              <span>|</span>
              <span class="resume-contact-item"><app-icon name="phone" [size]="16"></app-icon>{{ contact().phone }}</span>
            }
          </div>

          <div class="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-base text-slate-700">
            @if (githubLink()) {
              <span>GitHub: {{ githubLink() }}</span>
            }
            @if (linkedinLink()) {
              <span>|</span>
              <span>LinkedIn: {{ linkedinLink() }}</span>
            }
            @if (portfolioLink()) {
              <span>|</span>
              <span>{{ portfolioLink() }}</span>
            }
          </div>
        </section>

        <section class="resume-section">
          <div class="section-heading">
            <span class="heading-icon"><app-icon name="summary" [size]="20"></app-icon></span>
            <span>Summary</span>
            <span class="heading-line"></span>
          </div>
          @if (summaryText()) {
            <p class="section-body">
              {{ summaryText() }}
            </p>
          } @else {
            <p class="section-empty">Summary data is not available yet.</p>
          }
        </section>

        <section class="resume-section">
          <div class="section-heading">
            <span class="heading-icon"><app-icon name="briefcase" [size]="20"></app-icon></span>
            <span>Experience</span>
            <span class="heading-line"></span>
          </div>

          @if (experience().length) {
            <div class="mt-6 space-y-8">
              @for (item of experience(); track item.id) {
                <article class="entry-block">
                  <h3 class="entry-title">{{ item.position }} <span class="font-bold">- {{ item.company }}</span></h3>
                  <p class="entry-meta"><span class="resume-contact-item"><app-icon name="map-pin" [size]="15"></app-icon>{{ contact().location || 'Remote' }}</span> | {{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                  <ul class="entry-list">
                    @for (point of bulletPoints(item.description); track point) {
                      <li>{{ point }}</li>
                    }
                  </ul>
                </article>
              }
            </div>
          } @else {
            <p class="section-empty">Experience data is not available yet.</p>
          }
        </section>

        <section class="resume-section">
          <div class="section-heading">
            <span class="heading-icon"><app-icon name="projects" [size]="20"></app-icon></span>
            <span>Projects</span>
            <span class="heading-line"></span>
          </div>

          @if (projects().length) {
            <div class="mt-6 space-y-8">
              @for (project of projects(); track project.id) {
                <article class="entry-block">
                  <h3 class="entry-title">{{ project.title }}</h3>
                  <p class="entry-meta">
                    @if (project.liveLink) {
                      <span>Live: {{ project.liveLink }}</span>
                    }
                    @if (project.githubLink) {
                      <span> | GitHub: {{ project.githubLink }}</span>
                    }
                  </p>
                  <ul class="entry-list">
                    @for (point of projectBulletPoints(project); track point) {
                      <li>{{ point }}</li>
                    }
                  </ul>
                </article>
              }
            </div>
          } @else {
            <p class="section-empty">Project data is not available yet.</p>
          }
        </section>

        <section class="resume-section">
          <div class="section-heading">
            <span class="heading-icon"><app-icon name="education" [size]="20"></app-icon></span>
            <span>Education</span>
            <span class="heading-line"></span>
          </div>

          <div class="mt-6 entry-block">
            <h3 class="entry-title">{{ educationTitle() }}</h3>
            <p class="entry-meta"><span class="resume-contact-item"><app-icon name="map-pin" [size]="15"></app-icon>{{ educationSubtitle() }}</span></p>
          </div>
        </section>
        </main>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        --resume-accent: #1d4ed8;
      }

      .resume-paper {
        color: #102a56;
      }

      .resume-banner {
        background: linear-gradient(90deg, color-mix(in srgb, var(--resume-accent) 65%, #0f172a 35%), color-mix(in srgb, var(--resume-accent) 90%, white 10%));
      }

      .banner-line {
        display: inline-block;
        width: 70px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
      }

      .resume-section {
        padding: 1.8rem 2rem;
        border-bottom: 1px solid #d9e2ef;
      }

      .section-heading {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: color-mix(in srgb, var(--resume-accent) 80%, #0f172a 20%);
        text-transform: uppercase;
        font-weight: 800;
        font-size: 1rem;
        letter-spacing: 0.02em;
      }

      .heading-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .resume-contact-item {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }

      .heading-line {
        flex: 1;
        height: 2px;
        background: color-mix(in srgb, var(--resume-accent) 35%, white 65%);
      }

      .section-body {
        margin-top: 1.4rem;
        font-size: 1.15rem;
        line-height: 1.85rem;
        color: #183153;
      }

      .section-empty {
        margin-top: 1.2rem;
        color: #64748b;
      }

      .entry-block {
        color: #17325c;
      }

      .entry-title {
        font-size: 1.1rem;
        font-weight: 800;
        color: #17325c;
      }

      .entry-meta {
        margin-top: 0.45rem;
        color: #475569;
        font-size: 1rem;
      }

      .entry-list {
        margin-top: 1rem;
        padding-left: 1.3rem;
        line-height: 1.9;
        color: #17325c;
      }

      .entry-list li {
        margin-bottom: 0.2rem;
      }

      @media (max-width: 768px) {
        .resume-toolbar {
          padding-bottom: 1rem;
        }

        .resume-toolbar__inner {
          gap: 0.85rem;
          align-items: stretch;
        }

        .resume-toolbar__actions,
        .resume-color-panel {
          width: 100%;
        }

        .resume-toolbar__actions > * {
          flex: 1 1 100%;
          justify-content: center;
        }

        .resume-color-panel {
          gap: 0.75rem;
          padding: 0.85rem 0.95rem;
          border-radius: 1rem;
        }

        .resume-paper {
          max-width: calc(100% - 1rem);
          border-radius: 1rem;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }

        .resume-banner {
          padding: 1.8rem 1rem 1.6rem;
        }

        .banner-line {
          width: 28px;
        }

        .resume-section {
          padding: 1.15rem 1rem;
        }

        .section-heading {
          gap: 0.55rem;
          font-size: 0.82rem;
        }

        .section-body {
          margin-top: 0.9rem;
          font-size: 0.93rem;
          line-height: 1.55rem;
        }

        .entry-title {
          font-size: 0.96rem;
          line-height: 1.45;
        }

        .entry-meta {
          font-size: 0.84rem;
          line-height: 1.45;
        }

        .entry-list {
          margin-top: 0.75rem;
          padding-left: 1rem;
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .resume-contact-item {
          gap: 0.25rem;
          font-size: 0.84rem;
          line-height: 1.4;
        }
      }

      @media (max-width: 560px) {
        .resume-banner h1 {
          font-size: 1.7rem;
          line-height: 1.15;
          letter-spacing: 0.03em;
        }

        .resume-banner p {
          margin-top: 0.65rem;
          font-size: 0.92rem;
          line-height: 1.45;
        }

        .resume-paper .px-8,
        .resume-paper .md\\:px-12 {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }

        .resume-paper .py-10 {
          padding-top: 1.6rem !important;
          padding-bottom: 1.3rem !important;
        }

        .resume-paper .py-6 {
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        }

        .resume-paper .text-base {
          font-size: 0.82rem !important;
          line-height: 1.4 !important;
        }

        .resume-color-panel input[type='color'] {
          width: 2.8rem;
          height: 2.25rem;
        }
      }

      @media print {
        :host {
          color-scheme: light;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        @page {
          margin: 10mm;
          size: A4;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private portfolioService = inject(PortfolioService);
  authService = inject(AuthService);
  isAdminView = this.authService.isAuthenticated;
  isSidebarOpen = signal(false);

  private profileSlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('profileSlug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('profileSlug') ?? '' }
  );

  about = this.portfolioService.about;
  contact = this.portfolioService.contact;
  skills = this.portfolioService.getSkills;
  projects = this.portfolioService.getProjects;
  experience = this.portfolioService.getExperience;

  accentColor = signal('#1d4ed8');
  colorPresets = ['#1d4ed8', '#0f766e', '#b45309', '#9333ea', '#be123c'];

  displayName = computed(
    () =>
      this.portfolioService.currentProfile().name?.trim() ||
      this.authService.admin()?.name?.trim() ||
      'Your Name'
  );
  summaryText = computed(() => this.about().bio || this.about().description || '');

  roleLine = computed(() => {
    const topSkills = [...this.skills()]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4)
      .map((skill) => skill.name);

    if (topSkills.length) {
      return `Frontend Developer | ${topSkills.join(' | ')}`;
    }

    return 'Frontend Developer | Angular | Node.js | MySQL';
  });

  githubLink = computed(() => {
    return this.contact().github || this.projects().find((project) => project.githubLink)?.githubLink || '';
  });

  linkedinLink = computed(() => this.contact().linkedin || '');

  portfolioLink = computed(() => {
    if (this.contact().portfolio) {
      return this.contact().portfolio;
    }

    if (typeof window === 'undefined') {
      return '';
    }

    return window.location.origin;
  });

  portfolioHomeLink = computed(() => {
    const slug = this.portfolioService.currentProfile().slug?.trim() || this.profileSlug().trim();
    return slug ? `/${slug}` : '/';
  });

  educationTitle = computed(() => "Bachelor's Degree / Education Details");
  educationSubtitle = computed(() => this.contact().location || 'Add education details from your profile');

  constructor() {
    effect(() => {
      this.portfolioService.loadPortfolio(this.profileSlug());
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  goToAdminDashboard() {
    void this.router.navigateByUrl('/admin/dashboard');
    this.closeSidebar();
  }

  goToCreatePortfolio() {
    void this.router.navigateByUrl('/admin/dashboard');
    this.closeSidebar();
  }

  goToResumeView() {
    this.closeSidebar();
  }

  goToPortfolio() {
    void this.router.navigateByUrl(this.portfolioHomeLink());
    this.closeSidebar();
  }

  downloadResume() {
    window.print();
  }

  bulletPoints(description: string) {
    return description
      .split(/[\n.]+/)
      .map((point) => point.trim())
      .filter(Boolean);
  }

  projectBulletPoints(project: { description: string; technologies: string[] }) {
    const bullets = this.bulletPoints(project.description);

    if (project.technologies.length) {
      bullets.push(`Built using ${project.technologies.join(', ')}`);
    }

    return bullets.slice(0, 4);
  }

  dateRange(startDate: string, endDate: string) {
    if (!startDate && !endDate) {
      return 'Present';
    }

    return [startDate, endDate].filter(Boolean).join(' - ');
  }
}
