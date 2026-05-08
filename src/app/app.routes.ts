import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminSignupComponent } from './components/admin-signup.component';
import { ResumeComponent } from './components/resume.component';
import { PortfolioThemeSelectorComponent } from './components/portfolio-theme-selector.component';
import { ThemePreviewComponent } from './components/theme-preview.component';
import { adminGuard } from './guards/admin.guard';

import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { ReviewPageComponent } from './public/review-page/review-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/guest-landing.component').then(
        (m) => m.GuestLandingComponent
      ),
  },
  {
    path: 'themes',
    component: PortfolioThemeSelectorComponent,
  },
  {
    path: 'theme-preview/:themeId',
    component: ThemePreviewComponent,
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/signup',
    component: AdminSignupComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'review/:slug',
    component: ReviewPageComponent,
  },
  {
    path: 'resume',
    component: ResumeComponent,
  },
  {
    path: ':profileSlug/resume',
    component: ResumeComponent,
  },
  {
    path: ':profileSlug/:page',
    component: HomePageComponent,
  },
  {
    path: ':profileSlug',
    component: HomePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
