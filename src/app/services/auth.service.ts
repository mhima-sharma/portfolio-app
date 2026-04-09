import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../config/api.config';
import { firstValueFrom } from 'rxjs';

interface AuthProfile {
  id?: number;
  name?: string;
  slug?: string;
  title?: string;
  selected_theme?: string | null;
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
  data:
    | ({
        token: string;
        profile?: AuthProfile;
      } & AuthAdmin)
    | {
        token: string;
        admin: AuthAdmin;
        profile?: AuthProfile;
      }
    | {
        data: {
          token: string;
          profile?: AuthProfile;
        } & AuthAdmin;
      }
    | {
        data: {
          token: string;
          admin: AuthAdmin;
          profile?: AuthProfile;
        };
      };
}

interface MeResponse {
  success: boolean;
  message: string;
  data:
    | ({ profile?: AuthProfile } & AuthAdmin)
    | {
        admin: AuthAdmin;
        profile?: AuthProfile;
      }
    | {
        data: ({ profile?: AuthProfile } & AuthAdmin) | { admin: AuthAdmin; profile?: AuthProfile };
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
  private userIdKey = 'portfolio_admin_user_id';

  token = signal<string | null>(this.readToken());
  admin = signal<AuthAdmin | null>(this.readAdmin());
  userId = signal<number | null>(this.readUserId() ?? this.readAdmin()?.id ?? null);
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
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password })
      );
      const data = this.extractAuthPayload(response);

      if (!response?.success || !data?.token || !data.admin) {
        throw new Error(response?.message ?? 'Login failed');
      }

      this.persistAuth(data.token, data.admin, data.profile);
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
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, payload)
      );
      const data = this.extractAuthPayload(response);

      if (!response?.success || !data?.token || !data.admin) {
        throw new Error(response?.message ?? 'Signup failed');
      }

      this.persistAuth(data.token, data.admin, data.profile);
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
      const response = await firstValueFrom(
        this.http.get<MeResponse>(`${API_BASE_URL}/auth/me`, {
          headers: this.authHeaders(),
        })
      );
      const data = this.extractMePayload(response);

      if (!response?.success || !data?.admin) {
        throw new Error(response?.message ?? 'Unable to load admin profile');
      }

      const mergedAdmin = this.mergeAdminProfile(data.admin, data.profile);
      this.admin.set(mergedAdmin);
      this.userId.set(mergedAdmin.id);
      localStorage.setItem(this.adminKey, JSON.stringify(this.admin()));
      localStorage.setItem(this.userIdKey, String(mergedAdmin.id));
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
    this.userId.set(null);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/admin/login']);
  }

  authHeaders(): HttpHeaders {
    const token = this.token();
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getCurrentUserId(): number | null {
    return this.userId() ?? this.admin()?.id ?? null;
  }

  getCurrentSlug(): string {
    return this.admin()?.profile?.slug?.trim() ?? '';
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

  private readUserId(): number | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.userIdKey);
    if (!raw) {
      return null;
    }

    const value = Number(raw);
    return Number.isNaN(value) ? null : value;
  }

  private persistAuth(token: string, admin: AuthAdmin, profile?: AuthProfile) {
    const mergedAdmin = this.mergeAdminProfile(admin, profile);
    this.token.set(token);
    this.admin.set(mergedAdmin);
    this.userId.set(mergedAdmin.id);

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.adminKey, JSON.stringify(mergedAdmin));
    localStorage.setItem(this.userIdKey, String(mergedAdmin.id));
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

  private extractAuthPayload(response?: AuthResponse | null) {
    const data = response?.data as
      | ({ token: string; profile?: AuthProfile } & AuthAdmin)
      | { token: string; admin: AuthAdmin; profile?: AuthProfile }
      | { data?: ({ token: string; profile?: AuthProfile } & AuthAdmin) | { token: string; admin: AuthAdmin; profile?: AuthProfile } }
      | undefined;

    if (!data) {
      return null;
    }

    const payload = 'token' in data ? data : (data.data ?? null);
    if (!payload) {
      return null;
    }

    if ('admin' in payload) {
      return payload;
    }

    const { token, profile, ...admin } = payload;
    return {
      token,
      admin: admin as AuthAdmin,
      profile,
    };
  }

  private extractMePayload(response?: MeResponse | null) {
    const data = response?.data as
      | ({ profile?: AuthProfile } & AuthAdmin)
      | { admin: AuthAdmin; profile?: AuthProfile }
      | { data?: ({ profile?: AuthProfile } & AuthAdmin) | { admin: AuthAdmin; profile?: AuthProfile } }
      | undefined;

    if (!data) {
      return null;
    }

    const payload = 'admin' in data || 'id' in data ? data : (data.data ?? null);
    if (!payload) {
      return null;
    }

    if ('admin' in payload) {
      return payload;
    }

    const { profile, ...admin } = payload;
    return {
      admin: admin as AuthAdmin,
      profile,
    };
  }
}
