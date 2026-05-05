import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="section-padding min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-slate-100">
      <div class="max-w-5xl mx-auto">
        <a routerLink="/projects" class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
          ← Back to projects
        </a>

        <div class="mt-12 rounded-[2rem] border border-slate-200/80 bg-white/90 dark:border-dark-700/70 dark:bg-dark-950/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <ng-container *ngIf="isLoading(); else content">
            <div class="flex min-h-[240px] items-center justify-center text-sm uppercase tracking-[0.3em] text-slate-500">
              Loading project details...
            </div>
          </ng-container>

          <ng-template #content>
            <ng-container *ngIf="project() as project; else emptyState">
              <div class="flex flex-col gap-8 lg:gap-12">
                <div class="space-y-4">
                  <div class="inline-flex items-center gap-3 rounded-full bg-primary-100/60 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
                    Project overview
                  </div>
                  <h1 class="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {{ project.title }}
                  </h1>
                  <p class="max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
                    {{ project.description || 'A clean, dependable overview of this work item.' }}
                  </p>
                </div>

                <div class="grid gap-6 lg:grid-cols-[1.25fr_0.8fr] items-start">
                  <div class="space-y-6">
                    <div class="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-6 dark:border-dark-700/70 dark:bg-dark-900/80">
                      <p class="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">Technology stack</p>
                      <div class="flex flex-wrap gap-3">
                        <span class="pill" *ngFor="let tech of project.technologies">{{ tech }}</span>
                      </div>
                    </div>

                    <div class="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-6 dark:border-dark-700/70 dark:bg-dark-900/80">
                      <p class="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">Quick links</p>
                      <div class="flex flex-col gap-3">
                        <a *ngIf="project.liveLink" [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="link-pill">
                          Live preview
                        </a>
                        <a *ngIf="project.githubLink" [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="link-pill">
                          View source
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br from-primary-50 via-white to-slate-50 p-8 dark:border-dark-700/70 dark:from-primary-500/10 dark:via-dark-950 dark:to-dark-900">
                    <p class="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">Project summary</p>
                    <p class="leading-7 text-slate-700 dark:text-slate-200">
                      Designed as a clean, modern showcase page that blends polished typography, spacious layout, and crisp navigation.
                    </p>
                    <div class="mt-8 space-y-3">
                      <div class="flex items-center gap-3">
                        <span class="badge">Focused UI</span>
                        <span class="text-sm text-slate-500 dark:text-slate-400">Readable sections</span>
                      </div>
                      <div class="flex items-center gap-3">
                        <span class="badge">Responsive first</span>
                        <span class="text-sm text-slate-500 dark:text-slate-400">Mobile + desktop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
          </ng-template>

          <ng-template #emptyState>
            <div class="min-h-[220px] flex flex-col items-center justify-center rounded-[1.5rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
              <p class="text-lg font-semibold">Project not found</p>
              <p class="mt-3 text-sm text-rose-600">If this project is missing, return to the list and choose another entry.</p>
            </div>
          </ng-template>
        </div>

        <div *ngIf="errorMessage()" class="mt-8 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {{ errorMessage() }}
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);

  projectId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('id') ?? '' }
  );

  project = signal<Project | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const id = this.projectId();
      if (!id) {
        return;
      }
      void this.loadProject(id);
    });
  }

  private async loadProject(id: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const localProject = this.portfolioService.getProjects().find((project) => String(project.id) === id);
    if (localProject) {
      this.project.set(localProject);
      this.isLoading.set(false);
      return;
    }

    try {
      const response = await firstValueFrom(this.portfolioService.getProjectById(id));
      const raw = response?.data ?? {};
      this.project.set({
        id: raw.id ?? id,
        title: raw.title ?? 'Untitled project',
        description: raw.description ?? '',
        image: raw.image ?? '',
        technologies: Array.isArray(raw.technologies)
          ? raw.technologies.map((item: any) => (typeof item === 'string' ? item : item?.technologyName ?? ''))
          : [],
        liveLink: raw.liveLink ?? raw.live_url ?? '',
        githubLink: raw.githubLink ?? raw.github_url ?? '',
        featured: Boolean(raw.featured),
      });
    } catch {
      this.errorMessage.set('Unable to load project details.');
      this.project.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }
}
