import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-padding bg-slate-50 text-slate-900 dark:bg-dark-950 dark:text-slate-100">
      <div class="mx-auto max-w-6xl">
        <div class="mb-10 text-center">
          <p class="text-sm uppercase tracking-[0.32em] text-primary-600">Experience</p>
          <h2 class="mt-3 text-4xl font-semibold tracking-tight">Career timeline</h2>
          <p class="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 leading-8">
            A modern, vertical experience timeline with clear roles, companies, and the work that mattered most.
          </p>
        </div>

        <div class="relative pl-8 sm:pl-12">
          <div class="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary-500 to-violet-500 opacity-60"></div>

          <div class="space-y-10">
            <div *ngFor="let item of experience(); let idx = index" class="relative">
              <div class="absolute left-0 top-3 h-4 w-4 rounded-full bg-primary-600 ring-4 ring-white dark:ring-dark-950"></div>
              <div class="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:border-dark-700/70 dark:bg-dark-900/80">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="text-sm uppercase tracking-[0.3em] text-primary-600">{{ item.duration }}</p>
                    <h3 class="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{{ item.position }}</h3>
                    <p class="mt-2 text-slate-600 dark:text-slate-400">{{ item.company }}</p>
                  </div>
                </div>
                <p class="mt-6 leading-7 text-slate-600 dark:text-slate-300">{{ item.description }}</p>
              </div>
            </div>

            <div *ngIf="experience().length === 0" class="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-10 text-center text-slate-600 shadow-[0_20px_50px_rgba(15,23,42,0.06)] dark:border-dark-700/70 dark:bg-dark-900/80 dark:text-slate-400">
              Experience entries from your portfolio profile will appear here once they are added.
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  private portfolioService = inject(PortfolioService);

  experience = computed(() => this.portfolioService.getExperience());
}
