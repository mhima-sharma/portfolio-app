import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TestimonialService } from '../../services/testimonial.service';
import { TestimonialItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-testimonial-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Testimonials</p>
          <h1 class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">Approve and manage reviews</h1>
        </div>
        <button class="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600" type="button" (click)="prepareNew()">Add review</button>
      </div>

      <div class="grid gap-6 xl:grid-cols-2">
        <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">Review form</h2>
          <form [formGroup]="form" class="mt-6 space-y-4" (ngSubmit)="submit()">
            <div class="grid gap-4 lg:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Client name</span>
                <input formControlName="client_name" type="text" placeholder="Jane Doe" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
              </label>
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Designation</span>
                <input formControlName="client_designation" type="text" placeholder="Founder, Acme" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
              </label>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Company name</span>
                <input formControlName="company_name" type="text" placeholder="Acme Pvt Ltd" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
              </label>
              <label class="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <input type="checkbox" formControlName="is_active" class="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                <span class="text-sm text-slate-700 dark:text-slate-200">Show on public page</span>
              </label>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Review</span>
                <textarea formControlName="review" rows="4" placeholder="Client feedback" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"></textarea>
              </label>
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Rating</span>
                <div class="flex flex-wrap gap-2">
                  <button type="button" *ngFor="let score of [1,2,3,4,5]" class="rounded-full px-4 py-2 text-sm transition" [ngClass]="(form.value.rating ?? 0) >= score ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'" (click)="form.patchValue({ rating: score })">{{ score }}★</button>
                </div>
              </label>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Client image</span>
                <label class="flex min-h-[56px] cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-primary-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <input type="file" accept="image/*" (change)="handleFile('client_image', $event)" class="hidden" />
                  <span class="rounded-full bg-primary-500 px-4 py-2 font-semibold text-white">Choose file</span>
                  <span class="truncate">{{ clientImageName() || 'No file chosen' }}</span>
                </label>
              </label>
              <label class="block space-y-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Company logo</span>
                <label class="flex min-h-[56px] cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-primary-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <input type="file" accept="image/*" (change)="handleFile('company_logo', $event)" class="hidden" />
                  <span class="rounded-full bg-primary-500 px-4 py-2 font-semibold text-white">Choose file</span>
                  <span class="truncate">{{ companyLogoName() || 'No file chosen' }}</span>
                </label>
              </label>
            </div>
            <button class="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600" [disabled]="isSaving()">{{ activeTestimonial() ? 'Update review' : 'Create review' }}</button>
          </form>
        </section>

        <section class="space-y-4">
          <article *ngFor="let testimonial of testimonials()" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ testimonial.client_name }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ testimonial.client_designation || testimonial.company_name || 'Client' }}</p>
              </div>
              <span class="rounded-full px-3 py-1 text-xs font-semibold" [class.bg-emerald-100]="testimonial.is_active" [class.text-emerald-700]="testimonial.is_active" [class.bg-slate-100]="!testimonial.is_active" [class.text-slate-500]="!testimonial.is_active">{{ testimonial.is_active ? 'Approved' : 'Hidden' }}</span>
            </div>
            <div class="mt-4 text-slate-700 dark:text-slate-300">{{ testimonial.review }}</div>
            <div class="mt-4 flex items-center gap-2 text-sm text-amber-500">{{ '★'.repeat(testimonial.rating) }}</div>
            <div class="mt-5 flex flex-wrap gap-3">
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" (click)="edit(testimonial)">Edit</button>
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" (click)="toggle(testimonial)">{{ testimonial.is_active ? 'Hide' : 'Approve' }}</button>
              <button class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300" (click)="delete(testimonial)">Delete</button>
            </div>
          </article>
        </section>
      </div>
    </section>
  `,
})
export class TestimonialListComponent {
  private testimonialService = inject(TestimonialService);
  private fb = inject(FormBuilder);

  testimonials = signal<TestimonialItem[]>([]);
  activeTestimonial = signal<TestimonialItem | null>(null);
  clientImageFile = signal<File | null>(null);
  companyLogoFile = signal<File | null>(null);
  clientImageName = signal('');
  companyLogoName = signal('');
  isSaving = signal(false);

  form = this.fb.group({
    client_name: ['', Validators.required],
    client_designation: [''],
    company_name: [''],
    review: ['', Validators.required],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    is_active: [true],
  });

  constructor() {
    void this.loadTestimonials();
  }

  async loadTestimonials() {
    try {
      const testimonials = await this.testimonialService.getTestimonials();
      this.testimonials.set(testimonials);
    } catch (error) {
      console.error(error);
      this.testimonials.set([]);
    }
  }

  prepareNew() {
    this.activeTestimonial.set(null);
    this.form.reset({ rating: 5, is_active: true });
    this.clientImageFile.set(null);
    this.companyLogoFile.set(null);
    this.clientImageName.set('');
    this.companyLogoName.set('');
  }

  edit(testimonial: TestimonialItem) {
    this.activeTestimonial.set(testimonial);
    this.form.patchValue({
      client_name: testimonial.client_name,
      client_designation: testimonial.client_designation ?? '',
      company_name: testimonial.company_name ?? '',
      review: testimonial.review,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
    });
    this.clientImageName.set(this.extractFileName(testimonial.client_image));
    this.companyLogoName.set(this.extractFileName(testimonial.company_logo));
  }

  handleFile(field: 'client_image' | 'company_logo', event: Event) {
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
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    try {
      const payload: Partial<TestimonialItem> = {
        client_name: this.form.value.client_name ?? '',
        client_designation: this.form.value.client_designation ?? '',
        company_name: this.form.value.company_name ?? '',
        review: this.form.value.review ?? '',
        rating: this.form.value.rating ?? 5,
        is_active: this.form.value.is_active ?? true,
      };

      let testimonial: TestimonialItem;
      if (this.activeTestimonial()) {
        testimonial = await this.testimonialService.updateTestimonial(this.activeTestimonial()!.id, payload);
      } else {
        testimonial = await this.testimonialService.createTestimonial(payload);
      }

      if (this.clientImageFile()) {
        testimonial = await this.testimonialService.uploadClientImage(testimonial.id, this.clientImageFile()!);
      }
      if (this.companyLogoFile()) {
        testimonial = await this.testimonialService.uploadCompanyLogo(testimonial.id, this.companyLogoFile()!);
      }

      await this.loadTestimonials();
      this.prepareNew();
    } catch (error) {
      console.error(error);
    } finally {
      this.isSaving.set(false);
    }
  }

  async toggle(testimonial: TestimonialItem) {
    try {
      const updated = await this.testimonialService.toggleTestimonial(testimonial.id, !testimonial.is_active);
      this.testimonials.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      console.error(error);
    }
  }

  async delete(testimonial: TestimonialItem) {
    if (!confirm('Delete this testimonial?')) {
      return;
    }
    try {
      await this.testimonialService.deleteTestimonial(testimonial.id);
      this.testimonials.update((items) => items.filter((item) => item.id !== testimonial.id));
    } catch (error) {
      console.error(error);
    }
  }

  private extractFileName(value?: string) {
    if (!value) {
      return '';
    }

    return value.split('/').pop() ?? value;
  }
}
