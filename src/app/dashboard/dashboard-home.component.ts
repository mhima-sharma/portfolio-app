import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { BlogService } from '../services/blog.service';
import { TestimonialService } from '../services/testimonial.service';
import { ServiceListComponent } from './services/service-list.component';
import { BlogListComponent } from './blogs/blog-list.component';
import { TestimonialListComponent } from './testimonials/testimonial-list.component';
import { ReviewLinkComponent } from './reviews/review-link.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceListComponent, BlogListComponent, TestimonialListComponent, ReviewLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          [class.bg-indigo-600]="dashboardTab() === 'overview'"
          [class.text-white]="dashboardTab() === 'overview'"
          [class.border-slate-300]="dashboardTab() !== 'overview'"
          (click)="dashboardTab.set('overview')"
        >
          Overview
        </button>
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          [class.bg-indigo-600]="dashboardTab() === 'services'"
          [class.text-white]="dashboardTab() === 'services'"
          [class.border-slate-300]="dashboardTab() !== 'services'"
          (click)="dashboardTab.set('services')"
        >
          Services
        </button>
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          [class.bg-indigo-600]="dashboardTab() === 'blogs'"
          [class.text-white]="dashboardTab() === 'blogs'"
          [class.border-slate-300]="dashboardTab() !== 'blogs'"
          (click)="dashboardTab.set('blogs')"
        >
          Blogs
        </button>
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          [class.bg-indigo-600]="dashboardTab() === 'testimonials'"
          [class.text-white]="dashboardTab() === 'testimonials'"
          [class.border-slate-300]="dashboardTab() !== 'testimonials'"
          (click)="dashboardTab.set('testimonials')"
        >
          Testimonials
        </button>
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          [class.bg-indigo-600]="dashboardTab() === 'reviews'"
          [class.text-white]="dashboardTab() === 'reviews'"
          [class.border-slate-300]="dashboardTab() !== 'reviews'"
          (click)="dashboardTab.set('reviews')"
        >
          Ratings & Reviews
        </button>
      </div>

      <ng-container *ngIf="dashboardTab() === 'overview'; else tabContent">
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Services</p>
          <p class="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-50">{{ servicesCount() }}</p>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Active and inactive services available on public portfolio.</p>
        </article>
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Blogs</p>
          <p class="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-50">{{ blogsCount() }}</p>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Draft and published blog posts for your portfolio stories.</p>
        </article>
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Testimonials</p>
          <p class="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-50">{{ testimonialsCount() }}</p>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Approved reviews and client stories visible on your public page.</p>
        </article>
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Client reviews</p>
          <p class="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-50">{{ 0 }}</p>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Generate a public review page link for client feedback.</p>
        </article>
      </div>

      <section class="grid gap-6 lg:grid-cols-3">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">Quick actions</h3>
          <div class="mt-5 space-y-3">
            <button type="button" class="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900" (click)="dashboardTab.set('services')">Manage services</button>
            <button type="button" class="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900" (click)="dashboardTab.set('blogs')">Write a blog</button>
            <button type="button" class="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900" (click)="dashboardTab.set('testimonials')">Approve testimonials</button>
            <button type="button" class="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900" (click)="dashboardTab.set('reviews')">Share review page</button>
          </div>
        </article>
      </section>
    </ng-container>

    <ng-template #tabContent>
      <section class="space-y-6">
        <ng-container *ngIf="dashboardTab() === 'services'">
          <app-service-list></app-service-list>
        </ng-container>
        <ng-container *ngIf="dashboardTab() === 'blogs'">
          <app-blog-list></app-blog-list>
        </ng-container>
        <ng-container *ngIf="dashboardTab() === 'testimonials'">
          <app-testimonial-list></app-testimonial-list>
        </ng-container>
        <ng-container *ngIf="dashboardTab() === 'reviews'">
          <app-review-link></app-review-link>
        </ng-container>
      </section>
    </ng-template>
  `,
})
export class DashboardHomeComponent {
  private serviceService = inject(ServiceService);
  private blogService = inject(BlogService);
  private testimonialService = inject(TestimonialService);

  servicesCount = signal(0);
  blogsCount = signal(0);
  testimonialsCount = signal(0);
  dashboardTab = signal<'overview' | 'services' | 'blogs' | 'testimonials' | 'reviews'>('overview');

  constructor() {
    void this.loadSummary();
  }

  private async loadSummary() {
    try {
      const [services, blogs, testimonials] = await Promise.all([
        this.serviceService.getServices(),
        this.blogService.getBlogs(),
        this.testimonialService.getTestimonials(),
      ]);

      this.servicesCount.set(services.length);
      this.blogsCount.set(blogs.length);
      this.testimonialsCount.set(testimonials.length);
    } catch {
      this.servicesCount.set(0);
      this.blogsCount.set(0);
      this.testimonialsCount.set(0);
    }
  }
}
