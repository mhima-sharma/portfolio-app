import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_22%),linear-gradient(180deg,#fff7ed_0%,#ffffff_42%,#f8fafc_100%)] text-slate-900">
      <section class="relative">
        <div class="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <header class="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.32em] text-orange-500">Portfolio For Everyone</p>
              <h1 class="mt-1 text-lg font-bold text-slate-950">Create, manage, and publish your portfolio with confidence</h1>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <a
                routerLink="/admin/login"
                class="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Sign In
              </a>
              <a
                routerLink="/admin/signup"
                class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create Account
              </a>
            </div>
          </header>

          <div class="grid items-center gap-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
            <div>
              <p class="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                Open For Everyone
              </p>
              <h2 class="mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
                Everyone can come here and build a polished portfolio with ease.
              </h2>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Yeh platform sabke liye hai. Student, designer, freelancer, teacher, business owner, ya kisi bhi field ke user
                apna portfolio create karke dashboard se content manage kar sakte hain aur live page publish kar sakte hain.
              </p>

              <div class="mt-8 flex flex-wrap gap-4">
                <a
                  routerLink="/admin/signup"
                  class="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  <span>Start Your Portfolio</span>
                  <span>→</span>
                </a>
                <a
                  routerLink="/admin/login"
                  class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  <span>Open Your Workspace</span>
                  <span>↗</span>
                </a>
              </div>

              <div class="mt-10 grid gap-4 sm:grid-cols-3">
                <div class="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm">
                  <p class="text-sm text-slate-500">Layouts</p>
                  <p class="mt-3 text-3xl font-bold text-slate-950">5</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">Choose a presentation style that fits your personality and goals.</p>
                </div>
                <div class="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm">
                  <p class="text-sm text-slate-500">Content Control</p>
                  <p class="mt-3 text-3xl font-bold text-slate-950">1</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">One simple dashboard to update your story, work, experience, and profile details.</p>
                </div>
                <div class="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm">
                  <p class="text-sm text-slate-500">Public Link</p>
                  <p class="mt-3 text-3xl font-bold text-slate-950">Live</p>
                  <p class="mt-2 text-sm leading-6 text-slate-600">Every account gets a shareable public link that is ready to send anywhere.</p>
                </div>
              </div>
            </div>

            <div class="relative">
              <div class="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-orange-200/70 blur-3xl"></div>
              <div class="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-sky-200/70 blur-3xl"></div>

              <div class="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-slate-950 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                <div class="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,#111827_0%,#0f172a_100%)] p-6 text-white">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <p class="text-xs uppercase tracking-[0.3em] text-orange-300">Platform Overview</p>
                      <h3 class="mt-3 text-2xl font-bold">Portfolio Builder For All</h3>
                    </div>
                    <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200">
                      Live Layouts
                    </span>
                  </div>

                  <div class="mt-6 grid gap-4 sm:grid-cols-2">
                    <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p class="text-sm text-slate-400">Who Can Use It</p>
                      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                        <li>Create an account with your unique public link</li>
                        <li>Choose the layout that fits your profile best</li>
                        <li>Publish and share your portfolio in minutes</li>
                      </ul>
                    </div>
                    <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p class="text-sm text-slate-400">Inside Dashboard</p>
                      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                        <li>Edit your story, work, experience, and contact details</li>
                        <li>Preview your page across desktop and mobile views</li>
                        <li>Keep your portfolio and resume in one place</li>
                      </ul>
                    </div>
                  </div>

                  <div class="mt-6 rounded-[1.5rem] border border-orange-400/20 bg-orange-400/10 p-5">
                    <p class="text-xs uppercase tracking-[0.28em] text-orange-200">How It Works</p>
                    <p class="mt-3 text-sm leading-7 text-slate-100">
                      Signup ya login ke baad aap apna dashboard open kar sakte ho, content aur layout manage kar sakte ho,
                      aur same data automatically aapke live portfolio page par show ho jayega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="mt-20 grid gap-6 lg:grid-cols-3">
            <article class="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">Step 1</p>
              <h3 class="mt-3 text-xl font-bold text-slate-950">Create your account</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                Name, email, password, title, aur unique public link ke saath apna account create karo.
              </p>
            </article>

            <article class="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">Step 2</p>
              <h3 class="mt-3 text-xl font-bold text-slate-950">Manage profile content</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                Dashboard se about, contact, work, experience, aur layout ko apni need ke hisaab se update karo.
              </p>
            </article>

            <article class="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">Step 3</p>
              <h3 class="mt-3 text-xl font-bold text-slate-950">Share your live public page</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                Public link ke through koi bhi aapka portfolio dekh sakta hai aur aapki profile ko samajh sakta hai.
              </p>
            </article>
          </section>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestLandingComponent {}
