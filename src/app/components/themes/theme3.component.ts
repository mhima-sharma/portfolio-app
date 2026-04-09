import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-theme3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-100 text-slate-900">
      <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div class="grid lg:grid-cols-[0.38fr_0.62fr]">
            <aside class="bg-[linear-gradient(180deg,#0f766e_0%,#134e4a_100%)] p-8 text-white">
              <p class="text-xs uppercase tracking-[0.35em] text-teal-100">Corporate Resume</p>
              <h1 class="mt-4 text-4xl font-bold">{{ data().profile.name }}</h1>
              <p class="mt-3 text-lg text-teal-50">{{ data().profile.title || 'Professional profile' }}</p>
              <div class="mt-8 space-y-5">
                @for (item of sidebarItems(); track item.label) {
                  <div>
                    <p class="text-xs uppercase tracking-[0.28em] text-teal-100/80">{{ item.label }}</p>
                    <p class="mt-2 break-all text-sm font-medium text-white">{{ item.value }}</p>
                  </div>
                }
              </div>

              <nav class="mt-10 grid gap-2 text-sm">
                @for (item of navItems; track item.fragment) {
                  <a [href]="sectionHref(item.fragment)" class="rounded-xl border border-white/15 px-4 py-3 text-teal-50 transition hover:bg-white/10">
                    {{ item.label }}
                  </a>
                }
              </nav>
            </aside>

            <div class="p-8 md:p-10">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.32em] text-teal-700">Executive Summary</p>
                  <h2 class="mt-3 text-3xl font-bold text-slate-950">Professional snapshot</h2>
                </div>
                <span class="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">{{ data().profile.selectedTheme }}</span>
              </div>
              <p class="mt-6 text-base leading-8 text-slate-600">{{ data().about.description || data().about.bio }}</p>

              <div class="mt-8 grid gap-4 sm:grid-cols-3">
                <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p class="text-sm text-slate-500">Years</p>
                  <p class="mt-2 text-3xl font-bold text-slate-950">{{ data().about.yearsExperience }}+</p>
                </div>
                <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p class="text-sm text-slate-500">Projects</p>
                  <p class="mt-2 text-3xl font-bold text-slate-950">{{ data().projects.length }}</p>
                </div>
                <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p class="text-sm text-slate-500">Skills</p>
                  <p class="mt-2 text-3xl font-bold text-slate-950">{{ data().skills.length }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" class="pt-12">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-slate-950">Experience</h3>
            <div class="mt-8 space-y-6">
              @for (item of data().experience; track item.id) {
                <article class="border-l-4 border-teal-600 pl-5">
                  <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 class="text-lg font-semibold text-slate-950">{{ item.position }}</h4>
                      <p class="mt-1 text-sm text-slate-600">{{ item.company }}</p>
                    </div>
                    <p class="text-sm font-medium text-slate-500">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                  </div>
                  <p class="mt-4 text-sm leading-7 text-slate-600">{{ item.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="projects" class="pt-12">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-slate-950">Projects</h3>
            <div class="mt-8 grid gap-5 lg:grid-cols-2">
              @for (project of data().projects; track project.id) {
                <article class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div class="flex items-center justify-between gap-4">
                    <h4 class="text-lg font-semibold text-slate-950">{{ project.title }}</h4>
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {{ project.featured ? 'Priority' : 'Project' }}
                    </span>
                  </div>
                  <p class="mt-4 text-sm leading-7 text-slate-600">{{ project.description }}</p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    @for (tech of project.technologies; track tech) {
                      <span class="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700">{{ tech }}</span>
                    }
                  </div>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="skills" class="pt-12">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-slate-950">Skills</h3>
            <div class="mt-8 grid gap-4 md:grid-cols-2">
              @for (skill of data().skills; track skill.id) {
                <div class="rounded-[1.25rem] border border-slate-200 p-5">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="font-semibold text-slate-950">{{ skill.name }}</p>
                      <p class="mt-1 text-sm capitalize text-slate-500">{{ skill.category }}</p>
                    </div>
                    <p class="text-sm font-semibold text-teal-700">{{ skill.level }}%</p>
                  </div>
                  <div class="mt-4 h-2 rounded-full bg-slate-200">
                    <div class="h-2 rounded-full bg-teal-600" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <section id="about" class="pt-12">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-slate-950">About</h3>
            <p class="mt-6 text-base leading-8 text-slate-600">{{ data().about.bio || data().about.description }}</p>
          </div>
        </section>

        <section id="contact" class="pt-12">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-slate-950">Contact</h3>
            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              @for (item of sidebarItems(); track item.label) {
                <div class="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
                  <p class="text-sm text-slate-500">{{ item.label }}</p>
                  <p class="mt-3 break-all text-sm font-semibold text-slate-900">{{ item.value }}</p>
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
export class Theme3Component {
  data = input.required<PortfolioData>();

  protected navItems = [
    { label: 'Experience', fragment: 'experience' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'About', fragment: 'about' },
    { label: 'Contact', fragment: 'contact' },
  ];

  protected sidebarItems = computed(() =>
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
    if (typeof window === 'undefined') {
      return `#${fragment}`;
    }

    return `${window.location.pathname}#${fragment}`;
  }

  protected dateRange(startDate: string, endDate: string) {
    return [startDate, endDate].filter(Boolean).join(' - ') || 'Present';
  }
}
