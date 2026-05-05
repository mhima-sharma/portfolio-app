import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-developer-dark-theme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="developer-dark min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header class="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Developer Dark</p>
            <h1 class="mt-1 text-xl font-bold text-white">{{ data().profile.name }}</h1>
          </div>
          <nav class="hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex">
            @for (item of navItems; track item.page) {
              <a [routerLink]="['/', profileSlug(), item.page]" [class.text-emerald-400]="page() === item.page" class="transition hover:text-emerald-400">{{ item.label }}</a>
            }
          </nav>
        </div>
      </header>

      <main class="flex-1 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        @if (page() === 'home') {
          <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p class="text-sm uppercase tracking-[0.35em] text-emerald-400">Home</p>
                <h2 class="mt-4 text-4xl font-bold text-white sm:text-5xl">Build with modern dark elegance.</h2>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{{ data().about.description }}</p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <a [routerLink]="['/', profileSlug(), 'projects']" class="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">Projects</a>
                  <a [routerLink]="['/', profileSlug(), 'contact']" class="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-400">Contact</a>
                </div>
              </div>
              <div class="rounded-[1.5rem] border border-emerald-400/25 bg-slate-950 p-6">
                <p class="text-sm uppercase tracking-[0.28em] text-slate-400">Profile</p>
                <p class="mt-4 text-xl font-semibold text-white">{{ data().about.bio }}</p>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl bg-slate-900 p-4 border border-slate-800">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Experience</p>
                    <p class="mt-2 text-3xl font-bold text-emerald-400">{{ data().about.yearsExperience }}</p>
                  </div>
                  <div class="rounded-2xl bg-slate-900 p-4 border border-slate-800">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Projects</p>
                    <p class="mt-2 text-3xl font-bold text-emerald-400">{{ data().projects.length }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'about') {
          <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-400">About</p>
            <h2 class="mt-4 text-3xl font-bold text-white">A polished dev portfolio.</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.8fr]">
              <div>
                <p class="text-lg leading-8 text-slate-300">{{ data().about.description }}</p>
                <p class="mt-6 text-base leading-7 text-slate-400">{{ data().about.bio }}</p>
              </div>
              <div class="space-y-4 rounded-[1.5rem] border border-slate-800 bg-slate-950 p-6">
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Email</p>
                  <p class="mt-2 text-sm text-slate-200">{{ data().contact.email }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Location</p>
                  <p class="mt-2 text-sm text-slate-200">{{ data().contact.location }}</p>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'projects') {
          <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-400">Projects</p>
            <h2 class="mt-4 text-3xl font-bold text-white">Engineering portfolio</h2>
            <div class="mt-8 grid gap-6 xl:grid-cols-2">
              @for (project of data().projects; track project.id) {
                <article class="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-emerald-500/20">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
                    @if (project.featured) {
                      <span class="rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-950">Featured</span>
                    }
                  </div>
                  <p class="mt-4 text-sm leading-7 text-slate-400">{{ project.description }}</p>
                  <div class="mt-5 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <span class="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">{{ tech }}</span>
                    }
                  </div>
                </article>
              }
            </div>
            @if (galleryImages().length) {
              <div class="mt-10 rounded-[1.5rem] border border-slate-800 bg-slate-950 p-6">
                <p class="text-xs uppercase tracking-[0.35em] text-emerald-400">Gallery</p>
                <h3 class="mt-3 text-2xl font-semibold text-white">Premium showcase</h3>
                <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  @for (image of galleryImages(); track image.id) {
                    <div class="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900 shadow-sm">
                      <img [src]="image.imageUrl" [alt]="image.altText" class="h-44 w-full object-cover" />
                      <div class="p-4">
                        <p class="font-semibold text-white">{{ image.title }}</p>
                        <p class="mt-2 text-sm text-slate-400">{{ image.altText }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </section>
        } @else if (page() === 'skills') {
          <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-400">Skills</p>
            <h2 class="mt-4 text-3xl font-bold text-white">Technical stack</h2>
            <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              @for (skill of data().skills; track skill.id) {
                <div class="rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5">
                  <div class="flex items-center justify-between gap-3">
                    <p class="font-semibold text-white">{{ skill.name }}</p>
                    <span class="text-sm text-emerald-400">{{ skill.level }}%</span>
                  </div>
                  <div class="mt-4 h-2 rounded-full bg-slate-800">
                    <div class="h-full rounded-full bg-emerald-400" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </section>
        } @else if (page() === 'contact') {
          <section class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-400">Contact</p>
            <h2 class="mt-4 text-3xl font-bold text-white">Open source and collaboration ready.</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.95fr_0.85fr]">
              <div class="space-y-6">
                <p class="text-lg leading-8 text-slate-300">Interested in a strong frontend or backend partnership? Let’s connect.</p>
                <div class="space-y-4">
                  @for (link of contactLinks(); track link.key) {
                    <div class="rounded-[1.5rem] bg-slate-950 p-5 border border-slate-800">
                      <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ link.label }}</p>
                      @if (link.href) {
                        <a [href]="link.href" target="_blank" rel="noopener noreferrer" class="mt-2 block text-sm text-slate-200 hover:text-emerald-400 break-all">{{ link.value }}</a>
                      } @else {
                        <p class="mt-2 text-sm text-slate-200 break-words">{{ link.value }}</p>
                      }
                    </div>
                  }
                </div>
              </div>
              <div class="rounded-[1.5rem] bg-slate-950 p-8">
                <form>
                  <label class="block text-sm font-semibold text-slate-300">Name</label>
                  <input class="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white" type="text" placeholder="Your name" />
                  <label class="mt-5 block text-sm font-semibold text-slate-300">Email</label>
                  <input class="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white" type="email" placeholder="Your email" />
                  <label class="mt-5 block text-sm font-semibold text-slate-300">Message</label>
                  <textarea class="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white" rows="5" placeholder="Project brief"></textarea>
                  <button type="button" class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">Send message</button>
                </form>
              </div>
            </div>
          </section>
        }
      </main>

      <footer class="border-t border-slate-800 bg-slate-950/95 py-6">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-400 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; 2026 {{ data().profile.name }}.</p>
          <div class="flex flex-wrap gap-4">
            <a [routerLink]="['/', profileSlug(), 'home']" class="transition hover:text-emerald-400">Home</a>
            <a [routerLink]="['/', profileSlug(), 'about']" class="transition hover:text-emerald-400">About</a>
            <a [routerLink]="['/', profileSlug(), 'contact']" class="transition hover:text-emerald-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeDeveloperDarkComponent {
  data = input.required<PortfolioData>();
  profileSlug = input.required<string>();
  page = input.required<string>();

  navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Projects', page: 'projects' },
    { label: 'Skills', page: 'skills' },
    { label: 'Contact', page: 'contact' },
  ];

  contactLinks = computed(() => {
    const contact = this.data().contact ?? {};
    const items = [
      { key: 'email', label: 'Email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : '' },
      { key: 'phone', label: 'Phone', value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : '' },
      { key: 'location', label: 'Location', value: contact.location, href: '' },
      { key: 'github', label: 'GitHub', value: contact.github, href: contact.github },
      { key: 'linkedin', label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin },
      { key: 'instagram', label: 'Instagram', value: contact.instagram, href: contact.instagram },
      { key: 'facebook', label: 'Facebook', value: contact.facebook, href: contact.facebook },
      { key: 'twitter', label: 'Twitter', value: contact.twitter, href: contact.twitter },
      { key: 'youtube', label: 'YouTube', value: contact.youtube, href: contact.youtube },
      { key: 'medium', label: 'Medium', value: contact.medium, href: contact.medium },
      { key: 'tableau', label: 'Tableau', value: contact.tableau, href: contact.tableau },
      { key: 'leetcode', label: 'LeetCode', value: contact.leetcode, href: contact.leetcode },
      { key: 'portfolio', label: 'Portfolio', value: contact.portfolio, href: contact.portfolio },
      { key: 'website', label: 'Website', value: contact.website, href: contact.website },
    ];
    return items.filter((item) => item.value);
  });

  galleryImages = computed(() => this.data().gallery ?? []);
}