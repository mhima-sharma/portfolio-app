import { PortfolioData, PortfolioTheme } from '../../models/portfolio.model';

const RENDERABLE_PAGED_THEMES: PortfolioTheme[] = [
  'modern-minimal',
  'creative-designer',
  'developer-dark',
  'corporate-professional',
  'personal-branding',
];

export function normalizePreviewTheme(themeId: PortfolioTheme): PortfolioTheme {
  switch (themeId) {
    case 'modern-dark':
      return 'developer-dark';
    case 'minimal-light':
      return 'modern-minimal';
    case 'creator-orange':
      return 'creative-designer';
    case 'corporate-resume':
      return 'corporate-professional';
    case 'theme-5':
      return 'theme-5-boys';
    default:
      return themeId;
  }
}

export function isPagedPreviewTheme(themeId: PortfolioTheme) {
  return RENDERABLE_PAGED_THEMES.includes(normalizePreviewTheme(themeId));
}

export function buildThemePreviewData(themeId: PortfolioTheme): PortfolioData {
  const normalizedTheme = normalizePreviewTheme(themeId);

  return {
    profile: {
      slug: 'theme-preview',
      name: sampleNameForTheme(normalizedTheme),
      title: sampleTitleForTheme(normalizedTheme),
      displayName: sampleNameForTheme(normalizedTheme),
      brandName: 'Preview Studio',
      aboutText: 'A quick sample portfolio to help users compare themes before activating one.',
      selectedTheme: normalizedTheme,
    },
    about: {
      description:
        'This static preview shows how a complete portfolio could look with your chosen theme, using sample content for projects, experience, and contact details.',
      bio:
        'Designed for creators, developers, and consultants who want to compare layouts visually before making a final selection.',
      yearsExperience: 7,
    },
    contact: {
      email: 'preview@designfolio.app',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      github: 'https://github.com/designfolio',
      linkedin: 'https://linkedin.com/in/designfolio-preview',
      instagram: 'https://instagram.com/designfolio.preview',
      twitter: 'https://x.com/designfolio',
      portfolio: 'https://designfolio.app/demo',
      website: 'https://designfolio.app',
    },
    skills: [
      { id: 'skill-1', name: 'UI Design', category: 'frontend', level: 92 },
      { id: 'skill-2', name: 'Frontend Development', category: 'frontend', level: 90 },
      { id: 'skill-3', name: 'Brand Strategy', category: 'tools', level: 84 },
      { id: 'skill-4', name: 'Performance Optimization', category: 'backend', level: 81 },
      { id: 'skill-5', name: 'Content Systems', category: 'database', level: 78 },
      { id: 'skill-6', name: 'Client Communication', category: 'tools', level: 88 },
    ],
    projects: [
      {
        id: 'project-1',
        title: 'Creator Portfolio Launch',
        description:
          'Built a conversion-focused personal site with strong visual storytelling, quick navigation, and premium content sections.',
        image: '/assets/projects/ecommerce.png',
        technologies: ['Angular', 'Tailwind', 'Content Design'],
        liveLink: 'https://example.com/creator-launch',
        githubLink: 'https://github.com/designfolio/creator-launch',
        featured: true,
      },
      {
        id: 'project-2',
        title: 'Consulting Showcase Site',
        description:
          'Structured service pages, case studies, and social proof into a polished portfolio flow for high-trust lead generation.',
        image: '/assets/projects/taskapp.png',
        technologies: ['TypeScript', 'UX Writing', 'Landing Pages'],
        liveLink: 'https://example.com/consulting-showcase',
        githubLink: 'https://github.com/designfolio/consulting-showcase',
        featured: true,
      },
      {
        id: 'project-3',
        title: 'Visual Gallery Experience',
        description:
          'Created a media-rich project gallery with editorial pacing so visitors can preview work quality before reaching out.',
        image: '/assets/projects/weather.png',
        technologies: ['Motion', 'Art Direction', 'Responsive UI'],
        liveLink: 'https://example.com/gallery-preview',
        githubLink: 'https://github.com/designfolio/gallery-preview',
        featured: false,
      },
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Northstar Studio',
        position: 'Lead Portfolio Designer',
        duration: '2023 - Present',
        description: 'Helped founders and creators package their work into clear, high-conviction online portfolios.',
        startDate: '2023',
        endDate: 'Present',
      },
      {
        id: 'exp-2',
        company: 'Pixel Works',
        position: 'Senior Frontend Developer',
        duration: '2020 - 2023',
        description: 'Built reusable design systems and fast-loading marketing experiences for modern brands.',
        startDate: '2020',
        endDate: '2023',
      },
      {
        id: 'exp-3',
        company: 'Independent',
        position: 'Freelance Brand Consultant',
        duration: '2018 - 2020',
        description: 'Worked with small businesses to align storytelling, layout, and content hierarchy across digital touchpoints.',
        startDate: '2018',
        endDate: '2020',
      },
    ],
    gallery: [],
  };
}

function sampleNameForTheme(themeId: PortfolioTheme) {
  switch (themeId) {
    case 'developer-dark':
      return 'Aarav Malhotra';
    case 'corporate-professional':
      return 'Riya Khanna';
    case 'personal-branding':
      return 'Sana Verma';
    case 'creative-designer':
      return 'Kabir Sethi';
    default:
      return 'Designfolio Preview';
  }
}

function sampleTitleForTheme(themeId: PortfolioTheme) {
  switch (themeId) {
    case 'developer-dark':
      return 'Full Stack Developer';
    case 'corporate-professional':
      return 'Business Consultant';
    case 'personal-branding':
      return 'Personal Brand Strategist';
    case 'creative-designer':
      return 'Creative Designer';
    case 'premium-signature':
      return 'Premium Portfolio Preview';
    default:
      return 'Portfolio Preview';
  }
}
