import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ThemePreview {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  colorPalette: string[];
}

@Component({
  selector: 'app-portfolio-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-selector-container">
      <h1 class="text-3xl font-bold text-center mb-8">Choose Your Portfolio Theme</h1>
      <div class="themes-grid">
        @for (theme of themes(); track theme.id) {
          <div class="theme-card" (click)="selectTheme(theme.id)">
            <div class="theme-preview">
              <img [src]="theme.previewImage" [alt]="theme.name" class="preview-image" />
            </div>
            <div class="theme-info">
              <h3 class="theme-name">{{ theme.name }}</h3>
              <p class="theme-description">{{ theme.description }}</p>
              <div class="color-palette">
                @for (color of theme.colorPalette; track $index) {
                  <div class="color-swatch" [style.background-color]="color"></div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .theme-selector-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .themes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .theme-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .theme-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    .theme-preview {
      height: 200px;
      overflow: hidden;
    }
    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .theme-info {
      padding: 1rem;
    }
    .theme-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .theme-description {
      color: #6b7280;
      margin-bottom: 1rem;
    }
    .color-palette {
      display: flex;
      gap: 0.5rem;
    }
    .color-swatch {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #e5e7eb;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioThemeSelectorComponent {
  private router = inject(Router);

  themes = signal<ThemePreview[]>([
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      description: 'Clean, minimalist design with focus on content',
      previewImage: '/assets/theme-previews/modern-minimal.png',
      colorPalette: ['#ffffff', '#000000', '#f3f4f6', '#6b7280']
    },
    {
      id: 'creative-designer',
      name: 'Creative Designer',
      description: 'Bold and creative layout for designers',
      previewImage: '/assets/theme-previews/creative-designer.png',
      colorPalette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24']
    },
    {
      id: 'developer-dark',
      name: 'Developer Dark',
      description: 'Dark theme perfect for developers',
      previewImage: '/assets/theme-previews/developer-dark.png',
      colorPalette: ['#1a1a1a', '#2d3748', '#4a5568', '#00d4aa']
    },
    {
      id: 'corporate-professional',
      name: 'Corporate Professional',
      description: 'Professional theme for corporate environments',
      previewImage: '/assets/theme-previews/corporate-professional.png',
      colorPalette: ['#1f2937', '#3b82f6', '#f9fafb', '#6b7280']
    },
    {
      id: 'personal-branding',
      name: 'Personal Branding',
      description: 'Unique branding focused theme',
      previewImage: '/assets/theme-previews/personal-branding.png',
      colorPalette: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
    }
  ]);

  selectTheme(themeId: string) {
    // Store selected theme and navigate home so the selected theme can take effect.
    localStorage.setItem('selectedTheme', themeId);
    this.router.navigate(['/']);
  }
}