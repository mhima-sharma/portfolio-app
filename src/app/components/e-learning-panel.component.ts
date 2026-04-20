import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CourseIntegrationService, InstructorCourse } from '../services/course-integration.service';

@Component({
  selector: 'app-e-learning-panel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <section class="dashboard-view">
      @if (courseService.error()) {
        <div class="banner banner--error">{{ courseService.error() }}</div>
      }

      <section class="surface-card course-hero">
        <div>
          <p class="surface-card__eyebrow">E-Learning</p>
          <h3 class="surface-card__title">Instructor course integration</h3>
          <p class="admin-topbar__copy">
            Hidden login ke through course token generate hota hai, phir instructor courses aur full
            details same admin experience me load hote hain.
          </p>
        </div>

        <div class="course-hero__actions">
          <button
            class="btn-primary"
            type="button"
            (click)="start()"
            [disabled]="courseService.isLoading()"
          >
            {{ courseService.isStarting() ? 'Starting...' : courseService.hasSession() ? 'Restart' : 'Start' }}
          </button>

          @if (courseService.hasSession()) {
            <button
              class="btn-secondary"
              type="button"
              (click)="clear()"
              [disabled]="courseService.isLoading()"
            >
              Close
            </button>
          }
        </div>
      </section>

      @if (courseService.isLoading()) {
        <section class="surface-card course-loading">
          <div class="course-spinner" aria-hidden="true"></div>
          <div>
            <p class="surface-card__title course-loading__title">Loading course data</p>
            <p class="admin-topbar__copy">
              {{
                courseService.isStarting()
                  ? 'Hidden login aur token setup ho raha hai.'
                  : courseService.isCoursesLoading()
                    ? 'Instructor courses fetch ho rahe hain.'
                    : 'Selected course ki complete details load ho rahi hain.'
              }}
            </p>
          </div>
        </section>
      }

      @if (!courseService.hasSession() && !courseService.isLoading()) {
        <section class="surface-card course-empty">
          <div class="course-empty__badge">24h Token Session</div>
          <h3 class="surface-card__title">Start karke course catalog unlock karo</h3>
          <p class="admin-topbar__copy">
            Start button hidden instructor login karega, JWT token course_token me store karega,
            aur phir courses auto-load honge.
          </p>
        </section>
      }

      @if (courseService.hasSession()) {
        <div class="course-grid-layout">
          <section class="surface-card">
            <div class="surface-card__header">
              <div>
                <p class="surface-card__eyebrow">Catalog</p>
                <h3 class="surface-card__title">Instructor Courses</h3>
                <p class="admin-topbar__copy">
                  Course card par click karte hi complete structure, duration aur instructor info open
                  ho jayega.
                </p>
              </div>
              <div class="course-count-pill">{{ courseService.courses().length }} courses</div>
            </div>

            @if (courseService.courses().length) {
              <div class="course-card-grid">
                @for (course of courseService.courses(); track course.id) {
                  <button
                    type="button"
                    class="course-card"
                    [class.active]="courseService.selectedCourse()?.id === course.id"
                    (click)="openCourse(course)"
                  >
                    <img
                      class="course-card__image"
                      [src]="course.thumbnail"
                      [alt]="course.title"
                    />
                    <div class="course-card__body">
                      <div class="course-card__meta">
                        <span class="course-pill">{{ course.status }}</span>
                        <span class="course-price">{{ formatPrice(course.price) }}</span>
                      </div>
                      <h4 class="course-card__title">{{ course.title }}</h4>
                      <p class="course-card__description">{{ course.description }}</p>

                      @if (course.tags.length) {
                        <div class="course-tag-list">
                          @for (tag of course.tags; track tag) {
                            <span class="course-tag">{{ tag }}</span>
                          }
                        </div>
                      }

                      @if (course.createdAt) {
                        <p class="course-card__footer">
                          Created {{ course.createdAt | date: 'mediumDate' }}
                        </p>
                      }
                    </div>
                  </button>
                }
              </div>
            } @else if (!courseService.isCoursesLoading()) {
              <div class="empty-state">No instructor courses were returned for this account.</div>
            }
          </section>

          <section class="surface-card course-details">
            @if (courseService.selectedCourse(); as selectedCourse) {
              <div class="course-details__hero">
                <img
                  class="course-details__image"
                  [src]="selectedCourse.thumbnail"
                  [alt]="selectedCourse.title"
                />

                <div class="course-details__content">
                  <div class="course-card__meta">
                    <span class="course-pill">{{ selectedCourse.status }}</span>
                    <span class="course-price">{{ formatPrice(selectedCourse.price) }}</span>
                  </div>
                  <h3 class="surface-card__title">{{ selectedCourse.title }}</h3>
                  <p class="admin-topbar__copy">{{ selectedCourse.description }}</p>

                  <div class="course-summary-grid">
                    <article class="course-summary-item">
                      <span>Total Duration</span>
                      <strong>{{ selectedCourse.totalDuration }}</strong>
                    </article>
                    <article class="course-summary-item">
                      <span>Category</span>
                      <strong>{{ selectedCourse.categoryName }}</strong>
                    </article>
                    <article class="course-summary-item">
                      <span>Sections</span>
                      <strong>{{ selectedCourse.sections.length }}</strong>
                    </article>
                    <article class="course-summary-item">
                      <span>Created</span>
                      <strong>{{ selectedCourse.createdAt | date: 'mediumDate' }}</strong>
                    </article>
                  </div>
                </div>
              </div>

              <div class="course-detail-block">
                <p class="surface-card__eyebrow">What You Will Learn</p>
                <p class="admin-topbar__copy">{{ selectedCourse.whatYouWillLearn }}</p>
              </div>

              @if (selectedCourse.tags.length) {
                <div class="course-tag-list">
                  @for (tag of selectedCourse.tags; track tag) {
                    <span class="course-tag">{{ tag }}</span>
                  }
                </div>
              }

              <div class="course-detail-block">
                <div class="surface-card__header">
                  <div>
                    <p class="surface-card__eyebrow">Instructor</p>
                    <h4 class="course-section-title">{{ selectedCourse.instructorName || 'Instructor' }}</h4>
                  </div>
                </div>

                <div class="course-instructor-card">
                  @if (selectedCourse.instructorImage) {
                    <img
                      class="course-instructor-card__image"
                      [src]="selectedCourse.instructorImage"
                      [alt]="selectedCourse.instructorName || 'Instructor'"
                    />
                  }
                  <div>
                    <p class="course-instructor-card__name">
                      {{ selectedCourse.instructorName || 'Instructor name unavailable' }}
                    </p>
                    <p class="admin-topbar__copy">{{ selectedCourse.instructorAbout }}</p>
                    @if (selectedCourse.instructorEmail) {
                      <p class="course-card__footer">{{ selectedCourse.instructorEmail }}</p>
                    }
                  </div>
                </div>
              </div>

              @if (selectedCourse.instructions.length) {
                <div class="course-detail-block">
                  <p class="surface-card__eyebrow">Instructions</p>
                  <div class="course-list">
                    @for (instruction of selectedCourse.instructions; track instruction) {
                      <div class="course-list__item">{{ instruction }}</div>
                    }
                  </div>
                </div>
              }

              <div class="course-detail-block">
                <p class="surface-card__eyebrow">Curriculum</p>
                @if (selectedCourse.sections.length) {
                  <div class="course-sections">
                    @for (section of selectedCourse.sections; track section.id) {
                      <article class="course-section-card">
                        <h4 class="course-section-title">{{ section.title }}</h4>

                        @if (section.subSections.length) {
                          <div class="course-list">
                            @for (lesson of section.subSections; track lesson.id) {
                              <div class="course-list__item">
                                <div class="course-list__item-head">
                                  <strong>{{ lesson.title }}</strong>
                                  <span>{{ lesson.duration }}</span>
                                </div>
                                <p>{{ lesson.description }}</p>
                                @if (lesson.videoUrl) {
                                  <a
                                    class="course-link"
                                    [href]="lesson.videoUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    (click)="$event.stopPropagation()"
                                  >
                                    Open lesson video
                                  </a>
                                }
                              </div>
                            }
                          </div>
                        } @else {
                          <div class="empty-state">No lessons available inside this section yet.</div>
                        }
                      </article>
                    }
                  </div>
                } @else {
                  <div class="empty-state">No curriculum sections were returned for this course.</div>
                }
              </div>
            } @else {
              <div class="course-details__placeholder">
                <p class="surface-card__eyebrow">Course Details</p>
                <h3 class="surface-card__title">Select a course card</h3>
                <p class="admin-topbar__copy">
                  Right side me full course breakdown yahin show hoga, including sections, subsections,
                  duration aur instructor profile.
                </p>
              </div>
            }
          </section>
        </div>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ELearningPanelComponent {
  readonly courseService = inject(CourseIntegrationService);

  constructor() {
    void this.courseService.restoreSessionIfAvailable().catch(() => undefined);
  }

  async start() {
    try {
      await this.courseService.startCourseFlow();
    } catch {
      return;
    }
  }

  async openCourse(course: InstructorCourse) {
    try {
      await this.courseService.loadCourseDetails(course.id);
    } catch {
      return;
    }
  }

  clear() {
    this.courseService.clearSession();
  }

  formatPrice(price: number) {
    return price > 0 ? `INR ${price}` : 'Free';
  }
}
