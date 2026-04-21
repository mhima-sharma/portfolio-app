import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-theme4',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen overflow-hidden bg-[#11192f] text-white">
      <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.26),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.12),_transparent_24%),linear-gradient(180deg,#17213d_0%,#0f1730_100%)] px-4 py-5 sm:px-6 lg:px-8">
        <main class="mx-auto max-w-7xl">
          <section class="rounded-[2.25rem] border border-orange-300/20 bg-[#101a34] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.35)] md:p-8">
            <header class="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-black/25 px-4 py-3 backdrop-blur md:px-5">
              <div class="text-lg font-bold tracking-wide text-white">{{ data().profile.name || 'Portfolio' }}</div>
              <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-200">
                @for (item of navItems; track item.fragment) {
                  <a [href]="sectionHref(item.fragment)" class="rounded-full px-3 py-2 transition hover:bg-white/10">{{ item.label }}</a>
                }
               
              </nav>
            </header>

            <section class="grid gap-8 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div class="flex flex-wrap gap-3">
                  @for (link of socialLinks(); track link.label) {
                    <span class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                      {{ link.label }}
                    </span>
                  }
                </div>

                <h1 class="mt-6 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
                  Hi, I'm {{ data().profile.name || 'Your Name' }}
                </h1>
                <p class="mt-4 text-xl font-semibold text-orange-300">
                  {{ data().profile.title || 'Creative developer and digital builder' }}
                </p>
                <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  {{ data().about.description || data().about.bio || 'Portfolio profile data is available here.' }}
                </p>

                <div class="mt-8 flex flex-wrap gap-3">
                  <a [href]="resumeHref()" class="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                    Download CV
                  </a>
                  <a [href]="sectionHref('contact')" class="rounded-full border border-orange-300/35 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/5">
                    Contact Details
                  </a>
                </div>
              </div>

              <div class="relative flex justify-center">
                <div class="absolute inset-x-10 top-4 h-20 rounded-full bg-orange-500/30 blur-3xl"></div>
                <div class="relative w-full max-w-[430px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
                  <div class="absolute -left-4 top-12 h-20 w-20 rounded-[1.5rem] bg-orange-400/90 blur-[2px]"></div>
                  <div class="absolute -right-3 bottom-14 h-16 w-16 rounded-[1.35rem] border border-white/20 bg-violet-500/80"></div>
                  <div class="absolute right-6 top-2 rounded-full bg-pink-400 px-3 py-1 text-sm font-bold text-white shadow-lg">Hi</div>

                  <div class="relative mx-auto flex aspect-square max-w-[280px] items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.22),_transparent_38%),linear-gradient(180deg,#25314f_0%,#161f3b_100%)]">
                    <div class="flex h-40 w-40 items-center justify-center rounded-full border-4 border-orange-400/40 bg-[linear-gradient(180deg,#ffb361_0%,#f97316_100%)] text-5xl font-black text-white shadow-[0_20px_60px_rgba(249,115,22,0.35)]">
                      {{ initials() }}
                    </div>
                  </div>

                  <div class="mt-6 grid grid-cols-3 gap-3">
                    <div class="rounded-[1.1rem] border border-white/10 bg-black/20 p-3 text-center">
                      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Projects</p>
                      <p class="mt-2 text-xl font-bold text-white">{{ data().projects.length }}</p>
                    </div>
                    <div class="rounded-[1.1rem] border border-white/10 bg-black/20 p-3 text-center">
                      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Skills</p>
                      <p class="mt-2 text-xl font-bold text-white">{{ data().skills.length }}</p>
                    </div>
                    <div class="rounded-[1.1rem] border border-white/10 bg-black/20 p-3 text-center">
                      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Years</p>
                      <p class="mt-2 text-xl font-bold text-white">{{ data().about.yearsExperience }}+</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section class="grid gap-6 pt-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article id="about" class="rounded-[2rem] border border-orange-300/20 bg-[#101a34] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
              <p class="text-xs uppercase tracking-[0.3em] text-orange-300">About Me</p>
              <h2 class="mt-3 text-3xl font-bold text-white">{{ data().profile.title || 'Digital creator' }}</h2>
              <p class="mt-5 text-sm leading-7 text-slate-300 md:text-base">{{ data().about.bio || data().about.description }}</p>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <div class="rounded-[1.2rem] bg-black/20 p-4">
                  <p class="text-2xl font-bold text-orange-300">{{ data().about.yearsExperience }}+</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Years</p>
                </div>
                <div class="rounded-[1.2rem] bg-black/20 p-4">
                  <p class="text-2xl font-bold text-orange-300">{{ data().projects.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Projects</p>
                </div>
                <div class="rounded-[1.2rem] bg-black/20 p-4">
                  <p class="text-2xl font-bold text-orange-300">{{ data().skills.length }}</p>
                  <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Skills</p>
                </div>
              </div>
            </article>

            <article id="skills" class="rounded-[2rem] border border-orange-300/20 bg-[#101a34] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
              <p class="text-xs uppercase tracking-[0.3em] text-orange-300">My Skills</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Core stack and tools</h2>
              <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                @for (skill of data().skills; track skill.id) {
                  <div class="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                    <div class="flex items-center justify-between gap-3">
                      <p class="font-semibold text-white">{{ skill.name }}</p>
                      <span class="text-xs font-semibold text-orange-300">{{ skill.level }}%</span>
                    </div>
                    <p class="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{{ skill.category }}</p>
                    <div class="mt-4 h-2 rounded-full bg-white/10">
                      <div class="h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-200" [style.width.%]="skill.level"></div>
                    </div>
                  </div>
                }
              </div>
            </article>
          </section>

          <section id="projects" class="pt-6">
            <div class="rounded-[2rem] border border-orange-300/20 bg-[#101a34] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
              <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-orange-300">My Projects</p>
                  <h2 class="mt-3 text-3xl font-bold text-white">Selected work</h2>
                </div>
              </div>

              <div class="mt-6 grid gap-5 lg:grid-cols-3">
                @for (project of data().projects; track project.id) {
                  <article class="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    <div class="aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(135deg,#1f2b4d,#0f1730)]">
                      @if (project.image) {
                        <img [src]="project.image" [alt]="project.title" class="h-full w-full object-cover" />
                      } @else {
                        <div class="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                          {{ project.title }}
                        </div>
                      }
                    </div>
                    <div class="mt-4 flex items-start justify-between gap-3">
                      <h3 class="text-lg font-semibold text-white">{{ project.title }}</h3>
                      @if (project.featured) {
                        <span class="rounded-full bg-orange-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">Featured</span>
                      }
                    </div>
                    <p class="mt-3 text-sm leading-7 text-slate-300">{{ project.description }}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      @for (tech of project.technologies.slice(0, 4); track tech) {
                        <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{{ tech }}</span>
                      }
                    </div>
                    <div class="mt-5 flex flex-wrap gap-3">
                      @if (project.githubLink) {
                        <a [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">
                          Code
                        </a>
                      }
                      @if (project.liveLink) {
                        <a [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                          Live
                        </a>
                      }
                    </div>
                  </article>
                }
              </div>
            </div>
          </section>

          <section class="grid gap-6 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article id="experience" class="rounded-[2rem] border border-orange-300/20 bg-[#101a34] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
              <p class="text-xs uppercase tracking-[0.3em] text-orange-300">Experience</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Work timeline</h2>
              <div class="mt-6 space-y-4">
                @for (item of data().experience; track item.id) {
                  <article class="rounded-[1.35rem] border border-white/10 bg-black/20 p-5">
                    <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 class="text-lg font-semibold text-white">{{ item.position }}</h3>
                        <p class="mt-1 text-sm text-orange-200">{{ item.company }}</p>
                      </div>
                      <p class="text-sm text-slate-400">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                    </div>
                    <p class="mt-4 text-sm leading-7 text-slate-300">{{ item.description }}</p>
                  </article>
                }
              </div>
            </article>

            <article id="contact" class="rounded-[2rem] border border-orange-300/20 bg-[#101a34] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)]">
              <p class="text-xs uppercase tracking-[0.3em] text-orange-300">Get In Touch</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Contact details</h2>
              <p class="mt-4 text-sm leading-7 text-slate-300">
                Reach out using the details below. This theme intentionally shows direct contact information instead of a message form.
              </p>

              <div class="mt-6 grid gap-4">
                @for (item of contactCards(); track item.label) {
                  <div class="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                    <p class="text-xs uppercase tracking-[0.18em] text-slate-400">{{ item.label }}</p>
                    <p class="mt-2 break-all text-sm font-medium text-white md:text-base">{{ item.value }}</p>
                  </div>
                }
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theme4Component {
  data = input.required<PortfolioData>();

  protected navItems = [
    { label: 'Home', fragment: 'top' },
    { label: 'About', fragment: 'about' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Contact', fragment: 'contact' },
  ];

  protected initials = computed(() =>
    (this.data().profile.name || 'P')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
  );

  protected socialLinks = computed(() =>
    [
      { label: 'GitHub', value: this.data().contact.github },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
      { label: 'Instagram', value: this.data().contact.instagram },
      { label: 'YouTube', value: this.data().contact.youtube },
    ].filter((item) => Boolean(item.value))
  );

  protected contactCards = computed(() =>
    [
      { label: 'Email', value: this.data().contact.email },
      { label: 'Phone', value: this.data().contact.phone },
      { label: 'Location', value: this.data().contact.location },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
      { label: 'GitHub', value: this.data().contact.github },
      { label: 'Portfolio', value: this.data().contact.portfolio },
    ].filter((item) => Boolean(item.value))
  );

  protected sectionHref(fragment: string) {
    if (fragment === 'top') {
      return typeof window === 'undefined' ? '#' : `${window.location.pathname}#`;
    }

    if (typeof window === 'undefined') {
      return `#${fragment}`;
    }

    return `${window.location.pathname}#${fragment}`;
  }

  protected resumeHref() {
    if (typeof window === 'undefined') {
      const slug = this.data().profile.slug?.trim();
      return slug ? `/${slug}/resume` : '/resume';
    }

    const slug = this.data().profile.slug?.trim();
    return slug ? `${window.location.origin}/${slug}/resume` : `${window.location.origin}/resume`;
  }

  protected portfolioLink() {
    return this.data().contact.portfolio || this.sectionHref('contact');
  }

  protected dateRange(startDate: string, endDate: string) {
    return [startDate, endDate].filter(Boolean).join(' - ') || 'Present';
  }
}
