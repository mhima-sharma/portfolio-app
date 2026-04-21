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
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-orange-300">Developer Mode</p>
            <h1 class="mt-1 text-base font-semibold">{{ data().profile.name || 'Portfolio' }}</h1>
          </div>
          <nav class="hidden gap-4 text-[11px] text-slate-300 md:flex">
            @for (item of navItems; track item.fragment) {
              <a [href]="sectionHref(item.fragment)" class="transition hover:text-white">{{ item.label }}</a>
            }
          </nav>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <section class="grid gap-4 rounded-[1.45rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.28)] lg:grid-cols-[1.2fr_0.8fr] md:p-5">
          <div>
            <p class="text-[11px] font-medium uppercase tracking-[0.28em] text-orange-300">{{ data().profile.title || 'Full Stack Developer' }}</p>
            <h2 class="mt-3 max-w-3xl text-[1.6rem] font-black leading-[1.08] text-white md:text-[2.2rem] lg:text-[2.5rem]">
              {{ heroTitle() }}
            </h2>
            <p class="mt-3 max-w-2xl text-xs leading-6 text-slate-300 md:text-sm">
              {{ heroSummary() }}
            </p>
            <div class="mt-5 flex flex-wrap gap-2.5">
              <a [href]="sectionHref('projects')" class="rounded-full bg-orange-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-orange-400">
                Explore Projects
              </a>
              <a [href]="sectionHref('contact')" class="rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/40 hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div class="grid gap-2.5 sm:grid-cols-2">
            <div class="rounded-[1rem] border border-white/10 bg-slate-950/70 p-3.5">
              <p class="text-[11px] text-slate-400">Selected Theme</p>
              <p class="mt-1.5 text-lg font-bold text-orange-400">{{ data().profile.selectedTheme }}</p>
            </div>
            <div class="rounded-[1rem] border border-white/10 bg-slate-950/70 p-3.5">
              <p class="text-[11px] text-slate-400">Projects</p>
              <p class="mt-1.5 text-lg font-bold">{{ data().projects.length }}</p>
            </div>
            <div class="rounded-[1rem] border border-white/10 bg-slate-950/70 p-3.5">
              <p class="text-[11px] text-slate-400">Skills</p>
              <p class="mt-1.5 text-lg font-bold">{{ data().skills.length }}</p>
            </div>
            <div class="rounded-[1rem] border border-white/10 bg-slate-950/70 p-3.5">
              <p class="text-[11px] text-slate-400">Experience</p>
              <p class="mt-1.5 text-lg font-bold">{{ data().about.yearsExperience }}+</p>
            </div>
          </div>
        </section>

        <section id="about" class="grid gap-4 pt-11 lg:grid-cols-[0.7fr_1.3fr]">
          <div class="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-400">About</p>
            <p class="mt-2.5 text-xl font-semibold text-white">{{ data().profile.name }}</p>
            <p class="mt-1.5 text-xs text-slate-300">{{ data().contact.location || 'Location unavailable' }}</p>
          </div>
          <div class="rounded-[1.2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
            <p class="text-xs leading-6 text-slate-200 md:text-sm">{{ data().about.bio || data().about.description }}</p>
            <p class="mt-3 text-xs leading-6 text-slate-400 md:text-sm">{{ data().about.description }}</p>
          </div>
        </section>

        <section id="skills" class="pt-11">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Core Stack</p>
              <h3 class="mt-1.5 text-xl font-bold text-white">Skills</h3>
            </div>
          </div>
          <div class="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            @for (skill of data().skills; track skill.id) {
              <article class="rounded-[1rem] border border-white/10 bg-white/5 p-3.5">
                <div class="flex items-center justify-between gap-4">
                  <h4 class="text-sm font-semibold text-white">{{ skill.name }}</h4>
                  <span class="text-xs font-semibold text-orange-300">{{ skill.level }}%</span>
                </div>
                <p class="mt-1 text-[11px] capitalize text-slate-400">{{ skill.category }}</p>
                <div class="mt-2.5 h-1.5 rounded-full bg-white/10">
                  <div class="h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-300" [style.width.%]="skill.level"></div>
                </div>
              </article>
            }
          </div>
        </section>

        <section id="projects" class="pt-11">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Selected Work</p>
              <h3 class="mt-1.5 text-xl font-bold text-white">Projects</h3>
            </div>
          </div>
          <div class="mt-5 grid gap-3 lg:grid-cols-2">
            @for (project of data().projects; track project.id) {
              <article class="rounded-[1.15rem] border border-white/10 bg-white/5 p-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h4 class="text-base font-semibold text-white">{{ project.title }}</h4>
                    <p class="mt-2 text-xs leading-6 text-slate-300 md:text-sm">{{ project.description }}</p>
                  </div>
                  @if (project.featured) {
                    <span class="rounded-full border border-orange-400/40 bg-orange-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">Featured</span>
                  }
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-300">{{ tech }}</span>
                  }
                </div>
                <div class="mt-3 flex flex-wrap gap-2.5">
                  @if (project.liveLink) {
                    <a [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-950">Live Demo</a>
                  }
                  @if (project.githubLink) {
                    <a [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white">Source Code</a>
                  }
                </div>
              </article>
            }
          </div>
        </section>

        <section id="experience" class="pt-11">
          <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Career Path</p>
          <h3 class="mt-1.5 text-xl font-bold text-white">Experience</h3>
          <div class="mt-5 space-y-2.5">
            @for (item of data().experience; track item.id) {
              <article class="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 class="text-sm font-semibold text-white">{{ item.position }}</h4>
                    <p class="mt-1 text-xs text-slate-300">{{ item.company }}</p>
                  </div>
                  <p class="text-xs text-slate-400">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                </div>
                <p class="mt-2.5 text-xs leading-6 text-slate-300 md:text-sm">{{ item.description }}</p>
              </article>
            }
          </div>
        </section>

        <section id="contact" class="pt-11">
          <div class="rounded-[1.4rem] border border-white/10 bg-gradient-to-r from-slate-900 to-slate-950 p-4 md:p-5">
            <p class="text-xs uppercase tracking-[0.32em] text-orange-300">Contact</p>
            <h3 class="mt-1.5 text-xl font-bold text-white">Let’s build something solid</h3>
            <div class="mt-4 grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
              @for (item of contactCards(); track item.label) {
                <div class="rounded-[1rem] border border-white/10 bg-white/5 p-3.5">
                  <p class="text-[11px] text-slate-400">{{ item.label }}</p>
                  <p class="mt-1.5 break-all text-xs font-medium text-white md:text-sm">{{ item.value }}</p>
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
