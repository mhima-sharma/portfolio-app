import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="landing-shell">
      <div class="ambient-layer">
        <div class="ambient-orb ambient-orb-left"></div>
        <div class="ambient-orb ambient-orb-right"></div>
        <div class="ambient-orb ambient-orb-bottom"></div>
        <div class="ambient-ray ambient-ray-left"></div>
        <div class="ambient-ray ambient-ray-right"></div>
        <div class="grid-mask"></div>
        <div class="noise-mask"></div>
        <div
          class="cursor-glow"
          [style.left.px]="cursorX - 180"
          [style.top.px]="cursorY - 180"
          [style.opacity]="showCursorGlow ? 1 : 0"
        ></div>
        <span
          *ngFor="let particle of particles; let i = index"
          class="particle"
          [style.left.%]="particle.left"
          [style.top.%]="particle.top"
          [style.animationDelay.s]="i * 0.35"
          [style.animationDuration.s]="particle.duration"
        ></span>
      </div>

      <div class="relative z-10">
        <nav class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div class="glass-nav">
            <a class="brand-mark" href="#top" aria-label="CareerFlow home">
              <div class="brand-icon">
                <img class="brand-icon-image" src="/assets/logo.png" alt="" />
              </div>
              <div>
                <p class="brand-name">CareerFlow</p>
                <p class="brand-subtitle">Build Your Career Identity</p>
              </div>
            </a>

            <div class="nav-links">
              <a href="#features">Features</a>
              <a href="#showcase">Templates</a>
              <a href="#pricing">Pricing</a>
              <a href="#resources">Resources</a>
            </div>

            <div class="nav-actions">
              <a routerLink="/admin/login" class="button button-ghost nav-button nav-button-secondary">
                Login
              </a>
              <a routerLink="/admin/signup" class="button button-primary nav-button nav-button-primary">
                Get Started
              </a>
            </div>
          </div>
        </nav>

        <main id="top">
          <section class="hero-section">
            <div class="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
              <div class="hero-copy">
                <div class="hero-pill reveal reveal-visible">
                  <span class="hero-pill-dot"></span>
                  No-code portfolio and resume builder
                </div>

                <div class="space-y-6">
                  <h1 class="hero-title reveal reveal-visible reveal-delay-1">
                    Build Your
                    <span class="gradient-text">Career Identity</span>
                  </h1>
                  <p class="hero-description reveal reveal-visible reveal-delay-2">
                    Create a professional portfolio and resume in minutes by filling your
                    details, selecting a theme, and publishing instantly - no coding required.
                  </p>
                </div>

                <div class="hero-actions reveal reveal-visible reveal-delay-3">
                  <a routerLink="/admin/signup" class="button button-primary button-large">
                    Create Portfolio
                  </a>
                  <a href="#showcase" class="button button-glass button-large">
                    Explore Themes
                  </a>
                </div>

                <div class="hero-proof reveal reveal-visible reveal-delay-4">
                  <div class="proof-avatars" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>
                    Trusted by students, developers, designers, and freelancers.
                  </p>
                </div>

                <div class="metrics-grid reveal reveal-visible reveal-delay-4" data-stats>
                  <article class="metric-card" *ngFor="let metric of liveMetrics">
                    <p class="metric-value">{{ metric.value }}{{ metric.suffix }}</p>
                    <p class="metric-label">{{ metric.label }}</p>
                  </article>
                </div>
              </div>

              <div class="dashboard-stage reveal reveal-visible reveal-delay-3">
                <div class="dashboard-glow"></div>
                <div class="dashboard-rays"></div>

                <div class="hero-floating-card hero-floating-card-left">
                  <p class="eyebrow">Resume</p>
                  <h3>Ready</h3>
                  <span>Formatted in a single step</span>
                </div>

                <div class="hero-floating-card hero-floating-card-right">
                  <p class="eyebrow">Themes</p>
                  <h3>Premium</h3>
                  <span>Designed for a polished first impression</span>
                </div>

                <div class="dashboard-shell">
                  <div class="dashboard-header">
                    <div class="dashboard-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="dashboard-search">careerflow.app/alexmorgan</div>
                    <div class="dashboard-badge">Live</div>
                  </div>

                  <div class="dashboard-body">
                    <aside class="dashboard-sidebar">
                      <div class="sidebar-brand">
                        <div class="sidebar-brand-icon"></div>
                        <div>
                          <p>CareerFlow</p>
                          <span>Professional workspace</span>
                        </div>
                      </div>

                      <div class="sidebar-menu">
                        <div class="sidebar-menu-item sidebar-menu-item-active">
                          Overview
                        </div>
                        <div class="sidebar-menu-item">Portfolio</div>
                        <div class="sidebar-menu-item">Resume</div>
                        <div class="sidebar-menu-item">Insights</div>
                      </div>

                      <div class="theme-panel">
                        <div class="theme-panel-head">
                          <p>Theme Settings</p>
                          <span>Saved</span>
                        </div>
                        <div class="theme-swatches">
                          <span class="swatch swatch-blue"></span>
                          <span class="swatch swatch-cyan"></span>
                          <span class="swatch swatch-violet"></span>
                          <span class="swatch swatch-slate"></span>
                        </div>
                        <div class="theme-slider">
                          <div class="theme-slider-track">
                            <span></span>
                          </div>
                          <div class="theme-slider-track theme-slider-track-soft">
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </aside>

                    <section class="dashboard-main">
                      <div class="dashboard-top-grid">
                        <article class="analytics-card analytics-card-primary">
                          <div class="analytics-card-head">
                            <div>
                              <p>Portfolio Views</p>
                              <h3>24.8K</h3>
                            </div>
                            <span>+12.6%</span>
                          </div>
                          <div class="wave-chart">
                            <span *ngFor="let bar of chartBars" [style.height.%]="bar"></span>
                          </div>
                        </article>

                        <article class="analytics-card">
                          <p class="analytics-title">Profile Visits</p>
                          <div class="stat-stack">
                            <h3>862</h3>
                            <span>94 visits this week</span>
                          </div>
                          <div class="mini-progress">
                            <div class="mini-progress-fill"></div>
                          </div>
                        </article>
                      </div>

                      <div class="dashboard-lower-grid">
                        <article class="glass-panel profile-panel">
                          <div class="profile-card">
                            <div class="profile-avatar">AM</div>
                            <div>
                              <p class="profile-name">Alex Morgan</p>
                              <span class="profile-role">Product Designer</span>
                            </div>
                          </div>

                          <div class="profile-stats">
                            <div>
                              <p>Theme</p>
                              <strong>Minimal</strong>
                            </div>
                            <div>
                              <p>Resume</p>
                              <strong>Live</strong>
                            </div>
                            <div>
                              <p>Link</p>
                              <strong>Custom</strong>
                            </div>
                          </div>
                        </article>

                        <article class="glass-panel activity-panel">
                          <div class="panel-head">
                            <p>Audience Activity</p>
                            <span>Updated hourly</span>
                          </div>
                          <div class="activity-chart">
                            <span *ngFor="let line of activityBars" [style.height.%]="line"></span>
                          </div>
                        </article>

                        <article class="glass-panel updates-panel">
                          <div class="panel-head">
                            <p>Recent Updates</p>
                            <span>Workspace activity</span>
                          </div>
                          <div class="update-row" *ngFor="let update of updates">
                            <div class="update-bullet"></div>
                            <div>
                              <strong>{{ update.title }}</strong>
                              <span>{{ update.detail }}</span>
                            </div>
                          </div>
                        </article>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="trust-strip">
            <div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
              <p class="trust-label">Designed for a clean, credible, and modern professional presence.</p>
              <div class="trust-logos">
                <span>Fast setup</span>
                <span>Professional themes</span>
                <span>Resume-ready</span>
                <span>Responsive layouts</span>
                <span>Shareable links</span>
              </div>
            </div>
          </section>

          <section id="features" class="content-section">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div #scrollReveal class="section-heading reveal">
                <span class="section-kicker">Features</span>
                <h2>Everything you need to present your work with clarity and confidence.</h2>
                <p>
                  CareerFlow brings portfolio creation, resume generation, and personal branding
                  into one streamlined workspace.
                </p>
              </div>

              <div class="feature-grid">
                <article #scrollReveal class="feature-card reveal" *ngFor="let feature of features">
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </article>
              </div>
            </div>
          </section>

          <section id="resources" class="content-section content-section-tight">
            <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
              <div #scrollReveal class="section-heading reveal section-heading-left">
                <span class="section-kicker">How It Works</span>
                <h2>Create Your Portfolio in 3 Simple Steps</h2>
                <p>
                  From profile details to a live portfolio, CareerFlow keeps the process
                  simple, structured, and ready to share.
                </p>
              </div>

              <div #scrollReveal class="workflow-stack reveal">
                <article class="workflow-card" *ngFor="let step of workflow">
                  <div class="workflow-index">{{ step.index }}</div>
                  <div>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.description }}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="showcase" class="content-section">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div #scrollReveal class="section-heading reveal">
                <span class="section-kicker">Templates</span>
                <h2>Professionally Designed Portfolio Themes</h2>
                <p>
                  Choose from modern, responsive, and industry-focused portfolio designs.
                </p>
              </div>

              <div class="showcase-grid">
                <article #scrollReveal class="showcase-card reveal" *ngFor="let theme of themes">
                  <div class="showcase-preview" [ngClass]="theme.previewClass">
                    <div class="showcase-window">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="showcase-layout">
                      <div class="showcase-title-block"></div>
                      <div class="showcase-line"></div>
                      <div class="showcase-line showcase-line-short"></div>
                      <div class="showcase-pills">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div class="showcase-copy">
                    <div>
                      <p class="showcase-label">{{ theme.label }}</p>
                      <h3>{{ theme.title }}</h3>
                    </div>
                    <p>{{ theme.description }}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section class="content-section content-section-tight">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="testimonial-shell">
                <div #scrollReveal class="section-heading reveal section-heading-left">
                  <span class="section-kicker">Testimonials</span>
                  <h2>Built for Modern Professionals</h2>
                  <p>
                    Professionals choose CareerFlow when they need a personal website that
                    feels credible, refined, and easy to maintain.
                  </p>
                </div>

                <div class="testimonial-grid">
                  <article #scrollReveal class="testimonial-card reveal" *ngFor="let testimonial of testimonials">
                    <div class="stars">★★★★★</div>
                    <p>{{ testimonial.quote }}</p>
                    <div class="testimonial-author">
                      <div class="testimonial-avatar">{{ testimonial.initials }}</div>
                      <div>
                        <strong>{{ testimonial.name }}</strong>
                        <span>{{ testimonial.role }}</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" class="cta-section">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div #scrollReveal class="cta-card reveal">
                <span class="section-kicker">Pricing</span>
                <h2>Simple Pricing for Every Stage</h2>
                <p>
                  Start with the free builder, or choose a custom solution if you need a
                  personalized portfolio, resume, or full website.
                </p>
                <div class="pricing-grid">
                  <article class="pricing-plan" *ngFor="let plan of getPricingPlans()">
                    <p class="pricing-plan-name">{{ plan.name }}</p>
                    <h3 class="pricing-plan-price">{{ plan.price }}</h3>
                    <p class="pricing-plan-description">{{ plan.description }}</p>
                  </article>
                </div>
                <p class="cta-subtext">
                  CareerFlow helps you build a professional online presence with beautifully
                  designed portfolios and resumes.
                </p>
                <div class="hero-actions hero-actions-centered">
                  <a routerLink="/admin/signup" class="button button-primary button-large">
                    Create Portfolio
                  </a>
                  <a routerLink="/admin/login" class="button button-glass button-large">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(96, 165, 250, 0.30), transparent 30%),
        radial-gradient(circle at top right, rgba(168, 85, 247, 0.18), transparent 28%),
        radial-gradient(circle at bottom center, rgba(37, 99, 235, 0.16), transparent 32%),
        linear-gradient(180deg, #f8fbff 0%, #eef4ff 42%, #f8fafc 100%);
      color: #0f172a;
      overflow-x: hidden;
    }

    .landing-shell {
      position: relative;
      min-height: 100vh;
    }

    .ambient-layer {
      position: fixed;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .ambient-orb,
    .ambient-ray,
    .cursor-glow,
    .particle,
    .noise-mask,
    .grid-mask {
      position: absolute;
    }

    .ambient-orb {
      border-radius: 999px;
      filter: blur(70px);
      animation: drift 18s ease-in-out infinite;
      opacity: 0.85;
    }

    .ambient-orb-left {
      top: -12rem;
      left: -8rem;
      width: 30rem;
      height: 30rem;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.42), rgba(96, 165, 250, 0));
    }

    .ambient-orb-right {
      top: 10rem;
      right: -10rem;
      width: 34rem;
      height: 34rem;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.18), rgba(168, 85, 247, 0));
      animation-delay: -6s;
    }

    .ambient-orb-bottom {
      bottom: -12rem;
      left: 32%;
      width: 36rem;
      height: 36rem;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.22), rgba(37, 99, 235, 0));
      animation-delay: -10s;
    }

    .ambient-ray {
      top: -15%;
      width: 34rem;
      height: 52rem;
      opacity: 0.5;
      filter: blur(8px);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));
      transform: rotate(18deg);
    }

    .ambient-ray-left {
      left: 54%;
    }

    .ambient-ray-right {
      right: 3%;
      transform: rotate(-12deg);
      opacity: 0.35;
    }

    .grid-mask {
      inset: 0;
      opacity: 0.23;
      background-image:
        linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
      background-size: 80px 80px;
      mask-image: radial-gradient(circle at center, black 42%, transparent 88%);
    }

    .noise-mask {
      inset: 0;
      opacity: 0.08;
      background-image:
        radial-gradient(circle at 25% 25%, rgba(15, 23, 42, 0.18) 0 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(15, 23, 42, 0.14) 0 1px, transparent 1px);
      background-size: 18px 18px;
      mix-blend-mode: multiply;
    }

    .cursor-glow {
      width: 22rem;
      height: 22rem;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.18), rgba(96, 165, 250, 0));
      filter: blur(22px);
      transition: opacity 220ms ease;
    }

    .particle {
      width: 5px;
      height: 5px;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(96, 165, 250, 0.1));
      box-shadow: 0 0 24px rgba(96, 165, 250, 0.55);
      animation: particle-float linear infinite;
    }

    .glass-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      padding: 1rem 1.15rem 1rem 1.35rem;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.52);
      box-shadow:
        0 24px 60px rgba(15, 23, 42, 0.10),
        inset 0 1px 0 rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    .brand-mark,
    .nav-links a,
    .button {
      text-decoration: none;
    }

    .brand-mark {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      min-width: 0;
    }

    .brand-icon {
      position: relative;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 1rem;
      border: 1px solid rgba(191, 219, 254, 0.95);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(239, 246, 255, 0.9));
      box-shadow:
        0 14px 28px rgba(37, 99, 235, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
      overflow: hidden;
    }

    .brand-icon-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 24%;
      transform: scale(1.06);
    }

    .brand-name {
      margin: 0;
      font-size: 1rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
    }

    .brand-subtitle {
      margin: 0.1rem 0 0;
      font-size: 0.72rem;
      color: rgba(51, 65, 85, 0.78);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    .nav-links a {
      color: rgba(15, 23, 42, 0.76);
      font-size: 0.95rem;
      font-weight: 600;
      transition: color 180ms ease, transform 180ms ease;
    }

    .nav-links a:hover {
      color: #0f172a;
      transform: translateY(-1px);
    }

    .nav-actions,
    .hero-actions,
    .trust-logos,
    .showcase-grid,
    .testimonial-grid,
    .feature-grid {
      display: flex;
    }

    .nav-actions {
      align-items: center;
      gap: 0.9rem;
      padding: 0.22rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.34);
      border: 1px solid rgba(255, 255, 255, 0.46);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    .button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      border-radius: 999px;
      font-weight: 700;
      letter-spacing: -0.02em;
      transition:
        transform 220ms ease,
        box-shadow 220ms ease,
        border-color 220ms ease,
        background 220ms ease,
        color 220ms ease;
      cursor: pointer;
    }

    .button:hover {
      transform: translateY(-2px);
    }

    .nav-button {
      min-height: 3rem;
      padding: 0.78rem 1.35rem;
      font-size: 0.98rem;
      font-weight: 800;
      line-height: 1;
      white-space: nowrap;
    }

    .button-primary {
      padding: 0.9rem 1.35rem;
      color: white;
      border: 1px solid rgba(96, 165, 250, 0.55);
      background: linear-gradient(135deg, #2563eb 0%, #60a5fa 55%, #7c3aed 100%);
      box-shadow:
        0 18px 40px rgba(37, 99, 235, 0.28),
        0 0 36px rgba(96, 165, 250, 0.26);
    }

    .button-primary:hover {
      box-shadow:
        0 22px 48px rgba(37, 99, 235, 0.34),
        0 0 48px rgba(96, 165, 250, 0.32);
    }

    .button-ghost,
    .button-glass {
      color: #0f172a;
      border: 1px solid rgba(148, 163, 184, 0.35);
      background: rgba(255, 255, 255, 0.48);
      backdrop-filter: blur(18px);
    }

    .button-ghost:hover,
    .button-glass:hover {
      border-color: rgba(96, 165, 250, 0.45);
      background: rgba(255, 255, 255, 0.68);
      box-shadow: 0 16px 28px rgba(15, 23, 42, 0.08);
    }

    .button-large {
      padding: 1rem 1.6rem;
      font-size: 1rem;
    }

    .nav-button-secondary {
      color: #0f172a;
      border: 1px solid rgba(203, 213, 225, 0.95);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.9));
      box-shadow:
        0 8px 20px rgba(15, 23, 42, 0.07),
        inset 0 1px 0 rgba(255, 255, 255, 0.95);
    }

    .nav-button-secondary:hover {
      color: #020617;
      border-color: rgba(148, 163, 184, 0.95);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(248, 250, 252, 0.96));
      box-shadow:
        0 12px 26px rgba(15, 23, 42, 0.10),
        inset 0 1px 0 rgba(255, 255, 255, 1);
    }

    .nav-button-primary {
      padding-inline: 1.7rem;
      border: 1px solid rgba(96, 165, 250, 0.42);
      background: linear-gradient(135deg, #3b82f6 0%, #4f8df7 36%, #7c3aed 100%);
      box-shadow:
        0 16px 36px rgba(59, 130, 246, 0.26),
        0 0 34px rgba(124, 58, 237, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.28);
    }

    .nav-button-primary:hover {
      box-shadow:
        0 20px 42px rgba(59, 130, 246, 0.32),
        0 0 40px rgba(124, 58, 237, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .hero-section {
      padding: 6.8rem 0 5rem;
    }

    .hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.7rem;
      padding-top: 2.75rem;
    }

    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      align-self: flex-start;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(191, 219, 254, 0.9);
      background: rgba(255, 255, 255, 0.64);
      box-shadow: 0 16px 40px rgba(148, 163, 184, 0.12);
      color: #1e3a8a;
      font-size: 0.9rem;
      font-weight: 700;
    }

    .hero-pill-dot {
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #38bdf8, #8b5cf6);
      box-shadow: 0 0 16px rgba(96, 165, 250, 0.7);
    }

    .hero-title {
      margin: 0;
      max-width: 10.5ch;
      font-size: clamp(3.6rem, 7vw, 6.4rem);
      line-height: 0.95;
      letter-spacing: -0.07em;
      font-weight: 900;
      color: #0f172a;
    }

    .gradient-text {
      display: inline-block;
      background: linear-gradient(120deg, #1d4ed8 0%, #60a5fa 45%, #8b5cf6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 12px 30px rgba(96, 165, 250, 0.24));
    }

    .hero-description,
    .section-heading p,
    .workflow-card p,
    .showcase-copy p,
    .testimonial-card p,
    .cta-card p {
      margin: 0;
      color: rgba(51, 65, 85, 0.88);
      line-height: 1.8;
      font-size: 1.04rem;
    }

    .hero-description {
      max-width: 41rem;
    }

    .hero-actions {
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .hero-actions-centered {
      justify-content: center;
    }

    .hero-proof {
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 38rem;
    }

    .hero-proof p,
    .trust-label {
      margin: 0;
      color: rgba(51, 65, 85, 0.82);
      font-size: 0.98rem;
      line-height: 1.7;
    }

    .proof-avatars {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .proof-avatars span,
    .testimonial-avatar,
    .profile-avatar {
      display: grid;
      place-items: center;
      border-radius: 999px;
      color: white;
      font-weight: 700;
    }

    .proof-avatars span {
      width: 2.5rem;
      height: 2.5rem;
      border: 2px solid rgba(255, 255, 255, 0.85);
      margin-left: -0.65rem;
      background: linear-gradient(135deg, #1d4ed8, #8b5cf6);
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.18);
    }

    .proof-avatars span:first-child {
      margin-left: 0;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 0.35rem;
    }

    .metric-card,
    .feature-card,
    .showcase-card,
    .workflow-card,
    .testimonial-card,
    .cta-card,
    .glass-panel,
    .analytics-card {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.58);
      background: rgba(255, 255, 255, 0.56);
      box-shadow:
        0 20px 50px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.66);
      backdrop-filter: blur(20px);
    }

    .metric-card {
      border-radius: 1.5rem;
      padding: 1.2rem 1.15rem;
    }

    .metric-value {
      margin: 0;
      font-size: clamp(1.7rem, 3vw, 2.4rem);
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.05em;
    }

    .metric-label {
      margin: 0.35rem 0 0;
      color: rgba(71, 85, 105, 0.88);
      font-size: 0.92rem;
    }

    .dashboard-stage {
      position: relative;
      min-height: 44rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dashboard-glow {
      position: absolute;
      inset: 15% 8% auto;
      height: 65%;
      border-radius: 3rem;
      background:
        radial-gradient(circle at top, rgba(96, 165, 250, 0.44), rgba(96, 165, 250, 0)),
        radial-gradient(circle at right, rgba(168, 85, 247, 0.24), rgba(168, 85, 247, 0));
      filter: blur(40px);
      opacity: 0.95;
    }

    .dashboard-rays {
      position: absolute;
      inset: 6% 14% auto;
      height: 16rem;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
      opacity: 0.32;
      filter: blur(16px);
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }

    .dashboard-shell {
      position: relative;
      width: min(100%, 42rem);
      padding: 1.1rem;
      border-radius: 2.2rem;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background:
        linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.95)),
        linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(168, 85, 247, 0.08));
      box-shadow:
        0 38px 95px rgba(15, 23, 42, 0.34),
        0 0 80px rgba(37, 99, 235, 0.16);
      animation: float-card 8s ease-in-out infinite;
    }

    .dashboard-shell::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.38), rgba(96, 165, 250, 0.16), rgba(168, 85, 247, 0.16));
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .dashboard-header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.9rem;
      padding: 0.35rem 0.4rem 1rem;
    }

    .dashboard-dots {
      display: flex;
      gap: 0.35rem;
    }

    .dashboard-dots span,
    .showcase-window span {
      width: 0.72rem;
      height: 0.72rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.42);
    }

    .dashboard-dots span:nth-child(1) { background: #f97316; }
    .dashboard-dots span:nth-child(2) { background: #facc15; }
    .dashboard-dots span:nth-child(3) { background: #4ade80; }

    .dashboard-search,
    .dashboard-badge {
      border-radius: 999px;
      font-size: 0.78rem;
    }

    .dashboard-search {
      padding: 0.55rem 0.9rem;
      color: rgba(226, 232, 240, 0.85);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      text-align: center;
    }

    .dashboard-badge {
      padding: 0.5rem 0.85rem;
      background: rgba(34, 197, 94, 0.16);
      color: #86efac;
      border: 1px solid rgba(134, 239, 172, 0.18);
      font-weight: 700;
    }

    .dashboard-body {
      display: grid;
      grid-template-columns: 13rem 1fr;
      gap: 1rem;
    }

    .dashboard-sidebar,
    .dashboard-main {
      min-width: 0;
    }

    .dashboard-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border-radius: 1.55rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .sidebar-brand p,
    .theme-panel-head p,
    .analytics-card-head p,
    .analytics-title,
    .panel-head p,
    .profile-name {
      margin: 0;
    }

    .sidebar-brand p {
      color: #f8fafc;
      font-size: 0.92rem;
      font-weight: 700;
    }

    .sidebar-brand span,
    .profile-role,
    .theme-panel-head span,
    .analytics-card-head span,
    .stat-stack span,
    .panel-head span,
    .update-row span {
      color: rgba(191, 219, 254, 0.74);
      font-size: 0.74rem;
    }

    .sidebar-brand-icon {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 0.9rem;
      background: linear-gradient(135deg, #38bdf8, #2563eb);
      box-shadow: 0 0 26px rgba(56, 189, 248, 0.46);
    }

    .sidebar-menu {
      display: grid;
      gap: 0.45rem;
    }

    .sidebar-menu-item {
      padding: 0.75rem 0.85rem;
      border-radius: 0.95rem;
      color: rgba(226, 232, 240, 0.84);
      font-size: 0.84rem;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.02);
    }

    .sidebar-menu-item-active {
      color: white;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(96, 165, 250, 0.18));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .theme-panel {
      margin-top: auto;
      padding: 1rem;
      border-radius: 1.15rem;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.56), rgba(15, 23, 42, 0.24));
      border: 1px solid rgba(148, 163, 184, 0.1);
    }

    .theme-panel-head,
    .panel-head,
    .analytics-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
    }

    .theme-panel-head p,
    .analytics-title,
    .panel-head p {
      color: #e2e8f0;
      font-size: 0.83rem;
      font-weight: 700;
    }

    .theme-swatches {
      display: flex;
      gap: 0.55rem;
      margin: 0.9rem 0 1rem;
    }

    .swatch {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 0.6rem;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
    }

    .swatch-blue { background: #2563eb; }
    .swatch-cyan { background: #60a5fa; }
    .swatch-violet { background: #8b5cf6; }
    .swatch-slate { background: #1e293b; }

    .theme-slider {
      display: grid;
      gap: 0.75rem;
    }

    .theme-slider-track {
      width: 100%;
      height: 0.42rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .theme-slider-track span {
      display: block;
      height: 100%;
      width: 72%;
      border-radius: inherit;
      background: linear-gradient(90deg, #38bdf8, #2563eb);
      box-shadow: 0 0 18px rgba(96, 165, 250, 0.5);
    }

    .theme-slider-track-soft span {
      width: 56%;
      background: linear-gradient(90deg, #8b5cf6, #60a5fa);
    }

    .dashboard-main {
      display: grid;
      gap: 1rem;
    }

    .dashboard-top-grid,
    .dashboard-lower-grid,
    .feature-grid,
    .showcase-grid,
    .testimonial-grid {
      display: grid;
      gap: 1rem;
    }

    .dashboard-top-grid {
      grid-template-columns: 1.15fr 0.85fr;
    }

    .dashboard-lower-grid {
      grid-template-columns: 1.05fr 0.95fr;
    }

    .dashboard-lower-grid .updates-panel {
      grid-column: 1 / -1;
    }

    .analytics-card,
    .glass-panel {
      border-radius: 1.4rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: white;
    }

    .analytics-card-primary {
      background:
        linear-gradient(145deg, rgba(37, 99, 235, 0.22), rgba(15, 23, 42, 0.05)),
        rgba(255, 255, 255, 0.05);
    }

    .analytics-card-head h3,
    .stat-stack h3 {
      margin: 0.2rem 0 0;
      font-size: 1.9rem;
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .wave-chart,
    .activity-chart {
      display: flex;
      align-items: end;
      gap: 0.4rem;
      margin-top: 1rem;
    }

    .wave-chart {
      height: 7rem;
    }

    .wave-chart span,
    .activity-chart span {
      flex: 1;
      border-radius: 999px 999px 0 0;
      background: linear-gradient(180deg, rgba(96, 165, 250, 0.96), rgba(56, 189, 248, 0.16));
      box-shadow: 0 0 18px rgba(96, 165, 250, 0.25);
    }

    .mini-progress {
      margin-top: 1rem;
      height: 0.55rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .mini-progress-fill {
      width: 68%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #60a5fa, #8b5cf6);
      box-shadow: 0 0 18px rgba(96, 165, 250, 0.42);
    }

    .profile-panel,
    .activity-panel,
    .updates-panel {
      display: grid;
      gap: 1rem;
    }

    .profile-card {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .profile-avatar {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      box-shadow: 0 0 24px rgba(96, 165, 250, 0.32);
    }

    .profile-name {
      color: white;
      font-weight: 800;
      font-size: 0.98rem;
    }

    .profile-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .profile-stats p {
      margin: 0;
      color: rgba(191, 219, 254, 0.76);
      font-size: 0.72rem;
    }

    .profile-stats strong {
      display: block;
      margin-top: 0.35rem;
      color: white;
      font-size: 1rem;
    }

    .activity-chart {
      height: 6.4rem;
    }

    .update-row {
      display: flex;
      gap: 0.8rem;
      align-items: flex-start;
    }

    .update-row strong {
      display: block;
      color: white;
      font-size: 0.92rem;
      margin-bottom: 0.2rem;
    }

    .update-bullet {
      width: 0.75rem;
      height: 0.75rem;
      margin-top: 0.38rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #38bdf8, #8b5cf6);
      box-shadow: 0 0 16px rgba(96, 165, 250, 0.55);
      flex-shrink: 0;
    }

    .hero-floating-card {
      position: absolute;
      z-index: 2;
      width: 12rem;
      padding: 1rem;
      border-radius: 1.35rem;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      backdrop-filter: blur(16px);
      animation: float-card 7s ease-in-out infinite;
    }

    .hero-floating-card h3,
    .workflow-card h3,
    .showcase-copy h3,
    .feature-card h3,
    .cta-card h2,
    .section-heading h2 {
      margin: 0;
      letter-spacing: -0.04em;
    }

    .hero-floating-card h3 {
      color: #0f172a;
      font-size: 1.35rem;
      margin-top: 0.25rem;
      font-weight: 800;
    }

    .hero-floating-card span,
    .hero-floating-card p.eyebrow {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.74rem;
      line-height: 1.5;
    }

    .hero-floating-card span {
      color: rgba(51, 65, 85, 0.82);
    }

    .hero-floating-card .eyebrow {
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
    }

    .hero-floating-card-left {
      top: 6%;
      left: -3%;
    }

    .hero-floating-card-right {
      right: -2%;
      bottom: 10%;
      animation-delay: -2.4s;
    }

    .trust-strip {
      padding: 1.25rem 0 3rem;
    }

    .trust-logos {
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .trust-logos span,
    .section-kicker,
    .showcase-label {
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: 0.72rem;
      font-weight: 800;
    }

    .trust-logos span {
      padding: 0.85rem 1rem;
      border-radius: 999px;
      color: #334155;
      border: 1px solid rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.52);
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
    }

    .content-section {
      padding: 5rem 0;
    }

    .content-section-tight {
      padding-top: 2.5rem;
    }

    .section-heading {
      display: grid;
      gap: 1rem;
      max-width: 47rem;
      text-align: center;
      margin: 0 auto 2.6rem;
    }

    .section-heading-left {
      text-align: left;
      margin-inline: 0;
    }

    .section-kicker,
    .showcase-label {
      color: #2563eb;
    }

    .section-heading h2,
    .cta-card h2 {
      font-size: clamp(2.3rem, 4vw, 4rem);
      line-height: 1.02;
      color: #0f172a;
      font-weight: 900;
    }

    .feature-grid {
      flex-direction: column;
    }

    .feature-grid,
    .showcase-grid,
    .testimonial-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .feature-card,
    .showcase-card,
    .testimonial-card {
      border-radius: 1.75rem;
      padding: 1.4rem;
      transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
    }

    .feature-card:hover,
    .showcase-card:hover,
    .testimonial-card:hover,
    .workflow-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
      border-color: rgba(96, 165, 250, 0.42);
    }

    .feature-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1.15rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.14), rgba(168, 85, 247, 0.12));
      font-size: 1.2rem;
    }

    .feature-card h3,
    .showcase-copy h3,
    .workflow-card h3,
    .testimonial-author strong {
      color: #0f172a;
      font-size: 1.2rem;
      font-weight: 800;
    }

    .workflow-stack {
      display: grid;
      gap: 1rem;
    }

    .workflow-card {
      display: grid;
      grid-template-columns: 3rem 1fr;
      gap: 1rem;
      align-items: start;
      padding: 1.35rem;
      border-radius: 1.6rem;
      transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
    }

    .workflow-index {
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 1rem;
      color: white;
      font-weight: 900;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      box-shadow: 0 18px 34px rgba(37, 99, 235, 0.22);
    }

    .showcase-preview {
      position: relative;
      min-height: 15rem;
      border-radius: 1.45rem;
      padding: 1rem;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.22);
    }

    .showcase-preview-blue {
      background: linear-gradient(135deg, #dbeafe, #eff6ff 45%, #dbeafe);
    }

    .showcase-preview-dark {
      background: linear-gradient(135deg, #0f172a, #1e293b 50%, #0f172a);
    }

    .showcase-preview-aurora {
      background: linear-gradient(135deg, #dbeafe, #ede9fe 42%, #eff6ff);
    }

    .showcase-window {
      display: flex;
      gap: 0.35rem;
    }

    .showcase-layout {
      display: grid;
      gap: 0.8rem;
      margin-top: 1.2rem;
    }

    .showcase-title-block {
      width: 58%;
      height: 3.4rem;
      border-radius: 1.1rem;
      background: rgba(255, 255, 255, 0.5);
    }

    .showcase-preview-dark .showcase-title-block,
    .showcase-preview-dark .showcase-line,
    .showcase-preview-dark .showcase-pills span {
      background: rgba(255, 255, 255, 0.12);
    }

    .showcase-line {
      width: 90%;
      height: 0.8rem;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.12);
    }

    .showcase-line-short {
      width: 72%;
    }

    .showcase-pills {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.2rem;
    }

    .showcase-pills span {
      width: 3rem;
      height: 2.1rem;
      border-radius: 0.9rem;
      background: rgba(255, 255, 255, 0.58);
    }

    .showcase-copy {
      display: grid;
      gap: 0.7rem;
      padding-top: 1.15rem;
    }

    .testimonial-shell {
      display: grid;
      gap: 1.75rem;
    }

    .testimonial-card {
      display: grid;
      gap: 1rem;
    }

    .stars {
      color: #2563eb;
      letter-spacing: 0.2em;
      font-size: 0.88rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .testimonial-avatar {
      width: 2.8rem;
      height: 2.8rem;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
    }

    .testimonial-author span {
      display: block;
      margin-top: 0.15rem;
      color: rgba(71, 85, 105, 0.88);
      font-size: 0.88rem;
    }

    .cta-section {
      padding: 2.5rem 0 6rem;
    }

    .cta-card {
      display: grid;
      gap: 1.2rem;
      text-align: center;
      border-radius: 2rem;
      padding: 3rem 1.5rem;
      background:
        radial-gradient(circle at top, rgba(96, 165, 250, 0.18), transparent 30%),
        rgba(255, 255, 255, 0.62);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(18rem, 24rem));
      justify-content: center;
      gap: 1rem;
      margin-top: 0.4rem;
    }

    .pricing-plan {
      border-radius: 1.5rem;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.68);
      box-shadow:
        0 18px 40px rgba(15, 23, 42, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    .pricing-plan-name,
    .pricing-plan-description,
    .cta-subtext {
      margin: 0;
    }

    .pricing-plan-name {
      color: #2563eb;
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .pricing-plan-price {
      margin: 0.65rem 0 0.55rem;
      color: #0f172a;
      font-size: clamp(2rem, 4vw, 2.6rem);
      line-height: 1;
      font-weight: 900;
      letter-spacing: -0.05em;
    }

    .pricing-plan-description,
    .cta-subtext {
      color: rgba(51, 65, 85, 0.84);
      line-height: 1.75;
      font-size: 0.98rem;
    }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition:
        opacity 700ms ease,
        transform 700ms ease;
    }

    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .reveal-delay-1 { transition-delay: 90ms; }
    .reveal-delay-2 { transition-delay: 180ms; }
    .reveal-delay-3 { transition-delay: 270ms; }
    .reveal-delay-4 { transition-delay: 360ms; }

    @keyframes drift {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(24px, -28px, 0) scale(1.06); }
    }

    @keyframes particle-float {
      0% {
        transform: translate3d(0, 0, 0) scale(0.9);
        opacity: 0;
      }
      20% { opacity: 1; }
      100% {
        transform: translate3d(16px, -90px, 0) scale(1.1);
        opacity: 0;
      }
    }

    @keyframes float-card {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 1279px) {
      .dashboard-body {
        grid-template-columns: 1fr;
      }

      .dashboard-sidebar {
        order: 2;
      }

      .hero-floating-card-left {
        left: 1%;
      }

      .hero-floating-card-right {
        right: 1%;
      }
    }

    @media (max-width: 1023px) {
      .glass-nav {
        border-radius: 2rem;
        padding-inline: 1rem;
      }

      .nav-links {
        display: none;
      }

      .hero-section {
        padding-top: 4.7rem;
      }

      .hero-copy {
        padding-top: 1.5rem;
      }

      .dashboard-stage {
        min-height: auto;
      }

      .hero-floating-card {
        display: none;
      }

      .feature-grid,
      .showcase-grid,
      .testimonial-grid,
      .pricing-grid,
      .dashboard-top-grid,
      .dashboard-lower-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 767px) {
      .glass-nav {
        flex-wrap: wrap;
        justify-content: center;
        border-radius: 1.6rem;
      }

      .brand-mark {
        width: 100%;
        justify-content: center;
      }

      .nav-actions {
        width: 100%;
        justify-content: center;
        background: transparent;
        border: 0;
        box-shadow: none;
        padding: 0;
      }

      .hero-title {
        max-width: none;
      }

      .hero-proof {
        align-items: flex-start;
      }

      .metrics-grid,
      .profile-stats {
        grid-template-columns: 1fr;
      }

      .dashboard-shell {
        padding: 0.9rem;
        border-radius: 1.65rem;
      }

      .dashboard-header {
        grid-template-columns: 1fr;
        justify-items: start;
      }

      .dashboard-search {
        width: 100%;
      }

      .section-heading h2,
      .cta-card h2 {
        font-size: 2.2rem;
      }

      .cta-card {
        padding: 2.2rem 1.1rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ambient-orb,
      .particle,
      .dashboard-shell,
      .hero-floating-card,
      .button,
      .feature-card,
      .showcase-card,
      .testimonial-card,
      .workflow-card,
      .reveal {
        animation: none !important;
        transition: none !important;
      }
    }
  `],
})
export class GuestLandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('scrollReveal') scrollRevealElements!: QueryList<ElementRef<HTMLElement>>;

  cursorX = 0;
  cursorY = 0;
  showCursorGlow = false;

  liveMetrics = [
    { label: 'Portfolios published', value: '12K', suffix: '+' },
    { label: 'Average setup time', value: '08', suffix: 'm' },
    { label: 'Theme options', value: '24', suffix: '+' },
  ];

  readonly features = [
    {
      icon: '01',
      title: 'Smart Portfolio Builder',
      description:
        'Organize your profile, projects, skills, and experience in one guided workspace built for clarity.',
    },
    {
      icon: '02',
      title: 'Professional Resume Generator',
      description:
        'Turn your information into a clean, well-structured resume that is ready to download and share.',
    },
    {
      icon: '03',
      title: 'Premium Portfolio Themes',
      description:
        'Choose from refined layouts designed to help your work feel polished, credible, and modern.',
    },
    {
      icon: '04',
      title: 'One-Click Publishing',
      description:
        'Publish your portfolio instantly without dealing with hosting, setup steps, or technical configuration.',
    },
    {
      icon: '05',
      title: 'Custom Portfolio Links',
      description:
        'Share a personalized link that is easy to remember and professional across applications and outreach.',
    },
    {
      icon: '06',
      title: 'Mobile Optimized',
      description:
        'Every portfolio is designed to look sharp and feel smooth across desktop, tablet, and mobile.',
    },
    {
      icon: '07',
      title: 'Built-In Analytics',
      description:
        'Understand how people discover and engage with your portfolio through clear, focused performance insights.',
    },
    {
      icon: '08',
      title: 'Personal Branding Tools',
      description:
        'Present your work, voice, and professional identity with consistency across your resume and portfolio.',
    },
  ];

  readonly workflow = [
    {
      index: '1',
      title: 'Add Your Information',
      description:
        'Fill in your profile, work experience, projects, education, and links in a structured format.',
    },
    {
      index: '2',
      title: 'Select a Professional Theme',
      description:
        'Choose a layout that fits your field and instantly preview how your portfolio will look.',
    },
    {
      index: '3',
      title: 'Publish & Share Instantly',
      description:
        'Go live in minutes and share your portfolio and resume with a custom professional link.',
    },
  ];

  readonly themes = [
    {
      label: 'For Designers',
      title: 'Studio Canvas',
      description: 'A clean editorial layout for visual portfolios, case studies, and presentation-led personal brands.',
      previewClass: 'showcase-preview-blue',
    },
    {
      label: 'For Developers',
      title: 'Modern Stack',
      description: 'A structured theme for technical professionals who want to highlight projects, skills, and experience with precision.',
      previewClass: 'showcase-preview-dark',
    },
    {
      label: 'For Consultants',
      title: 'Executive Profile',
      description: 'A refined minimal theme designed for consultants, strategists, and professionals focused on credibility.',
      previewClass: 'showcase-preview-aurora',
    },
  ];

  readonly testimonials = [
    {
      initials: 'RM',
      name: 'Riya Malhotra',
      role: 'UX Designer',
      quote:
        'CareerFlow helped me put together a portfolio that felt polished and professional without spending days on design.',
    },
    {
      initials: 'DN',
      name: 'Daniel Nguyen',
      role: 'Frontend Developer',
      quote:
        'The setup was straightforward, the themes felt premium, and I was able to publish a resume and portfolio the same day.',
    },
    {
      initials: 'SK',
      name: 'Sara Khan',
      role: 'Freelance Brand Consultant',
      quote:
        'It gives me a clean online presence I can confidently share with clients, hiring teams, and collaborators.',
    },
  ];

  readonly updates = [
    { title: 'Resume section refreshed', detail: 'Your latest experience and education details are now reflected across the profile.' },
    { title: 'Portfolio link published', detail: 'Your custom public URL is live and ready to share.' },
    { title: 'Theme preferences saved', detail: 'Typography, colors, and layout choices have been applied to your profile.' },
  ];

  readonly pricingPlans = [
    {
      name: 'Free',
      price: '₹0',
      description: 'Use the current platform to create and publish your portfolio and resume with essential features.',
    },
    {
      name: 'Custom',
      price: 'Contact Us',
      description: 'For customized portfolios, resumes, or any kind of professional website built around your specific requirements.',
    },
  ];

  readonly chartBars = [34, 52, 47, 66, 58, 76, 62, 81, 72, 88];
  readonly activityBars = [28, 42, 36, 58, 44, 63, 51, 72, 55, 78, 67, 84];
  readonly particles = Array.from({ length: 16 }, (_, index) => ({
    left: 6 + ((index * 6.2) % 88),
    top: 12 + ((index * 5.7) % 70),
    duration: 8 + (index % 5),
  }));

  private intersectionObserver?: IntersectionObserver;
  private animationFrameId?: number;
  private counterAnimationStarted = false;

  ngOnInit(): void {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  ngAfterViewInit(): void {
    this.initScrollRevealObserver();
    this.initCounterAnimation();
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  getPricingPlans() {
    return this.pricingPlans;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    this.showCursorGlow = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showCursorGlow = false;
  }

  private initScrollRevealObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    this.scrollRevealElements.forEach((element) => {
      this.intersectionObserver?.observe(element.nativeElement);
    });
  }

  private initCounterAnimation(): void {
    const statsSection = document.querySelector('[data-stats]');
    if (!statsSection) {
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.counterAnimationStarted) {
            this.counterAnimationStarted = true;
            this.animateCounters();
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    counterObserver.observe(statsSection);
  }

  private animateCounters(): void {
    const duration = 1600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      this.liveMetrics = [
        { label: 'Portfolios published', value: `${Math.floor(12000 * progress)}`, suffix: '+' },
        { label: 'Average setup time', value: `${Math.max(8, Math.round(26 - 18 * progress)).toString().padStart(2, '0')}`, suffix: 'm' },
        { label: 'Theme options', value: `${Math.floor(24 * progress)}`, suffix: '+' },
      ];

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
