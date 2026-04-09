import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-theme2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[linear-gradient(180deg,#fff1f2_0%,#fdf2f8_30%,#f8fafc_100%)] text-slate-900">
      <main class="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section class="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
          <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div class="px-6 py-8 sm:px-10 sm:py-10">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-pink-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600">Creative Portfolio</span>
                <span class="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">{{ data().profile.selectedTheme }}</span>
              </div>
              <h1 class="mt-6 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                {{ data().profile.name }}
              </h1>
              <p class="mt-4 text-xl font-medium text-slate-600">{{ data().profile.title || 'Visual storyteller & product designer' }}</p>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{{ data().about.description || data().about.bio }}</p>
              <div class="mt-8 flex flex-wrap gap-3">
                @for (item of navItems; track item.fragment) {
                  <a [href]="sectionHref(item.fragment)" class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:text-pink-600">
                    {{ item.label }}
                  </a>
                }
              </div>
            </div>

            <div class="relative min-h-[320px] overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.35),_transparent_35%),linear-gradient(160deg,#0f172a_0%,#1e293b_100%)] p-8 text-white">
              <div class="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-pink-400/30 blur-3xl"></div>
              <div class="absolute bottom-8 left-8 h-24 w-24 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur"></div>
              <div class="relative">
                <p class="text-sm uppercase tracking-[0.35em] text-pink-200">Moodboard</p>
                <div class="mt-8 grid grid-cols-2 gap-4">
                  @for (card of moodboardCards(); track card.title) {
                    <div class="rounded-[1.75rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <p class="text-xs uppercase tracking-[0.28em] text-pink-100/80">{{ card.label }}</p>
                      <p class="mt-3 text-xl font-semibold">{{ card.title }}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="grid gap-6 pt-16 lg:grid-cols-[0.85fr_1.15fr]">
          <article class="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p class="text-xs uppercase tracking-[0.32em] text-pink-300">Profile Note</p>
            <p class="mt-5 text-2xl font-semibold leading-tight">{{ data().about.bio || data().profile.title }}</p>
            <p class="mt-8 text-sm text-slate-300">Based in {{ data().contact.location || 'your city' }}</p>
          </article>
          <article class="rounded-[2rem] border border-slate-200 bg-white p-8">
            <p class="text-sm leading-8 text-slate-600">{{ data().about.description || data().about.bio }}</p>
            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-[1.5rem] bg-pink-50 p-5">
                <p class="text-sm text-slate-500">Experience</p>
                <p class="mt-3 text-3xl font-bold text-pink-600">{{ data().about.yearsExperience }}+</p>
              </div>
              <div class="rounded-[1.5rem] bg-violet-50 p-5">
                <p class="text-sm text-slate-500">Projects</p>
                <p class="mt-3 text-3xl font-bold text-violet-600">{{ data().projects.length }}</p>
              </div>
              <div class="rounded-[1.5rem] bg-amber-50 p-5">
                <p class="text-sm text-slate-500">Skills</p>
                <p class="mt-3 text-3xl font-bold text-amber-600">{{ data().skills.length }}</p>
              </div>
            </div>
          </article>
        </section>

        <section id="projects" class="pt-16">
          <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-pink-500">Showcase</p>
              <h2 class="mt-3 text-3xl font-bold">Featured work and experiments</h2>
            </div>
          </div>
          <div class="mt-8 grid gap-6 lg:grid-cols-3">
            @for (project of data().projects; track project.id) {
              <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-xl font-semibold">{{ project.title }}</h3>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {{ project.featured ? 'Featured' : 'Project' }}
                  </span>
                </div>
                <p class="mt-4 text-sm leading-7 text-slate-600">{{ project.description }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{{ tech }}</span>
                  }
                </div>
                <div class="mt-6 flex flex-wrap gap-3">
                  @if (project.liveLink) {
                    <a [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white">View Live</a>
                  }
                  @if (project.githubLink) {
                    <a [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Source</a>
                  }
                </div>
              </article>
            }
          </div>
        </section>

        <section id="skills" class="pt-16">
          <div class="rounded-[2rem] bg-slate-950 px-6 py-8 text-white sm:px-8">
            <p class="text-xs uppercase tracking-[0.32em] text-pink-300">Skill Palette</p>
            <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              @for (skill of data().skills; track skill.id) {
                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div class="flex items-center justify-between gap-4">
                    <p class="font-semibold">{{ skill.name }}</p>
                    <span class="text-sm text-pink-200">{{ skill.level }}%</span>
                  </div>
                  <div class="mt-4 h-2 rounded-full bg-white/10">
                    <div class="h-2 rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-amber-300" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <section id="experience" class="pt-16">
          <p class="text-xs uppercase tracking-[0.32em] text-pink-500">Experience</p>
          <div class="mt-6 space-y-4">
            @for (item of data().experience; track item.id) {
              <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 class="text-xl font-semibold">{{ item.position }}</h3>
                    <p class="mt-1 text-slate-600">{{ item.company }}</p>
                  </div>
                  <span class="text-sm font-medium text-slate-500">{{ item.duration || dateRange(item.startDate, item.endDate) }}</span>
                </div>
                <p class="mt-4 text-sm leading-7 text-slate-600">{{ item.description }}</p>
              </article>
            }
          </div>
        </section>

        <section id="contact" class="pt-16">
          <div class="rounded-[2rem] bg-[linear-gradient(135deg,#ec4899_0%,#7c3aed_100%)] p-8 text-white">
            <p class="text-xs uppercase tracking-[0.32em] text-pink-100">Contact</p>
            <h2 class="mt-3 text-3xl font-bold">Open for bold, thoughtful collaborations.</h2>
            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              @for (item of contactCards(); track item.label) {
                <div class="rounded-[1.5rem] bg-white/12 p-5 backdrop-blur">
                  <p class="text-sm text-white/70">{{ item.label }}</p>
                  <p class="mt-3 break-all text-base font-medium">{{ item.value }}</p>
                </div>
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theme2Component {
  data = input.required<PortfolioData>();

  protected navItems = [
    { label: 'About', fragment: 'about' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Contact', fragment: 'contact' },
  ];

  protected moodboardCards = computed(() => [
    { label: 'Primary Role', title: this.data().profile.title || 'Creative Technologist' },
    { label: 'Years', title: `${this.data().about.yearsExperience}+ years` },
    { label: 'Projects', title: `${this.data().projects.length} launched pieces` },
    { label: 'Location', title: this.data().contact.location || 'Remote-ready' },
  ]);

  protected contactCards = computed(() =>
    [
      { label: 'Email', value: this.data().contact.email },
      { label: 'Instagram', value: this.data().contact.instagram },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
      { label: 'Portfolio', value: this.data().contact.portfolio },
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
