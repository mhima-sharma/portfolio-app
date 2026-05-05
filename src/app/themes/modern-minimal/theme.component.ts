import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-modern-minimal-theme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="modern-minimal min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Modern Minimal</p>
            <h1 class="mt-1 text-xl font-bold">{{ data().profile.name }}</h1>
          </div>
          <nav class="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            @for (item of navItems; track item.page) {
              <a
                [routerLink]="['/', profileSlug(), item.page]"
                class="transition hover:text-sky-600"
                [class.text-sky-700]="page() === item.page"
              >
                {{ item.label }}
              </a>
            }
          </nav>
        </div>
      </header>

      <main class="flex-1 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        @if (page() === 'home') {
          <section class="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p class="text-sm uppercase tracking-[0.3em] text-sky-600">Home page</p>
                <h2 class="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">Clean portfolio design meets fast content.</h2>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{{ data().about.description }}</p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <a [routerLink]="['/', profileSlug(), 'projects']" class="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Projects</a>
                  <a [routerLink]="['/', profileSlug(), 'contact']" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">Contact</a>
                </div>
              </div>
              <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p class="text-sm uppercase tracking-[0.28em] text-slate-500">Professional summary</p>
                <p class="mt-4 text-xl font-semibold text-slate-900">{{ data().about.bio }}</p>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl bg-white p-4 shadow-sm">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Experience</p>
                    <p class="mt-2 text-3xl font-bold text-slate-900">{{ data().about.yearsExperience }}+</p>
                  </div>
                  <div class="rounded-2xl bg-white p-4 shadow-sm">
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Projects</p>
                    <p class="mt-2 text-3xl font-bold text-slate-900">{{ data().projects.length }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'about') {
          <section class="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p class="text-sm uppercase tracking-[0.3em] text-sky-600">About</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Carefully curated readability.</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
              <div>
                <p class="text-lg leading-8 text-slate-600">{{ data().about.description }}</p>
                <p class="mt-6 text-base leading-7 text-slate-600">{{ data().about.bio }}</p>
              </div>
              <div class="space-y-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Email</p>
                  <p class="mt-2 text-sm text-slate-700">{{ data().contact.email }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Location</p>
                  <p class="mt-2 text-sm text-slate-700">{{ data().contact.location }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Title</p>
                  <p class="mt-2 text-sm text-slate-700">{{ data().profile.title }}</p>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'projects') {
          <section class="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p class="text-sm uppercase tracking-[0.3em] text-sky-600">Projects</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Selected work</h2>
            <div class="mt-8 grid gap-6 xl:grid-cols-2">
              @for (project of data().projects; track project.id) {
                <article class="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <h3 class="text-xl font-semibold text-slate-900">{{ project.title }}</h3>
                  <p class="mt-3 text-base leading-7 text-slate-600">{{ project.description }}</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">{{ tech }}</span>
                    }
                  </div>
                  <div class="mt-5 flex flex-wrap gap-3">
                    @if (project.liveLink) {
                      <a [href]="project.liveLink" target="_blank" class="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Live</a>
                    }
                    @if (project.githubLink) {
                      <a [href]="project.githubLink" target="_blank" class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Code</a>
                    }
                  </div>
                </article>
              }
            </div>
            @if (galleryImages().length) {
              <div class="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                <p class="text-xs uppercase tracking-[0.3em] text-sky-600">Gallery</p>
                <h3 class="mt-3 text-2xl font-semibold text-slate-900">Selected premium imagery</h3>
                <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  @for (image of galleryImages(); track image.id) {
                    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <img [src]="image.imageUrl" [alt]="image.altText" class="h-44 w-full object-cover" />
                      <div class="p-4">
                        <p class="font-semibold text-slate-900">{{ image.title }}</p>
                        <p class="mt-2 text-sm text-slate-600">{{ image.altText }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </section>
        } @else if (page() === 'skills') {
          <section class="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p class="text-sm uppercase tracking-[0.3em] text-sky-600">Skills</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Strengths by category</h2>
            <div class="mt-8 grid gap-4 sm:grid-cols-2">
              @for (skill of data().skills; track skill.id) {
                <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div class="flex items-center justify-between gap-4">
                    <p class="font-semibold text-slate-900">{{ skill.name }}</p>
                    <span class="text-sm text-slate-500">{{ skill.level }}%</span>
                  </div>
                  <div class="mt-4 h-2 rounded-full bg-slate-200">
                    <div class="h-full rounded-full bg-sky-600" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </section>
        } @else if (page() === 'contact') {
          <section class="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
            <p class="text-sm uppercase tracking-[0.3em] text-sky-600">Contact</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Let’s connect</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
              <div>
                <p class="text-base leading-7 text-slate-600">Reach out for collaborations, freelance inquiries, or product partnerships.</p>
                <div class="mt-8 space-y-4">
                  @for (link of contactLinks(); track link.key) {
                    <div class="rounded-[1.5rem] bg-slate-50 p-5 border border-slate-200">
                      <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ link.label }}</p>
                      @if (link.href) {
                        <a [href]="link.href" target="_blank" rel="noopener noreferrer" class="mt-2 block text-sm text-slate-700 hover:text-sky-600 break-all">{{ link.value }}</a>
                      } @else {
                        <p class="mt-2 text-sm text-slate-700 break-words">{{ link.value }}</p>
                      }
                    </div>
                  }
                </div>
              </div>
              <div class="rounded-[1.5rem] bg-slate-50 p-6 shadow-sm">
                <form>
                  <label class="block text-sm font-semibold text-slate-700">Name</label>
                  <input class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" type="text" placeholder="Your name" />
                  <label class="mt-5 block text-sm font-semibold text-slate-700">Email</label>
                  <input class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" type="email" placeholder="Your email" />
                  <label class="mt-5 block text-sm font-semibold text-slate-700">Message</label>
                  <textarea class="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900" rows="5" placeholder="How can I help?"></textarea>
                  <button type="button" class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">Send message</button>
                </form>
              </div>
            </div>
          </section>
        }
      </main>

      <footer class="border-t border-slate-200 bg-white/95 py-6">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; 2026 {{ data().profile.name }}.</p>
          <div class="flex flex-wrap gap-4">
            <a [routerLink]="['/', profileSlug(), 'home']" class="text-slate-600 transition hover:text-slate-900">Home</a>
            <a [routerLink]="['/', profileSlug(), 'about']" class="text-slate-600 transition hover:text-slate-900">About</a>
            <a [routerLink]="['/', profileSlug(), 'projects']" class="text-slate-600 transition hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeModernMinimalComponent {
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