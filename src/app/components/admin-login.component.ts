import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff8ef_0%,#fffdf9_54%,#fff3e8_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <div class="grid w-full overflow-hidden rounded-[2rem] border border-[#f4dcc8] bg-white shadow-[0_30px_90px_rgba(148,73,12,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
          <section class="relative p-6 sm:p-10 lg:p-12">
            <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_60%)]"></div>
            <div class="relative">
              <a routerLink="/" class="inline-flex items-center gap-2 rounded-full border border-[#f6dac5] bg-[#fff6ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c96b1a]">
                Portfolio Studio
              </a>

              <div class="mt-8 max-w-md">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#db7a28]">Welcome back</p>
                <h1 class="mt-4 text-4xl font-black tracking-tight text-[#182218] sm:text-5xl">Sign in to your dashboard</h1>
                <p class="mt-4 text-base leading-7 text-[#72604f]">
                  Clean, calm workspace for managing your portfolio content, projects, and public profile.
                </p>
              </div>

              <div class="mt-8 flex flex-wrap gap-3 text-sm text-[#72604f]">
                <div class="rounded-full border border-[#f6dac5] bg-[#fff6ee] px-4 py-2">Secure owner access</div>
                <div class="rounded-full border border-[#f6dac5] bg-[#fff6ee] px-4 py-2">Guest theme inspired</div>
              </div>

              <form (ngSubmit)="submit()" class="mt-8 space-y-5" novalidate autocomplete="on">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-[#35261b]">Email address</label>
                  <input
                    [(ngModel)]="email"
                    (ngModelChange)="clearFieldError('email')"
                    name="email"
                    type="email"
                    autocomplete="username"
                    class="w-full rounded-[1.1rem] border bg-[#fffdfa] px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#f2aa67] focus:ring-4 focus:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().email"
                    [class.border-[#ecd7c3]]="!fieldErrors().email"
                    placeholder="owner@yourdomain.com"
                  />
                  @if (fieldErrors().email) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().email }}</p>
                  }
                </div>

                <div>
                  <div class="mb-2 flex items-center justify-between gap-3">
                    <label class="block text-sm font-semibold text-[#35261b]">Password</label>
                    <span class="text-xs font-medium text-[#c17a37]">Private admin area</span>
                  </div>
                  <div
                    class="flex rounded-[1.1rem] border bg-[#fffdfa] transition focus-within:border-[#f2aa67] focus-within:ring-4 focus-within:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().password"
                    [class.border-[#ecd7c3]]="!fieldErrors().password"
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
                      class="px-4 text-sm font-semibold text-[#c17a37] transition hover:text-[#9b5b1e]"
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
                  class="inline-flex w-full items-center justify-center rounded-[1.1rem] bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                  [disabled]="authService.isLoading()"
                >
                  {{ authService.isLoading() ? 'Verifying Access...' : 'Login to Dashboard' }}
                </button>
              </form>

              <div class="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.24em] text-[#d08c55]">
                <span class="h-px flex-1 bg-[#f2dfcf]"></span>
                <span>Owner only</span>
                <span class="h-px flex-1 bg-[#f2dfcf]"></span>
              </div>

              <p class="mt-8 text-sm text-[#72604f]">
                Need a new portfolio account?
                <a routerLink="/admin/signup" class="font-semibold text-[#c96b1a] underline decoration-[#f2b071] underline-offset-4">Create one here</a>
              </p>
            </div>
          </section>

          <section class="relative hidden overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#fff2e4_100%)] p-8 lg:block lg:p-10">
            <div class="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#ffe2c3] blur-2xl"></div>
            <div class="absolute bottom-12 right-10 h-28 w-28 rounded-full bg-[#ffd7ad] blur-3xl"></div>

            <div class="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-[#f3dcc6] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(255,246,235,0.96)_100%)] p-8">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#db7a28]">Guest Theme</p>
                  <h2 class="mt-3 text-2xl font-bold text-[#1f2b1f]">Professional and calm workspace</h2>
                </div>
                <div class="rounded-full border border-[#f2dcc6] bg-white px-4 py-2 text-xs font-semibold text-[#c87424]">Live Preview</div>
              </div>

              <div class="relative mx-auto mt-10 flex h-[360px] w-full max-w-[420px] items-center justify-center">
                <div class="absolute left-6 top-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#f2cda9] bg-white text-xl shadow-sm">A</div>
                <div class="absolute right-6 bottom-12 flex h-16 w-16 items-center justify-center rounded-full border border-[#f2cda9] bg-white text-xl shadow-sm">UI</div>
                <div class="absolute left-1/2 top-6 h-16 w-48 -translate-x-1/2 rounded-full border-2 border-dashed border-[#f1bf89]"></div>
                <div class="absolute inset-x-10 bottom-4 rounded-[1.5rem] border border-[#f3dcc6] bg-white/90 p-5 shadow-sm">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-lg font-bold text-[#1c281c]">Portfolio Flow</p>
                      <p class="text-sm text-[#8b6b52]">Content organized, updates simplified</p>
                    </div>
                    <div class="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f1bf89] text-sm font-bold text-[#c87424]">84%</div>
                  </div>
                </div>
                <div class="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#f0dcc8] bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#fff0df_72%)]">
                  <div class="absolute top-10 h-16 w-16 rounded-full border-2 border-[#1b231c] bg-white"></div>
                  <div class="absolute top-24 h-28 w-36 rounded-[40%] border-2 border-[#1b231c] bg-[#ffc98d]"></div>
                  <div class="absolute left-5 top-28 h-20 w-10 -rotate-[28deg] rounded-full border-2 border-[#1b231c] bg-[#ffc98d]"></div>
                  <div class="absolute right-5 top-28 h-20 w-10 rotate-[28deg] rounded-full border-2 border-[#1b231c] bg-[#ffc98d]"></div>
                  <div class="absolute bottom-7 left-16 h-20 w-12 rotate-[22deg] rounded-full border-2 border-[#1b231c] bg-white"></div>
                  <div class="absolute bottom-7 right-16 h-20 w-12 -rotate-[22deg] rounded-full border-2 border-[#1b231c] bg-white"></div>
                  <div class="absolute top-[7.2rem] flex h-10 w-20 items-center justify-center text-3xl text-white">♡</div>
                </div>
              </div>

              <div class="rounded-[1.5rem] border border-[#f3dcc6] bg-white/80 p-5">
                <p class="text-center text-2xl font-bold leading-snug text-[#1d291d]">
                  Make your portfolio work feel easier and more organized
                </p>
                <p class="mt-3 text-center text-sm leading-7 text-[#8a6a51]">
                  Existing account ho to login karo. Naya setup chahiye to signup se apna personalized portfolio create karo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  showPassword = false;
  error = signal<string | null>(null);
  fieldErrors = signal<{ email?: string; password?: string }>({});

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
