import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header.component';
import { HeroComponent } from './hero.component';
import { AboutComponent } from './about.component';
import { SkillsComponent } from './skills.component';
import { ProjectsComponent } from './projects.component';
import { ExperienceComponent } from './experience.component';
import { ContactComponent } from './contact.component';
import { FooterComponent } from './footer.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-header></app-header>
    <app-hero></app-hero>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-projects></app-projects>
    <app-experience></app-experience>
    <app-contact></app-contact>

    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);

  private profileSlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('profileSlug') ?? '')),
    { initialValue: '' }
  );

  constructor() {
    effect(() => {
      this.portfolioService.loadPortfolio(this.profileSlug());
    });
  }
}
