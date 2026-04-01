import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 px-4">
      <div class="w-full max-w-md card p-8">
        <div class="text-center mb-8">
          <p class="text-sm uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-3">Admin Access</p>
          <h1 class="text-3xl font-bold text-dark-900 dark:text-white">Portfolio Login</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-3">Sign in to edit your portfolio content.</p>
        </div>

        <form (ngSubmit)="submit()" class="space-y-4" novalidate>
          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Email</label>
            <input
              [(ngModel)]="email"
              (ngModelChange)="clearFieldError('email')"
              name="email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().email"
              [class.dark:border-red-500]="fieldErrors().email"
              [class.border-gray-300]="!fieldErrors().email"
              [class.dark:border-dark-600]="!fieldErrors().email"
              placeholder="admin@portfolio.com"
            />
            @if (fieldErrors().email) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().email }}</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-dark-900 dark:text-white mb-2">Password</label>
            <input
              [(ngModel)]="password"
              (ngModelChange)="clearFieldError('password')"
              name="password"
              type="password"
              class="w-full px-4 py-3 rounded-lg border bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              [class.border-red-400]="fieldErrors().password"
              [class.dark:border-red-500]="fieldErrors().password"
              [class.border-gray-300]="!fieldErrors().password"
              [class.dark:border-dark-600]="!fieldErrors().password"
              placeholder="Enter password"
            />
            @if (fieldErrors().password) {
              <p class="mt-2 text-sm text-red-600 dark:text-red-400">{{ fieldErrors().password }}</p>
            }
          </div>

          @if (error()) {
            <div class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {{ error() }}
            </div>
          }

          <button type="submit" class="w-full btn-primary" [disabled]="authService.isLoading()">
            {{ authService.isLoading() ? 'Signing in...' : 'Login' }}
          </button>
        </form>

        <p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
          After login, open your dashboard to update about, contact, skills, projects, and experience.
        </p>
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
