import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Blog editor</p>
          <h1 class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{{ isEditMode() ? 'Edit blog post' : 'Create new blog' }}</h1>
        </div>
        <button class="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" type="button" (click)="navigate('/admin/dashboard/blogs')">Back to blogs</button>
      </div>

      <form [formGroup]="form" class="space-y-6" (ngSubmit)="submit()">
        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</span>
            <input formControlName="title" type="text" placeholder="Blog title" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
            <span *ngIf="form.controls.title.invalid && form.controls.title.touched" class="text-sm text-rose-600">Title is required.</span>
          </label>
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Slug</span>
            <input formControlName="slug" type="text" placeholder="blog-title-slug" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
            <span *ngIf="form.controls.slug.invalid && form.controls.slug.touched" class="text-sm text-rose-600">Slug is required.</span>
          </label>
        </div>

        <label class="block space-y-2">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Short description</span>
          <textarea formControlName="short_description" rows="3" placeholder="Summary for cards" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"></textarea>
          <span *ngIf="form.controls.short_description.invalid && form.controls.short_description.touched" class="text-sm text-rose-600">Short description is required.</span>
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Full content</span>
          <textarea formControlName="content" rows="8" placeholder="Write the full article here" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"></textarea>
          <span *ngIf="form.controls.content.invalid && form.controls.content.touched" class="text-sm text-rose-600">Content is required.</span>
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Tags</span>
          <input formControlName="tags" type="text" placeholder="angular, ui, portfolio" class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </label>

        <div class="grid gap-6 lg:grid-cols-2">
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Thumbnail image</span>
            <input type="file" accept="image/*" (change)="handleFileChange($event)" class="block w-full text-sm text-slate-700 dark:text-slate-200" />
            <img *ngIf="thumbnailPreview()" [src]="thumbnailPreview()" alt="Thumbnail preview" class="mt-3 max-h-52 w-full rounded-3xl object-cover" />
          </label>
          <label class="block space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Thumbnail URL</span>
            <input formControlName="thumbnail" type="text" placeholder="https://..." class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
          </label>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-2">
            <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Publish status</span>
            <label class="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <input type="checkbox" formControlName="is_published" class="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <span class="text-sm text-slate-700 dark:text-slate-200">Publish immediately</span>
            </label>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p class="text-sm text-slate-500 dark:text-slate-400">A native blog editor for fast publishing and thumbnail management.</p>
          <button class="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600" [disabled]="isSaving()">{{ isEditMode() ? 'Save changes' : 'Publish blog' }}</button>
        </div>
      </form>
    </section>
  `,
})
export class BlogEditorComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);

  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    short_description: ['', Validators.required],
    content: ['', Validators.required],
    tags: [''],
    thumbnail: [''],
    is_published: [false],
  });

  private blogId = signal<number | null>(null);
  thumbnailFile = signal<File | null>(null);
  thumbnailPreview = signal<string | null>(null);
  isSaving = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.blogId.set(Number(id));
        void this.loadBlog(Number(id));
      }
    });
  }

  isEditMode() {
    return this.blogId() !== null;
  }

  async loadBlog(id: number) {
    try {
      const blog = await this.blogService.getBlogById(id);
      this.form.patchValue({
        title: blog.title,
        slug: blog.slug,
        short_description: blog.short_description,
        content: blog.content,
        tags: blog.tags ?? '',
        thumbnail: blog.thumbnail ?? '',
        is_published: blog.is_published,
      });
      this.thumbnailPreview.set(blog.thumbnail ?? null);
    } catch (error) {
      console.error(error);
    }
  }

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.thumbnailPreview.set(reader.result as string);
      this.thumbnailFile.set(file);
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
      const payload: Partial<BlogItem> = {
        title: this.form.value.title ?? '',
        slug: this.form.value.slug ?? '',
        short_description: this.form.value.short_description ?? '',
        content: this.form.value.content ?? '',
        tags: this.form.value.tags ?? '',
        thumbnail: this.form.value.thumbnail ?? '',
        is_published: this.form.value.is_published ?? false,
      };

      let blog: BlogItem;
      if (this.isEditMode()) {
        blog = await this.blogService.updateBlog(this.blogId()!, payload);
      } else {
        blog = await this.blogService.createBlog(payload);
        this.blogId.set(blog.id);
      }

      if (this.thumbnailFile()) {
        await this.blogService.uploadThumbnail(blog.id, this.thumbnailFile()!);
      }

      this.router.navigate(['/admin/dashboard/blogs']);
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
