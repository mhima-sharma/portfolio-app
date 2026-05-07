import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LOCAL_API_BASE_URL } from '../config/api.config';
import { AuthService } from './auth.service';
import { ApiResponse, TestimonialItem } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  async getTestimonials(): Promise<TestimonialItem[]> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<TestimonialItem[]>>(`${LOCAL_API_BASE_URL}/testimonials`, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data ?? [];
  }

  async createTestimonial(payload: Partial<TestimonialItem>): Promise<TestimonialItem> {
    const response = await firstValueFrom(
      this.http.post<ApiResponse<TestimonialItem>>(`${LOCAL_API_BASE_URL}/testimonials`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async updateTestimonial(id: number, payload: Partial<TestimonialItem>): Promise<TestimonialItem> {
    const response = await firstValueFrom(
      this.http.put<ApiResponse<TestimonialItem>>(`${LOCAL_API_BASE_URL}/testimonials/${id}`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete<ApiResponse<null>>(`${LOCAL_API_BASE_URL}/testimonials/${id}`, {
        headers: this.authService.authHeaders(),
      })
    );
  }

  async toggleTestimonial(id: number, isActive: boolean): Promise<TestimonialItem> {
    const response = await firstValueFrom(
      this.http.patch<ApiResponse<TestimonialItem>>(
        `${LOCAL_API_BASE_URL}/testimonials/${id}/toggle`,
        { is_active: isActive },
        {
          headers: this.authService.authHeaders(),
        }
      )
    );
    return response.data;
  }

  async uploadClientImage(id: number, file: File): Promise<TestimonialItem> {
    const formData = new FormData();
    formData.append('client_image', file);

    const response = await firstValueFrom(
      this.http.post<ApiResponse<TestimonialItem>>(`${LOCAL_API_BASE_URL}/testimonials/${id}/client-image`, formData, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async uploadCompanyLogo(id: number, file: File): Promise<TestimonialItem> {
    const formData = new FormData();
    formData.append('company_logo', file);

    const response = await firstValueFrom(
      this.http.post<ApiResponse<TestimonialItem>>(`${LOCAL_API_BASE_URL}/testimonials/${id}/company-logo`, formData, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }
}
