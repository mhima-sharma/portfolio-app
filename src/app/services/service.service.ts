import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LOCAL_API_BASE_URL } from '../config/api.config';
import { AuthService } from './auth.service';
import { ApiResponse, ServiceItem } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  async getServices(): Promise<ServiceItem[]> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<ServiceItem[]>>(`${LOCAL_API_BASE_URL}/services`, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data ?? [];
  }

  async getServiceById(id: number): Promise<ServiceItem> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<ServiceItem>>(`${LOCAL_API_BASE_URL}/services/${id}`, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async createService(payload: Partial<ServiceItem>): Promise<ServiceItem> {
    const response = await firstValueFrom(
      this.http.post<ApiResponse<ServiceItem>>(`${LOCAL_API_BASE_URL}/services`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async updateService(id: number, payload: Partial<ServiceItem>): Promise<ServiceItem> {
    const response = await firstValueFrom(
      this.http.put<ApiResponse<ServiceItem>>(`${LOCAL_API_BASE_URL}/services/${id}`, payload, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async deleteService(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete<ApiResponse<null>>(`${LOCAL_API_BASE_URL}/services/${id}`, {
        headers: this.authService.authHeaders(),
      })
    );
  }

  async toggleServiceStatus(id: number, isActive: boolean): Promise<ServiceItem> {
    const response = await firstValueFrom(
      this.http.patch<ApiResponse<ServiceItem>>(
        `${LOCAL_API_BASE_URL}/services/${id}/toggle`,
        { is_active: isActive },
        { headers: this.authService.authHeaders() }
      )
    );
    return response.data;
  }

  async uploadServiceImage(id: number, file: File): Promise<ServiceItem> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await firstValueFrom(
      this.http.post<ApiResponse<ServiceItem>>(`${LOCAL_API_BASE_URL}/services/${id}/image`, formData, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }

  async uploadServiceLogo(id: number, file: File): Promise<ServiceItem> {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await firstValueFrom(
      this.http.post<ApiResponse<ServiceItem>>(`${LOCAL_API_BASE_URL}/services/${id}/logo`, formData, {
        headers: this.authService.authHeaders(),
      })
    );
    return response.data;
  }
}
