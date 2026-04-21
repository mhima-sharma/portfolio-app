import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio.service';
import { AuthService } from '../services/auth.service';
import { AboutData, ContactData, Experience, PortfolioTheme, Project, Skill } from '../models/portfolio.model';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { IconComponent } from './ui/icon.component';
import { EMAILJS_CONFIG, isEmailJsConfigured } from '../config/email.config';
import { ELearningPanelComponent } from './e-learning-panel.component';

type ValidationErrors = Record<string, string>;
type AdminPanel = 'dashboard' | 'create' | 'elearning' | 'contact';

type WizardStep = {
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeSelectorComponent, IconComponent, ELearningPanelComponent],
  template: `
    <div class="admin-shell">
      @if (isSidebarOpen()) {
        <button type="button" class="admin-sidebar-backdrop" (click)="closeSidebar()" aria-label="Close menu"></button>
      }

      <aside class="admin-sidebar" [class.is-open]="isSidebarOpen()">
        <div class="admin-brand">
          <div class="admin-brand__badge">PM</div>
          <div>
            <p class="admin-brand__eyebrow">Workspace</p>
            <h1 class="admin-brand__title">Portfolio Studio</h1>
            <p class="admin-brand__copy">Manage your public profile, content, and presentation from one place.</p>
          </div>
        </div>

        <nav class="admin-nav">
          @for (panel of panels; track panel.id) {
            <button
              type="button"
              class="admin-nav__item"
              [class.active]="activePanel() === panel.id"
              (click)="setActivePanel(panel.id)"
            >
              <span class="admin-nav__icon">
                <app-icon [name]="panel.icon" [size]="18"></app-icon>
              </span>
              <span>
                <span class="admin-nav__label">{{ panel.label }}</span>
                <span class="admin-nav__hint">{{ panel.hint }}</span>
              </span>
            </button>
          }

          <button type="button" class="admin-nav__item" (click)="openResume()">
            <span class="admin-nav__icon">
              <app-icon name="file-text" [size]="18"></app-icon>
            </span>
            <span>
              <span class="admin-nav__label">Resume Manager</span>
              <span class="admin-nav__hint">Preview and export your resume.</span>
            </span>
          </button>
        </nav>

        <div class="sidebar-actions">
          <button class="btn-secondary w-full" type="button" (click)="refresh()">Refresh Data</button>
          <button class="btn-primary w-full" type="button" (click)="authService.logout()">Logout</button>
        </div>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div class="admin-topbar__menu">
            <button type="button" class="mobile-menu-btn" (click)="toggleSidebar()" aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div>
            <p class="admin-topbar__eyebrow">
              {{
                activePanel() === 'dashboard'
                  ? 'Overview'
                  : activePanel() === 'create'
                    ? 'Guided Setup'
                    : activePanel() === 'elearning'
                      ? 'Course Control'
                      : 'Support'
              }}
            </p>
            <h2 class="admin-topbar__title">
              {{
                activePanel() === 'dashboard'
                  ? 'Admin Dashboard'
                  : activePanel() === 'create'
                    ? 'Content Setup'
                    : activePanel() === 'elearning'
                      ? 'E-Learning'
                      : 'Contact Us'
              }}
            </h2>
            <p class="admin-topbar__copy">
              @if (activePanel() === 'dashboard') {
                Track your content, selected layout, and public link in one place.
              } @else if (activePanel() === 'create') {
                Complete your profile and content in a guided, professional setup flow.
              } @else if (activePanel() === 'elearning') {
                Hidden login, course sync and full curriculum inspection from the same admin workspace.
              } @else {
                Contact the platform team for support, setup issues or admin assistance.
              }
            </p>
          </div>

          <div class="admin-topbar__actions">
            @if (profileSlug()) {
              <button class="btn-secondary" type="button" (click)="openPortfolio()">Open Public Page</button>
              <button class="btn-primary" type="button" (click)="copyPortfolioUrl()">Copy Public Link</button>
            }
          </div>
        </header>

        @if (status()) {
          <div class="banner banner--success">{{ status() }}</div>
        }

        @if (error()) {
          <div class="banner banner--error">{{ error() }}</div>
        }

        @if (activePanel() === 'dashboard') {
          <section class="dashboard-view">
            <div class="stats-grid">
              <article class="metric-card">
                <p class="metric-card__label">Skills</p>
                <p class="metric-card__value">{{ skills().length }}</p>
                <p class="metric-card__hint">Capabilities and focus areas shown on your public page.</p>
              </article>
              <article class="metric-card">
                <p class="metric-card__label">Projects</p>
                <p class="metric-card__value">{{ projects().length }}</p>
                <p class="metric-card__hint">Showcase cards currently saved for visitors.</p>
              </article>
              <article class="metric-card">
                <p class="metric-card__label">Experience</p>
                <p class="metric-card__value">{{ experience().length }}</p>
                <p class="metric-card__hint">Career timeline entries already published.</p>
              </article>
              <article class="metric-card">
                <p class="metric-card__label">Theme</p>
                <p class="metric-card__value metric-card__value--small">{{ selectedTheme() }}</p>
                <p class="metric-card__hint">Active theme used by the public page.</p>
              </article>
            </div>

            <div class="dashboard-grid">
              <section class="surface-card">
                <div class="surface-card__header">
                  <div>
                    <p class="surface-card__eyebrow">Launchpad</p>
                    <h3 class="surface-card__title">Quick Actions</h3>
                  </div>
                </div>

                <div class="quick-actions">
                  <button class="quick-action" type="button" (click)="openCreatePanelAt(0)">
                    <span class="quick-action__badge">01</span>
                    <span>
                    <span class="quick-action__title">Start setup</span>
                    <span class="quick-action__copy">Open the guided workflow from the first step.</span>
                    </span>
                  </button>
                  <button class="quick-action" type="button" (click)="openCreatePanelAt(6)">
                    <span class="quick-action__badge">06</span>
                    <span>
                      <span class="quick-action__title">Publish</span>
                    <span class="quick-action__copy">Jump to the final review and sharing step.</span>
                    </span>
                  </button>
                  <button class="quick-action" type="button" (click)="copyPortfolioUrl()">
                    <span class="quick-action__badge">URL</span>
                    <span>
                    <span class="quick-action__title">Copy public link</span>
                    <span class="quick-action__copy">Copy the current public URL.</span>
                    </span>
                  </button>
                </div>
              </section>

              <section class="surface-card">
                <div class="surface-card__header">
                  <div>
                    <p class="surface-card__eyebrow">Handoff</p>
                    <h3 class="surface-card__title">Public Profile Link</h3>
                  </div>
                </div>

                <div class="link-card">
                  <p class="link-card__label">Live URL</p>
                  <p class="link-card__value">
                    {{ publicPortfolioUrl() || 'Public URL will appear after your profile slug is available.' }}
                  </p>
                  <p class="link-card__meta">Slug: {{ profileSlug() || 'Not available yet' }}</p>
                </div>
              </section>
            </div>
          </section>
        } @else if (activePanel() === 'create') {
          <section class="wizard-view">
            <div class="wizard-stepper">
              @for (step of wizardSteps; track step.title; let i = $index) {
                <button
                  type="button"
                  class="wizard-stepper__item"
                  [class.active]="activeStep() === i"
                  [class.complete]="isStepComplete(i)"
                  (click)="setActiveStep(i)"
                >
                  <span class="wizard-stepper__number">
                    @if (isStepComplete(i)) {
                      ✓
                    } @else {
                      {{ i + 1 }}
                    }
                  </span>
                  <span>
                    <span class="wizard-stepper__title">{{ step.shortTitle }}</span>
                    <span class="wizard-stepper__copy">{{ step.eyebrow }}</span>
                  </span>
                </button>
              }
            </div>

            <section class="surface-card surface-card--wizard">
              <div class="wizard-head">
                <div>
                  <p class="surface-card__eyebrow">{{ currentStep().eyebrow }}</p>
                  <h3 class="surface-card__title">{{ currentStep().title }}</h3>
                  <p class="wizard-head__copy">{{ currentStep().description }}</p>
                </div>
                <div class="wizard-head__pill">Step {{ activeStep() }} / {{ wizardSteps.length - 1 }}</div>
              </div>

              @switch (activeStep()) {
                @case (0) {
                  <div class="step-overview">
                    @for (step of wizardSteps; track step.title; let i = $index) {
                      @if (i > 0) {
                        <button type="button" class="step-overview__item" (click)="openRoadmapStep(i)">
                          <span class="step-overview__index" [class.current]="activeStep() === i">
                            {{ i }}
                          </span>
                          <span>
                            <span class="step-overview__title">{{ step.title }}</span>
                            <span class="step-overview__copy">{{ step.description }}</span>
                          </span>
                        </button>
                      }
                    }
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="setActivePanel('dashboard')">Back To Dashboard</button>
                    <button class="btn-primary" type="button" (click)="startSetupFromRoadmap()">Continue</button>
                  </div>
                }

                @case (1) {
                  <div class="form-grid">
                    <div class="form-field form-field--full">
                      <label>Bio</label>
                      <textarea
                        [(ngModel)]="aboutForm.bio"
                        (ngModelChange)="clearValidationError('about.bio')"
                        rows="4"
                        class="input-base"
                        [class.input-error]="hasValidationError('about.bio')"
                        placeholder="Short intro that instantly explains who you are"
                      ></textarea>
                      @if (hasValidationError('about.bio')) {
                        <p class="field-error">{{ validationErrors()['about.bio'] }}</p>
                      }
                    </div>

                    <div class="form-field form-field--full">
                      <label>Description</label>
                      <textarea
                        [(ngModel)]="aboutForm.description"
                        (ngModelChange)="clearValidationError('about.description')"
                        rows="5"
                        class="input-base"
                        [class.input-error]="hasValidationError('about.description')"
                        placeholder="Deeper summary about your work, focus, strengths and positioning"
                      ></textarea>
                      @if (hasValidationError('about.description')) {
                        <p class="field-error">{{ validationErrors()['about.description'] }}</p>
                      }
                    </div>

                    <div class="form-field">
                      <label>Years of Experience</label>
                      <input
                        [(ngModel)]="aboutForm.yearsExperience"
                        (ngModelChange)="clearValidationError('about.yearsExperience')"
                        type="number"
                        class="input-base"
                        [class.input-error]="hasValidationError('about.yearsExperience')"
                      />
                      @if (hasValidationError('about.yearsExperience')) {
                        <p class="field-error">{{ validationErrors()['about.yearsExperience'] }}</p>
                      }
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="setActivePanel('dashboard')">Back To Dashboard</button>
                    <button class="btn-primary" type="button" (click)="saveAbout(true)">Save And Continue</button>
                  </div>
                }

                @case (2) {
                  <div class="form-grid">
                    <div class="form-field">
                      <label>Email</label>
                      <input [(ngModel)]="contactForm.email" (ngModelChange)="clearValidationError('contact.email')" type="email" class="input-base" [class.input-error]="hasValidationError('contact.email')" />
                      @if (hasValidationError('contact.email')) {
                        <p class="field-error">{{ validationErrors()['contact.email'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Phone</label>
                      <input [(ngModel)]="contactForm.phone" (ngModelChange)="clearValidationError('contact.phone')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.phone')" />
                      @if (hasValidationError('contact.phone')) {
                        <p class="field-error">{{ validationErrors()['contact.phone'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Location</label>
                      <input [(ngModel)]="contactForm.location" (ngModelChange)="clearValidationError('contact.location')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.location')" />
                      @if (hasValidationError('contact.location')) {
                        <p class="field-error">{{ validationErrors()['contact.location'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Portfolio Website</label>
                      <input [(ngModel)]="contactForm.portfolio" (ngModelChange)="clearValidationError('contact.portfolio')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.portfolio')" />
                      @if (hasValidationError('contact.portfolio')) {
                        <p class="field-error">{{ validationErrors()['contact.portfolio'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>GitHub</label>
                      <input [(ngModel)]="contactForm.github" (ngModelChange)="clearValidationError('contact.github')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.github')" />
                      @if (hasValidationError('contact.github')) {
                        <p class="field-error">{{ validationErrors()['contact.github'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>LinkedIn</label>
                      <input [(ngModel)]="contactForm.linkedin" (ngModelChange)="clearValidationError('contact.linkedin')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.linkedin')" />
                      @if (hasValidationError('contact.linkedin')) {
                        <p class="field-error">{{ validationErrors()['contact.linkedin'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Medium</label>
                      <input [(ngModel)]="contactForm.medium" (ngModelChange)="clearValidationError('contact.medium')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.medium')" />
                      @if (hasValidationError('contact.medium')) {
                        <p class="field-error">{{ validationErrors()['contact.medium'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Tableau</label>
                      <input [(ngModel)]="contactForm.tableau" (ngModelChange)="clearValidationError('contact.tableau')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.tableau')" />
                      @if (hasValidationError('contact.tableau')) {
                        <p class="field-error">{{ validationErrors()['contact.tableau'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>LeetCode</label>
                      <input [(ngModel)]="contactForm.leetcode" (ngModelChange)="clearValidationError('contact.leetcode')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.leetcode')" />
                      @if (hasValidationError('contact.leetcode')) {
                        <p class="field-error">{{ validationErrors()['contact.leetcode'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>Instagram</label>
                      <input [(ngModel)]="contactForm.instagram" (ngModelChange)="clearValidationError('contact.instagram')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.instagram')" />
                      @if (hasValidationError('contact.instagram')) {
                        <p class="field-error">{{ validationErrors()['contact.instagram'] }}</p>
                      }
                    </div>
                    <div class="form-field">
                      <label>YouTube</label>
                      <input [(ngModel)]="contactForm.youtube" (ngModelChange)="clearValidationError('contact.youtube')" type="text" class="input-base" [class.input-error]="hasValidationError('contact.youtube')" />
                      @if (hasValidationError('contact.youtube')) {
                        <p class="field-error">{{ validationErrors()['contact.youtube'] }}</p>
                      }
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="goToPreviousStep()">Previous</button>
                    <button class="btn-primary" type="button" (click)="saveContact(true)">Save And Continue</button>
                  </div>
                }

                @case (3) {
                  <div class="builder-layout">
                    <div class="builder-form">
                      <div class="form-grid">
                        <div class="form-field">
                          <label>Skill Name</label>
                          <input [(ngModel)]="skillForm.name" (ngModelChange)="clearValidationError('skill.name')" type="text" class="input-base" [class.input-error]="hasValidationError('skill.name')" placeholder="Angular, Node.js, SQL..." />
                          @if (hasValidationError('skill.name')) {
                            <p class="field-error">{{ validationErrors()['skill.name'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Category</label>
                          <select [(ngModel)]="skillForm.category" (ngModelChange)="clearValidationError('skill.category')" class="input-base" [class.input-error]="hasValidationError('skill.category')">
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="tools">Tools</option>
                          </select>
                          @if (hasValidationError('skill.category')) {
                            <p class="field-error">{{ validationErrors()['skill.category'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Level</label>
                          <input [(ngModel)]="skillForm.level" (ngModelChange)="clearValidationError('skill.level')" type="number" class="input-base" [class.input-error]="hasValidationError('skill.level')" />
                          @if (hasValidationError('skill.level')) {
                            <p class="field-error">{{ validationErrors()['skill.level'] }}</p>
                          }
                        </div>
                      </div>

                      <div class="editor-actions">
                        <button class="btn-secondary" type="button" (click)="resetSkillForm()">Reset</button>
                        <button class="btn-primary" type="button" (click)="saveSkill()">
                          {{ editingSkillId() ? 'Update Skill' : 'Add Skill' }}
                        </button>
                      </div>
                    </div>

                    <div class="builder-list">
                      <div class="builder-list__head">
                        <h4>Current Skills</h4>
                        <span>{{ skills().length }} saved</span>
                      </div>

                      @if (skills().length) {
                        <div class="stack-list">
                          @for (skill of skills(); track skill.id) {
                            <article class="stack-item">
                              <div>
                                <p class="stack-item__title">{{ skill.name }}</p>
                                <p class="stack-item__copy">{{ skill.category }} · {{ skill.level }}%</p>
                              </div>
                              <div class="stack-item__actions">
                                <button class="btn-secondary btn-chip" type="button" (click)="editSkill(skill)">Edit</button>
                                <button class="btn-secondary btn-chip btn-chip--danger" type="button" (click)="deleteSkill(skill.id)">Delete</button>
                              </div>
                            </article>
                          }
                        </div>
                      } @else {
                        <div class="empty-state">Add at least one skill to strengthen this step.</div>
                      }
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="goToPreviousStep()">Previous</button>
                    <button class="btn-primary" type="button" (click)="goToNextStep()">Continue</button>
                  </div>
                }

                @case (4) {
                  <div class="builder-layout">
                    <div class="builder-form">
                      <div class="form-grid">
                        <div class="form-field">
                          <label>Project Title</label>
                          <input [(ngModel)]="projectForm.title" (ngModelChange)="clearValidationError('project.title')" type="text" class="input-base" [class.input-error]="hasValidationError('project.title')" />
                          @if (hasValidationError('project.title')) {
                            <p class="field-error">{{ validationErrors()['project.title'] }}</p>
                          }
                        </div>
                        <div class="form-field form-field--full">
                          <label>Description</label>
                          <textarea [(ngModel)]="projectForm.description" (ngModelChange)="clearValidationError('project.description')" rows="4" class="input-base" [class.input-error]="hasValidationError('project.description')"></textarea>
                          @if (hasValidationError('project.description')) {
                            <p class="field-error">{{ validationErrors()['project.description'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Image URL</label>
                          <input [(ngModel)]="projectForm.image" (ngModelChange)="clearValidationError('project.image')" type="text" class="input-base" [class.input-error]="hasValidationError('project.image')" />
                          @if (hasValidationError('project.image')) {
                            <p class="field-error">{{ validationErrors()['project.image'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Live Link</label>
                          <input [(ngModel)]="projectForm.liveLink" (ngModelChange)="clearValidationError('project.liveLink')" type="text" class="input-base" [class.input-error]="hasValidationError('project.liveLink')" />
                          @if (hasValidationError('project.liveLink')) {
                            <p class="field-error">{{ validationErrors()['project.liveLink'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>GitHub Link</label>
                          <input [(ngModel)]="projectForm.githubLink" (ngModelChange)="clearValidationError('project.githubLink')" type="text" class="input-base" [class.input-error]="hasValidationError('project.githubLink')" />
                          @if (hasValidationError('project.githubLink')) {
                            <p class="field-error">{{ validationErrors()['project.githubLink'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Technologies</label>
                          <input [(ngModel)]="projectForm.technologies" (ngModelChange)="clearValidationError('project.technologies')" type="text" class="input-base" [class.input-error]="hasValidationError('project.technologies')" placeholder="Angular, TypeScript, Tailwind" />
                          @if (hasValidationError('project.technologies')) {
                            <p class="field-error">{{ validationErrors()['project.technologies'] }}</p>
                          }
                        </div>
                        <label class="checkbox-field">
                          <input [(ngModel)]="projectForm.featured" type="checkbox" />
                          <span>Mark as featured project</span>
                        </label>
                      </div>

                      <div class="editor-actions">
                        <button class="btn-secondary" type="button" (click)="resetProjectForm()">Reset</button>
                        <button class="btn-primary" type="button" (click)="saveProject()">
                          {{ editingProjectId() ? 'Update Project' : 'Add Project' }}
                        </button>
                      </div>
                    </div>

                    <div class="builder-list">
                      <div class="builder-list__head">
                        <h4>Saved Projects</h4>
                        <span>{{ projects().length }} saved</span>
                      </div>

                      @if (projects().length) {
                        <div class="stack-list">
                          @for (project of projects(); track project.id) {
                            <article class="stack-item">
                              <div>
                                <p class="stack-item__title">{{ project.title }}</p>
                                <p class="stack-item__copy">{{ project.description }}</p>
                              </div>
                              <div class="stack-item__actions">
                                <button class="btn-secondary btn-chip" type="button" (click)="editProject(project)">Edit</button>
                                <button class="btn-secondary btn-chip btn-chip--danger" type="button" (click)="deleteProject(project.id)">Delete</button>
                              </div>
                            </article>
                          }
                        </div>
                      } @else {
                        <div class="empty-state">Project showcase yahin se build hoga. Ek entry add karo.</div>
                      }
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="goToPreviousStep()">Previous</button>
                    <button class="btn-primary" type="button" (click)="goToNextStep()">Continue</button>
                  </div>
                }

                @case (5) {
                  <div class="builder-layout">
                    <div class="builder-form">
                      <div class="form-grid">
                        <div class="form-field">
                          <label>Company</label>
                          <input [(ngModel)]="experienceForm.company" (ngModelChange)="clearValidationError('experience.company')" type="text" class="input-base" [class.input-error]="hasValidationError('experience.company')" />
                          @if (hasValidationError('experience.company')) {
                            <p class="field-error">{{ validationErrors()['experience.company'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Position</label>
                          <input [(ngModel)]="experienceForm.position" (ngModelChange)="clearValidationError('experience.position')" type="text" class="input-base" [class.input-error]="hasValidationError('experience.position')" />
                          @if (hasValidationError('experience.position')) {
                            <p class="field-error">{{ validationErrors()['experience.position'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Duration</label>
                          <input [(ngModel)]="experienceForm.duration" (ngModelChange)="clearValidationError('experience.duration')" type="text" class="input-base" [class.input-error]="hasValidationError('experience.duration')" placeholder="Jan 2023 - Present" />
                          @if (hasValidationError('experience.duration')) {
                            <p class="field-error">{{ validationErrors()['experience.duration'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>Start Date</label>
                          <input [(ngModel)]="experienceForm.startDate" (ngModelChange)="clearValidationError('experience.startDate')" type="date" class="input-base" [class.input-error]="hasValidationError('experience.startDate')" />
                          @if (hasValidationError('experience.startDate')) {
                            <p class="field-error">{{ validationErrors()['experience.startDate'] }}</p>
                          }
                        </div>
                        <div class="form-field">
                          <label>End Date</label>
                          <input [(ngModel)]="experienceForm.endDate" (ngModelChange)="clearValidationError('experience.endDate')" type="date" class="input-base" [class.input-error]="hasValidationError('experience.endDate')" />
                          @if (hasValidationError('experience.endDate')) {
                            <p class="field-error">{{ validationErrors()['experience.endDate'] }}</p>
                          }
                        </div>
                        <div class="form-field form-field--full">
                          <label>Description</label>
                          <textarea [(ngModel)]="experienceForm.description" (ngModelChange)="clearValidationError('experience.description')" rows="4" class="input-base" [class.input-error]="hasValidationError('experience.description')"></textarea>
                          @if (hasValidationError('experience.description')) {
                            <p class="field-error">{{ validationErrors()['experience.description'] }}</p>
                          }
                        </div>
                      </div>

                      <div class="editor-actions">
                        <button class="btn-secondary" type="button" (click)="resetExperienceForm()">Reset</button>
                        <button class="btn-primary" type="button" (click)="saveExperience()">
                          {{ editingExperienceId() ? 'Update Experience' : 'Add Experience' }}
                        </button>
                      </div>
                    </div>

                    <div class="builder-list">
                      <div class="builder-list__head">
                        <h4>Career Timeline</h4>
                        <span>{{ experience().length }} saved</span>
                      </div>

                      @if (experience().length) {
                        <div class="stack-list">
                          @for (item of experience(); track item.id) {
                            <article class="stack-item">
                              <div>
                                <p class="stack-item__title">{{ item.position }} at {{ item.company }}</p>
                                <p class="stack-item__copy">{{ item.duration }}</p>
                              </div>
                              <div class="stack-item__actions">
                                <button class="btn-secondary btn-chip" type="button" (click)="editExperience(item)">Edit</button>
                                <button class="btn-secondary btn-chip btn-chip--danger" type="button" (click)="deleteExperience(item.id)">Delete</button>
                              </div>
                            </article>
                          }
                        </div>
                      } @else {
                        <div class="empty-state">Experience add karte hi public timeline automatically update hogi.</div>
                      }
                    </div>
                  </div>

                  <div class="wizard-actions">
                    <button class="btn-secondary" type="button" (click)="goToPreviousStep()">Previous</button>
                    <button class="btn-primary" type="button" (click)="goToNextStep()">Continue</button>
                  </div>
                }

                @case (6) {
                  <div class="publish-layout">
                    <app-theme-selector
                      [activeTheme]="selectedTheme()"
                      [isSaving]="themeSaving()"
                      (themeSelected)="saveTheme($event)"
                    ></app-theme-selector>

                    @if (isUsingDefaultThemeFallback()) {
                      <div class="banner banner--warning">
                        No saved theme was found for this account, so default <strong>modern-dark</strong> theme is active right now.
                      </div>
                    }

                    <section class="surface-card premium-gallery-card">
                      <div class="surface-card__header">
                        <div>
                          <p class="surface-card__eyebrow">Premium Add-On</p>
                          <h3 class="surface-card__title">Image Gallery</h3>
                          <p class="admin-topbar__copy">
                            Upload images from admin to Cloudinary and load them on the premium theme using your slug tag <strong>{{ profileSlug() || 'slug' }}</strong>.
                          </p>
                        </div>
                      </div>

                      <div class="builder-layout builder-layout--single">
                        <div class="builder-form">
                          <div class="form-grid">
                            <div class="form-field form-field--full">
                              <label>Gallery Image</label>
                              <input type="file" accept="image/*" class="input-base" (change)="onPremiumGalleryFileSelected($event)" />
                            </div>
                            <div class="form-field">
                              <label>Title</label>
                              <input [(ngModel)]="premiumGalleryForm.title" type="text" class="input-base" placeholder="Featured screen, home section, branding visual..." />
                            </div>
                            <div class="form-field">
                              <label>Alt Text</label>
                              <input [(ngModel)]="premiumGalleryForm.altText" type="text" class="input-base" placeholder="Describe the image for accessibility" />
                            </div>
                          </div>

                          <div class="editor-actions">
                            <button class="btn-secondary" type="button" (click)="resetPremiumGalleryForm()">Reset</button>
                            <button class="btn-primary" type="button" (click)="savePremiumGalleryImage()" [disabled]="premiumGalleryUploading()">
                              {{ premiumGalleryUploading() ? 'Uploading...' : 'Upload To Premium Gallery' }}
                            </button>
                          </div>
                        </div>

                        <div class="builder-list">
                          <div class="builder-list__head">
                            <h4>Saved Gallery Images</h4>
                            <span>{{ premiumGallery().length }} saved</span>
                          </div>

                          @if (premiumGallery().length) {
                            <div class="premium-gallery-grid">
                              @for (item of premiumGallery(); track item.id) {
                                <article class="premium-gallery-item">
                                  <img [src]="item.imageUrl" [alt]="item.altText || item.title || 'Gallery image'" class="premium-gallery-item__image" />
                                  <div class="premium-gallery-item__body">
                                    <p class="premium-gallery-item__title">{{ item.title || 'Untitled image' }}</p>
                                    <p class="premium-gallery-item__meta">{{ item.altText || 'No alt text added yet.' }}</p>
                                  </div>
                                  <p class="premium-gallery-item__meta">Delete or manage this image from Cloudinary Media Library.</p>
                                </article>
                              }
                            </div>
                          } @else {
                            <div class="empty-state">Premium gallery images Cloudinary tag list se load hongi, and public premium theme slug ke through fetch karega.</div>
                          }
                        </div>
                      </div>
                    </section>

                    <div class="publish-card">
                      <p class="publish-card__eyebrow">Final Step</p>
                      <h4 class="publish-card__title">Your portfolio is ready to share</h4>
                      <p class="publish-card__copy">
                        Theme select karne ke baad isi URL ko client ya user ko handoff kiya ja sakta hai.
                      </p>

                      <div class="publish-link">
                        <span class="publish-link__label">Live URL</span>
                        <strong>{{ publicPortfolioUrl() || 'Portfolio URL unavailable right now.' }}</strong>
                      </div>

                      <div class="publish-summary">
                        <div class="publish-summary__item">
                          <span>About</span>
                          <strong>{{ isStepComplete(0) ? 'Ready' : 'Pending' }}</strong>
                        </div>
                        <div class="publish-summary__item">
                          <span>Contact</span>
                          <strong>{{ isStepComplete(1) ? 'Ready' : 'Pending' }}</strong>
                        </div>
                        <div class="publish-summary__item">
                          <span>Skills</span>
                          <strong>{{ skills().length }}</strong>
                        </div>
                        <div class="publish-summary__item">
                          <span>Projects</span>
                          <strong>{{ projects().length }}</strong>
                        </div>
                        <div class="publish-summary__item">
                          <span>Experience</span>
                          <strong>{{ experience().length }}</strong>
                        </div>
                        <div class="publish-summary__item">
                          <span>Theme</span>
                          <strong>{{ selectedTheme() }}</strong>
                        </div>
                      </div>

                      <div class="wizard-actions wizard-actions--publish">
                        <button class="btn-secondary" type="button" (click)="goToPreviousStep()">Previous</button>
                        <button class="btn-secondary" type="button" (click)="setActivePanel('dashboard')">View Dashboard</button>
                        <button class="btn-primary" type="button" (click)="copyPortfolioUrl()">Copy Final Link</button>
                      </div>
                    </div>
                  </div>
                }
              }
            </section>
          </section>
        } @else if (activePanel() === 'elearning') {
          <app-e-learning-panel></app-e-learning-panel>
        } @else {
          <section class="dashboard-view">
            <section class="surface-card">
              <div class="surface-card__header">
                <div>
                  <p class="surface-card__eyebrow">Support</p>
                  <h3 class="surface-card__title">Contact Platform Team</h3>
                  <p class="admin-topbar__copy">Use this admin-only form for support, setup issues or platform requests.</p>
                </div>
              </div>

              <div class="form-grid">
                <div class="form-field">
                  <label>Your Name</label>
                  <input [(ngModel)]="platformContactForm.name" type="text" class="input-base" placeholder="Admin name" />
                </div>
                <div class="form-field">
                  <label>Your Email</label>
                  <input [(ngModel)]="platformContactForm.email" type="email" class="input-base" placeholder="Admin email" />
                </div>
                <div class="form-field form-field--full">
                  <label>Message</label>
                  <textarea [(ngModel)]="platformContactForm.message" rows="5" class="input-base" placeholder="Describe the issue or request"></textarea>
                </div>
              </div>

              <div class="wizard-actions wizard-actions--publish">
                <button class="btn-primary" type="button" (click)="sendPlatformMessage()" [disabled]="platformMessageSending()">
                  {{ platformMessageSending() ? 'Sending...' : 'Contact Us' }}
                </button>
              </div>
            </section>
          </section>
        }
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  portfolioService = inject(PortfolioService);
  authService = inject(AuthService);
  router = inject(Router);

  status = signal<string | null>(null);
  error = signal<string | null>(null);
  validationErrors = signal<ValidationErrors>({});
  activePanel = signal<AdminPanel>('dashboard');
  activeStep = signal(this.hasSeenRoadmap() ? 1 : 0);
  isSidebarOpen = signal(false);
  showRoadmap = signal(!this.hasSeenRoadmap());

  panels: Array<{ id: AdminPanel; label: string; hint: string; icon: 'dashboard' | 'layers' | 'education' | 'mail' }> = [
    { id: 'dashboard', label: 'Dashboard', hint: 'Overview and quick actions', icon: 'dashboard' },
    { id: 'create', label: 'Content Setup', hint: 'Guided multi-step builder', icon: 'layers' },
    { id: 'elearning', label: 'E-Learning', hint: 'Hidden login and course explorer', icon: 'education' },
    { id: 'contact', label: 'Contact Us', hint: 'Reach the platform team', icon: 'mail' },
  ];

  wizardSteps: WizardStep[] = [
    {
      title: 'Profile Setup Roadmap',
      shortTitle: 'Intro',
      eyebrow: 'Step 0',
      description: 'Review the full setup flow once, then continue to the main content steps.',
    },
    {
      title: 'Profile Story',
      shortTitle: 'About',
      eyebrow: 'Step 1',
      description: 'Short bio, deep description aur experience summary collect karo.',
    },
    {
      title: 'Contact Details',
      shortTitle: 'Contact',
      eyebrow: 'Step 2',
      description: 'Email, phone, location aur saare public social links yahin se manage honge.',
    },
    {
      title: 'Skills Setup',
      shortTitle: 'Skills',
      eyebrow: 'Step 3',
      description: 'Key capabilities, services, or strengths add ya edit karo. Ye public page me reflect hoga.',
    },
    {
      title: 'Project Showcase',
      shortTitle: 'Projects',
      eyebrow: 'Step 4',
      description: 'Case studies, links aur supporting details ke through showcase cards banao.',
    },
    {
      title: 'Experience Timeline',
      shortTitle: 'Experience',
      eyebrow: 'Step 5',
      description: 'Career journey ko structured timeline format me fill karo.',
    },
    {
      title: 'Theme And Publish',
      shortTitle: 'Publish',
      eyebrow: 'Step 6',
      description: 'Layout choose karo aur final public link copy karke share karo.',
    },
  ];

  aboutForm: AboutData = { bio: '', description: '', yearsExperience: 0 };
  contactForm: ContactData = {
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    medium: '',
    tableau: '',
    leetcode: '',
    instagram: '',
    youtube: '',
    portfolio: '',
  };

  editingSkillId = signal<string | number | null>(null);
  skillForm = { name: '', category: 'frontend' as Skill['category'], level: 80 };

  editingProjectId = signal<string | number | null>(null);
  projectForm = {
    title: '',
    description: '',
    image: '',
    liveLink: '',
    githubLink: '',
    technologies: '',
    featured: false,
  };

  editingExperienceId = signal<string | number | null>(null);
  experienceForm = {
    company: '',
    position: '',
    duration: '',
    description: '',
    startDate: '',
    endDate: '',
  };

  skills = this.portfolioService.getSkills;
  projects = this.portfolioService.getProjects;
  experience = this.portfolioService.getExperience;
  selectedTheme = this.portfolioService.selectedTheme.asReadonly();
  isUsingDefaultThemeFallback = this.portfolioService.isUsingDefaultThemeFallback.asReadonly();
  profileSlug = signal('');
  publicPortfolioUrl = signal('');
  themeSaving = signal(false);
  premiumGalleryUploading = signal(false);
  platformMessageSending = signal(false);
  premiumGallery = this.portfolioService.getPremiumGallery;
  platformContactForm = {
    name: '',
    email: '',
    message: '',
  };
  premiumGalleryForm = {
    title: '',
    altText: '',
  };
  private selectedPremiumGalleryFile: File | null = null;

  currentStep = computed(() => this.wizardSteps[this.activeStep()]);

  constructor() {
    effect(() => {
      this.portfolioService.loadPortfolio(this.authService.admin()?.profile?.slug);
    });

    effect(() => {
      const slug = this.authService.admin()?.profile?.slug?.trim() || '';

      this.profileSlug.set(slug);

      if (typeof window === 'undefined') {
        this.publicPortfolioUrl.set(slug ? `/${slug}` : '');
        return;
      }

      this.publicPortfolioUrl.set(slug ? `${window.location.origin}/${slug}` : '');
    });

    effect(() => {
      const slug = this.authService.admin()?.profile?.slug?.trim() || '';
      void this.portfolioService.loadPremiumGallery(slug);
    });

    effect(() => {
      this.aboutForm = { ...this.portfolioService.about() };
      this.contactForm = { ...this.portfolioService.contact() };
    });

    effect(() => {
      const admin = this.authService.admin();
      this.platformContactForm = {
        name: admin?.name ?? '',
        email: admin?.email ?? '',
        message: this.platformContactForm.message,
      };
    });
  }

  setActivePanel(panel: AdminPanel) {
    this.activePanel.set(panel);
    this.status.set(null);
    this.error.set(null);
    this.closeSidebar();
  }

  openCreatePanelAt(stepIndex: number) {
    this.activePanel.set('create');
    const nextStep = this.showRoadmap() ? stepIndex : Math.max(1, stepIndex);
    this.activeStep.set(Math.max(0, Math.min(nextStep, this.wizardSteps.length - 1)));
    this.closeSidebar();
  }

  setActiveStep(stepIndex: number) {
    this.activeStep.set(Math.max(0, Math.min(stepIndex, this.wizardSteps.length - 1)));
  }

  startSetupFromRoadmap() {
    this.dismissRoadmap();
    this.setActiveStep(1);
  }

  openRoadmapStep(stepIndex: number) {
    this.dismissRoadmap();
    this.setActiveStep(stepIndex);
  }

  goToNextStep() {
    this.setActiveStep(this.activeStep() + 1);
  }

  goToPreviousStep() {
    this.setActiveStep(this.activeStep() - 1);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  isStepComplete(stepIndex: number) {
    return this.getStepCompletion(stepIndex);
  }

  refresh() {
    this.portfolioService.loadPortfolio(this.authService.admin()?.profile?.slug);
    this.hydrateForms();
    this.setStatus('Portfolio refreshed.');
  }

  openPortfolio() {
    const url = this.publicPortfolioUrl();
    if (!url || typeof window === 'undefined') {
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openResume() {
    const slug = this.profileSlug().trim();
    void this.router.navigateByUrl(slug ? `/${slug}/resume` : '/resume');
    this.closeSidebar();
  }

  async copyPortfolioUrl() {
    const url = this.publicPortfolioUrl();
    if (!url || typeof navigator === 'undefined' || !navigator.clipboard) {
      this.error.set('Unable to copy portfolio URL on this device.');
      return;
    }

    await navigator.clipboard.writeText(url);
    this.setStatus('Portfolio URL copied.');
  }

  async sendPlatformMessage() {
    this.error.set(null);

    if (!isEmailJsConfigured()) {
      this.error.set('Platform contact is not configured yet.');
      return;
    }

    if (!this.platformContactForm.name.trim() || !this.platformContactForm.email.trim() || !this.platformContactForm.message.trim()) {
      this.error.set('Please complete name, email and message before sending.');
      return;
    }

    this.platformMessageSending.set(true);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: {
            to_email: EMAILJS_CONFIG.recipientEmail,
            to_name: 'Platform Team',
            from_name: this.platformContactForm.name,
            from_email: this.platformContactForm.email,
            reply_to: this.platformContactForm.email,
            subject: `Admin support request from ${this.platformContactForm.name}`,
            message: this.platformContactForm.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send support request right now.');
      }

      this.platformContactForm = {
        name: this.authService.admin()?.name ?? '',
        email: this.authService.admin()?.email ?? '',
        message: '',
      };
      this.setStatus('Message sent to the platform team.');
    } catch (error: any) {
      this.error.set(error.message ?? 'Unable to send support request.');
    } finally {
      this.platformMessageSending.set(false);
    }
  }

  async saveAbout(continueToNextStep = false) {
    const errors = this.validateAbout();
    if (errors) {
      return false;
    }

    const success = await this.runAction(async () => {
      await this.portfolioService.updateAbout(this.aboutForm, this.authService.authHeaders());
      this.setStatus('About section updated.');
    });

    if (success && continueToNextStep) {
      this.goToNextStep();
    }

    return success;
  }

  async saveContact(continueToNextStep = false) {
    const errors = this.validateContact();
    if (errors) {
      return false;
    }

    const success = await this.runAction(async () => {
      await this.portfolioService.updateContact(this.contactForm, this.authService.authHeaders());
      this.setStatus('Contact section updated.');
    });

    if (success && continueToNextStep) {
      this.goToNextStep();
    }

    return success;
  }

  async saveTheme(theme: PortfolioTheme) {
    if (theme === this.selectedTheme()) {
      this.setStatus('Theme already active.');
      return true;
    }

    const slug = this.authService.getCurrentSlug();
    if (!slug) {
      this.error.set('Logged-in profile slug not available.');
      return false;
    }

    this.themeSaving.set(true);
    try {
      this.error.set(null);
      await this.portfolioService.updateTheme(slug, theme, this.authService.authHeaders());
      this.setStatus(`Theme updated to ${theme}.`);
      return true;
    } catch (error: any) {
      this.error.set(error.message ?? 'Unable to update theme.');
      return false;
    } finally {
      this.themeSaving.set(false);
    }
  }

  onPremiumGalleryFileSelected(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.selectedPremiumGalleryFile = input?.files?.[0] ?? null;
    this.error.set(null);
  }

  resetPremiumGalleryForm() {
    this.premiumGalleryForm = {
      title: '',
      altText: '',
    };
    this.selectedPremiumGalleryFile = null;
  }

  async savePremiumGalleryImage() {
    const slug = this.authService.getCurrentSlug();
    if (!slug) {
      this.error.set('Logged-in profile slug not available.');
      return false;
    }

    if (!this.selectedPremiumGalleryFile) {
      this.error.set('Please choose an image before uploading.');
      return false;
    }

    this.premiumGalleryUploading.set(true);

    try {
      this.error.set(null);
      const imageUrl = await this.portfolioService.uploadPremiumGalleryImageToCloudinary(this.selectedPremiumGalleryFile, {
        slug,
        title: this.premiumGalleryForm.title.trim(),
        altText: this.premiumGalleryForm.altText.trim(),
      });
      await this.portfolioService.createPremiumGalleryItem(
        slug,
        {
          imageUrl,
          title: this.premiumGalleryForm.title.trim(),
          altText: this.premiumGalleryForm.altText.trim(),
        },
      );
      this.resetPremiumGalleryForm();
      this.setStatus('Premium gallery image uploaded to Cloudinary.');
      return true;
    } catch (error: any) {
      this.error.set(error?.message ?? 'Unable to upload premium gallery image.');
      return false;
    } finally {
      this.premiumGalleryUploading.set(false);
    }
  }

  async deletePremiumGalleryImage(imageId: string | number) {
    const slug = this.authService.getCurrentSlug();
    if (!slug) {
      this.error.set('Logged-in profile slug not available.');
      return false;
    }

    return this.runAction(async () => {
      await this.portfolioService.deletePremiumGalleryItem(slug, imageId, this.authService.authHeaders());
      this.setStatus('Premium gallery image deleted.');
    });
  }

  editSkill(skill: Skill) {
    this.editingSkillId.set(skill.id);
    this.skillForm = { name: skill.name, category: skill.category, level: skill.level };
    this.clearValidationGroup('skill.');
  }

  resetSkillForm() {
    this.editingSkillId.set(null);
    this.skillForm = { name: '', category: 'frontend', level: 80 };
    this.clearValidationGroup('skill.');
  }

  async saveSkill() {
    const errors = this.validateSkill();
    if (errors) {
      return false;
    }

    return this.runAction(async () => {
      if (this.editingSkillId()) {
        await this.portfolioService.updateSkill(
          this.editingSkillId()!,
          this.skillForm,
          this.authService.authHeaders()
        );
        this.setStatus('Skill updated.');
      } else {
        await this.portfolioService.createSkill(this.skillForm, this.authService.authHeaders());
        this.setStatus('Skill added.');
      }
      this.resetSkillForm();
    });
  }

  async deleteSkill(id: string | number) {
    await this.runAction(async () => {
      await this.portfolioService.deleteSkill(id, this.authService.authHeaders());
      this.setStatus('Skill deleted.');
      if (this.editingSkillId() === id) {
        this.resetSkillForm();
      }
    });
  }

  editProject(project: Project) {
    this.editingProjectId.set(project.id);
    this.projectForm = {
      title: project.title,
      description: project.description,
      image: project.image,
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      technologies: project.technologies.join(', '),
      featured: project.featured,
    };
    this.clearValidationGroup('project.');
  }

  resetProjectForm() {
    this.editingProjectId.set(null);
    this.projectForm = {
      title: '',
      description: '',
      image: '',
      liveLink: '',
      githubLink: '',
      technologies: '',
      featured: false,
    };
    this.clearValidationGroup('project.');
  }

  async saveProject() {
    const payload = {
      ...this.projectForm,
      technologies: this.projectForm.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    const errors = this.validateProject(payload.technologies);
    if (errors) {
      return false;
    }

    return this.runAction(async () => {
      if (this.editingProjectId()) {
        await this.portfolioService.updateProject(
          this.editingProjectId()!,
          payload,
          this.authService.authHeaders()
        );
        this.setStatus('Project updated.');
      } else {
        await this.portfolioService.createProject(payload, this.authService.authHeaders());
        this.setStatus('Project added.');
      }
      this.resetProjectForm();
    });
  }

  async deleteProject(id: string | number) {
    await this.runAction(async () => {
      await this.portfolioService.deleteProject(id, this.authService.authHeaders());
      this.setStatus('Project deleted.');
      if (this.editingProjectId() === id) {
        this.resetProjectForm();
      }
    });
  }

  editExperience(item: Experience) {
    this.editingExperienceId.set(item.id);
    this.experienceForm = {
      company: item.company,
      position: item.position,
      duration: item.duration,
      description: item.description,
      startDate: item.startDate ? item.startDate.slice(0, 10) : '',
      endDate: item.endDate ? item.endDate.slice(0, 10) : '',
    };
    this.clearValidationGroup('experience.');
  }

  resetExperienceForm() {
    this.editingExperienceId.set(null);
    this.experienceForm = {
      company: '',
      position: '',
      duration: '',
      description: '',
      startDate: '',
      endDate: '',
    };
    this.clearValidationGroup('experience.');
  }

  async saveExperience() {
    const errors = this.validateExperience();
    if (errors) {
      return false;
    }

    return this.runAction(async () => {
      if (this.editingExperienceId()) {
        await this.portfolioService.updateExperience(
          this.editingExperienceId()!,
          this.experienceForm,
          this.authService.authHeaders()
        );
        this.setStatus('Experience updated.');
      } else {
        await this.portfolioService.createExperience(
          this.experienceForm,
          this.authService.authHeaders()
        );
        this.setStatus('Experience added.');
      }
      this.resetExperienceForm();
    });
  }

  async deleteExperience(id: string | number) {
    await this.runAction(async () => {
      await this.portfolioService.deleteExperience(id, this.authService.authHeaders());
      this.setStatus('Experience deleted.');
      if (this.editingExperienceId() === id) {
        this.resetExperienceForm();
      }
    });
  }

  hasValidationError(key: string) {
    return Boolean(this.validationErrors()[key]);
  }

  clearValidationError(key: string) {
    this.validationErrors.update((errors) => {
      if (!errors[key]) {
        return errors;
      }

      const next = { ...errors };
      delete next[key];
      return next;
    });
    this.error.set(null);
  }

  private clearValidationGroup(prefix: string) {
    this.validationErrors.update((errors) => {
      const next = { ...errors };
      for (const key of Object.keys(next)) {
        if (key.startsWith(prefix)) {
          delete next[key];
        }
      }
      return next;
    });
  }

  private hydrateForms() {
    this.aboutForm = { ...this.portfolioService.about() };
    this.contactForm = { ...this.portfolioService.contact() };
  }

  private dismissRoadmap() {
    this.showRoadmap.set(false);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('upskillr_admin_roadmap_seen', 'true');
    }
  }

  private setStatus(message: string) {
    this.status.set(message);
    this.error.set(null);
  }

  private setValidationErrors(errors: ValidationErrors) {
    this.validationErrors.set(errors);
    this.error.set('Please fix the highlighted fields.');
    return true;
  }

  private getStepCompletion(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return !this.showRoadmap();
      case 1:
        return (
          this.aboutForm.bio.trim().length >= 20 &&
          this.aboutForm.description.trim().length >= 30 &&
          this.aboutForm.yearsExperience >= 0 &&
          this.aboutForm.yearsExperience <= 50
        );
      case 2:
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactForm.email.trim()) &&
          this.contactForm.phone.trim().length >= 7 &&
          Boolean(this.contactForm.location.trim())
        );
      case 3:
        return this.skills().length > 0;
      case 4:
        return this.projects().length > 0;
      case 5:
        return this.experience().length > 0;
      case 6:
        return Boolean(this.publicPortfolioUrl());
      default:
        return false;
    }
  }

  private validateAbout() {
    const errors: ValidationErrors = {};

    if (!this.aboutForm.bio.trim()) {
      errors['about.bio'] = 'Bio is required.';
    } else if (this.aboutForm.bio.trim().length < 20) {
      errors['about.bio'] = 'Bio must be at least 20 characters.';
    }

    if (!this.aboutForm.description.trim()) {
      errors['about.description'] = 'Description is required.';
    } else if (this.aboutForm.description.trim().length < 30) {
      errors['about.description'] = 'Description must be at least 30 characters.';
    }

    if (this.aboutForm.yearsExperience < 0 || this.aboutForm.yearsExperience > 50) {
      errors['about.yearsExperience'] = 'Years of experience must be between 0 and 50.';
    }

    return Object.keys(errors).length ? this.setValidationErrors(errors) : false;
  }

  private validateContact() {
    const errors: ValidationErrors = {};
    const email = this.contactForm.email.trim();
    const phone = this.contactForm.phone.trim();
    const location = this.contactForm.location.trim();

    if (!email) {
      errors['contact.email'] = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors['contact.email'] = 'Enter a valid email address.';
    }

    if (!phone) {
      errors['contact.phone'] = 'Phone is required.';
    } else if (phone.length < 7) {
      errors['contact.phone'] = 'Phone number looks too short.';
    }

    if (!location) {
      errors['contact.location'] = 'Location is required.';
    }

    const socialUrlFields: Array<keyof ContactData> = [
      'github',
      'linkedin',
      'medium',
      'tableau',
      'leetcode',
      'instagram',
      'youtube',
      'portfolio',
    ];

    for (const field of socialUrlFields) {
      const value = this.contactForm[field]?.trim();
      if (value && !this.isValidUrl(value)) {
        errors[`contact.${field}`] = 'Enter a valid URL.';
      }
    }

    return Object.keys(errors).length ? this.setValidationErrors(errors) : false;
  }

  private validateSkill() {
    const errors: ValidationErrors = {};

    if (!this.skillForm.name.trim()) {
      errors['skill.name'] = 'Skill name is required.';
    }

    if (!this.skillForm.category) {
      errors['skill.category'] = 'Select a category.';
    }

    if (this.skillForm.level < 0 || this.skillForm.level > 100) {
      errors['skill.level'] = 'Level must be between 0 and 100.';
    }

    return Object.keys(errors).length ? this.setValidationErrors(errors) : false;
  }

  private validateProject(technologies: string[]) {
    const errors: ValidationErrors = {};

    if (!this.projectForm.title.trim()) {
      errors['project.title'] = 'Project title is required.';
    }

    if (!this.projectForm.description.trim()) {
      errors['project.description'] = 'Project description is required.';
    } else if (this.projectForm.description.trim().length < 20) {
      errors['project.description'] = 'Description must be at least 20 characters.';
    }

    if (this.projectForm.image.trim() && !this.isValidUrl(this.projectForm.image)) {
      errors['project.image'] = 'Enter a valid image URL.';
    }

    if (this.projectForm.liveLink.trim() && !this.isValidUrl(this.projectForm.liveLink)) {
      errors['project.liveLink'] = 'Enter a valid live URL.';
    }

    if (this.projectForm.githubLink.trim() && !this.isValidUrl(this.projectForm.githubLink)) {
      errors['project.githubLink'] = 'Enter a valid GitHub URL.';
    }

    if (!technologies.length) {
      errors['project.technologies'] = 'Add at least one technology.';
    }

    return Object.keys(errors).length ? this.setValidationErrors(errors) : false;
  }

  private validateExperience() {
    const errors: ValidationErrors = {};

    if (!this.experienceForm.company.trim()) {
      errors['experience.company'] = 'Company is required.';
    }

    if (!this.experienceForm.position.trim()) {
      errors['experience.position'] = 'Position is required.';
    }

    if (!this.experienceForm.duration.trim()) {
      errors['experience.duration'] = 'Duration is required.';
    }

    if (!this.experienceForm.description.trim()) {
      errors['experience.description'] = 'Description is required.';
    } else if (this.experienceForm.description.trim().length < 20) {
      errors['experience.description'] = 'Description must be at least 20 characters.';
    }

    if (!this.experienceForm.startDate) {
      errors['experience.startDate'] = 'Start date is required.';
    }

    if (
      this.experienceForm.endDate &&
      this.experienceForm.startDate &&
      this.experienceForm.endDate < this.experienceForm.startDate
    ) {
      errors['experience.endDate'] = 'End date cannot be before start date.';
    }

    return Object.keys(errors).length ? this.setValidationErrors(errors) : false;
  }

  private isValidUrl(value: string) {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  private hasSeenRoadmap() {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    return localStorage.getItem('upskillr_admin_roadmap_seen') === 'true';
  }

  private async runAction(action: () => Promise<void>) {
    try {
      this.error.set(null);
      await action();
      this.validationErrors.set({});
      this.hydrateForms();
      return true;
    } catch (error: any) {
      this.error.set(error.message ?? 'Something went wrong.');
      return false;
    }
  }
}
