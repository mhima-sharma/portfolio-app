import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-950 py-10 text-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40">
          <div class="space-y-4 text-center">
            <p class="text-xs uppercase tracking-[0.35em] text-emerald-400">Client feedback</p>
            <h1 class="text-4xl font-semibold tracking-tight">Share your honest review</h1>
            <p class="mx-auto max-w-2xl text-sm leading-7 text-slate-300">Fill the short review form below to submit a real rating and testimonial. Your feedback helps improve the portfolio owner’s public reputation.</p>
          </div>

          <div *ngIf="pageLoaded()" class="mt-10 rounded-3xl bg-slate-950/80 p-8 shadow-inner shadow-slate-950/30">
            <div class="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div class="rounded-3xl bg-slate-900 p-6">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Review page</p>
                <p class="mt-4 text-2xl font-semibold text-white">{{ pageTitle() || 'Your review matters' }}</p>
                <p class="mt-3 text-sm leading-6 text-slate-400">{{ pageDescription() || 'Submit a rating and share your experience with the portfolio owner.' }}</p>
              </div>
              <div class="rounded-3xl bg-slate-800 p-6">
                <p class="text-sm uppercase tracking-[0.3em] text-slate-400">How it works</p>
                <ol class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>1. Add your name and role.</li>
                  <li>2. Choose a star rating.</li>
                  <li>3. Write your testimonial.</li>
                  <li>4. Submit and the owner will review it.</li>
                </ol>
              </div>
            </div>

            <form [formGroup]="form" class="mt-10 space-y-6" (ngSubmit)="submit()">
              <div class="grid gap-6 lg:grid-cols-2">
                <label class="block space-y-2">
                  <span class="text-sm text-slate-300">Your name</span>
                  <input formControlName="client_name" type="text" placeholder="Jane Smith" class="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400" />
                </label>
                <label class="block space-y-2">
                  <span class="text-sm text-slate-300">Designation / company</span>
                  <input formControlName="client_designation" type="text" placeholder="Founder, Acme Co." class="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400" />
                </label>
              </div>

              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Company name</span>
                <input formControlName="company_name" type="text" placeholder="Acme Inc." class="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400" />
              </label>

              <div>
                <p class="text-sm text-slate-300">Rating</p>
                <div class="mt-3 flex flex-wrap items-center gap-2">
                  <button type="button" *ngFor="let score of [1,2,3,4,5]" class="rounded-full px-4 py-3 text-sm transition" [ngClass]="(form.value.rating ?? 0) >= score ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'" (click)="form.patchValue({ rating: score })">{{ score }}★</button>
                </div>
              </div>

              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Review</span>
                <textarea formControlName="review" rows="5" placeholder="Share your experience" class="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"></textarea>
              </label>

              <div class="grid gap-6 lg:grid-cols-2">
                <label class="block space-y-2">
                  <span class="text-sm text-slate-300">Upload client image</span>
                  <label class="flex min-h-[56px] cursor-pointer items-center gap-3 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 transition hover:border-emerald-400">
                    <input type="file" accept="image/*" (change)="handleFileChange($event, 'client_image')" class="hidden" />
                    <span class="rounded-full bg-emerald-400 px-4 py-2 font-semibold text-slate-950">Choose file</span>
                    <span class="truncate">{{ clientImageName() || 'No file chosen' }}</span>
                  </label>
                </label>
                <label class="block space-y-2">
                  <span class="text-sm text-slate-300">Upload company logo</span>
                  <label class="flex min-h-[56px] cursor-pointer items-center gap-3 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 transition hover:border-emerald-400">
                    <input type="file" accept="image/*" (change)="handleFileChange($event, 'company_logo')" class="hidden" />
                    <span class="rounded-full bg-emerald-400 px-4 py-2 font-semibold text-slate-950">Choose file</span>
                    <span class="truncate">{{ companyLogoName() || 'No file chosen' }}</span>
                  </label>
                </label>
              </div>

              <div *ngIf="previewUrl()" class="rounded-3xl bg-slate-950 p-4 text-sm text-slate-300">Latest file selected: <span class="font-semibold text-white">{{ previewUrl() }}</span></div>

              <button class="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300" [disabled]="isSubmitting()">Submit review</button>
            </form>
          </div>
        </div>
      </div>
      <div *ngIf="!pageLoaded()" class="mt-10 text-center text-slate-400">Loading review page…</div>
    </div>
  `,
})
export class ReviewPageComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private reviewService = inject(ReviewService);

  pageLoaded = signal(false);
  pageTitle = signal('');
  pageDescription = signal('');
  previewUrl = signal('');
  isSubmitting = signal(false);
  status = signal('');
  clientImageName = signal('');
  companyLogoName = signal('');

  form = this.fb.group({
    client_name: ['', Validators.required],
    client_designation: [''],
    company_name: [''],
    review: ['', Validators.required],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  private reviewSlug = signal('');
  private clientImageFile = signal<File | null>(null);
  private companyLogoFile = signal<File | null>(null);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.reviewSlug.set(slug);
        void this.loadPage(slug);
      }
    });

    this.route.queryParamMap.subscribe((params) => {
      const title = params.get('title')?.trim() ?? '';
      const description = params.get('description')?.trim() ?? '';

      if (title) {
        this.pageTitle.set(title);
      }

      if (description) {
        this.pageDescription.set(description);
      }
    });
  }

  async loadPage(slug: string) {
    try {
      const page = await this.reviewService.loadReviewPage(slug);
      if (!this.pageTitle()) {
        this.pageTitle.set(page.title ?? `Review for ${page.slug}`);
      }
      if (!this.pageDescription()) {
        this.pageDescription.set(page.description ?? 'Submit a rating and share your experience with the portfolio owner.');
      }
      this.pageLoaded.set(true);
    } catch (error) {
      console.error(error);
      if (!this.pageTitle()) {
        this.pageTitle.set('Share your honest review');
      }
      if (!this.pageDescription()) {
        this.pageDescription.set('Please share feedback about the work, communication, and final outcome.');
      }
      this.pageLoaded.set(true);
    }
  }

  handleFileChange(event: Event, field: 'client_image' | 'company_logo') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      return;
    }
    if (field === 'client_image') {
      this.clientImageFile.set(file);
      this.clientImageName.set(file.name);
    } else {
      this.companyLogoFile.set(file);
      this.companyLogoName.set(file.name);
    }
    this.previewUrl.set(file.name);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.status.set('');
    try {
      const formValue = this.form.value;
      await this.reviewService.submitReview(this.reviewSlug(), {
        client_name: formValue.client_name ?? '',
        client_designation: formValue.client_designation ?? '',
        company_name: formValue.company_name ?? '',
        review: formValue.review ?? '',
        rating: formValue.rating ?? 5,
        client_image: this.clientImageFile(),
        company_logo: this.companyLogoFile(),
      });
      this.status.set('Thank you! Your review has been submitted for approval.');
      this.form.reset({ rating: 5 });
      this.previewUrl.set('');
      this.clientImageFile.set(null);
      this.companyLogoFile.set(null);
      this.clientImageName.set('');
      this.companyLogoName.set('');
    } catch (error) {
      console.error(error);
      this.status.set('Unable to submit your review right now.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
