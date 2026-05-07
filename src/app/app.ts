import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly ignoredHostSuffixes = [
    'vercel.app',
    'onrender.com',
    'localhost',
  ];

  constructor(private router: Router) {
    this.initializeTheme();
  }

  ngOnInit() {
    this.handleSubdomain();
  }

  private initializeTheme(): void {
    // Apply saved theme or detect system preference
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme');
      let isDark = false;

      if (saved) {
        isDark = saved === 'dark';
      } else {
        // Check system preference
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  private handleSubdomain(): void {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase();
      const parts = hostname.split('.');

      if (!this.shouldResolveSubdomain(hostname, parts)) {
        return;
      }

      const subdomain = parts[0];
      // Only map real custom-domain subdomains to portfolio slugs.
      void this.router.navigate([subdomain]);
    }
  }

  private shouldResolveSubdomain(hostname: string, parts: string[]): boolean {
    if (parts.length < 3) {
      return false;
    }

    if (parts[0] === 'www' || parts[0] === 'designfolio') {
      return false;
    }

    if (this.ignoredHostSuffixes.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`))) {
      return false;
    }

    return true;
  }
}
