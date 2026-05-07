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
      if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'designfolio') {
        const subdomain = parts[0];
        // Navigate to the portfolio with the subdomain as slug
        this.router.navigate([subdomain]);
      }
    }
  }
}
