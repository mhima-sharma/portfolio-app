import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div class="flex min-h-screen">
        <aside class="hidden w-80 flex-col border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <div class="mb-10">
            <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Portfolio Builder</p>
            <h1 class="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">Dashboard</h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage services, blogs, testimonials, and reviews from one place.</p>
          </div>
          <nav class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <a routerLink="/admin/dashboard" routerLinkActive="text-primary-600 font-semibold" class="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">Overview</a>
            <a routerLink="/admin/dashboard/services" routerLinkActive="text-primary-600 font-semibold" class="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">Services</a>
            <a routerLink="/admin/dashboard/blogs" routerLinkActive="text-primary-600 font-semibold" class="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">Blogs</a>
            <a routerLink="/admin/dashboard/testimonials" routerLinkActive="text-primary-600 font-semibold" class="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">Testimonials</a>
            <a routerLink="/admin/dashboard/reviews" routerLinkActive="text-primary-600 font-semibold" class="block rounded-xl px-4 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800">Review Links</a>
          </nav>
        </aside>

        <div class="flex-1 bg-slate-50 dark:bg-slate-950">
          <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:px-8">
            <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p class="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Admin console</p>
                <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">Builder Control Center</h2>
              </div>
              <div class="flex flex-wrap gap-3">
                <a routerLink="/admin/dashboard/services" class="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">Add Service</a>
                <a routerLink="/admin/dashboard/blogs" class="inline-flex items-center rounded-full border border-transparent bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">Manage Blogs</a>
              </div>
            </div>
          </header>

          <main class="p-4 lg:p-8">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {}
