import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ServiceItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Service Library</p>
          <h1 class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">Manage your services</h1>
        </div>
        <button class="inline-flex items-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500" (click)="navigate('/admin/dashboard/services/new')">Add new service</button>
      </div>

      <div *ngIf="isLoading(); else serviceGrid" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div class="h-48 rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-700"></div>
        <div class="h-48 rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-700"></div>
        <div class="h-48 rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-700"></div>
      </div>

      <ng-template #serviceGrid>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article *ngFor="let service of services()" class="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <p class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ service.title }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ service.short_description }}</p>
              </div>
              <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" [class.bg-rose-100]="!service.is_active" [class.text-rose-700]="!service.is_active">{{ service.is_active ? 'Active' : 'Inactive' }}</span>
            </div>
            <div class="mb-4 min-h-[180px] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
              <img *ngIf="service.image" [src]="service.image" alt="Service image" class="h-48 w-full object-cover" />
              <div *ngIf="!service.image" class="flex h-48 items-center justify-center text-sm text-slate-500 dark:text-slate-400">No image yet</div>
            </div>
            <div class="mb-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span class="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">₹ {{ service.price ?? 'N/A' }}</span>
              <span class="truncate">{{ service.long_description || 'No long description added' }}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" (click)="navigate('/admin/dashboard/services/' + service.id + '/edit')">Edit</button>
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" (click)="toggleService(service)">{{ service.is_active ? 'Hide' : 'Activate' }}</button>
              <button class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300" (click)="deleteService(service)">Delete</button>
            </div>
          </article>
        </div>
      </ng-template>
    </section>
  `,
})
export class ServiceListComponent {
  private router = inject(Router);
  private serviceService = inject(ServiceService);

  services = signal<ServiceItem[]>([]);
  isLoading = signal(true);

  constructor() {
    void this.loadServices();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  async loadServices() {
    this.isLoading.set(true);
    try {
      const services = await this.serviceService.getServices();
      this.services.set(services);
    } catch (error) {
      console.error(error);
      this.services.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  async toggleService(service: ServiceItem) {
    try {
      const updated = await this.serviceService.toggleServiceStatus(service.id, !service.is_active);
      this.services.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteService(service: ServiceItem) {
    if (!confirm('Delete this service permanently?')) {
      return;
    }
    try {
      await this.serviceService.deleteService(service.id);
      this.services.update((items) => items.filter((item) => item.id !== service.id));
    } catch (error) {
      console.error(error);
    }
  }
}
