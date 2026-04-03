import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../config/api.config';

interface AuthProfile {
  id?: number;
  name?: string;
  slug?: string;
  title?: string;
}

interface AuthAdmin {
  id: number;
  name: string;
  email: string;
  profileId?: number;
  profile?: AuthProfile;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: AuthAdmin;
    profile?: AuthProfile;
  };
}

interface MeResponse {
  success: boolean;
  message: string;
  data: {
    admin: AuthAdmin;
    profile?: AuthProfile;
  };
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  slug: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'portfolio_admin_token';
  private adminKey = 'portfolio_admin_user';

  token = signal<string | null>(this.readToken());
  admin = signal<AuthAdmin | null>(this.readAdmin());
  isLoading = signal(false);
  error = signal<string | null>(null);
  isAuthenticated = computed(() => Boolean(this.token()));

  constructor() {
    if (this.token()) {
      void this.loadMe();
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.http
        .post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password })
        .toPromise();

      if (!response?.success || !response.data?.token) {
        throw new Error(response?.message ?? 'Login failed');
      }

      this.persistAuth(response.data.token, response.data.admin, response.data.profile);
    } catch (error: any) {
      const message = error?.error?.message ?? error?.message ?? 'Login failed';
      this.error.set(message);
      throw new Error(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signup(payload: SignupPayload): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.http
        .post<AuthResponse>(`${API_BASE_URL}/auth/signup`, payload)
        .toPromise();

      if (!response?.success || !response.data?.token) {
        throw new Error(response?.message ?? 'Signup failed');
      }

      this.persistAuth(response.data.token, response.data.admin, response.data.profile);
    } catch (error: any) {
      const message = error?.error?.message ?? error?.message ?? 'Signup failed';
      this.error.set(message);
      throw new Error(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadMe(): Promise<void> {
    const token = this.token();

    if (!token) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const response = await this.http
        .get<MeResponse>(`${API_BASE_URL}/auth/me`, {
          headers: this.authHeaders(),
        })
        .toPromise();

      if (!response?.success || !response.data?.admin) {
        throw new Error(response?.message ?? 'Unable to load admin profile');
      }

      this.admin.set(this.mergeAdminProfile(response.data.admin, response.data.profile));
      localStorage.setItem(this.adminKey, JSON.stringify(this.admin()));
    } catch (error: any) {
      const message = error?.error?.message ?? error?.message ?? 'Unable to load admin profile';
      this.error.set(message);

      if (error?.status === 401 || error?.status === 403) {
        this.logout();
      } else {
        throw new Error(message);
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  logout() {
    this.token.set(null);
    this.admin.set(null);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
    this.router.navigate(['/admin/login']);
  }

  authHeaders(): HttpHeaders {
    const token = this.token();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  private readToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }

  private readAdmin() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.adminKey);
    return raw ? JSON.parse(raw) : null;
  }

  private persistAuth(token: string, admin: AuthAdmin, profile?: AuthProfile) {
    const mergedAdmin = this.mergeAdminProfile(admin, profile);
    this.token.set(token);
    this.admin.set(mergedAdmin);

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.adminKey, JSON.stringify(mergedAdmin));
  }

  private mergeAdminProfile(admin: AuthAdmin, profile?: AuthProfile): AuthAdmin {
    return {
      ...admin,
      profile: {
        ...(profile ?? {}),
        ...(admin.profile ?? {}),
      },
    };
  }
}
