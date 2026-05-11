import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Blog manager</p>
          <h1 class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">Write and publish blogs</h1>
        </div>
        <button class="inline-flex items-center rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-600" (click)="navigate('/admin/dashboard/blogs/new')">New blog</button>
      </div>

      <div *ngIf="isLoading(); else blogGrid" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div class="h-48 rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-700"></div>
        <div class="h-48 rounded-3xl bg-slate-200 animate-pulse dark:bg-slate-700"></div>
      </div>

      <ng-template #blogGrid>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article *ngFor="let blog of blogs()" class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div class="mb-4 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
              <img *ngIf="blog.thumbnail" [src]="blog.thumbnail" alt="Blog thumbnail" class="h-40 w-full object-cover" />
              <div *ngIf="!blog.thumbnail" class="flex h-40 items-center justify-center text-sm text-slate-500 dark:text-slate-400">No thumbnail</div>
            </div>
            <div class="mb-4">
              <p class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ blog.title }}</p>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ blog.short_description }}</p>
            </div>
            <div class="mb-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>{{ blog.is_published ? 'Published' : 'Draft' }}</span>
              <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{{ blog.slug }}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <button class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" (click)="navigate('/admin/dashboard/blogs/' + blog.id + '/edit')">Edit</button>
              <button class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300" (click)="deleteBlog(blog)">Delete</button>
            </div>
          </article>
        </div>
      </ng-template>
    </section>
  `,
})
export class BlogListComponent {
  private router = inject(Router);
  private blogService = inject(BlogService);

  blogs = signal<BlogItem[]>([]);
  isLoading = signal(true);

  constructor() {
    void this.loadBlogs();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  async loadBlogs() {
    this.isLoading.set(true);
    try {
      const blogs = await this.blogService.getBlogs();
      this.blogs.set(blogs);
    } catch (error) {
      console.error(error);
      this.blogs.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteBlog(blog: BlogItem) {
    if (!confirm('Delete this blog post?')) {
      return;
    }
    try {
      await this.blogService.deleteBlog(blog.id);
      this.blogs.update((items) => items.filter((item) => item.id !== blog.id));
    } catch (error) {
      console.error(error);
    }
  }
}
