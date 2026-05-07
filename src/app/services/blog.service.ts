import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LOCAL_API_BASE_URL } from '../config/api.config';
import { AuthService } from './auth.service';
import { ApiResponse, BlogItem } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  async getBlogs(): Promise<BlogItem[]> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<BlogItem[]>>(`${LOCAL_API_BASE_URL}/blogs`, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data ?? [];
  }

  async getBlogById(id: number): Promise<BlogItem> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<BlogItem>>(`${LOCAL_API_BASE_URL}/blogs/${id}`, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async createBlog(payload: Partial<BlogItem>): Promise<BlogItem> {
    const response = await firstValueFrom(
      this.http.post<ApiResponse<BlogItem>>(`${LOCAL_API_BASE_URL}/blogs`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async updateBlog(id: number, payload: Partial<BlogItem>): Promise<BlogItem> {
    const response = await firstValueFrom(
      this.http.put<ApiResponse<BlogItem>>(`${LOCAL_API_BASE_URL}/blogs/${id}`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async deleteBlog(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete<ApiResponse<null>>(`${LOCAL_API_BASE_URL}/blogs/${id}`, {
        headers: this.authService.authHeaders(),
      })
    );
  }

  async publishBlog(id: number, publish: boolean): Promise<BlogItem> {
    const response = await firstValueFrom(
      this.http.patch<ApiResponse<BlogItem>>(
        `${LOCAL_API_BASE_URL}/blogs/${id}/publish`,
        { is_published: publish },
        {
          headers: this.authService.authHeaders(),
        }
      )
    );
    return response.data;
  }

  async uploadThumbnail(id: number, file: File): Promise<BlogItem> {
    const formData = new FormData();
    formData.append('thumbnail', file);

    const response = await firstValueFrom(
      this.http.post<ApiResponse<BlogItem>>(`${LOCAL_API_BASE_URL}/blogs/${id}/thumbnail`, formData, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }
}
