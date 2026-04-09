import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-theme1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#050816] text-slate-100">
      <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-orange-300">Developer Mode</p>
            <h1 class="mt-2 text-xl font-semibold">{{ data().profile.name || 'Portfolio' }}</h1>
          </div>
          <nav class="hidden gap-6 text-sm text-slate-300 md:flex">
            @for (item of navItems; track item.fragment) {
              <a [href]="sectionHref(item.fragment)" class="transition hover:text-white">{{ item.label }}</a>
            }
          </nav>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section class="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.4em] text-orange-300">{{ data().profile.title || 'Full Stack Developer' }}</p>
            <h2 class="mt-5 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              {{ heroTitle() }}
            </h2>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {{ heroSummary() }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a [href]="sectionHref('projects')" class="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                Explore Projects
              </a>
              <a [href]="sectionHref('contact')" class="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p class="text-sm text-slate-400">Selected Theme</p>
              <p class="mt-3 text-3xl font-bold text-orange-400">{{ data().profile.selectedTheme }}</p>
            </div>
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p class="text-sm text-slate-400">Projects</p>
              <p class="mt-3 text-3xl font-bold">{{ data().projects.length }}</p>
            </div>
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p class="text-sm text-slate-400">Skills</p>
              <p class="mt-3 text-3xl font-bold">{{ data().skills.length }}</p>
            </div>
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p class="text-sm text-slate-400">Experience</p>
              <p class="mt-3 text-3xl font-bold">{{ data().about.yearsExperience }}+</p>
            </div>
          </div>
        </section>

        <section id="about" class="grid gap-6 pt-20 lg:grid-cols-[0.7fr_1.3fr]">
          <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-400">About</p>
            <p class="mt-4 text-3xl font-semibold text-white">{{ data().profile.name }}</p>
            <p class="mt-3 text-slate-300">{{ data().contact.location || 'Location unavailable' }}</p>
          </div>
          <div class="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
            <p class="text-lg leading-8 text-slate-200">{{ data().about.bio || data().about.description }}</p>
            <p class="mt-5 text-base leading-7 text-slate-400">{{ data().about.description }}</p>
          </div>
        </section>

        <section id="skills" class="pt-20">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Core Stack</p>
              <h3 class="mt-3 text-3xl font-bold text-white">Skills</h3>
            </div>
          </div>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            @for (skill of data().skills; track skill.id) {
              <article class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="text-lg font-semibold text-white">{{ skill.name }}</h4>
                  <span class="text-sm font-semibold text-orange-300">{{ skill.level }}%</span>
                </div>
                <p class="mt-2 text-sm capitalize text-slate-400">{{ skill.category }}</p>
                <div class="mt-4 h-2 rounded-full bg-white/10">
                  <div class="h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300" [style.width.%]="skill.level"></div>
                </div>
              </article>
            }
          </div>
        </section>

        <section id="projects" class="pt-20">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Selected Work</p>
              <h3 class="mt-3 text-3xl font-bold text-white">Projects</h3>
            </div>
          </div>
          <div class="mt-8 grid gap-6 lg:grid-cols-2">
            @for (project of data().projects; track project.id) {
              <article class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h4 class="text-xl font-semibold text-white">{{ project.title }}</h4>
                    <p class="mt-3 text-sm leading-7 text-slate-300">{{ project.description }}</p>
                  </div>
                  @if (project.featured) {
                    <span class="rounded-full border border-orange-400/40 bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-200">Featured</span>
                  }
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{{ tech }}</span>
                  }
                </div>
                <div class="mt-5 flex flex-wrap gap-3">
                  @if (project.liveLink) {
                    <a [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Live Demo</a>
                  }
                  @if (project.githubLink) {
                    <a [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">Source Code</a>
                  }
                </div>
              </article>
            }
          </div>
        </section>

        <section id="experience" class="pt-20">
          <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Career Path</p>
          <h3 class="mt-3 text-3xl font-bold text-white">Experience</h3>
          <div class="mt-8 space-y-4">
            @for (item of data().experience; track item.id) {
              <article class="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 class="text-lg font-semibold text-white">{{ item.position }}</h4>
                    <p class="mt-1 text-sm text-slate-300">{{ item.company }}</p>
                  </div>
                  <p class="text-sm text-slate-400">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                </div>
                <p class="mt-4 text-sm leading-7 text-slate-300">{{ item.description }}</p>
              </article>
            }
          </div>
        </section>

        <section id="contact" class="pt-20">
          <div class="rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 to-slate-950 p-8">
            <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Contact</p>
            <h3 class="mt-3 text-3xl font-bold text-white">Let’s build something solid</h3>
            <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              @for (item of contactCards(); track item.label) {
                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p class="text-sm text-slate-400">{{ item.label }}</p>
                  <p class="mt-3 break-all text-base font-medium text-white">{{ item.value }}</p>
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
export class Theme1Component {
  data = input.required<PortfolioData>();

  protected navItems = [
    { label: 'About', fragment: 'about' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Contact', fragment: 'contact' },
  ];

  protected heroTitle = computed(() => this.data().about.bio || `${this.data().profile.name} builds digital products.`);
  protected heroSummary = computed(
    () => this.data().about.description || this.data().profile.title || 'Portfolio data is loading from the API.'
  );
  protected contactCards = computed(() =>
    [
      { label: 'Email', value: this.data().contact.email },
      { label: 'Phone', value: this.data().contact.phone },
      { label: 'Location', value: this.data().contact.location },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
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
