import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioData } from '../../models/portfolio.model';

type ContactLink = {
  key: string;
  label: string;
  value: string;
  href?: string;
};

@Component({
  selector: 'app-freefolio-anime-theme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeFreefolioAnimeComponent {
  data = input.required<PortfolioData>();
  profileSlug = input.required<string>();
  page = input.required<string>();

  protected navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Skills', page: 'skills' },
    { label: 'Projects', page: 'projects' },
    { label: 'Experience', page: 'experience' },
    { label: 'Contact', page: 'contact' },
  ];

  protected profileName = computed(
    () => this.data().profile.displayName || this.data().profile.name || 'Portfolio Owner'
  );

  protected profileTitle = computed(
    () => this.data().profile.title || this.data().profile.brandName || 'Creative Professional'
  );

  protected aboutText = computed(() =>
    [this.data().about.description, this.data().about.bio, this.data().profile.aboutText].filter(Boolean).join(' ')
  );

  protected contactLinks = computed<ContactLink[]>(() => {
    const contact = this.data().contact ?? {};
    const items: ContactLink[] = [
      contact.email ? { key: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}` } : null,
      contact.phone ? { key: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` } : null,
      contact.location ? { key: 'location', label: 'Location', value: contact.location } : null,
      contact.github ? { key: 'github', label: 'GitHub', value: contact.github, href: contact.github } : null,
      contact.linkedin ? { key: 'linkedin', label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin } : null,
      contact.instagram ? { key: 'instagram', label: 'Instagram', value: contact.instagram, href: contact.instagram } : null,
      contact.twitter ? { key: 'twitter', label: 'Twitter', value: contact.twitter, href: contact.twitter } : null,
      contact.youtube ? { key: 'youtube', label: 'YouTube', value: contact.youtube, href: contact.youtube } : null,
      contact.medium ? { key: 'medium', label: 'Medium', value: contact.medium, href: contact.medium } : null,
      contact.portfolio ? { key: 'portfolio', label: 'Portfolio', value: contact.portfolio, href: contact.portfolio } : null,
      contact.website ? { key: 'website', label: 'Website', value: contact.website, href: contact.website } : null,
    ].filter((item): item is ContactLink => Boolean(item));

    return items;
  });

  protected services = computed(() => this.data().services ?? []);
  protected blogs = computed(() => this.data().blogs ?? []);
  protected testimonials = computed(() => this.data().testimonials ?? []);
  protected gallery = computed(() => this.data().gallery ?? []);
  protected projects = computed(() => this.data().projects ?? []);
  protected skills = computed(() => this.data().skills ?? []);
  protected experience = computed(() => this.data().experience ?? []);
  protected currentPage = computed(() => {
    const page = this.page();
    return this.navItems.some((item) => item.page === page) ? page : 'home';
  });
}
