import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModernMinimalComponent } from '../themes/modern-minimal/theme.component';
import { ThemeCreativeDesignerComponent } from '../themes/creative-designer/theme.component';
import { ThemeDeveloperDarkComponent } from '../themes/developer-dark/theme.component';
import { ThemeCorporateProfessionalComponent } from '../themes/corporate-professional/theme.component';
import { ThemePersonalBrandingComponent } from '../themes/personal-branding/theme.component';
import { Theme5Component } from './themes/theme5.component';
import { Theme6Component } from './themes/theme6.component';
import { FreefolioThemeComponent } from '../themes/freefolio/theme.component';
import { PortfolioData, PortfolioTheme } from '../models/portfolio.model';
import { FreefolioThemeData } from '../themes/freefolio/freefolio-theme.model';
import { FreefolioThemeId, FREEFOLIO_THEMES, getFreefolioThemeMeta, isFreefolioTheme } from '../themes/freefolio/freefolio-theme.registry';

@Component({
  selector: 'app-theme-preview-modal',
  standalone: true,
  imports: [
    CommonModule,
    ThemeModernMinimalComponent,
    ThemeCreativeDesignerComponent,
    ThemeDeveloperDarkComponent,
    ThemeCorporateProfessionalComponent,
    ThemePersonalBrandingComponent,
    Theme5Component,
    Theme6Component,
    FreefolioThemeComponent,
  ],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" (click)="closeModal()">
      <div class="relative max-w-4xl w-full mx-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden" (click)="$event.stopPropagation()">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">{{ getThemeName(themeId()) }}</h2>
          <button (click)="closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div class="overflow-auto max-h-[80vh]">
          @if (isFreefolioTheme(themeId())) {
            <app-freefolio-theme [themeId]="getFreefolioThemeId()" [data]="getFreefolioData()"></app-freefolio-theme>
          } @else {
            @switch (themeId()) {
              @case ('modern-minimal') {
                <app-modern-minimal-theme [data]="previewData" profileSlug="preview" page="home"></app-modern-minimal-theme>
              }
              @case ('creative-designer') {
                <app-creative-designer-theme [data]="previewData" profileSlug="preview" page="home"></app-creative-designer-theme>
              }
              @case ('developer-dark') {
                <app-developer-dark-theme [data]="previewData" profileSlug="preview" page="home"></app-developer-dark-theme>
              }
              @case ('corporate-professional') {
                <app-corporate-professional-theme [data]="previewData" profileSlug="preview" page="home"></app-corporate-professional-theme>
              }
              @case ('personal-branding') {
                <app-personal-branding-theme [data]="previewData" profileSlug="preview" page="home"></app-personal-branding-theme>
              }
                @case ('theme-5') {
                <app-theme5 [data]="previewData"></app-theme5>
              }
              @case ('premium-signature') {
                <app-theme6 [data]="previewData"></app-theme6>
              }
              @default {
                <div class="p-8 text-center">Theme not found</div>
              }
            }
          }
        </div>
        <div class="flex justify-end p-4 border-t gap-2">
          <button (click)="closeModal()" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
          <button (click)="selectTheme()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Select Theme</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePreviewModalComponent {
  themeId = input.required<PortfolioTheme>();
  themeSelected = output<PortfolioTheme>();
  close = output<void>();

  previewData: PortfolioData = {
    profile: {
      slug: 'preview',
      name: 'John Doe',
      title: 'Software Developer',
      selectedTheme: 'modern-minimal' as any,
      contactData: {
        email: 'john@example.com',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe'
      }
    },
    about: {
      bio: 'Passionate software developer with experience in web technologies.',
      description: 'I create amazing web applications.',
      yearsExperience: 5
    },
    contact: {
      email: 'john@example.com',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    skills: [
      { id: 1, name: 'Angular', category: 'frontend', level: 90 },
      { id: 2, name: 'TypeScript', category: 'frontend', level: 85 },
      { id: 3, name: 'Node.js', category: 'backend', level: 80 }
    ],
    projects: [
      {
        id: 1,
        title: 'Portfolio Website',
        description: 'A personal portfolio website built with Angular.',
        image: '/assets/project1.jpg',
        technologies: ['Angular', 'TypeScript', 'Tailwind'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/johndoe/portfolio',
        featured: true
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Senior Developer',
        duration: '2020 - Present',
        description: 'Developed web applications using modern technologies.',
        startDate: '2020-01-01',
        endDate: 'Present'
      }
    ]
  };

  private themeNames = {
    'modern-minimal': 'Modern Minimal',
    'creative-designer': 'Creative Designer',
    'developer-dark': 'Developer Dark',
    'corporate-professional': 'Corporate Professional',
    'personal-branding': 'Personal Branding',
    'theme-5': 'Theme 5',
    'premium-signature': 'Premium Signature',
    ...Object.fromEntries(FREEFOLIO_THEMES.map((theme) => [theme.id, theme.name])),
  } as Record<string, string>;

  getThemeName(themeId: string): string {
    if (isFreefolioTheme(themeId as PortfolioTheme)) {
      return getFreefolioThemeMeta(themeId as FreefolioThemeId).name;
    }

    return this.themeNames[themeId] || 'Unknown Theme';
  }

  protected isFreefolioTheme = isFreefolioTheme;

  protected getFreefolioThemeId(): FreefolioThemeId {
    const theme = this.themeId();
    return isFreefolioTheme(theme) ? theme : 'freefolio-basic';
  }

  getFreefolioData(): FreefolioThemeData {
    return {
      full_name: this.previewData.profile.name,
      title: this.previewData.profile.title,
      about: this.previewData.about.bio,
      projects: this.previewData.projects.map(p => ({
        title: p.title,
        description: p.description,
        image: p.image,
        technologies: p.technologies,
        liveLink: p.liveLink,
        githubLink: p.githubLink
      })),
      skills: this.previewData.skills.map(s => ({
        name: s.name,
        level: s.level
      }))
    };
  }

  selectTheme() {
    this.themeSelected.emit(this.themeId());
  }

  closeModal() {
    this.close.emit();
  }
}