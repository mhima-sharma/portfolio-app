import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-theme6',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#0b1020] text-[#f7f1e7]">
      <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(200,165,106,0.22),_transparent_30%),linear-gradient(180deg,#0b1020_0%,#121a2f_48%,#0b1020_100%)] px-4 py-4 sm:px-6 lg:px-8">
        <main class="mx-auto max-w-7xl">
          <section class="overflow-hidden rounded-[2rem] border border-[#c8a56a]/20 bg-[linear-gradient(135deg,rgba(14,20,38,0.96),rgba(20,29,52,0.92))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
            <header class="border-b border-white/10 px-5 py-4 md:px-7">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#c8a56a]">Premium Signature</p>
                  <h1 class="mt-2 text-2xl font-black tracking-[-0.04em] text-white md:text-4xl">{{ data().profile.name || 'Portfolio' }}</h1>
                  <p class="mt-2 max-w-2xl text-xs leading-6 text-[#d9d1c3] md:text-sm">
                    {{ data().profile.title || 'Professional profile and curated showcase' }}
                  </p>
                </div>

                <nav class="flex flex-wrap gap-2 text-xs">
                  @for (item of navItems(); track item.fragment) {
                    <a [href]="sectionHref(item.fragment)" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#efe4d0] transition hover:border-[#c8a56a]/40 hover:bg-white/10">
                      {{ item.label }}
                    </a>
                  }
                </nav>
              </div>
            </header>

            <section class="grid gap-5 px-5 py-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-7 lg:py-7">
              <div>
                <p class="inline-flex rounded-full border border-[#c8a56a]/30 bg-[#c8a56a]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e3c999]">
                  Curated Public Presence
                </p>
                <h2 class="mt-4 max-w-3xl text-[2.1rem] font-black leading-[1.08] tracking-[-0.04em] text-white md:text-[2.85rem] lg:text-[3.1rem]">
                  {{ heroHeadline() }}
                </h2>
                <p class="mt-4 max-w-2xl text-sm leading-7 text-[#d8d2c8] md:text-base">
                  {{ heroSummary() }}
                </p>

                <div class="mt-6 flex flex-wrap gap-3">
                  <a [href]="sectionHref('projects')" class="rounded-full bg-[#c8a56a] px-5 py-2.5 text-sm font-semibold text-[#1a1f2f] transition hover:bg-[#d7b983]">
                    View Work
                  </a>
                  <a [href]="sectionHref('contact')" class="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#c8a56a]/40 hover:bg-white/5">
                    Contact
                  </a>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                @for (item of statCards(); track item.label) {
                  <article class="rounded-[1.3rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a56a]">{{ item.label }}</p>
                    <p class="mt-2 text-2xl font-black text-white">{{ item.value }}</p>
                    <p class="mt-2 text-xs leading-5 text-[#b8b0a2]">{{ item.copy }}</p>
                  </article>
                }
              </div>
            </section>
          </section>

          <section class="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article id="about" class="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
              <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">About</p>
              <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">{{ data().profile.title || 'Professional overview' }}</h3>
              <p class="mt-4 text-sm leading-7 text-[#d6d0c5]">{{ data().about.bio || data().about.description }}</p>
              <p class="mt-4 text-sm leading-7 text-[#aaa397]">{{ data().about.description || 'Profile details will appear here.' }}</p>
            </article>

            <article id="experience" class="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
              <div class="flex items-end justify-between gap-4">
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">Experience</p>
                  <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">Professional journey</h3>
                </div>
              </div>

              <div class="mt-5 space-y-3">
                @for (item of featuredExperience(); track item.id) {
                  <article class="rounded-[1.2rem] border border-white/10 bg-[#11182b] p-4">
                    <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h4 class="text-base font-semibold text-white">{{ item.position }}</h4>
                        <p class="mt-1 text-xs text-[#d3c09a]">{{ item.company }}</p>
                      </div>
                      <p class="text-xs text-[#a69c8b]">{{ item.duration || dateRange(item.startDate, item.endDate) }}</p>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-[#d0c9bc]">{{ item.description }}</p>
                  </article>
                }
              </div>
            </article>
          </section>

          <section id="projects" class="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
            <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">Portfolio</p>
                <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">Selected work and featured outcomes</h3>
              </div>
              <p class="max-w-2xl text-sm leading-6 text-[#b8b0a2]">
                A premium showcase layout built only from your current project, skill, and experience data.
              </p>
            </div>

            <div class="mt-6 grid gap-4 lg:grid-cols-3">
              @for (project of featuredProjects(); track project.id) {
                <article class="rounded-[1.3rem] border border-white/10 bg-[#101728] p-4">
                  <div class="flex items-start justify-between gap-3">
                    <h4 class="text-lg font-semibold text-white">{{ project.title }}</h4>
                    @if (project.featured) {
                      <span class="rounded-full bg-[#c8a56a]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e1c48f]">Featured</span>
                    }
                  </div>

                  @if (project.image) {
                    <div class="mt-3 overflow-hidden rounded-[1rem] border border-white/10">
                      <img [src]="project.image" [alt]="project.title" class="h-36 w-full object-cover" />
                    </div>
                  }

                  <p class="mt-3 text-sm leading-6 text-[#d4cdc0]">{{ project.description }}</p>

                  <div class="mt-3 flex flex-wrap gap-2">
                    @for (item of project.technologies.slice(0, 4); track item) {
                      <span class="rounded-full border border-white/10 px-3 py-1 text-xs text-[#c7beaf]">{{ item }}</span>
                    }
                  </div>

                  <div class="mt-4 flex flex-wrap gap-3">
                    @if (project.liveLink) {
                      <a [href]="project.liveLink" target="_blank" rel="noopener noreferrer" class="rounded-full bg-[#c8a56a] px-4 py-2 text-xs font-semibold text-[#1a1f2f]">
                        Live
                      </a>
                    }
                    @if (project.githubLink) {
                      <a [href]="project.githubLink" target="_blank" rel="noopener noreferrer" class="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white">
                        Details
                      </a>
                    }
                  </div>
                </article>
              }
            </div>
          </section>

          @if (premiumGallery().length) {
            <section id="gallery" class="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
              <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">Premium Gallery</p>
                  <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">Visual highlights</h3>
                </div>
                <p class="max-w-2xl text-sm leading-6 text-[#b8b0a2]">
                  Images uploaded from admin and fetched by slug for this premium portfolio view.
                </p>
              </div>

              <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                @for (image of premiumGallery(); track image.id) {
                  <button
                    type="button"
                    (click)="openGalleryImage(image.id)"
                    class="group overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#11182b] text-left transition hover:-translate-y-1 hover:border-[#c8a56a]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                  >
                    <div class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(200,165,106,0.1),transparent_58%),#0f172a]">
                      <img
                        [src]="image.imageUrl"
                        [alt]="image.altText || image.title || 'Gallery image'"
                        class="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div class="border-t border-white/10 p-4">
                      <div class="flex items-center justify-between gap-3">
                        <p class="truncate text-sm font-semibold text-white">{{ image.title || 'Gallery image' }}</p>
                        @if (image.isFeatured) {
                          <span class="shrink-0 rounded-full bg-[#c8a56a]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e1c48f]">
                            Featured
                          </span>
                        }
                      </div>
                      <p class="mt-2 line-clamp-2 text-xs leading-6 text-[#b8b0a2]">
                        {{ image.altText || 'Tap to view this image in full size.' }}
                      </p>
                    </div>
                  </button>
                }
              </div>
            </section>
          }

          @if (activeGalleryImage(); as activeImage) {
            <div
              class="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/90 p-4 backdrop-blur-sm"
              (click)="closeGalleryImage()"
            >
              <div
                class="relative w-full max-w-6xl overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0f172a] shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
                (click)="$event.stopPropagation()"
              >
                <button
                  type="button"
                  (click)="closeGalleryImage()"
                  class="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#c8a56a]/40 hover:bg-black/55"
                >
                  Close
                </button>

                <div class="grid max-h-[85vh] md:grid-cols-[minmax(0,1fr)_320px]">
                  <div class="flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(200,165,106,0.12),transparent_45%),#020617] p-6 md:min-h-[70vh]">
                    <img
                      [src]="activeImage.imageUrl"
                      [alt]="activeImage.altText || activeImage.title || 'Gallery image'"
                      class="max-h-[72vh] w-full object-contain"
                    />
                  </div>

                  <aside class="flex flex-col justify-between border-t border-white/10 p-5 md:border-l md:border-t-0">
                    <div>
                      <div class="flex flex-wrap items-center gap-3">
                        <p class="rounded-full bg-[#c8a56a]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e1c48f]">
                          Premium Gallery
                        </p>
                        <p class="text-[11px] uppercase tracking-[0.18em] text-[#8f8778]">
                          {{ activeGalleryIndex() + 1 }} / {{ premiumGallery().length }}
                        </p>
                      </div>

                      <h4 class="mt-4 text-2xl font-bold text-white">
                        {{ activeImage.title || 'Gallery image' }}
                      </h4>
                      <p class="mt-3 text-sm leading-7 text-[#c7c0b3]">
                        {{ activeImage.altText || 'Selected image from the premium portfolio gallery.' }}
                      </p>
                    </div>

                    <div class="mt-6 flex gap-3">
                      <button
                        type="button"
                        (click)="showPreviousGalleryImage()"
                        class="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#c8a56a]/40 hover:bg-white/5"
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        (click)="showNextGalleryImage()"
                        class="rounded-full bg-[#c8a56a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1f2f] transition hover:bg-[#d7b983]"
                      >
                        Next
                      </button>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          }

          <section class="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article id="skills" class="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
              <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">Capabilities</p>
              <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">Core strengths</h3>
              <div class="mt-5 space-y-3">
                @for (skill of featuredSkills(); track skill.id) {
                  <div class="rounded-[1.15rem] border border-white/10 bg-[#11182b] p-3.5">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <p class="text-sm font-semibold text-white">{{ skill.name }}</p>
                        <p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#a99f8f]">{{ skill.category }}</p>
                      </div>
                      <p class="text-xs font-bold text-[#d8bc83]">{{ skill.level }}%</p>
                    </div>
                    <div class="mt-3 h-2 rounded-full bg-white/10">
                      <div class="h-2 rounded-full bg-[linear-gradient(90deg,#c8a56a,#f0dbb0)]" [style.width.%]="skill.level"></div>
                    </div>
                  </div>
                }
              </div>
            </article>

            <article id="contact" class="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(200,165,106,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6">
              <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c8a56a]">Connect</p>
              <h3 class="mt-3 text-2xl font-bold text-white md:text-3xl">Open for conversations and new opportunities</h3>
              <div class="mt-5 grid gap-3 md:grid-cols-2">
                @for (item of contactCards(); track item.label) {
                  <div class="rounded-[1.1rem] border border-white/10 bg-[#101728]/90 p-3.5">
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8a56a]">{{ item.label }}</p>
                    <p class="mt-2 break-all text-sm font-medium text-[#f6f0e6]">{{ item.value }}</p>
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
export class Theme6Component {
  private portfolioService = inject(PortfolioService);
  data = input.required<PortfolioData>();
  premiumGallery = this.portfolioService.getPremiumGallery;
  protected activeGalleryImageId = signal<string | number | null>(null);

  protected navItems = computed(() => {
    const items = [
      { label: 'About', fragment: 'about' },
      { label: 'Experience', fragment: 'experience' },
      { label: 'Portfolio', fragment: 'projects' },
      { label: 'Skills', fragment: 'skills' },
      { label: 'Contact', fragment: 'contact' },
    ];

    if (this.premiumGallery().length) {
      items.splice(3, 0, { label: 'Gallery', fragment: 'gallery' });
    }

    return items;
  });

  protected heroHeadline = computed(() =>
    this.data().about.bio || `${this.data().profile.name || 'This portfolio'} presents selected work with clarity and confidence.`
  );

  protected heroSummary = computed(
    () =>
      this.data().about.description ||
      this.data().profile.title ||
      'This premium layout uses your existing portfolio data to create a more elevated presentation.'
  );

  protected featuredProjects = computed(() =>
    (this.data().projects.some((project) => project.featured)
      ? this.data().projects.filter((project) => project.featured)
      : this.data().projects
    ).slice(0, 6)
  );

  protected featuredExperience = computed(() => this.data().experience.slice(0, 4));
  protected featuredSkills = computed(() => this.data().skills.slice(0, 6));
  protected activeGalleryIndex = computed(() =>
    this.premiumGallery().findIndex((image) => image.id === this.activeGalleryImageId())
  );
  protected activeGalleryImage = computed(
    () => this.premiumGallery().find((image) => image.id === this.activeGalleryImageId()) ?? null
  );

  protected statCards = computed(() => [
    {
      label: 'Experience',
      value: `${this.data().about.yearsExperience}+`,
      copy: 'Years of hands-on growth and professional progress.',
    },
    {
      label: 'Projects',
      value: `${this.data().projects.length}`,
      copy: 'Work samples currently available on the public page.',
    },
    {
      label: 'Skills',
      value: `${this.data().skills.length}`,
      copy: 'Core strengths and areas of focus already captured.',
    },
    {
      label: 'Theme',
      value: 'Premium',
      copy: 'A premium-style layout built with existing portfolio data only.',
    },
  ]);

  protected contactCards = computed(() =>
    [
      { label: 'Email', value: this.data().contact.email },
      { label: 'Phone', value: this.data().contact.phone },
      { label: 'Location', value: this.data().contact.location },
      { label: 'LinkedIn', value: this.data().contact.linkedin },
      { label: 'Portfolio', value: this.data().contact.portfolio },
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

  protected openGalleryImage(imageId: string | number) {
    this.activeGalleryImageId.set(imageId);
  }

  protected closeGalleryImage() {
    this.activeGalleryImageId.set(null);
  }

  protected showPreviousGalleryImage() {
    const images = this.premiumGallery();
    const currentIndex = this.activeGalleryIndex();
    if (!images.length) {
      return;
    }

    const nextIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
    this.activeGalleryImageId.set(images[nextIndex].id);
  }

  protected showNextGalleryImage() {
    const images = this.premiumGallery();
    const currentIndex = this.activeGalleryIndex();
    if (!images.length) {
      return;
    }

    const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
    this.activeGalleryImageId.set(images[nextIndex].id);
  }
}
