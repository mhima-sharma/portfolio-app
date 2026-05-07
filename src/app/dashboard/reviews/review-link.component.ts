import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-review-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex flex-col gap-2">
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Review page</p>
          <h1 class="text-3xl font-semibold text-slate-900 dark:text-slate-50">Share a public review link</h1>
          <p class="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Generate a dedicated review page link to send to clients. Every submission is stored as a testimonial for your approval workflow.</p>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-[1.5fr_0.8fr]">
          <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Current review URL</p>
            <p class="mt-3 break-all text-base font-semibold text-slate-900 dark:text-slate-50">{{ reviewUrl() || defaultUrl }}</p>
          </div>
          <div class="flex flex-col gap-3">
            <button class="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500" type="button" (click)="generate()" [disabled]="isGenerating()">{{ reviewUrl() ? 'Refresh link' : 'Generate link' }}</button>
            <button class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" type="button" (click)="copyLink()" [disabled]="!reviewUrl()">Copy link</button>
          </div>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Review title</span>
            <input [(ngModel)]="reviewRequestTitle" type="text" placeholder="Project collaboration review" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </label>
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Review request</span>
            <textarea [(ngModel)]="reviewRequestDescription" rows="3" placeholder="Ask clients to review your service quality, communication, delivery, or a specific project." class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"></textarea>
          </label>
        </div>

        <div *ngIf="status()" class="mt-4 rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">{{ status() }}</div>
      </div>
    </section>
  `,
})
export class ReviewLinkComponent {
  private authService = inject(AuthService);

  reviewUrl = signal('');
  isGenerating = signal(false);
  status = signal('');
  defaultUrl = 'Use your profile slug to generate a shareable review page';
  reviewRequestTitle = 'Share your honest review';
  reviewRequestDescription = 'Please rate the overall experience and share feedback about the work, communication, and final delivery.';

  async generate() {
    const slug = this.authService.admin()?.profile?.slug;
    if (!slug) {
      this.status.set('Your profile slug is not available yet. Complete your profile settings first.');
      return;
    }

    this.isGenerating.set(true);
    this.status.set('');
    try {
      this.reviewUrl.set(this.resolvePublicReviewUrl(slug));
      this.status.set('Review page link generated successfully. Share it with clients.');
    } catch (error) {
      console.error(error);
      this.status.set('Unable to generate review link right now.');
    } finally {
      this.isGenerating.set(false);
    }
  }

  async copyLink() {
    if (!this.reviewUrl()) {
      return;
    }
    await navigator.clipboard.writeText(this.reviewUrl());
    this.status.set('Copied review link to clipboard.');
  }

  private resolvePublicReviewUrl(slug: string) {
    const fallbackPath = `/review/${encodeURIComponent(slug)}`;
    const params = new URLSearchParams();

    if (this.reviewRequestTitle.trim()) {
      params.set('title', this.reviewRequestTitle.trim());
    }

    if (this.reviewRequestDescription.trim()) {
      params.set('description', this.reviewRequestDescription.trim());
    }

    if (typeof window === 'undefined') {
      const query = params.toString();
      return query ? `${fallbackPath}?${query}` : fallbackPath;
    }

    const query = params.toString();
    return `${window.location.origin}${fallbackPath}${query ? `?${query}` : ''}`;
  }
}
