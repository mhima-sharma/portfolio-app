import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreefolioIframeComponent } from './freefolio-iframe.component';
import { FreefolioThemeData } from './freefolio-theme.model';
import { buildFreefolioDocument, FreefolioThemeId, getFreefolioThemeMeta } from './freefolio-theme.registry';

const templateCache = new Map<FreefolioThemeId, string>();

@Component({
  selector: 'app-freefolio-theme',
  standalone: true,
  imports: [CommonModule, FreefolioIframeComponent],
  template: `
    @if (documentHtml(); as html) {
      <app-freefolio-iframe [html]="html" [title]="themeMeta().name"></app-freefolio-iframe>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreefolioThemeComponent {
  themeId = input.required<FreefolioThemeId>();
  data = input.required<FreefolioThemeData>();

  protected themeMeta = computed(() => getFreefolioThemeMeta(this.themeId()));
  protected documentHtml = signal('');

  constructor() {
    effect(() => {
      const themeId = this.themeId();
      const data = this.data();
      void this.loadTheme(themeId, data);
    });
  }

  private async loadTheme(themeId: FreefolioThemeId, data: FreefolioThemeData) {
    let sourceHtml = templateCache.get(themeId);
    const folder = getFreefolioThemeMeta(themeId).folder;

    if (!sourceHtml) {
      const response = await fetch(`/assets/freefolio/${folder}/index.html`);
      sourceHtml = await response.text();
      templateCache.set(themeId, sourceHtml);
    }

    this.documentHtml.set(buildFreefolioDocument(themeId, sourceHtml, data));
  }
}
