import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../models/portfolio.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
            <h1 class="mt-1 text-base font-semibold">
              {{ viewData().profile.name || 'Portfolio' }}
            </h1>
          </div>

          <!-- Language Selector -->
          <select
            class="rounded bg-slate-900 border border-white/20 text-xs px-2 py-1"
            (change)="onLangChange($event)"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
          </select>

          <nav class="hidden gap-4 text-[11px] text-slate-300 md:flex">
            @for (item of navItems; track item.fragment) {
              <a [href]="sectionHref(item.fragment)" class="transition hover:text-white">
                {{ item.label }}
              </a>
            }
          </nav>
        </div>
      </header>

      <main class="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <section class="grid gap-4 rounded-[1.45rem] border border-white/10 bg-white/5 p-4 shadow lg:grid-cols-[1.2fr_0.8fr] md:p-5">
          <div>
            <p class="text-[11px] uppercase tracking-[0.28em] text-orange-300">
              {{ viewData().profile.title }}
            </p>

            <h2 class="mt-3 text-[1.6rem] font-black text-white md:text-[2.2rem]">
              {{ heroTitle() }}
            </h2>

            <p class="mt-3 text-xs text-slate-300 md:text-sm">
              {{ heroSummary() }}
            </p>
          </div>
        </section>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theme1Component implements OnInit {

  data = input.required<PortfolioData>();
  private http = inject(HttpClient);

  selectedLang = signal('en');
  translatedData = signal<PortfolioData | null>(null);

  viewData = computed(() => this.translatedData() || this.data());

  ngOnInit() {
    this.translatePortfolio();
  }

  protected heroTitle = computed(() =>
    this.viewData().about.bio ||
    `${this.viewData().profile.name} builds digital products.`
  );

  protected heroSummary = computed(
    () =>
      this.viewData().about.description ||
      this.viewData().profile.title
  );

  protected navItems = [
    { label: 'About', fragment: 'about' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Contact', fragment: 'contact' },
  ];

  // 🔥 WORKING TRANSLATION (TEST MODE)
  async translatePortfolio() {
    const original = this.data();

    try {
      let textParts: string[] = [];

      textParts.push(original.profile.name || '');
      textParts.push(original.profile.title || '');
      textParts.push(original.about.bio || '');
      textParts.push(original.about.description || '');

      original.projects.forEach(p => {
        textParts.push(p.title || '');
        textParts.push(p.description || '');
      });

      original.skills.forEach(s => {
        textParts.push(s.name || '');
        textParts.push(s.category || '');
      });

      original.experience.forEach(e => {
        textParts.push(e.position || '');
        textParts.push(e.company || '');
        textParts.push(e.description || '');
      });

      const combinedText = textParts.join(' || ');

      // ✅ GOOGLE FREE TRANSLATE API
      const res: any = await firstValueFrom(
        this.http.get(
          'https://translate.googleapis.com/translate_a/single',
          {
            params: {
              client: 'gtx',
              sl: 'auto',
              tl: this.selectedLang(),
              dt: 't',
              q: combinedText,
            },
          }
        )
      );

      // ✅ Parse weird response
      const translatedText = res[0].map((item: any) => item[0]).join('');
      const translatedParts = translatedText.split('||').map((t: string) => t.trim());

      let i = 0;

      const translated = {
        ...original,
        profile: {
          ...original.profile,
          name: translatedParts[i++] || original.profile.name,
          title: translatedParts[i++] || original.profile.title,
        },
        about: {
          ...original.about,
          bio: translatedParts[i++] || original.about.bio,
          description: translatedParts[i++] || original.about.description,
        },
        projects: original.projects.map(p => ({
          ...p,
          title: translatedParts[i++] || p.title,
          description: translatedParts[i++] || p.description,
        })),
        skills: original.skills.map(s => ({
          ...s,
          name: translatedParts[i++] || s.name,
          category: translatedParts[i++] || s.category,
        })),
        experience: original.experience.map(e => ({
          ...e,
          position: translatedParts[i++] || e.position,
          company: translatedParts[i++] || e.company,
          description: translatedParts[i++] || e.description,
        })),
      };

      this.translatedData.set(translated);

    } catch (err) {
      console.error('Translation failed:', err);
      this.translatedData.set(original);
    }
  }

  async onLangChange(event: any) {
    this.selectedLang.set(event.target.value);
    await this.translatePortfolio();
  }

  protected sectionHref(fragment: string) {
    return `${window.location.pathname}#${fragment}`;
  }
}
