import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { COURSE_PROXY_BASE_URL } from '../config/api.config';

interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  data?: {
    token?: string;
  };
}

interface InstructorCourseApiItem {
  _id: string;
  courseName: string;
  courseDescription: string;
  thumbnail?: string | null;
  price?: number | string | null;
  status?: string;
  createdAt?: string;
  tag?: string[];
}

interface InstructorCoursesResponse {
  success?: boolean;
  message?: string;
  data?: InstructorCourseApiItem[] | { courses?: InstructorCourseApiItem[] };
}

interface CourseSubSection {
  _id: string;
  title: string;
  timeDuration?: string;
  description?: string;
  videoUrl?: string;
}

interface CourseSection {
  _id: string;
  sectionName: string;
  subSection?: CourseSubSection[];
}

interface CourseInstructor {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  additionalDetails?: {
    about?: string;
    contactNumber?: number;
    gender?: string;
    dateOfBirth?: string;
  };
}

interface CourseCategory {
  _id: string;
  name?: string;
  description?: string;
}

interface CourseDetailsApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    courseDetails?: {
      _id: string;
      courseName: string;
      courseDescription: string;
      whatYouWillLearn?: string;
      price?: number | string | null;
      thumbnail?: string | null;
      tag?: string[];
      instructions?: string[];
      status?: string;
      createdAt?: string;
      instructor?: CourseInstructor;
      courseContent?: CourseSection[];
      category?: CourseCategory;
    };
    totalDuration?: string;
    completedVideos?: string[];
  };
}

export interface InstructorCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: string;
  createdAt: string;
  tags: string[];
}

export interface FullCourseDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: string;
  createdAt: string;
  whatYouWillLearn: string;
  totalDuration: string;
  tags: string[];
  instructions: string[];
  categoryName: string;
  categoryDescription: string;
  instructorName: string;
  instructorEmail: string;
  instructorImage: string;
  instructorAbout: string;
  sections: Array<{
    id: string;
    title: string;
    subSections: Array<{
      id: string;
      title: string;
      duration: string;
      description: string;
      videoUrl: string;
    }>;
  }>;
}

@Injectable({ providedIn: 'root' })
export class CourseIntegrationService {
  private http = inject(HttpClient);

  private readonly apiBase = COURSE_PROXY_BASE_URL;
  private readonly loginUrl = `${this.apiBase}/login`;
  private readonly instructorCoursesUrl = `${this.apiBase}/instructor-courses`;
  private readonly fullCourseDetailsUrl = `${this.apiBase}/details`;

  private readonly tokenStorageKey = 'course_token';
  private readonly tokenCreatedAtStorageKey = 'course_token_created_at';
  private readonly coursesStorageKey = 'course_courses';
  private readonly selectedCourseStorageKey = 'course_selected_details';
  private readonly tokenLifetimeMs = 24 * 60 * 60 * 1000;
  private readonly fallbackThumbnail =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

  private expiryTimeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly token = signal<string | null>(this.readStoredToken());
  readonly tokenCreatedAt = signal<number | null>(this.readStoredTokenCreatedAt());
  readonly courses = signal<InstructorCourse[]>(this.readStoredCourses());
  readonly selectedCourse = signal<FullCourseDetails | null>(this.readStoredSelectedCourse());
  readonly isStarting = signal(false);
  readonly isCoursesLoading = signal(false);
  readonly isCourseDetailsLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasSession = computed(() => Boolean(this.token()));
  readonly isLoading = computed(
    () => this.isStarting() || this.isCoursesLoading() || this.isCourseDetailsLoading()
  );

  constructor() {
    this.clearExpiredSessionIfNeeded();
    this.scheduleTokenExpiry();
  }

  async restoreSessionIfAvailable() {
    this.clearExpiredSessionIfNeeded();

    if (!this.token()) {
      return;
    }

    if (this.courses().length) {
      return;
    }

    await this.loadCourses();
  }

  async startCourseFlow() {
    this.error.set(null);
    this.isStarting.set(true);

    try {
      const loginResponse = await firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, {}));

      const token = loginResponse?.data?.token ?? loginResponse?.token ?? null;
      if (!loginResponse?.success || !token) {
        throw new Error(loginResponse?.message ?? 'Hidden course login failed.');
      }

      this.persistToken(token);
      this.setSelectedCourse(null);
      await this.loadCourses();
    } catch (error: any) {
      this.clearSession();
      throw new Error(error?.error?.message ?? error?.message ?? 'Unable to start e-learning.');
    } finally {
      this.isStarting.set(false);
    }
  }

  async loadCourses() {
    const token = this.requireValidToken();
    this.error.set(null);
    this.isCoursesLoading.set(true);

    try {
      const response = await this.fetchInstructorCourses(token);

      const rawCourses = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.courses)
          ? response.data.courses
          : [];

      if (!response?.success) {
        throw new Error(response?.message ?? 'Unable to load courses.');
      }

      this.setCourses(rawCourses.map((course) => this.mapInstructorCourse(course)));
    } catch (error: any) {
      const message = error?.error?.message ?? error?.message ?? 'Unable to load courses.';
      this.error.set(message);

      if (error?.status === 401 || error?.status === 403) {
        this.clearSession();
      }

      throw new Error(message);
    } finally {
      this.isCoursesLoading.set(false);
    }
  }

  async loadCourseDetails(courseId: string) {
    const token = this.requireValidToken();
    this.error.set(null);
    this.isCourseDetailsLoading.set(true);

    try {
      const response = await firstValueFrom(
        this.http.post<CourseDetailsApiResponse>(
          this.fullCourseDetailsUrl,
          { courseId },
          {
            headers: this.courseAuthHeaders(token),
          }
        )
      );

      const details = response?.data?.courseDetails;
      if (!response?.success || !details) {
        throw new Error(response?.message ?? 'Unable to load full course details.');
      }

      this.setSelectedCourse(this.mapFullCourseDetails(response));
    } catch (error: any) {
      const message =
        error?.error?.message ?? error?.message ?? 'Unable to load full course details.';
      this.error.set(message);

      if (error?.status === 401 || error?.status === 403) {
        this.clearSession();
      }

      throw new Error(message);
    } finally {
      this.isCourseDetailsLoading.set(false);
    }
  }

  clearSession() {
    this.clearExpiryTimeout();
    this.token.set(null);
    this.tokenCreatedAt.set(null);
    this.setCourses([]);
    this.setSelectedCourse(null);
    this.isStarting.set(false);
    this.isCoursesLoading.set(false);
    this.isCourseDetailsLoading.set(false);
    this.error.set(null);

    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.tokenCreatedAtStorageKey);
    localStorage.removeItem(this.coursesStorageKey);
    localStorage.removeItem(this.selectedCourseStorageKey);
  }

  private requireValidToken() {
    this.clearExpiredSessionIfNeeded();
    const token = this.token();

    if (!token) {
      throw new Error('Course session expired. Please start again.');
    }

    return token;
  }

  private persistToken(token: string) {
    const createdAt = Date.now();
    this.token.set(token);
    this.tokenCreatedAt.set(createdAt);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenStorageKey, token);
      localStorage.setItem(this.tokenCreatedAtStorageKey, String(createdAt));
    }

    this.scheduleTokenExpiry();
  }

  private clearExpiredSessionIfNeeded() {
    const createdAt = this.tokenCreatedAt();
    if (createdAt && Date.now() - createdAt > this.tokenLifetimeMs) {
      this.clearSession();
    }
  }

  private scheduleTokenExpiry() {
    this.clearExpiryTimeout();

    const createdAt = this.tokenCreatedAt();
    if (!createdAt || typeof window === 'undefined') {
      return;
    }

    const remainingMs = createdAt + this.tokenLifetimeMs - Date.now();
    if (remainingMs <= 0) {
      return;
    }

    this.expiryTimeoutId = window.setTimeout(() => {
      this.clearSession();
    }, remainingMs);
  }

  private clearExpiryTimeout() {
    if (this.expiryTimeoutId !== null) {
      clearTimeout(this.expiryTimeoutId);
      this.expiryTimeoutId = null;
    }
  }

  private courseAuthHeaders(token: string) {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private fetchInstructorCourses(token: string) {
    return firstValueFrom(
      this.http.get<InstructorCoursesResponse>(this.instructorCoursesUrl, {
        headers: this.courseAuthHeaders(token),
      })
    );
  }

  private readStoredToken() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.tokenStorageKey);
  }

  private readStoredTokenCreatedAt() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.tokenCreatedAtStorageKey);
    if (!raw) {
      return null;
    }

    const value = Number(raw);
    return Number.isNaN(value) ? null : value;
  }

  private readStoredCourses() {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const raw = localStorage.getItem(this.coursesStorageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as InstructorCourse[]) : [];
    } catch {
      return [];
    }
  }

  private readStoredSelectedCourse() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(this.selectedCourseStorageKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as FullCourseDetails;
    } catch {
      return null;
    }
  }

  private setCourses(courses: InstructorCourse[]) {
    this.courses.set(courses);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.coursesStorageKey, JSON.stringify(courses));
    }
  }

  private setSelectedCourse(course: FullCourseDetails | null) {
    this.selectedCourse.set(course);

    if (typeof localStorage === 'undefined') {
      return;
    }

    if (course) {
      localStorage.setItem(this.selectedCourseStorageKey, JSON.stringify(course));
    } else {
      localStorage.removeItem(this.selectedCourseStorageKey);
    }
  }

  private mapInstructorCourse(course: InstructorCourseApiItem): InstructorCourse {
    return {
      id: course._id,
      title: course.courseName?.trim() || 'Untitled course',
      description: course.courseDescription?.trim() || 'No description available yet.',
      thumbnail: course.thumbnail?.trim() || this.fallbackThumbnail,
      price: this.toNumber(course.price),
      status: course.status?.trim() || 'Draft',
      createdAt: course.createdAt ?? '',
      tags: Array.isArray(course.tag) ? course.tag.filter(Boolean) : [],
    };
  }

  private mapFullCourseDetails(response: CourseDetailsApiResponse): FullCourseDetails {
    const details = response.data?.courseDetails!;
    const instructor = details.instructor;
    const additionalDetails = instructor?.additionalDetails;

    return {
      id: details._id,
      title: details.courseName?.trim() || 'Untitled course',
      description: details.courseDescription?.trim() || 'No description available yet.',
      thumbnail: details.thumbnail?.trim() || this.fallbackThumbnail,
      price: this.toNumber(details.price),
      status: details.status?.trim() || 'Draft',
      createdAt: details.createdAt ?? '',
      whatYouWillLearn: details.whatYouWillLearn?.trim() || 'Details will be updated soon.',
      totalDuration: response.data?.totalDuration?.trim() || 'Duration unavailable',
      tags: Array.isArray(details.tag) ? details.tag.filter(Boolean) : [],
      instructions: Array.isArray(details.instructions)
        ? details.instructions.filter(Boolean)
        : [],
      categoryName: details.category?.name?.trim() || 'General',
      categoryDescription:
        details.category?.description?.trim() || 'Category description unavailable.',
      instructorName: [instructor?.firstName, instructor?.lastName].filter(Boolean).join(' ').trim(),
      instructorEmail: instructor?.email?.trim() || '',
      instructorImage: instructor?.image?.trim() || '',
      instructorAbout: additionalDetails?.about?.trim() || 'Instructor bio unavailable.',
      sections: Array.isArray(details.courseContent)
        ? details.courseContent.map((section) => ({
            id: section._id,
            title: section.sectionName?.trim() || 'Untitled section',
            subSections: Array.isArray(section.subSection)
              ? section.subSection.map((subSection) => ({
                  id: subSection._id,
                  title: subSection.title?.trim() || 'Untitled lesson',
                  duration: subSection.timeDuration?.trim() || 'Duration unavailable',
                  description: subSection.description?.trim() || 'No lesson description available.',
                  videoUrl: subSection.videoUrl?.trim() || '',
                }))
              : [],
          }))
        : [],
    };
  }

  private toNumber(value: number | string | null | undefined) {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
