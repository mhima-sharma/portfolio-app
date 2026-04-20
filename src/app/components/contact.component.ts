import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="section-padding bg-gray-50 dark:bg-dark-800">
      <div class="max-w-4xl mx-auto">
        <h2 class="mb-4 text-center">Get In Touch</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-primary-500 to-orange-500 mx-auto mb-12"></div>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="mb-6 text-xl font-semibold">Let's Connect</h3>

            <div class="space-y-6">
              @if (contact().email) {
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📧</span>
                </div>
                <div>
                  <p class="font-semibold text-dark-900 dark:text-white mb-1">Email</p>
                  <a [href]="'mailto:' + contact().email" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    {{ contact().email }}
                  </a>
                </div>
              </div>

              <a
                [href]="directEmailLink()"
                class="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300 dark:hover:bg-primary-500/20"
              >
                <span>Send email directly</span>
                <span>↗</span>
              </a>

              <p class="text-sm text-gray-500 dark:text-gray-400">
                Visitors can email you directly, and the form below can send messages straight to your inbox.
              </p>
              }

              @if (contact().phone) {
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📱</span>
                </div>
                <div>
                  <p class="font-semibold text-dark-900 dark:text-white mb-1">Phone</p>
                  <a [href]="'tel:' + contact().phone" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    {{ contact().phone }}
                  </a>
                </div>
              </div>
              }

              @if (contact().location) {
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl">📍</span>
                </div>
                <div>
                  <p class="font-semibold text-dark-900 dark:text-white mb-1">Location</p>
                  <p class="text-gray-600 dark:text-gray-400">{{ contact().location }}</p>
                </div>
              </div>
              }
            </div>

            @if (
              !contact().email &&
              !contact().phone &&
              !contact().location &&
              !contact().github &&
              !contact().linkedin &&
              !contact().medium &&
              !contact().tableau &&
              !contact().leetcode &&
              !contact().instagram &&
              !contact().youtube &&
              !contact().portfolio
            ) {
            <div class="mt-8 card p-6 text-gray-600 dark:text-gray-400">
              Contact details from your admin panel will appear here automatically.
            </div>
            }
          </div>

          <div class="card p-8">
            <h3 class="mb-4 text-xl font-semibold text-dark-900 dark:text-white">Professional Contact</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-7">
              Public visitors can use your direct email and portfolio links shown here. Platform support requests are available only inside the admin panel.
            </p>

            @if (contact().email) {
              <a
                [href]="directEmailLink()"
                class="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300 dark:hover:bg-primary-500/20"
              >
                <span>Email {{ contact().email }}</span>
                <span>↗</span>
              </a>
            } @else {
              <div class="mt-6 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 dark:border-dark-600 dark:text-gray-400">
                Add your contact email from the admin panel to enable direct outreach.
              </div>
            }
          </div>
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
  directEmailLink = computed(() =>
    this.contact().email
      ? `mailto:${this.contact().email}?subject=${encodeURIComponent('Portfolio enquiry')}`
      : '#contact'
  );
}
