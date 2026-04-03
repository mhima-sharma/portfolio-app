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
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 px-4 py-10">
      <div class="w-full max-w-2xl card p-8 border border-gray-200/80 dark:border-dark-700">
        <div class="text-center mb-8">
          <p class="text-sm uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-3">Create Portfolio Access</p>
          <h1 class="text-3xl font-bold text-dark-900 dark:text-white">Sign Up For Your Portfolio</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-3">
            Har user ke liye alag portfolio profile banega, aur signup ke baad aap apni hi details manage kar paoge.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Full Name</label>
            <input
              [(ngModel)]="form.name"
              (ngModelChange)="clearFieldError('name')"
              name="name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().name"
              [class.dark:border-red-500]="fieldErrors().name"
              [class.border-gray-300]="!fieldErrors().name"
              [class.dark:border-dark-600]="!fieldErrors().name"
              placeholder="Madhav Malhotra"
            />
            @if (fieldErrors().name) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().name }}</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Email</label>
            <input
              [(ngModel)]="form.email"
              (ngModelChange)="clearFieldError('email')"
              name="email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().email"
              [class.dark:border-red-500]="fieldErrors().email"
              [class.border-gray-300]="!fieldErrors().email"
              [class.dark:border-dark-600]="!fieldErrors().email"
              placeholder="madhav@example.com"
            />
            @if (fieldErrors().email) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().email }}</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Password</label>
            <input
              [(ngModel)]="form.password"
              (ngModelChange)="clearFieldError('password')"
              name="password"
              type="password"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().password"
              [class.dark:border-red-500]="fieldErrors().password"
              [class.border-gray-300]="!fieldErrors().password"
              [class.dark:border-dark-600]="!fieldErrors().password"
              placeholder="Minimum 8 characters"
            />
            @if (fieldErrors().password) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().password }}</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Portfolio Title</label>
            <input
              [(ngModel)]="form.title"
              (ngModelChange)="clearFieldError('title')"
              name="title"
              type="text"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().title"
              [class.dark:border-red-500]="fieldErrors().title"
              [class.border-gray-300]="!fieldErrors().title"
              [class.dark:border-dark-600]="!fieldErrors().title"
              placeholder="Frontend Developer"
            />
            @if (fieldErrors().title) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().title }}</p>
            }
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Portfolio Slug</label>
          <div class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-dark-700 dark:bg-dark-900/60 dark:text-gray-300 mb-3">
            Public URL: <span class="font-semibold">{{ previewUrl() }}</span>
          </div>
          <input
            [(ngModel)]="form.slug"
            (ngModelChange)="onSlugChange($event)"
            name="slug"
            type="text"
            class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            [class.border-red-400]="fieldErrors().slug"
            [class.dark:border-red-500]="fieldErrors().slug"
            [class.border-gray-300]="!fieldErrors().slug"
            [class.dark:border-dark-600]="!fieldErrors().slug"
            placeholder="madhav"
          />
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Lowercase letters, numbers, and hyphens use karo. Yehi aapka public portfolio link hoga.
          </p>
          @if (fieldErrors().slug) {
            <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().slug }}</p>
          }
        </div>

        @if (error()) {
          <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300 mb-6">
            {{ error() }}
          </div>
        }

        <button type="button" class="w-full btn-primary" [disabled]="authService.isLoading()" (click)="submit()">
          {{ authService.isLoading() ? 'Creating Portfolio...' : 'Create My Portfolio' }}
        </button>

        <p class="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have access?
          <a routerLink="/admin/login" class="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSignupComponent {
  authService = inject(AuthService);
  private router = inject(Router);

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
