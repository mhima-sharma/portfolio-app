import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LOCAL_API_BASE_URL } from '../config/api.config';
import { AuthService } from './auth.service';
import {
  ApiResponse,
  ReviewLink,
  ReviewSubmitPayload,
  TestimonialItem,
} from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  async generateReviewLink(slug: string): Promise<ReviewLink> {
    const response = await firstValueFrom(
      this.http.post<ApiResponse<ReviewLink>>(`${LOCAL_API_BASE_URL}/reviews/${slug}/link`, null, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async loadReviewPage(slug: string): Promise<{ slug: string; title?: string; description?: string }> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<{ slug: string; title?: string; description?: string }>>(
        `${LOCAL_API_BASE_URL}/reviews/${slug}`
      )
    );
    return response.data;
  }

  async submitReview(slug: string, payload: ReviewSubmitPayload): Promise<TestimonialItem> {
    const formData = new FormData();
    formData.append('client_name', payload.client_name);
    formData.append('review', payload.review);
    formData.append('rating', String(payload.rating));
    if (payload.client_designation) {
      formData.append('client_designation', payload.client_designation);
    }
    if (payload.company_name) {
      formData.append('company_name', payload.company_name);
    }
    if (payload.client_image) {
      formData.append('client_image', payload.client_image);
    }
    if (payload.company_logo) {
      formData.append('company_logo', payload.company_logo);
    }

    const response = await firstValueFrom(
      this.http.post<ApiResponse<TestimonialItem>>(`${LOCAL_API_BASE_URL}/reviews/${slug}/submit`, formData)
    );
    return response.data;
  }
}
