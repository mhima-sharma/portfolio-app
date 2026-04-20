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
    <div class="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff8ef_0%,#fffdf9_54%,#fff3e8_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center">
        <div class="grid w-full overflow-hidden rounded-[2rem] border border-[#f4dcc8] bg-white shadow-[0_30px_90px_rgba(148,73,12,0.12)] lg:grid-cols-[1.02fr_0.98fr]">
          <section class="relative hidden overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#fff2e4_100%)] p-8 lg:block lg:p-10">
            <div class="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#ffe2c3] blur-3xl"></div>
            <div class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#ffd7ad] blur-3xl"></div>

            <div class="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-[#f3dcc6] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(255,246,235,0.96)_100%)] p-8">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#db7a28]">Create Your Access</p>
                <h1 class="mt-4 text-4xl font-black leading-tight tracking-tight text-[#182218]">Start your portfolio with a polished first step</h1>
                <p class="mt-4 text-base leading-7 text-[#72604f]">
                  Smooth onboarding for anyone who wants to build a clean, professional, and shareable portfolio.
                </p>
              </div>

              <div class="mt-10 space-y-4">
                <div class="rounded-[1.4rem] border border-[#f3dcc6] bg-white/90 p-5 shadow-sm">
                  <p class="text-sm font-semibold text-[#233023]">Personal setup</p>
                  <p class="mt-2 text-sm leading-7 text-[#8a6a51]">Name, title, and slug se aapki public portfolio identity ready hoti hai.</p>
                </div>
                <div class="rounded-[1.4rem] border border-[#f3dcc6] bg-white/90 p-5 shadow-sm">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-[#233023]">Shareable portfolio link</p>
                      <p class="mt-2 text-sm leading-7 text-[#8a6a51]">Signup ke baad aapka live portfolio same slug par render ho jayega.</p>
                    </div>
                    <div class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#f1bf89] text-sm font-bold text-[#c87424]">Live</div>
                  </div>
                </div>
              </div>

              <div class="mt-10 rounded-[1.6rem] border border-[#f3dcc6] bg-[#fff7ef] p-6">
                <div class="flex items-end justify-between gap-4">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[#d08c55]">What you get</p>
                    <p class="mt-3 text-2xl font-bold text-[#1c281c]">A simple start for every kind of portfolio</p>
                  </div>
                  <div class="flex gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-[#f4c28f]"></span>
                    <span class="h-2.5 w-2.5 rounded-full bg-[#d97a28]"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="relative p-6 sm:p-10 lg:p-12">
            <div class="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.18),_transparent_58%)]"></div>
            <div class="relative">
              <a routerLink="/" class="inline-flex items-center gap-2 rounded-full border border-[#f6dac5] bg-[#fff6ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c96b1a]">
                Portfolio Studio
              </a>

              <div class="mt-8 max-w-xl">
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#db7a28]">Get started</p>
                <h2 class="mt-4 text-4xl font-black tracking-tight text-[#182218] sm:text-5xl">Create your account</h2>
                <p class="mt-4 text-base leading-7 text-[#72604f]">
                  Yeh platform sabke liye hai. Signup ke baad aap apni details manage karke apna portfolio confidently publish kar paoge.
                </p>
              </div>

              <div class="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-[#35261b]">Full name</label>
                  <input
                    [(ngModel)]="form.name"
                    (ngModelChange)="clearFieldError('name')"
                    name="name"
                    type="text"
                    class="w-full rounded-[1.1rem] border bg-[#fffdfa] px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#f2aa67] focus:ring-4 focus:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().name"
                    [class.border-[#ecd7c3]]="!fieldErrors().name"
                    placeholder="Madhav Malhotra"
                  />
                  @if (fieldErrors().name) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().name }}</p>
                  }
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-[#35261b]">Email address</label>
                  <input
                    [(ngModel)]="form.email"
                    (ngModelChange)="clearFieldError('email')"
                    name="email"
                    type="email"
                    class="w-full rounded-[1.1rem] border bg-[#fffdfa] px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#f2aa67] focus:ring-4 focus:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().email"
                    [class.border-[#ecd7c3]]="!fieldErrors().email"
                    placeholder="madhav@example.com"
                  />
                  @if (fieldErrors().email) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().email }}</p>
                  }
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-[#35261b]">Password</label>
                  <div
                    class="flex rounded-[1.1rem] border bg-[#fffdfa] transition focus-within:border-[#f2aa67] focus-within:ring-4 focus-within:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().password"
                    [class.border-[#ecd7c3]]="!fieldErrors().password"
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

                <div>
                  <label class="mb-2 block text-sm font-semibold text-[#35261b]">Profile title</label>
                  <input
                    [(ngModel)]="form.title"
                    (ngModelChange)="clearFieldError('title')"
                    name="title"
                    type="text"
                    class="w-full rounded-[1.1rem] border bg-[#fffdfa] px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#f2aa67] focus:ring-4 focus:ring-[#ffe4ca]"
                    [class.border-red-400]="fieldErrors().title"
                    [class.border-[#ecd7c3]]="!fieldErrors().title"
                  placeholder="Designer, Student, Teacher, Freelancer"
                  />
                  @if (fieldErrors().title) {
                    <p class="mt-2 text-sm text-red-600">{{ fieldErrors().title }}</p>
                  }
                </div>
              </div>

              <div class="mt-5">
                <label class="mb-2 block text-sm font-semibold text-[#35261b]">Portfolio slug</label>
                <div class="mb-3 rounded-[1.1rem] border border-[#f6dac5] bg-[#fff6ee] px-4 py-4 text-sm text-[#7b624b]">
                  Public portfolio URL:
                  <span class="ml-1 font-semibold text-[#a85a17]">{{ previewUrl() }}</span>
                </div>
                <input
                  [(ngModel)]="form.slug"
                  (ngModelChange)="onSlugChange($event)"
                  name="slug"
                  type="text"
                  class="w-full rounded-[1.1rem] border bg-[#fffdfa] px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#f2aa67] focus:ring-4 focus:ring-[#ffe4ca]"
                  [class.border-red-400]="fieldErrors().slug"
                  [class.border-[#ecd7c3]]="!fieldErrors().slug"
                  placeholder="madhav"
                />
                <p class="mt-2 text-xs leading-6 text-[#8a6a51]">
                  Lowercase letters, numbers, and hyphens use karo. Yehi aapka public portfolio link hoga.
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
                class="mt-6 inline-flex w-full items-center justify-center rounded-[1.1rem] bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                [disabled]="authService.isLoading()"
                (click)="submit()"
              >
                {{ authService.isLoading() ? 'Creating Portfolio...' : 'Create My Portfolio' }}
              </button>

              <p class="mt-8 text-sm text-[#72604f]">
                Already have access?
                <a routerLink="/admin/login" class="font-semibold text-[#c96b1a] underline decoration-[#f2b071] underline-offset-4">Login here</a>
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
