import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignupPayload } from '../services/auth.service';

type SignupField = keyof SignupPayload;

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(167,139,250,0.16),_transparent_24%),radial-gradient(circle_at_bottom_center,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_42%,#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:80px_80px]"></div>
      <div class="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center">
        <div class="grid w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1.02fr_0.98fr]">
          <section class="relative hidden overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(239,246,255,0.82)_100%)] p-8 lg:block lg:p-10">
            <div class="absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-200/70 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"></div>
            <div class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-200/70 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>

            <div class="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(239,246,255,0.88)_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">Create Your Access</p>
                <h1 class="mt-4 max-w-lg text-4xl font-black leading-tight tracking-tight text-slate-950">Start with a professional setup that feels ready from day one.</h1>
                <p class="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Create your account and launch a portfolio and resume experience designed to look clean, modern, and credible.
                </p>
              </div>

              <div class="mt-12 rounded-[1.6rem] border border-white/70 bg-white/68 p-7 shadow-[0_14px_30px_rgba(15,23,42,0.05)] backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <p class="text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">CareerFlow Setup</p>
                <h2 class="mt-3 max-w-md text-2xl font-bold leading-snug text-slate-950">A simple way to launch your professional presence.</h2>

                <div class="mt-6 space-y-3 text-slate-600">
                  <p class="text-sm leading-7">Set up your name, title, and portfolio link in one clean flow.</p>
                  <p class="text-sm leading-7">Publish a polished profile that stays consistent across portfolio and resume.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="relative p-6 sm:p-10 lg:p-12">
            <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_58%)]"></div>
            <div class="relative">
              <a routerLink="/" class="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-[0_12px_30px_rgba(59,130,246,0.08)] backdrop-blur">
                CareerFlow
              </a>

              <div class="mt-8 max-w-xl">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Get started</p>
                <h2 class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Create your account</h2>
                <p class="mt-4 text-base leading-7 text-slate-600">
                  Set up your profile once, choose your preferred presentation, and publish with confidence.
                </p>
              </div>

              <div class="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-slate-800">Full name</label>
                  <input
                    [(ngModel)]="form.name"
                    (ngModelChange)="clearFieldError('name')"
                    name="name"
                    type="text"
                    class="w-full rounded-[1.1rem] border bg-white/80 px-5 py-4 text-base text-slate-900 outline-none transition backdrop-blur focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    [class.border-red-400]="fieldErrors().name"
                    [class.border-slate-200]="!fieldErrors().name"
                    placeholder="Enter your full name"
                  />
                  @if (fieldErrors().name) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().name }}</p>
                  }
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-slate-800">Email address</label>
                 <input
                    [(ngModel)]="form.email"
                    (ngModelChange)="onEmailChange($event)"
                    name="email"
                    type="email"
                    required
                    class="w-full rounded-[1.1rem] border bg-white/80 px-5 py-4 text-base text-slate-900 outline-none transition backdrop-blur focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    [class.border-red-400]="fieldErrors().email"
                    [class.border-slate-200]="!fieldErrors().email"
                    placeholder="e.g. yourname@example.com"
                  />
                  @if (fieldErrors().email) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().email }}</p>
                  }
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-slate-800">Password</label>
                  <div
                    class="flex rounded-[1.1rem] border bg-white/80 transition backdrop-blur focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100"
                    [class.border-red-400]="fieldErrors().password"
                    [class.border-slate-200]="!fieldErrors().password"
                  >
                    <input
                      [(ngModel)]="form.password"
                      (ngModelChange)="clearFieldError('password')"
                      name="password"
                      [type]="showPassword ? 'text' : 'password'"
                      class="w-full rounded-[1.1rem] bg-transparent px-5 py-4 text-base text-slate-900 outline-none"
                      placeholder="Minimum 8 characters"
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

                <div>
                  <label class="mb-2 block text-sm font-semibold text-slate-800">Profile title</label>
                  <input
                    [(ngModel)]="form.title"
                    (ngModelChange)="clearFieldError('title')"
                    name="title"
                    type="text"
                    class="w-full rounded-[1.1rem] border bg-white/80 px-5 py-4 text-base text-slate-900 outline-none transition backdrop-blur focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    [class.border-red-400]="fieldErrors().title"
                    [class.border-slate-200]="!fieldErrors().title"
                  placeholder="Designer, Student, Teacher, Freelancer"
                  />
                  @if (fieldErrors().title) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().title }}</p>
                  }
                </div>
              </div>

              <div class="mt-5">
                <label class="mb-2 block text-sm font-semibold text-slate-800">Portfolio slug</label>
                <div class="mb-3 rounded-[1.1rem] border border-white/70 bg-white/78 px-4 py-4 text-sm text-slate-500 backdrop-blur">
                  Public portfolio URL:
                  <span class="ml-1 font-semibold text-blue-700">{{ previewUrl() }}</span>
                </div>
                <input
                  [(ngModel)]="form.slug"
                  (ngModelChange)="onSlugChange($event)"
                  name="slug"
                  type="text"
                  class="w-full rounded-[1.1rem] border bg-white/80 px-5 py-4 text-base text-slate-900 outline-none transition backdrop-blur focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  [class.border-red-400]="fieldErrors().slug"
                  [class.border-slate-200]="!fieldErrors().slug"
                  placeholder="Choose a unique slug for your portfolio (e.g., john-doe, jane.designs)"
                />
                <p class="mt-2 text-xs leading-6 text-slate-500">
                  Choose a unique slug for your portfolio (e.g., john-doe, jane.designs)
                </p>
                @if (fieldErrors().slug) {
                  <p class="mt-2 text-sm text-red-600">{{ fieldErrors().slug }}</p>
                }
              </div>

              @if (error()) {
                <div class="mt-5 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {{ error() }}
                </div>
              }

              <button
                type="button"
                class="mt-6 inline-flex w-full items-center justify-center rounded-[1.1rem] border border-blue-400/30 bg-[linear-gradient(135deg,#2563eb_0%,#60a5fa_55%,#7c3aed_100%)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_48px_rgba(37,99,235,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                [disabled]="authService.isLoading()"
                (click)="submit()"
              >
                {{ authService.isLoading() ? 'Creating Portfolio...' : 'Create My Portfolio' }}
              </button>

              <p class="mt-8 text-sm text-slate-600">
                Already have access?
                <a routerLink="/admin/login" class="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4">Login here</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSignupComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  showPassword = false;

  form: SignupPayload = {
    name: '',
    email: '',
    password: '',
    slug: '',
    title: '',
  };

  error = signal<string | null>(null);
  fieldErrors = signal<Partial<Record<SignupField, string>>>({});
  previewUrl = computed(() => {
    const slug = this.normalizeSlug(this.form.slug);
    return slug ? `${window.location.origin}/${slug}` : `${window.location.origin}/your-slug`;
  });

  onSlugChange(value: string) {
    this.form.slug = this.normalizeSlug(value);
    this.clearFieldError('slug');
  }

  async submit() {
    this.error.set(null);

    if (!this.validate()) {
      return;
    }

    try {
      await this.authService.signup({
        ...this.form,
        name: this.form.name.trim(),
        email: this.form.email.trim().toLowerCase(),
        slug: this.normalizeSlug(this.form.slug),
        title: this.form.title.trim(),
      });
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      this.error.set(error.message);
    }
  }

  clearFieldError(field: SignupField) {
    this.fieldErrors.update((errors) => ({ ...errors, [field]: undefined }));
    this.error.set(null);
  }

  onEmailChange(value: string) {
  this.form.email = value;
  this.clearFieldError('email');

  const email = value.trim().toLowerCase();

  if (!email) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    this.fieldErrors.update(errors => ({
      ...errors,
      email: 'Enter a valid email address.'
    }));
  }
}

  private validate() {
    const errors: Partial<Record<SignupField, string>> = {};
    const name = this.form.name.trim();
    const email = this.form.email.trim().toLowerCase();
    const password = this.form.password;
    const slug = this.normalizeSlug(this.form.slug);
    const title = this.form.title.trim();

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!slug) {
      errors.slug = 'Slug is required.';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      errors.slug = 'Use only lowercase letters, numbers, and hyphens.';
    }

    if (!title) {
      errors.title = 'Portfolio title is required.';
    }

    this.fieldErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  private normalizeSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
