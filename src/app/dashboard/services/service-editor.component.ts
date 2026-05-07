import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ServiceItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-service-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Service editor</p>
          <h1 class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{{ isEditMode() ? 'Edit service' : 'Add new service' }}</h1>
        </div>
        <button class="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" type="button" (click)="navigate('/admin/dashboard/services')">Back to services</button>
      </div>

      <form [formGroup]="form" class="space-y-6" (ngSubmit)="submit()">
        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</span>
            <input formControlName="title" type="text" placeholder="Service title" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
            <span *ngIf="form.controls.title.invalid && form.controls.title.touched" class="text-sm text-rose-600">Title is required.</span>
          </label>

          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Price</span>
            <input formControlName="price" type="text" placeholder="₹ 4999" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Short description</span>
            <textarea formControlName="short_description" rows="3" placeholder="Summary for cards" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"></textarea>
            <span *ngIf="form.controls.short_description.invalid && form.controls.short_description.touched" class="text-sm text-rose-600">Short description is required.</span>
          </label>

          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Long description</span>
            <textarea formControlName="long_description" rows="5" placeholder="Detailed description for clients" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"></textarea>
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Service image</span>
            <input type="file" accept="image/*" (change)="handleFileChange('image', $event)" class="block w-full text-sm text-slate-700 dark:text-slate-200" />
            <img *ngIf="imagePreview()" [src]="imagePreview()" alt="Image preview" class="mt-3 max-h-52 w-full rounded-3xl object-cover" />
          </label>

          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Service logo</span>
            <input type="file" accept="image/*" (change)="handleFileChange('logo', $event)" class="block w-full text-sm text-slate-700 dark:text-slate-200" />
            <img *ngIf="logoPreview()" [src]="logoPreview()" alt="Logo preview" class="mt-3 max-h-52 w-full rounded-3xl bg-slate-50 object-contain p-4 dark:bg-slate-900" />
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Image URL</span>
            <input formControlName="image" type="text" placeholder="https://..." class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>

          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Icon</span>
            <input formControlName="icon" type="text" placeholder="briefcase, code, palette..." class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Logo URL</span>
            <input formControlName="logo" type="text" placeholder="https://..." class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <input type="checkbox" formControlName="is_active" class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            <span class="text-sm text-slate-700 dark:text-slate-200">Active service</span>
          </label>
        </div>

        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p class="text-sm text-slate-500 dark:text-slate-400">Upload an image to make your service card stand out.</p>
          <button class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500" [disabled]="isSaving()">{{ isEditMode() ? 'Save changes' : 'Create service' }}</button>
        </div>
      </form>
    </section>
  `,
})
export class ServiceEditorComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private serviceService = inject(ServiceService);

  form = this.formBuilder.group({
    title: ['', Validators.required],
    short_description: ['', Validators.required],
    long_description: [''],
    price: [''],
    image: [''],
    logo: [''],
    icon: [''],
    is_active: [true],
  });

  private serviceId = signal<number | null>(null);
  imageFile = signal<File | null>(null);
  logoFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);
  logoPreview = signal<string | null>(null);
  isSaving = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.serviceId.set(Number(id));
        void this.loadService(Number(id));
      }
    });
  }

  isEditMode() {
    return this.serviceId() !== null;
  }

  async loadService(id: number) {
    try {
      const service = await this.serviceService.getServiceById(id);
      this.form.patchValue({
        title: service.title,
        short_description: service.short_description,
        long_description: service.long_description ?? '',
        price: service.price?.toString() ?? '',
        image: service.image ?? '',
        logo: service.logo ?? '',
        icon: service.icon ?? '',
        is_active: service.is_active,
      });
      this.imagePreview.set(service.image ?? null);
      this.logoPreview.set(service.logo ?? null);
    } catch (error) {
      console.error(error);
    }
  }

  handleFileChange(field: 'image' | 'logo', event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result as string;
      if (field === 'image') {
        this.imagePreview.set(preview);
        this.imageFile.set(file);
        return;
      }

      this.logoPreview.set(preview);
      this.logoFile.set(file);
    };
    reader.readAsDataURL(file);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    try {
      const payload: Partial<ServiceItem> = {
        title: this.form.value.title ?? '',
        short_description: this.form.value.short_description ?? '',
        long_description: this.form.value.long_description ?? '',
        price: this.form.value.price ?? '',
        image: this.form.value.image ?? '',
        logo: this.form.value.logo ?? '',
        icon: this.form.value.icon ?? '',
        is_active: this.form.value.is_active ?? true,
      };

      let service: ServiceItem;
      if (this.isEditMode()) {
        service = await this.serviceService.updateService(this.serviceId()!, payload);
      } else {
        service = await this.serviceService.createService(payload);
        this.serviceId.set(service.id);
      }

      if (this.imageFile()) {
        await this.serviceService.uploadServiceImage(service.id, this.imageFile()!);
      }
      if (this.logoFile()) {
        await this.serviceService.uploadServiceLogo(service.id, this.logoFile()!);
      }

      this.router.navigate(['/admin/dashboard/services']);
    } catch (error) {
      console.error(error);
    } finally {
      this.isSaving.set(false);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
