export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, any>;
}

export interface ServiceItem {
  id: number;
  admin_id?: number;
  profile_id?: number | null;
  title: string;
  short_description: string;
  long_description?: string;
  image?: string;
  icon?: string;
  logo?: string;
  price?: number | string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BlogItem {
  id: number;
  admin_id?: number;
  profile_id?: number | null;
  title: string;
  slug?: string;
  short_description: string;
  content: string;
  thumbnail?: string;
  tags?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialItem {
  id: number;
  admin_id?: number;
  profile_id?: number | null;
  client_name: string;
  client_designation?: string;
  company_name?: string;
  review: string;
  rating: number;
  client_image?: string;
  company_logo?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ReviewLink {
  slug: string;
  url: string;
  expires_at?: string;
}

export interface ReviewSubmitPayload {
  client_name: string;
  client_designation?: string;
  company_name?: string;
  review: string;
  rating: number;
  client_image?: File | null;
  company_logo?: File | null;
}
