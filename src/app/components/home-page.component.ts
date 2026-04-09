import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { PortfolioComponent } from './portfolio/portfolio.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PortfolioComponent],
  template: `
    <app-portfolio [profileSlug]="profileSlug()"></app-portfolio>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private route = inject(ActivatedRoute);

  protected profileSlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('profileSlug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('profileSlug') ?? '' }
  );
}
