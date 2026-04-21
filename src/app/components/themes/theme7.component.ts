import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-theme7',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#f4f6fb] text-[#181512]">
      <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <section class="relative overflow-hidden rounded-[2.5rem] bg-[#fafbfd] px-6 py-8 shadow-[0_30px_80px_rgba(24,21,18,0.08)] md:px-10 md:py-12">
          <div class="absolute right-0 top-0 h-14 w-14 rounded-bl-[2rem] bg-[#2563eb]"></div>

          <header class="relative">
            <p class="text-sm font-semibold uppercase tracking-[0.4em] text-[#9aa9c4]">{{ displayYear() }}</p>
            <div class="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 class="max-w-4xl text-[4rem] font-black uppercase leading-none tracking-[-0.08em] text-[#111827] sm:text-[5.5rem] lg:text-[7.5rem]">
                  Portfolio
                </h1>
                <p class="-mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[#7b8ba9]">
                  {{ data().profile.name || 'Portfolio Owner' }}
                </p>
              </div>

              <nav class="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6f8a]">
                @for (item of navItems; track item.fragment) {
                  <a [href]="sectionHref(item.fragment)" class="rounded-full border border-[#dde5f1] bg-white/80 px-4 py-2 transition hover:bg-white">
                    {{ item.label }}
                  </a>
                }
              </nav>
            </div>
          </header>

          <section class="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div class="flex justify-center lg:justify-start">
              <div class="relative w-full max-w-[360px]">
                <img
                  src="/assets/image copy 2.png"
                  alt="Theme 5 boys hero illustration"
                  class="relative z-10 mx-auto w-full object-contain drop-shadow-[0_25px_45px_rgba(24,21,18,0.18)]"
                />
              </div>
            </div>

            <div class="space-y-8">
              <div>
                <h2 class="text-3xl font-extrabold leading-tight text-[#303949] md:text-4xl">
                  Hi, I'm {{ firstName() }}
                </h2>
                <p class="mt-2 text-xl font-semibold text-[#4e7de0]">
                  {{ data().profile.title || 'Creative professional with a clean digital presence' }}
                </p>
                <p class="mt-4 max-w-3xl text-sm leading-8 text-[#5f6676] md:text-base">
                  {{ data().about.description || data().about.bio || 'A polished portfolio with clear storytelling and a structured visual layout.' }}
                </p>
              </div>

              <div class="grid gap-6 md:grid-cols-[1.1fr_0.95fr]">
                <article id="experience" class="rounded-[2rem] bg-white p-5 shadow-[0_18px_45px_rgba(24,21,18,0.08)]">
                  <p class="text-sm font-bold uppercase tracking-[0.28em] text-[#6d83b4]">Experience</p>
                  <div class="mt-4 space-y-4">
                    @for (item of featuredExperience(); track item.id) {
                      <div class="border-b border-[#e8eef7] pb-4 last:border-b-0 last:pb-0">
                        <p class="text-sm font-semibold text-[#1f2937]">{{ item.position }}</p>
                        <p class="mt-1 text-xs uppercase tracking-[0.14em] text-[#7f8ca3]">{{ item.company }}</p>
                        <p class="mt-1 text-xs text-[#7b8495]">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                      </div>
                    }
                  </div>
                </article>

                <article id="contact" class="rounded-[2rem] bg-white p-5 shadow-[0_18px_45px_rgba(24,21,18,0.08)]">
                  <p class="text-sm font-bold uppercase tracking-[0.28em] text-[#6d83b4]">Contact</p>
                  <div class="mt-4 space-y-3">
                    @for (item of contactCards(); track item.label) {
                      <div>
                        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#99a6bf]">{{ item.label }}</p>
                        <p class="mt-1 break-all text-sm text-[#394150]">{{ item.value }}</p>
                      </div>
                    }
                  </div>
                </article>
              </div>
            </div>
          </section>
        </section>

        <section id="projects" class="mt-8 rounded-[2.5rem] bg-[#fafbfd] px-6 py-8 shadow-[0_30px_80px_rgba(24,21,18,0.08)] md:px-10 md:py-12">
          <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.38em] text-[#c7d2e3]">Content</p>
              <h3 class="mt-2 text-4xl font-black uppercase tracking-[-0.06em] text-[#e5ebf5] sm:text-5xl md:text-6xl">
                Content
              </h3>
            </div>
            <p class="max-w-2xl text-sm leading-7 text-[#6a7281]">
              Portfolio highlights, project stories, and visual showcases arranged in a fresh editorial layout.
            </p>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            @for (project of projectHighlights(); track project.id; let i = $index) {
              <article class="relative overflow-hidden rounded-[1.75rem] p-5 text-white" [style.background]="projectCardColors[i % projectCardColors.length]">
                <div class="flex items-start justify-between gap-3">
                  <span class="text-6xl font-black leading-none text-white/90">{{ i + 1 }}</span>
                  <span class="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]">
                    {{ project.featured ? 'Featured' : 'Project' }}
                  </span>
                </div>

                <div class="mt-12 rounded-[1.35rem] bg-white/90 p-3">
                  @if (project.image) {
                    <img [src]="project.image" [alt]="project.title" class="h-36 w-full rounded-[1rem] object-cover" />
                  } @else {
                    <div class="flex h-36 items-center justify-center rounded-[1rem] bg-white text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {{ project.title }}
                    </div>
                  }
                </div>

                <h4 class="mt-5 text-xl font-extrabold">{{ project.title }}</h4>
                <p class="mt-2 line-clamp-4 text-sm leading-7 text-white/90">{{ project.description }}</p>
              </article>
            }
          </div>
        </section>

        @if (premiumGallery().length) {
          <section class="mt-8 rounded-[2.5rem] bg-[#fafbfd] px-6 py-8 shadow-[0_30px_80px_rgba(24,21,18,0.08)] md:px-10 md:py-12">
            <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.36em] text-[#b7c4d8]">Premium Gallery</p>
                <h3 class="mt-3 text-3xl font-extrabold text-[#1f2937] md:text-4xl">Visual highlights</h3>
              </div>
              <p class="max-w-2xl text-sm leading-7 text-[#6a7281]">
                Images uploaded from the admin premium panel and fetched by slug for this layout.
              </p>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              @for (image of premiumGallery(); track image.id) {
                <article class="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_45px_rgba(24,21,18,0.08)]">
                  <img [src]="image.imageUrl" [alt]="image.altText || image.title || 'Gallery image'" class="h-56 w-full object-cover" />
                  <div class="p-4">
                    <p class="font-semibold text-[#1f2937]">{{ image.title || 'Gallery image' }}</p>
                    @if (image.altText) {
                      <p class="mt-2 text-sm leading-7 text-[#6b7280]">{{ image.altText }}</p>
                    }
                  </div>
                </article>
              }
            </div>
          </section>
        }

        <section class="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article id="about" class="rounded-[2.5rem] bg-[#fafbfd] px-6 py-8 shadow-[0_30px_80px_rgba(24,21,18,0.08)] md:px-10 md:py-10">
            <p class="text-sm font-semibold uppercase tracking-[0.36em] text-[#b7c4d8]">About</p>
            <h3 class="mt-3 text-3xl font-extrabold text-[#1f2937] md:text-4xl">{{ data().profile.title || 'Creative portfolio builder' }}</h3>
            <p class="mt-5 text-sm leading-8 text-[#5d6777] md:text-base">{{ data().about.bio || data().about.description }}</p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-[1.75rem] bg-white p-5">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#8ea1c1]">Years</p>
                <p class="mt-2 text-3xl font-black text-[#1f2937]">{{ data().about.yearsExperience }}+</p>
              </div>
              <div class="rounded-[1.75rem] bg-white p-5">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#8ea1c1]">Skills</p>
                <p class="mt-2 text-3xl font-black text-[#1f2937]">{{ data().skills.length }}</p>
              </div>
              <div class="rounded-[1.75rem] bg-white p-5">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#8ea1c1]">Projects</p>
                <p class="mt-2 text-3xl font-black text-[#1f2937]">{{ data().projects.length }}</p>
              </div>
            </div>
          </article>

          <article id="skills" class="rounded-[2.5rem] bg-[#fafbfd] px-6 py-8 shadow-[0_30px_80px_rgba(24,21,18,0.08)] md:px-10 md:py-10">
            <p class="text-sm font-semibold uppercase tracking-[0.36em] text-[#b7c4d8]">Softwares</p>
            <h3 class="mt-3 text-3xl font-extrabold text-[#1f2937] md:text-4xl">Core skills and tools</h3>
            <div class="mt-6 space-y-4">
              @for (skill of featuredSkills(); track skill.id) {
                <div class="rounded-[1.75rem] bg-white p-4">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <p class="font-semibold text-[#1f2937]">{{ skill.name }}</p>
                      <p class="mt-1 text-xs uppercase tracking-[0.16em] text-[#8c98af]">{{ skill.category }}</p>
                    </div>
                    <p class="text-sm font-bold text-[#466dd8]">{{ skill.level }}%</p>
                  </div>
                  <div class="mt-3 h-2 rounded-full bg-[#e6edf8]">
                    <div class="h-2 rounded-full bg-[linear-gradient(90deg,#2563eb,#38bdf8,#8b5cf6)]" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </article>
        </section>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theme7Component {
  private portfolioService = inject(PortfolioService);
  data = input.required<PortfolioData>();
  premiumGallery = this.portfolioService.getPremiumGallery;

  protected navItems = [
    { label: 'About', fragment: 'about' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Contact', fragment: 'contact' },
  ];

  protected projectCardColors = ['#4f7cff', '#9caec7', '#5ba67c', '#f15b5d', '#7c9bf2'];

  protected displayYear = computed(() => `'${new Date().getFullYear().toString().slice(-2)}`);
  protected firstName = computed(() => this.data().profile.name?.trim().split(/\s+/)[0] || 'Creator');
  protected featuredExperience = computed(() => this.data().experience.slice(0, 4));
  protected featuredSkills = computed(() => this.data().skills.slice(0, 6));
  protected projectHighlights = computed(() => this.data().projects.slice(0, 5));

  protected contactCards = computed(() =>
    [
      { label: 'Portfolio', value: this.data().contact.portfolio },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
      { label: 'Email', value: this.data().contact.email },
      { label: 'Instagram', value: this.data().contact.instagram },
    ].filter((item) => Boolean(item.value))
  );

  protected sectionHref(fragment: string) {
    if (typeof window === 'undefined') {
      return `#${fragment}`;
    }

    return `${window.location.pathname}#${fragment}`;
  }

  protected dateRange(startDate: string, endDate: string) {
    return [startDate, endDate].filter(Boolean).join(' - ') || 'Present';
  }
}
