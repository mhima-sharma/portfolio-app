import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page.component';
import { GuestLandingComponent } from './components/guest-landing.component';
import { AdminLoginComponent } from './components/admin-login.component';
import { AdminSignupComponent } from './components/admin-signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { ResumeComponent } from './components/resume.component';

export const routes: Routes = [
  {
    path: '',
    component: GuestLandingComponent,
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
    path: 'resume',
    component: ResumeComponent,
  },
  {
    path: ':profileSlug/resume',
    component: ResumeComponent,
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
