import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-personal-branding-theme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="personal-branding min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-slate-50 text-slate-900">
      <header class="sticky top-0 z-50 border-b border-purple-200 bg-white/95 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">Personal Branding</p>
            <h1 class="mt-1 text-xl font-bold text-slate-900">{{ data().profile.name }}</h1>
          </div>
          <nav class="hidden items-center gap-5 text-sm font-semibold text-slate-700 md:flex">
            @for (item of navItems; track item.page) {
              <a [routerLink]="['/', profileSlug(), item.page]" [class.text-violet-600]="page() === item.page" class="transition hover:text-violet-600">{{ item.label }}</a>
            }
          </nav>
        </div>
      </header>

      <main class="flex-1 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        @if (page() === 'home') {
          <section class="rounded-[2.5rem] bg-white p-8 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-10">
            <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p class="text-sm uppercase tracking-[0.35em] text-violet-600">Home</p>
                <h2 class="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">A personal brand with bright energy.</h2>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{{ data().about.description }}</p>
                <div class="mt-8 flex flex-wrap gap-4">
                  <a [routerLink]="['/', profileSlug(), 'about']" class="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">About</a>
                  <a [routerLink]="['/', profileSlug(), 'projects']" class="rounded-full border border-violet-600 px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">Projects</a>
                </div>
              </div>
              <div class="rounded-[1.5rem] bg-violet-50 p-6">
                <p class="text-sm uppercase tracking-[0.28em] text-violet-700">Brand note</p>
                <p class="mt-4 text-xl font-semibold text-slate-900">{{ data().about.bio }}</p>
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl bg-white p-4 shadow-sm">
                    <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Years</p>
                    <p class="mt-2 text-3xl font-bold text-violet-600">{{ data().about.yearsExperience }}</p>
                  </div>
                  <div class="rounded-2xl bg-white p-4 shadow-sm">
                    <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Projects</p>
                    <p class="mt-2 text-3xl font-bold text-violet-600">{{ data().projects.length }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'about') {
          <section class="rounded-[2.5rem] bg-white p-8 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-violet-600">About</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Personal storytelling, simplified.</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.9fr_0.85fr]">
              <div>
                <p class="text-lg leading-8 text-slate-600">{{ data().about.description }}</p>
                <p class="mt-6 text-base leading-7 text-slate-600">{{ data().about.bio }}</p>
              </div>
              <div class="rounded-[1.5rem] border border-violet-200 bg-violet-50 p-6">
                <div class="space-y-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Email</p>
                    <p class="mt-2 text-sm font-semibold text-slate-900">{{ data().contact.email }}</p>
                  </div>
                  <div>
                    <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Location</p>
                    <p class="mt-2 text-sm font-semibold text-slate-900">{{ data().contact.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        } @else if (page() === 'projects') {
          <section class="rounded-[2.5rem] bg-white p-8 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-violet-600">Projects</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">A portfolio with personality.</h2>
            <div class="mt-8 grid gap-6 xl:grid-cols-2">
              @for (project of data().projects; track project.id) {
                <article class="rounded-[2rem] border border-violet-100 bg-violet-50 p-6 transition hover:-translate-y-1">
                  <h3 class="text-xl font-semibold text-slate-900">{{ project.title }}</h3>
                  <p class="mt-4 text-sm leading-7 text-slate-600">{{ project.description }}</p>
                  <div class="mt-5 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <span class="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">{{ tech }}</span>
                    }
                  </div>
                </article>
              }
            </div>
            @if (galleryImages().length) {
              <div class="mt-10 rounded-[2rem] border border-violet-100 bg-white p-6 shadow-sm">
                <p class="text-xs uppercase tracking-[0.35em] text-violet-600">Gallery</p>
                <h3 class="mt-3 text-2xl font-semibold text-slate-900">Brand imagery collection</h3>
                <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  @for (image of galleryImages(); track image.id) {
                    <div class="overflow-hidden rounded-[1.5rem] border border-violet-100 bg-white shadow-sm">
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
          <section class="rounded-[2.5rem] bg-white p-8 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-violet-600">Skills</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Signature strengths.</h2>
            <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              @for (skill of data().skills; track skill.id) {
                <div class="rounded-[2rem] border border-violet-100 bg-violet-50 p-5">
                  <div class="flex items-center justify-between gap-3">
                    <p class="font-semibold text-slate-900">{{ skill.name }}</p>
                    <span class="text-sm text-violet-600">{{ skill.level }}%</span>
                  </div>
                  <div class="mt-4 h-2 rounded-full bg-white">
                    <div class="h-full rounded-full bg-violet-600" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </section>
        } @else if (page() === 'contact') {
          <section class="rounded-[2.5rem] bg-white p-8 shadow-[0_25px_80px_rgba(124,58,237,0.12)] sm:p-10">
            <p class="text-sm uppercase tracking-[0.35em] text-violet-600">Contact</p>
            <h2 class="mt-4 text-3xl font-bold text-slate-900">Brand conversations welcome.</h2>
            <div class="mt-8 grid gap-8 lg:grid-cols-[0.95fr_0.85fr]">
              <div class="space-y-6">
                <p class="text-lg leading-8 text-slate-600">Ready to launch a unique personal brand? Send a message and let’s chat.</p>
                <div class="space-y-4">
                  @for (link of contactLinks(); track link.key) {
                    <div class="rounded-[2rem] bg-violet-50 p-5 border border-violet-100">
                      <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ link.label }}</p>
                      @if (link.href) {
                        <a [href]="link.href" target="_blank" rel="noopener noreferrer" class="mt-2 block text-sm font-semibold text-slate-900 hover:text-violet-700 break-all">{{ link.value }}</a>
                      } @else {
                        <p class="mt-2 text-sm font-semibold text-slate-900 break-words">{{ link.value }}</p>
                      }
                    </div>
                  }
                </div>
              </div>
              <div class="rounded-[2rem] bg-slate-100 p-6 shadow-sm">
                <form>
                  <label class="block text-sm font-semibold text-slate-700">Name</label>
                  <input class="mt-3 w-full rounded-3xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-900" type="text" placeholder="Your name" />
                  <label class="mt-5 block text-sm font-semibold text-slate-700">Email</label>
                  <input class="mt-3 w-full rounded-3xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-900" type="email" placeholder="Your email" />
                  <label class="mt-5 block text-sm font-semibold text-slate-700">Message</label>
                  <textarea class="mt-3 w-full rounded-3xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-900" rows="5" placeholder="Tell me about your project"></textarea>
                  <button type="button" class="mt-6 inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">Send message</button>
                </form>
              </div>
            </div>
          </section>
        }
      </main>

      <footer class="border-t border-violet-200 bg-white/95 py-6">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; 2026 {{ data().profile.name }}.</p>
          <div class="flex flex-wrap gap-4">
            <a [routerLink]="['/', profileSlug(), 'home']" class="transition hover:text-violet-600">Home</a>
            <a [routerLink]="['/', profileSlug(), 'about']" class="transition hover:text-violet-600">About</a>
            <a [routerLink]="['/', profileSlug(), 'contact']" class="transition hover:text-violet-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePersonalBrandingComponent {
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