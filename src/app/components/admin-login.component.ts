import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(167,139,250,0.16),_transparent_24%),radial-gradient(circle_at_bottom_center,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_42%,#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:80px_80px]"></div>
      <div class="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <div class="grid w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <section class="relative p-6 sm:p-10 lg:p-12">
            <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_60%)]"></div>
            <div class="relative">
              <a routerLink="/" class="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-[0_12px_30px_rgba(59,130,246,0.08)] backdrop-blur">
                CareerFlow
              </a>

              <div class="mt-8 max-w-md">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Welcome back</p>
                <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Login to your workspace</h1>
                <p class="mt-4 text-base leading-7 text-slate-600">
                  Access your CareerFlow dashboard to manage your portfolio, resume, themes, and public profile.
                </p>
              </div>

              <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <div class="rounded-full border border-white/70 bg-white/72 px-4 py-2 shadow-sm backdrop-blur">Secure admin access</div>
                <div class="rounded-full border border-white/70 bg-white/72 px-4 py-2 shadow-sm backdrop-blur">Professional workspace</div>
              </div>

              <form (ngSubmit)="submit()" class="mt-8 space-y-5" novalidate autocomplete="on">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-slate-800">Email address</label>
                  <input
                    [(ngModel)]="email"
                    (ngModelChange)="clearFieldError('email')"
                    name="email"
                    type="email"
                    autocomplete="username"
                    class="w-full rounded-[1.1rem] border bg-white/80 px-5 py-4 text-base text-slate-900 outline-none transition backdrop-blur focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    [class.border-red-400]="fieldErrors().email"
                    [class.border-slate-200]="!fieldErrors().email"
                    placeholder="owner@yourdomain.com"
                  />
                  @if (fieldErrors().email) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().email }}</p>
                  }
                </div>

                <div>
                  <div class="mb-2 flex items-center justify-between gap-3">
                    <label class="block text-sm font-semibold text-slate-800">Password</label>
                    <span class="text-xs font-medium text-blue-600">Private admin area</span>
                  </div>
                  <div
                    class="flex rounded-[1.1rem] border bg-white/80 transition backdrop-blur focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100"
                    [class.border-red-400]="fieldErrors().password"
                    [class.border-slate-200]="!fieldErrors().password"
                  >
                    <input
                      [(ngModel)]="password"
                      (ngModelChange)="clearFieldError('password')"
                      name="password"
                      [type]="showPassword ? 'text' : 'password'"
                      autocomplete="current-password"
                      class="w-full rounded-[1.1rem] bg-transparent px-5 py-4 text-base text-slate-900 outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      class="px-4 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      (click)="showPassword = !showPassword"
                    >
                      {{ showPassword ? 'Hide' : 'Show' }}
                    </button>
                  </div>
                  @if (fieldErrors().password) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().password }}</p>
                  }
                </div>

                @if (error()) {
                  <div class="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {{ error() }}
                  </div>
                }

                <button
                  type="submit"
                  class="inline-flex w-full items-center justify-center rounded-[1.1rem] border border-blue-400/30 bg-[linear-gradient(135deg,#2563eb_0%,#60a5fa_55%,#7c3aed_100%)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_48px_rgba(37,99,235,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                  [disabled]="authService.isLoading()"
                >
                  {{ authService.isLoading() ? 'Verifying Access...' : 'Login to Dashboard' }}
                </button>
              </form>

              <div class="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.24em] text-blue-500">
                <span class="h-px flex-1 bg-slate-200"></span>
                <span>Owner only</span>
                <span class="h-px flex-1 bg-slate-200"></span>
              </div>

              <p class="mt-8 text-sm text-slate-600">
                New here and ready to create your portfolio?
                <a routerLink="/admin/signup" class="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4">Create your account</a>
              </p>
            </div>
          </section>

          <section class="relative hidden overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(239,246,255,0.82)_100%)] p-8 lg:block lg:p-10">
            <div class="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-200/70 blur-2xl animate-[pulse_7s_ease-in-out_infinite]"></div>
            <div class="absolute bottom-12 right-10 h-28 w-28 rounded-full bg-violet-200/70 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>

            <div class="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(239,246,255,0.88)_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">CareerFlow Workspace</p>
                <h2 class="mt-4 max-w-lg text-4xl font-black leading-tight tracking-tight text-slate-950">Continue where your professional presence left off.</h2>
                <p class="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Sign in to update your portfolio, refine your resume, and keep your public profile ready to share.
                </p>
              </div>

              <div class="mt-12 rounded-[1.8rem] border border-white/70 bg-white/72 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">Live Workspace</p>
                    <h3 class="mt-3 text-2xl font-bold text-slate-950">Everything stays connected in one clear editing flow</h3>
                  </div>
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb_0%,#60a5fa_55%,#7c3aed_100%)] text-sm font-bold text-white shadow-[0_16px_30px_rgba(37,99,235,0.25)]">
                    Live
                  </div>
                </div>

                <div class="mt-8 space-y-4 text-slate-600">
                  <div class="flex items-start gap-3">
                    <span class="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    <p class="text-sm leading-7">Manage your portfolio, resume, and shareable profile from one place.</p>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span>
                    <p class="text-sm leading-7">Keep your content current without changing your structure or design flow.</p>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></span>
                    <p class="text-sm leading-7">Maintain a polished online presence that always feels ready to send.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  showPassword = false;
  error = signal<string | null>(null);
  fieldErrors = signal<{ email?: string; password?: string }>({});

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/admin/dashboard']);
    }
  }

  async submit() {
    this.error.set(null);

    if (!this.validate()) {
      return;
    }

    try {
      await this.authService.login(this.email.trim(), this.password);
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      this.error.set(error.message);
    }
  }

  clearFieldError(field: 'email' | 'password') {
    this.fieldErrors.update((errors) => ({ ...errors, [field]: undefined }));
    this.error.set(null);
  }

  private validate() {
    const errors: { email?: string; password?: string } = {};
    const email = this.email.trim();

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!this.password) {
      errors.password = 'Password is required.';
    } else if (this.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    this.fieldErrors.set(errors);
    return Object.keys(errors).length === 0;
  }
}
