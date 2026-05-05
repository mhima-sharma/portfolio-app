import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section-padding bg-slate-50 text-slate-900 dark:bg-dark-950 dark:text-slate-100">
      <div class="mx-auto max-w-6xl">
        <div class="mb-10 text-center">
          <p class="text-sm uppercase tracking-[0.3em] text-primary-600">Contact</p>
          <h2 class="mt-3 text-3xl font-semibold">Let’s start a thoughtful collaboration.</h2>
          <p class="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Share your idea or request and I’ll respond with a clean, professional next step.
          </p>
        </div>

        <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-dark-700/70 dark:bg-dark-900/80">
            <h3 class="mb-6 text-xl font-semibold">Reach out directly</h3>
            <p class="leading-7 text-slate-600 dark:text-slate-300">
              Use the form to share your project details, feedback, or collaboration request. If email is available, you can also message directly from the contact panel.
            </p>

            <div class="mt-10 space-y-6">
              <div *ngIf="contact().email" class="flex items-start gap-4">
                <span class="icon-box">📧</span>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">Email</p>
                  <a [href]="'mailto:' + contact().email" class="text-primary-600 hover:text-primary-700 transition-colors">
                    {{ contact().email }}
                  </a>
                </div>
              </div>

              <div *ngIf="contact().phone" class="flex items-start gap-4">
                <span class="icon-box">📱</span>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">Phone</p>
                  <a [href]="'tel:' + contact().phone" class="text-primary-600 hover:text-primary-700 transition-colors">
                    {{ contact().phone }}
                  </a>
                </div>
              </div>

              <div *ngIf="contact().location" class="flex items-start gap-4">
                <span class="icon-box">📍</span>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">Location</p>
                  <p class="text-slate-600 dark:text-slate-400">{{ contact().location }}</p>
                </div>
              </div>
            </div>
          </div>

          <form class="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-dark-700/70 dark:bg-dark-900/80" (ngSubmit)="submitForm()">
            <div class="mb-8">
              <h3 class="text-xl font-semibold">Send a message</h3>
              <p class="mt-3 text-slate-600 dark:text-slate-400">Your note will be prepared for review and delivered via the contact address provided here.</p>
            </div>

            <div class="space-y-5">
              <label class="block">
                <span class="label-text">Name</span>
                <input type="text" required [(ngModel)]="senderName" name="name" class="field" placeholder="Your name" />
              </label>

              <label class="block">
                <span class="label-text">Email</span>
                <input type="email" required [(ngModel)]="senderEmail" name="email" class="field" placeholder="you@example.com" />
              </label>

              <label class="block">
                <span class="label-text">Message</span>
                <textarea required [(ngModel)]="message" name="message" rows="5" class="field resize-none" placeholder="Tell me about your project"></textarea>
              </label>
            </div>

            <button type="submit" class="btn-primary mt-6 w-full justify-center">
              Send message
            </button>

            <p *ngIf="submissionStatus() === 'success'" class="mt-4 text-sm text-emerald-700 dark:text-emerald-300">
              Thanks for your message! I’ll reply shortly.
            </p>
            <p *ngIf="submissionStatus() === 'error'" class="mt-4 text-sm text-rose-700 dark:text-rose-300">
              Please complete all fields before sending.
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private portfolioService = inject(PortfolioService);
  contact = this.portfolioService.contact;
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');

  senderName = '';
  senderEmail = '';
  message = '';

  directEmailLink = computed(() =>
    this.contact().email
      ? `mailto:${this.contact().email}?subject=${encodeURIComponent('Portfolio enquiry')}`
      : '#contact'
  );

  submitForm() {
    if (!this.senderName.trim() || !this.senderEmail.trim() || !this.message.trim()) {
      this.submissionStatus.set('error');
      return;
    }

    this.submissionStatus.set('success');
    this.senderName = '';
    this.senderEmail = '';
    this.message = '';
  }
}
