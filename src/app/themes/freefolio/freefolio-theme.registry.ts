import { PortfolioTheme } from '../../models/portfolio.model';
import { FreefolioThemeData, FreefolioThemeProject, FreefolioThemeSkill } from './freefolio-theme.model';

export type FreefolioThemeId = Extract<
  PortfolioTheme,
  | 'freefolio-anime'
  | 'freefolio-aurora'
  | 'freefolio-basic'
  | 'freefolio-beginner'
  | 'freefolio-classic'
  | 'freefolio-clean'
  | 'freefolio-dark-hack'
  | 'freefolio-deepsea'
  | 'freefolio-easy'
  | 'freefolio-flower'
  | 'freefolio-hacker'
  | 'freefolio-indify'
  | 'freefolio-ingolfur'
  | 'freefolio-outlines'
  | 'freefolio-plain'
  | 'freefolio-simple'
>;

export interface FreefolioThemeMeta {
  id: FreefolioThemeId;
  folder: string;
  name: string;
  badge: string;
  summary: string;
  accent: string;
  surface: string;
  previewImage: string;
}

export const FREEFOLIO_THEMES: FreefolioThemeMeta[] = [
  {
    id: 'freefolio-anime',
    folder: 'anime',
    name: 'Freefolio Anime',
    badge: 'AN',
    summary: 'Comic-inspired developer portfolio with bold typography and bright contrast.',
    accent: '#ef4444',
    surface: 'linear-gradient(135deg, #fff7ed, #fee2e2)',
    previewImage: '/assets/freefolio/images/anime.png',
  },
  {
    id: 'freefolio-aurora',
    folder: 'aurora',
    name: 'Freefolio Aurora',
    badge: 'AU',
    summary: 'Northern-lights inspired dark portfolio with vibrant glow accents.',
    accent: '#00ffaa',
    surface: 'linear-gradient(135deg, #0a0e1a, #1a0033)',
    previewImage: '/assets/freefolio/images/aurora.png',
  },
  {
    id: 'freefolio-basic',
    folder: 'basic',
    name: 'Freefolio Basic',
    badge: 'BA',
    summary: 'Simple pastel presentation focused on the essentials.',
    accent: '#7868e6',
    surface: 'linear-gradient(135deg, #edeef7, #ffffff)',
    previewImage: '/assets/freefolio/images/basic.png',
  },
  {
    id: 'freefolio-beginner',
    folder: 'beginner',
    name: 'Freefolio Beginner',
    badge: 'BG',
    summary: 'Friendly modern layout with crisp cards and soft blue accents.',
    accent: '#2563eb',
    surface: 'linear-gradient(135deg, #eff6ff, #ffffff)',
    previewImage: '/assets/freefolio/images/beginner.png',
  },
  {
    id: 'freefolio-classic',
    folder: 'classic',
    name: 'Freefolio Classic',
    badge: 'CL',
    summary: 'Traditional portfolio structure with a dependable editorial rhythm.',
    accent: '#111827',
    surface: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    previewImage: '/assets/freefolio/images/classic.png',
  },
  {
    id: 'freefolio-clean',
    folder: 'clean',
    name: 'Freefolio Clean',
    badge: 'CN',
    summary: 'Minimal plant-inspired landing page with calm spacing.',
    accent: '#16a34a',
    surface: 'linear-gradient(135deg, #f0fdf4, #ecfccb)',
    previewImage: '/assets/freefolio/images/clean.png',
  },
  {
    id: 'freefolio-dark-hack',
    folder: 'dark-hack',
    name: 'Freefolio Dark Hack',
    badge: 'DH',
    summary: 'Cyber-dark portfolio with terminal energy and neon details.',
    accent: '#2dd4bf',
    surface: 'linear-gradient(135deg, #020617, #0f172a)',
    previewImage: '/assets/freefolio/images/dark-hack.png',
  },
  {
    id: 'freefolio-deepsea',
    folder: 'deepsea',
    name: 'Freefolio Deep Sea',
    badge: 'DS',
    summary: 'Ocean-toned portfolio with glassy cards and deep gradient sections.',
    accent: '#38bdf8',
    surface: 'linear-gradient(135deg, #082f49, #0f172a)',
    previewImage: '/assets/freefolio/images/deepsea.png',
  },
  {
    id: 'freefolio-easy',
    folder: 'easy',
    name: 'Freefolio Easy',
    badge: 'EZ',
    summary: 'Straightforward hero-first portfolio with clean storytelling.',
    accent: '#0f172a',
    surface: 'linear-gradient(135deg, #ffffff, #f8fafc)',
    previewImage: '/assets/freefolio/images/easy.png',
  },
  {
    id: 'freefolio-flower',
    folder: 'flower',
    name: 'Freefolio Flower',
    badge: 'FL',
    summary: 'Fresh botanical layout with soft cards and bright green accents.',
    accent: '#4d7c0f',
    surface: 'linear-gradient(135deg, #f7fee7, #ffffff)',
    previewImage: '/assets/freefolio/images/flower.png',
  },
  {
    id: 'freefolio-hacker',
    folder: 'hacker',
    name: 'Freefolio Hacker',
    badge: 'HK',
    summary: 'Retro hacker aesthetic with command-line inspired structure.',
    accent: '#22c55e',
    surface: 'linear-gradient(135deg, #000000, #052e16)',
    previewImage: '/assets/freefolio/images/hacker.png',
  },
  {
    id: 'freefolio-indify',
    folder: 'indify',
    name: 'Freefolio Indify',
    badge: 'IN',
    summary: 'Soft modern personal site with airy cards and service blocks.',
    accent: '#4f46e5',
    surface: 'linear-gradient(135deg, #eef2ff, #ffffff)',
    previewImage: '/assets/freefolio/images/indify.png',
  },
  {
    id: 'freefolio-ingolfur',
    folder: 'ingolfur',
    name: 'Freefolio Ingólfur',
    badge: 'IG',
    summary: 'Photography-led portfolio with oversized hero framing.',
    accent: '#f59e0b',
    surface: 'linear-gradient(135deg, #111827, #374151)',
    previewImage: '/assets/freefolio/images/ingolfur.png',
  },
  {
    id: 'freefolio-outlines',
    folder: 'outlines',
    name: 'Freefolio Outlines',
    badge: 'OL',
    summary: 'Outlined monochrome portfolio with strong section framing.',
    accent: '#111827',
    surface: 'linear-gradient(135deg, #f8fafc, #e5e7eb)',
    previewImage: '/assets/freefolio/images/outlines.png',
  },
  {
    id: 'freefolio-plain',
    folder: 'plain',
    name: 'Freefolio Plain',
    badge: 'PL',
    summary: 'Bold typography and large cards with a clean monochrome system.',
    accent: '#111827',
    surface: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
    previewImage: '/assets/freefolio/images/plain.png',
  },
  {
    id: 'freefolio-simple',
    folder: 'simple',
    name: 'Freefolio Simple',
    badge: 'SM',
    summary: 'Minimal startup-style portfolio with a sharp headline and illustration.',
    accent: '#ca4361',
    surface: 'linear-gradient(135deg, #fff1f2, #ffffff)',
    previewImage: '/assets/freefolio/images/simple.PNG',
  },
];

export const FREEFOLIO_THEME_IDS = FREEFOLIO_THEMES.map((theme) => theme.id);

export function isFreefolioTheme(theme: PortfolioTheme): theme is FreefolioThemeId {
  return FREEFOLIO_THEME_IDS.includes(theme as FreefolioThemeId);
}

export function getFreefolioThemeMeta(themeId: FreefolioThemeId) {
  return FREEFOLIO_THEMES.find((theme) => theme.id === themeId)!;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function paragraphize(value: string) {
  const blocks = value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  return blocks.length
    ? blocks.map((part) => `<p>${escapeHtml(part)}</p>`).join('')
    : '<p>Portfolio details will appear here when available.</p>';
}

function getDarkHackRoleParts(title: string) {
  const words = title
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (words.length >= 2) {
    return {
      first: words[0],
      second: words.slice(1).join(' '),
    };
  }

  if (words.length === 1) {
    return {
      first: words[0],
      second: 'Developer',
    };
  }

  return {
    first: 'Web',
    second: 'Developer',
  };
}

function summarizeText(value: string, maxLength = 220) {
  const normalized = value.replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

function normalizeFreefolioAssetUrls(markup: string, folder: string) {
  const assetRoot = `/assets/freefolio/${folder}/`;

  return markup.replace(
    /\b(href|src)=["']([^"'#][^"']*)["']/gi,
    (_match, attribute: string, rawValue: string) => {
      const value = rawValue.trim();

      if (
        value.startsWith('http://') ||
        value.startsWith('https://') ||
        value.startsWith('data:') ||
        value.startsWith('mailto:') ||
        value.startsWith('tel:') ||
        value.startsWith('//') ||
        value.startsWith('#')
      ) {
        return `${attribute}="${value}"`;
      }

      const normalizedValue = value.startsWith('/')
        ? `${assetRoot}${value.slice(1)}`
        : `${assetRoot}${value.replace(/^\.\//, '')}`;

      return `${attribute}="${normalizedValue}"`;
    }
  );
}

function extractBodyMarkup(sourceHtml: string) {
  const bodyMatch = sourceHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1] ?? sourceHtml;
}

function buildFreefolioHydrationScript(themeId: FreefolioThemeId, data: FreefolioThemeData) {
  const serializedData = JSON.stringify(data).replace(/<\//g, '<\\/');

  return `
    <script>
      (() => {
        const themeId = ${JSON.stringify(themeId)};
        const data = ${serializedData};
        const aboutParts = String(data.about || '')
          .split(/\\n{2,}/)
          .map((part) => part.trim())
          .filter(Boolean);

        const findFirst = (selectors) => {
          for (const selector of selectors) {
            const node = document.querySelector(selector);
            if (node) return node;
          }
          return null;
        };

        const findAll = (selectors) => {
          for (const selector of selectors) {
            const nodes = Array.from(document.querySelectorAll(selector));
            if (nodes.length) return nodes;
          }
          return [];
        };

        const setText = (selectors, value) => {
          if (!value) return;
          const node = findFirst(selectors);
          if (node) node.textContent = value;
        };

        const setParagraphs = (selectors) => {
          if (!aboutParts.length) return;
          const nodes = findAll(selectors);
          if (!nodes.length) return;

          nodes.forEach((node, index) => {
            node.textContent = aboutParts[index] || aboutParts[0];
          });
        };

        const fillList = (containerSelectors, itemSelectors, items, fillItem) => {
          const container = findFirst(containerSelectors);
          if (!container || !items.length) return;

          const existingItems = findAll(itemSelectors);
          const template = existingItems[0] || container.firstElementChild;
          if (!template) return;

          container.innerHTML = '';

          items.forEach((item, index) => {
            const node = template.cloneNode(true);
            fillItem(node, item, index);
            container.appendChild(node);
          });
        };

        document.title = data.full_name ? data.full_name + ' Portfolio' : document.title;

        if (themeId === 'freefolio-aurora') {
          const brand = document.querySelector('nav .gradient-text');
          if (brand) {
            brand.textContent = data.full_name || 'Aurora';
          }

          const heroHeading = document.querySelector('#home h1');
          if (heroHeading) {
            heroHeading.innerHTML = 'Hello, I\\'m <span class="gradient-text">' + (data.full_name || 'Aurora') + '</span>';
            heroHeading.className = 'text-5xl md:text-7xl font-bold mb-4 text-white';
          }

          const roleLine = document.querySelector('#home h1 + p');
          if (roleLine) {
            roleLine.textContent = data.title || '';
            roleLine.className = 'text-xl md:text-2xl text-gray-400 mb-8';
          }

          const aboutLine = document.querySelector('#home h1 + p + p');
          if (aboutLine) {
            aboutLine.textContent = aboutParts.join(' ');
            aboutLine.className = 'text-lg text-gray-400 max-w-2xl mx-auto mb-12';
          }

          return;
        }

        if (themeId === 'freefolio-indify') {
          const logo = document.querySelector('.nav__logo');
          if (logo) {
            logo.textContent = data.full_name || 'LOGO';
          }

          const greeting = document.querySelector('.home__greeting span');
          if (greeting) {
            greeting.textContent = 'HELLO,';
          }

          const title = document.querySelector('.home__title h1');
          if (title) {
            title.textContent = 'I\\'m ' + (data.full_name || 'John Doe');
            title.style.color = '#f9f9f9';
          }

          const career = document.querySelector('.home__career p');
          if (career) {
            career.textContent = data.title || '';
            career.style.color = '#e4a109';
          }

          const description = document.querySelector('.home__description p');
          if (description) {
            description.textContent = aboutParts.join(' ');
            description.style.color = '#a2acbd';
          }

          const hireButton = document.querySelector('.home__hire');
          if (hireButton) {
            hireButton.textContent = 'VIEW MY WORK';
          }

          const downloadButton = document.querySelector('.home__download');
          if (downloadButton) {
            downloadButton.textContent = 'DOWNLOAD CV';
          }

          return;
        }

        setText(
          [
            '.logo',
            '.logo h1',
            '.navbar-title h1',
            '.nav-logo h1',
            '.hero-content h1',
            '.hero-info h1',
            '.hero-text h1',
            '.header__name',
            '.header__sup-text',
            'main h1'
          ],
          data.full_name
        );

        setText(
          [
            '.hero-content h2',
            '.hero-info h2',
            '.hero-text h2',
            '.header__profession',
            '.header__msg',
            '.hero h2',
            'main h2'
          ],
          data.title
        );

        setParagraphs([
          '#about p',
          '.about-content p',
          '.bio p',
          '.about p',
          '.hero-info p',
          '.hero-text p',
          '.header__msg'
        ]);

        fillList(
          ['.projects-cards', '.project-boxes', '.project-container', '.works', '.cards', '.portfolio-container'],
          ['.project-card-info', '.project-box', '.project-card', '.work', '.card', '.portfolio-card'],
          data.projects,
          (node, project) => {
            const titleNode = node.querySelector('h2, h3, h4');
            if (titleNode) titleNode.textContent = project.title;

            const descriptionNode = node.querySelector('p, h5');
            if (descriptionNode) descriptionNode.textContent = project.description;

            const imageNode = node.querySelector('img');
            if (imageNode && project.image) {
              imageNode.src = project.image;
              imageNode.alt = project.title;
            }

            const links = Array.from(node.querySelectorAll('a'));
            if (links[0] && project.liveLink) links[0].setAttribute('href', project.liveLink);
            if (links[1] && project.githubLink) links[1].setAttribute('href', project.githubLink);

            const techList = node.querySelector('ul, .work__badges');
            if (techList && project.technologies.length) {
              if (techList.tagName === 'UL') {
                techList.innerHTML = project.technologies.map((tech) => '<li>' + tech + '</li>').join('');
              } else {
                techList.innerHTML = project.technologies
                  .map((tech) => '<span class="work__badge">' + tech + '</span>')
                  .join('');
              }
            }
          }
        );

        fillList(
          ['.skills', '.skills-card-wrapper', '.testimony-boxes', '.service-cards', '.services__container', '.tech-stack-grid'],
          ['.skills-card', '.testimony-box', '.service-card__box', '.services__card', '.tech-stack'],
          data.skills,
          (node, skill) => {
            const titleNode = node.querySelector('h2, h3, h4, p');
            if (titleNode) titleNode.textContent = skill.name;

            const descNode = node.querySelector('p');
            if (descNode) descNode.textContent = skill.level + '% proficiency';
          }
        );
      })();
    </script>
  `;
}

function joinTech(project: FreefolioThemeProject, separator = ' • ') {
  return project.technologies.length ? escapeHtml(project.technologies.join(separator)) : '';
}

function projectLinks(project: FreefolioThemeProject, className = '') {
  const links = [
    project.liveLink
      ? `<a href="${escapeHtml(project.liveLink)}" target="_blank" rel="noopener noreferrer" class="${className}">Live</a>`
      : '',
    project.githubLink
      ? `<a href="${escapeHtml(project.githubLink)}" target="_blank" rel="noopener noreferrer" class="${className}">Code</a>`
      : '',
  ].filter(Boolean);
  return links.join('');
}

function renderBasicSkills(skills: FreefolioThemeSkill[]) {
  return skills
    .map(
      (skill) => `
        <div class="skills-card">
          <h2>${escapeHtml(skill.name)}</h2>
          <p>${escapeHtml(`${skill.level}% confidence`)}</p>
        </div>
      `
    )
    .join('');
}

function renderBasicProjects(projects: FreefolioThemeProject[]) {
  return projects
    .map(
      (project) => `
        <div class="project-card-info">
          ${
            project.image
              ? `<img src="${escapeHtml(project.image)}" width="512" alt="${escapeHtml(project.title)}" class="card-info">`
              : ''
          }
          <h2>${escapeHtml(project.title)}</h2>
          <ul>
            ${
              project.technologies.length
                ? project.technologies.map((tech) => `<li>${escapeHtml(tech)}</li>`).join('')
                : `<li>${escapeHtml(project.description)}</li>`
            }
          </ul>
        </div>
      `
    )
    .join('');
}

function renderProgressSkills(skills: FreefolioThemeSkill[], barClass: string) {
  return skills
    .map(
      (skill) => `
        <div class="skill-card">
          <div class="skill-title-row">
            <h3>${escapeHtml(skill.name)}</h3>
            <span>${skill.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="${barClass}" style="width:${Math.max(0, Math.min(100, skill.level))}%"></div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderThemeBody(themeId: FreefolioThemeId, data: FreefolioThemeData) {
  switch (themeId) {
    case 'freefolio-anime':
      return `
        <header>
          <a href="#home" class="logo">Ani<span>me</span></a>
          <ul class="navbar">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Skills</a></li>
            <li><a href="#resume">Projects</a></li>
          </ul>
        </header>
        <section class="home" id="home">
          <div class="home-text">
            <h5>Hello, I'm</h5>
            <h1>${escapeHtml(data.full_name)}</h1>
            <h6>a passionate <span>${escapeHtml(data.title)}</span></h6>
            <a href="#resume" class="btn">See my work</a>
          </div>
          <div class="home-img"><img src="img/home.png" alt="anime illustration"></div>
        </section>
        <section class="about" id="about">
          <div class="about-img"><img src="img/about.png" alt="about illustration"></div>
          <div class="about-text">
            <h3>About Me</h3>
            <h2>I'm ${escapeHtml(data.title)}.</h2>
            ${paragraphize(data.about)}
          </div>
        </section>
        <section class="services" id="services">
          <div class="center"><h3>SKILLS</h3></div>
          <div class="service-content">
            ${data.skills
              .map(
                (skill) => `
                  <div class="row">
                    <i class='bx bx-code-alt'></i>
                    <h3>${escapeHtml(skill.name)}</h3>
                    <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>
        <section class="resume" id="resume">
          <div class="center"><h3>Projects</h3></div>
          <div class="resume-content">
            ${data.projects
              .map(
                (project) => `
                  <div class="box">
                    <h6>${joinTech(project) || 'Featured build'}</h6>
                    <h4>${escapeHtml(project.title)}</h4>
                    <p>${escapeHtml(project.description)}</p>
                    <h5>${projectLinks(project) || 'Portfolio project'}</h5>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>
      `;
    case 'freefolio-aurora':
      return `
        <div class="aurora-overlay"></div>
        <nav class="fixed top-0 w-full bg-dark-bg/90 backdrop-blur-md border-b border-dark-border z-50">
          <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
              <div class="text-2xl font-bold gradient-text">${escapeHtml(data.full_name)}</div>
              <ul class="hidden md:flex space-x-8">
                <li><a href="#about" class="hover:text-aurora-green transition">About</a></li>
                <li><a href="#skills" class="hover:text-aurora-green transition">Skills</a></li>
                <li><a href="#portfolio" class="hover:text-aurora-green transition">Portfolio</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <section id="home" class="min-h-screen flex items-center justify-center pt-20 relative">
          <div class="container mx-auto px-6 text-center relative z-10">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 gradient-text">${escapeHtml(data.full_name)}</h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-300">${escapeHtml(data.title)}</p>
            <div class="max-w-3xl mx-auto text-lg leading-8 text-gray-300">${paragraphize(data.about)}</div>
          </div>
        </section>
        <section id="skills" class="py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-12 gradient-text">Technical Skills</h2>
            <div class="grid md:grid-cols-2 gap-6">
              ${data.skills
                .map(
                  (skill) => `
                    <div class="bg-dark-card/70 rounded-2xl p-6 card-hover">
                      <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xl font-semibold">${escapeHtml(skill.name)}</h3>
                        <span class="text-aurora-green">${skill.level}%</span>
                      </div>
                      <div class="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-gradient-to-r from-aurora-green via-aurora-blue to-aurora-purple rounded-full" style="width:${skill.level}%"></div>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>
        <section id="portfolio" class="py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center mb-12 gradient-text">Portfolio</h2>
            <div class="grid lg:grid-cols-2 gap-8">
              ${data.projects
                .map(
                  (project) => `
                    <div class="bg-dark-card/70 rounded-3xl overflow-hidden card-hover">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="w-full h-64 object-cover">` : ''}
                      <div class="p-8">
                        <h3 class="text-2xl font-semibold">${escapeHtml(project.title)}</h3>
                        <p class="mt-4 text-gray-300 leading-7">${escapeHtml(project.description)}</p>
                        <p class="mt-4 text-sm text-aurora-green">${joinTech(project)}</p>
                        <div class="mt-6 flex gap-3">${projectLinks(project, 'px-4 py-2 rounded-full border border-aurora-green text-aurora-green hover:bg-aurora-green hover:text-dark-bg transition')}</div>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'freefolio-basic':
      return `
        <div class="wrapper">
          <header>
            <nav class="navbar">
              <div class="navbar-title"><h1>${escapeHtml(data.full_name)}</h1></div>
            </nav>
          </header>
          <main>
            <section class="hero">
              <div class="hero-image">
                <img class="images" src="./images/undraw_developer_activity_re_39tg.svg" alt="Profile">
              </div>
              <div class="hero-info">
                <h1>Hi, I'm <span>${escapeHtml(data.full_name)}</span></h1>
                <h2>${escapeHtml(data.title)}</h2>
                ${paragraphize(data.about)}
                <a href="#projects" class="button">View Projects</a>
              </div>
            </section>
            <hr>
            <section class="skills">${renderBasicSkills(data.skills)}</section>
            <hr>
            <section class="projects-info" id="projects">
              <h1>Projects</h1>
              <div class="projects-cards">${renderBasicProjects(data.projects)}</div>
            </section>
            <hr>
          </main>
        </div>
      `;
    case 'freefolio-beginner':
      return `
        <header>
          <nav class="navbar">
            <h1 class="logo">${escapeHtml(data.full_name)}</h1>
            <ul class="nav-menu">
              <li class="nav-item"><a href="#hero__section" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="#about__section" class="nav-link">About</a></li>
              <li class="nav-item"><a href="#project__section" class="nav-link">Projects</a></li>
              <li class="nav-item"><a href="#skills__section" class="nav-link">Skills</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section class="hero" id="hero__section">
            <article class="left-hero">
              <h1>${escapeHtml(data.full_name)}</h1>
              <h2>${escapeHtml(data.title)}</h2>
              ${paragraphize(data.about)}
              <button class="btn" type="button" onclick="location.hash='project__section'">See Projects</button>
            </article>
            <div class="right-hero"><img id="hero__img" src="assets/undraw_developer_activity_re_39tg.svg" alt="hero"></div>
          </section>
          <section class="projects" id="project__section">
            <h3 class="project-heading">Projects</h3>
            <div class="project-boxes">
              ${data.projects
                .map(
                  (project) => `
                    <article class="project-box">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">` : ''}
                      <h4>${escapeHtml(project.title)}</h4>
                      <p>${escapeHtml(project.description)}</p>
                      <small>${joinTech(project)}</small>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section class="testimony" id="skills__section">
            <h3 class="testimonial-heading">Skills</h3>
            <div class="testimony-boxes">
              ${data.skills
                .map(
                  (skill) => `
                    <article class="testimony-box">
                      <h4>${escapeHtml(skill.name)}</h4>
                      <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
    case 'freefolio-classic':
      return `
        <header>
          <nav>
            <div class="logo">${escapeHtml(data.full_name)}</div>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section class="hero">
            <div class="hero-content">
              <h1>${escapeHtml(data.full_name)}</h1>
              <p>${escapeHtml(data.title)}</p>
              <a href="#projects" class="cta">View My Projects</a>
            </div>
          </section>
          <section id="about">
            <h1>About Me</h1>
            ${paragraphize(data.about)}
          </section>
          <section id="projects">
            <h1>My Projects</h1>
            <div class="projects-grid">
              ${data.projects
                .map(
                  (project) => `
                    <div class="card">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">` : ''}
                      <h3>${escapeHtml(project.title)}</h3>
                      <p>${escapeHtml(project.description)}</p>
                      <a href="${escapeHtml(project.liveLink || project.githubLink || '#projects')}">View Project</a>
                    </div>
                  `
                )
                .join('')}
            </div>
          </section>
          <section id="skills">
            <h1>Skills</h1>
            <div class="projects-grid">
              ${data.skills
                .map(
                  (skill) => `
                    <div class="card">
                      <h3>${escapeHtml(skill.name)}</h3>
                      <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </div>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
    case 'freefolio-clean':
      return `
        <header>
          <div class="logo"><img src="./img/logo.svg" alt="logo"></div>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </nav>
        </header>
        <main>
          <section class="hero">
            <div class="hero-content">
              <h1>${escapeHtml(data.full_name)}</h1>
              <h2>${escapeHtml(data.title)}</h2>
              ${paragraphize(data.about)}
            </div>
            <img src="./img/plant.png" alt="plant art">
          </section>
          <section class="services" id="skills">
            ${data.skills
              .map(
                (skill) => `
                  <div class="service-card">
                    <h3>${escapeHtml(skill.name)}</h3>
                    <p>${escapeHtml(`${skill.level}% confidence`)}</p>
                  </div>
                `
              )
              .join('')}
          </section>
          <section class="portfolio" id="projects">
            ${data.projects
              .map(
                (project) => `
                  <div class="portfolio-card">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    <small>${joinTech(project)}</small>
                  </div>
                `
              )
              .join('')}
          </section>
        </main>
      `;
    case 'freefolio-dark-hack':
      const darkHackRole = getDarkHackRoleParts(data.title);
      return `
        <main>
          <header id="heroHeader" class="hero-header">
            <nav id="navBar" class="nav">
              <div class="container">
                <button type="button" id="hamburgerBtn" class="nav__hamburger-btn" aria-label="Toggle navigation">
                  <span class="nav__hamburger-top"></span>
                  <span class="nav__hamburger-center"></span>
                  <span class="nav__hamburger-bottom"></span>
                </button>
                <ul id="navList" class="nav__list">
                  <li class="nav__list-item">
                    <a class="nav__list-link active" href="#heroHeader">&lt;Home &sol;&gt;</a>
                  </li>
                  <li class="nav__list-item">
                    <a class="nav__list-link" href="#services">&lt;Skills &sol;&gt;</a>
                  </li>
                  <li class="nav__list-item">
                    <a class="nav__list-link" href="#works">&lt;Projects &sol;&gt;</a>
                  </li>
                  <li class="nav__list-item">
                    <a class="nav__list-link" href="#contact">&lt;Contact &sol;&gt;</a>
                  </li>
                </ul>
              </div>
            </nav>
            <section class="header__container container">
              <div class="header__left" style="position: relative; z-index: 2; max-width: 52rem;">
                <span class="header__sup-text">Hello There! I am ${escapeHtml(data.full_name)}</span>
                <p style="margin-top: 1.2rem; font-size: 1.8rem; font-weight: 700; color: #93ffd0;">${escapeHtml(data.full_name)}</p>
                <h1 class="header__title">
                  <span class="header__title-1" data-role="${escapeHtml(darkHackRole.first.toUpperCase())}">${escapeHtml(darkHackRole.first)}</span>
                  <span class="header__title-2" data-role="${escapeHtml(darkHackRole.second.toUpperCase())}">${escapeHtml(darkHackRole.second)}</span>
                </h1>
                <p class="header__msg">${escapeHtml(summarizeText(data.about))}</p>
                <a href="#works" class="header__resume">View Projects</a>
              </div>
              <div class="header__right">
                <img src="./assets/illustrations/header.svg" alt="Header section illustration"/>
              </div>
            </section>
            <span class="header__bg"></span>
          </header>
          <section id="services" class="section container">
            <h2 class="section__title">Skills</h2>
            <div class="service-cards">
              ${data.skills
                .map(
                  (skill, index) => `
                    <article class="service-card__box">
                      <span class="service-card__illustration">
                        <img src="./assets/services/${index % 3 === 0 ? 'support' : index % 3 === 1 ? 'design' : 'developing'}.svg" alt="${escapeHtml(skill.name)} illustration"/>
                      </span>
                      <h3 class="service-card__title">${escapeHtml(skill.name)}</h3>
                      <p class="service-card__msg">${escapeHtml(`${skill.level}% proficiency`)}</p>
                      <span class="service-card__bg"></span>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section id="works" class="section container">
            <h2 class="section__title">My Works</h2>
            <div class="works">
              ${data.projects
                .map(
                  (project) => `
                    <article class="work">
                      <div class="work__box">
                        <span class="work__img-box">
                          <img src="${escapeHtml(project.image || './assets/works/sample.png')}" alt="${escapeHtml(project.title)}"/>
                        </span>
                        <h3 class="work__title">${escapeHtml(project.title)}</h3>
                        <span class="work__badges">
                          ${project.technologies
                            .slice(0, 4)
                            .map((tech) => `<span class="work__badge">${escapeHtml(tech)}</span>`)
                            .join('')}
                        </span>
                      </div>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section id="contact" class="section container">
            <h2 class="section__title">Let's Connect!</h2>
            <div class="contact">
              <form class="contact__form">
                <div class="contact__field-wrapper">
                  <label for="contactNameTxt">Name:</label>
                  <input id="contactNameTxt" type="text" value="${escapeHtml(data.full_name)}" placeholder="What's your name?"/>
                </div>
                <div class="contact__field-wrapper">
                  <label for="contactDescriptionTxt">Message:</label>
                  <textarea id="contactDescriptionTxt" placeholder="Lets connect!">${escapeHtml(data.about)}</textarea>
                </div>
                <button type="button" class="contact__submit-btn">Say Hello</button>
              </form>
              <span class="contact__illustration">
                <img src="./assets/illustrations/connect.svg" alt="Group of people connecting with each other"/>
              </span>
            </div>
          </section>
        </main>
      `;
    case 'freefolio-deepsea':
      return `
        <header>
          <nav id="nav-bar" class="nav-bar">
            <a href="#hero" class="logo"><img src="assets/logo.png" alt="logo"></a>
            <div class="nav-links">
              <a class="nav-links-item" href="#about">About</a>
              <a class="nav-links-item" href="#skills">Skills</a>
              <a class="nav-links-item" href="#portfolio">Portfolio</a>
            </div>
          </nav>
        </header>
        <main>
          <section id="hero">
            <div class="hero-text">
              <h1>${escapeHtml(data.full_name)}</h1>
              <h2>${escapeHtml(data.title)}</h2>
              ${paragraphize(data.about)}
            </div>
            <div class="hero-image"><img class="hero-image" src="assets/hero.png" width="512" alt="Hero Image" /></div>
          </section>
          <section id="skills">
            <h2 class="text-gradient">Skills</h2>
            <div class="cards">
              ${data.skills
                .map(
                  (skill) => `
                    <article class="card">
                      <h3>${escapeHtml(skill.name)}</h3>
                      <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section id="portfolio">
            <h2 class="text-gradient">Portfolio</h2>
            <div class="cards">
              ${data.projects
                .map(
                  (project) => `
                    <article class="card">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">` : ''}
                      <h3>${escapeHtml(project.title)}</h3>
                      <p>${escapeHtml(project.description)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
    case 'freefolio-easy':
      return `
        <header>
          <nav>
            <h1>${escapeHtml(data.full_name)}</h1>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section class="main">
            <div class="main-text">
              <h1>${escapeHtml(data.full_name)}</h1>
              <h2>${escapeHtml(data.title)}</h2>
              ${paragraphize(data.about)}
            </div>
            <div class="hero-image"></div>
          </section>
          <section class="sub-section" id="skills">
            <h2>Skills</h2>
            <div class="cards">
              ${data.skills
                .map(
                  (skill) => `
                    <article class="card">
                      <h3>${escapeHtml(skill.name)}</h3>
                      <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section class="sub-section" id="projects">
            <h2>Projects</h2>
            <div class="cards">
              ${data.projects
                .map(
                  (project) => `
                    <article class="card">
                      <h3>${escapeHtml(project.title)}</h3>
                      <p>${escapeHtml(project.description)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
    case 'freefolio-flower':
      return `
        <nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
          <div class="container mx-auto px-6 py-4 flex items-center justify-between">
            <div class="text-2xl font-bold text-leaf-green">${escapeHtml(data.full_name)}</div>
            <ul class="hidden md:flex gap-6">
              <li><a href="#about" class="text-gray-700 hover:text-leaf-green transition">About</a></li>
              <li><a href="#skills" class="text-gray-700 hover:text-leaf-green transition">Skills</a></li>
              <li><a href="#projects" class="text-gray-700 hover:text-leaf-green transition">Projects</a></li>
            </ul>
          </div>
        </nav>
        <section id="home" class="min-h-screen flex items-center justify-center pt-16">
          <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold text-gray-800 mb-6">${escapeHtml(data.full_name)}</h1>
            <p class="text-2xl text-leaf-green font-semibold">${escapeHtml(data.title)}</p>
            <div class="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-600">${paragraphize(data.about)}</div>
          </div>
        </section>
        <section id="skills" class="py-20 bg-white/50">
          <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">My Garden of Skills</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${data.skills
                .map(
                  (skill) => `
                    <div class="bg-white rounded-3xl shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800">${escapeHtml(skill.name)}</h3>
                      <p class="mt-3 text-gray-600">${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>
        <section id="projects" class="py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">My Garden Projects</h2>
            <div class="grid lg:grid-cols-3 gap-8">
              ${data.projects
                .map(
                  (project) => `
                    <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="w-full h-56 object-cover">` : ''}
                      <div class="p-6">
                        <h3 class="text-2xl font-semibold text-gray-800">${escapeHtml(project.title)}</h3>
                        <p class="text-gray-600 mt-4">${escapeHtml(project.description)}</p>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>
        </section>
      `;
    case 'freefolio-hacker':
      return `
        <div id="app">
          <div data-app="true" class="v-application v-application--is-ltr theme--dark" id="app">
            <div class="v-application--wrap">
              <header class="container" style="min-height: 100vh">
                <div class="row align-center justify-center">
                  <div class="text-center col-md-10 col-12">
                    <h1 class="primary--text">${escapeHtml(data.full_name)}</h1>
                    <h2>${escapeHtml(data.title)}</h2>
                    <div class="mt-5">${paragraphize(data.about)}</div>
                  </div>
                </div>
              </header>
              <main>
                <section class="row mb-5" id="skills">
                  <div class="col-12"><h1 class="primary--text">/Skills</h1></div>
                  ${data.skills
                    .map(
                      (skill) => `
                        <div class="col-md-6 col-12">
                          <div class="v-card theme--dark">
                            <div class="v-card__text">
                              <h2 class="primary--text">${escapeHtml(skill.name)}</h2>
                              <p>:${escapeHtml(`${skill.level}% proficiency`)}</p>
                              <small class="primary--text">~/.skills</small>
                            </div>
                          </div>
                        </div>
                      `
                    )
                    .join('')}
                </section>
                <section class="row mb-5" id="works">
                  <div class="col-12"><h1 class="primary--text">/Projects</h1></div>
                  ${data.projects
                    .map(
                      (project) => `
                        <div class="col-md-4 col-12">
                          <div class="v-card theme--dark">
                            ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">` : ''}
                            <div class="v-card__text">
                              <h2 class="primary--text">${escapeHtml(project.title)}</h2>
                              <p>${escapeHtml(project.description)}</p>
                            </div>
                          </div>
                        </div>
                      `
                    )
                    .join('')}
                </section>
              </main>
            </div>
          </div>
        </div>
      `;
    case 'freefolio-indify':
      return `
        <header class="l-header" id="header">
          <nav class="nav bd-container">
            <a href="#home" class="nav__logo">${escapeHtml(data.full_name)}</a>
            <div class="nav__menu">
              <a href="#about" class="nav__link">About</a>
              <a href="#services" class="nav__link">Skills</a>
              <a href="#portfolio" class="nav__link">Portfolio</a>
            </div>
          </nav>
        </header>
        <main class="l-main">
          <section class="home" id="home">
            <div class="home__container bd-container bd-grid">
              <div class="home__data">
                <span class="home__greeting">Hello, my name is</span>
                <h1 class="home__name">${escapeHtml(data.full_name)}</h1>
                <span class="home__profession">${escapeHtml(data.title)}</span>
                <div class="home__description">${paragraphize(data.about)}</div>
              </div>
              <div class="home__img"><img src="./assets/img/main-image.svg" alt="hero art"></div>
            </div>
          </section>
          <section class="services section bd-container" id="services">
            <h2 class="section-title">Skills</h2>
            <div class="services__container bd-grid">
              ${data.skills
                .map(
                  (skill) => `
                    <div class="services__data">
                      <h3 class="services__title">${escapeHtml(skill.name)}</h3>
                      <p class="services__description">${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </div>
                  `
                )
                .join('')}
            </div>
          </section>
          <section class="portfolio section bd-container" id="portfolio">
            <h2 class="section-title">Portfolio</h2>
            <div class="portfolio__container bd-grid">
              ${data.projects
                .map(
                  (project) => `
                    <div class="portfolio__content">
                      ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="portfolio__img">` : ''}
                      <div class="portfolio__data">
                        <h3 class="portfolio__title">${escapeHtml(project.title)}</h3>
                        <p class="portfolio__description">${escapeHtml(project.description)}</p>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
    case 'freefolio-ingolfur':
      return `
        <header class="s-header">
          <div class="row width-sixteen-col">
            <nav class="row header-nav-wrap">
              <ul class="header-main-nav">
                <li><a class="smoothscroll active-link" href="#hero" title="Intro">Home</a></li>
                <li><a class="smoothscroll" href="#about" title="About">About</a></li>
                <li><a class="smoothscroll" href="#projects" title="Works">Projects</a></li>
                <li><a class="smoothscroll" href="#skills" title="Skills">Skills</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <section id="hero" class="s-hero target-section" style="background-image:url('images/hero-bg.jpg'); background-size:cover;">
          <div class="row hero-content">
            <div class="column large-full">
              <h1>${escapeHtml(data.full_name)}</h1>
              <h3>${escapeHtml(data.title)}</h3>
            </div>
          </div>
        </section>
        <section id="about" class="s-about target-section">
          <div class="row"><div class="column large-full">${paragraphize(data.about)}</div></div>
        </section>
        <section id="projects" class="s-portfolio target-section">
          <div class="row section-header"><div class="column large-full"><h3 class="subhead">Portfolio</h3></div></div>
          <div class="row folio-list block-large-1-2 block-stack-on-1000">
            ${data.projects
              .map(
                (project) => `
                  <div class="column folio-item">
                    <a class="folio-item__thumb" href="${escapeHtml(project.image || 'images/portfolio/mountain.jpg')}">
                      <img src="${escapeHtml(project.image || 'images/portfolio/mountain.jpg')}" alt="${escapeHtml(project.title)}">
                    </a>
                    <div class="folio-item__info">
                      <div class="folio-item__cat">${joinTech(project, ', ') || 'Project'}</div>
                      <h4 class="folio-item__title">${escapeHtml(project.title)}</h4>
                      <p>${escapeHtml(project.description)}</p>
                    </div>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>
        <section id="skills" class="s-about target-section">
          <div class="row">
            ${data.skills
              .map(
                (skill) => `
                  <div class="column large-3 medium-6">
                    <h4>${escapeHtml(skill.name)}</h4>
                    <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>
      `;
    case 'freefolio-outlines':
      return `
        <header>
          <nav class="navbar-nav">
            <div class="nav-logo"><h1>${escapeHtml(data.full_name)}</h1></div>
            <ul id="primary-nav" class="primary-nav" data-visible="true">
              <li><a class="nav-link" href="#about">About</a></li>
              <li><a class="nav-link" href="#portfolio">Portfolio</a></li>
              <li><a class="nav-link" href="#skills">Skills</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section id="hero">
            <div class="hero-container">
              <div class="hero-text-container">
                <p>Hey there,</p>
                <h2>I am ${escapeHtml(data.full_name)}</h2>
                <p>${escapeHtml(data.title)}</p>
              </div>
              <a href="#portfolio" class="hero-button">See the work</a>
            </div>
          </section>
          <section id="about">
            <div class="section-highlight">ABOUT</div>
            <div class="about-container">
              <div class="about-card">
                <section class="about-content">
                  <h2>&gt; About</h2>
                  ${paragraphize(data.about)}
                </section>
              </div>
            </div>
          </section>
          <section id="skills">
            <div class="section-highlight">SKILLS</div>
            <div class="about-container">
              <div class="about-card">
                <section class="about-content tech-stack-section">
                  <h3>Current skill stack</h3>
                  <div class="tech-stack-grid">
                    ${data.skills
                      .map(
                        (skill) => `
                          <div class="tech-stack">
                            <span>${escapeHtml(skill.name)}</span>
                          </div>
                        `
                      )
                      .join('')}
                  </div>
                </section>
              </div>
            </div>
          </section>
          <section id="portfolio">
            <div class="section-highlight">PORTFOLIO</div>
            <div class="portfolio-container">
              <div class="portfolio-card">
                <div class="portfolio-content">
                  <h2>&gt; Portfolio</h2>
                  <div class="project-container">
                    ${data.projects
                      .map(
                        (project) => `
                          <section class="project-card">
                            ${project.image ? `<img class="project-img" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" />` : ''}
                            <h3>${escapeHtml(project.title)}</h3>
                            <h5>${joinTech(project, ', ') || 'Project build'}</h5>
                            <p>${escapeHtml(project.description)}</p>
                            <div class="project-card-links">
                              ${projectLinks(project)}
                            </div>
                          </section>
                        `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      `;
    case 'freefolio-plain':
      return `
        <div id="app">
          <div data-app="true" class="v-application v-application--is-ltr theme--light" id="app">
            <div class="v-application--wrap">
              <nav>
                <header class="v-sheet theme--light v-toolbar v-app-bar v-app-bar--fixed white">
                  <div class="v-toolbar__content justify-center flex-wrap">
                    <a href="#skills" class="ma-1 v-btn v-btn--text theme--light v-size--large"><span class="v-btn__content">Skills</span></a>
                    <a href="#works" class="ma-1 v-btn v-btn--text theme--light v-size--large"><span class="v-btn__content">Recent Works</span></a>
                    <a href="#about" class="ma-1 v-btn v-btn--outlined v-btn--text theme--light v-size--large"><span class="v-btn__content">About</span></a>
                  </div>
                </header>
              </nav>
              <header class="container fill-height" style="min-height: 100vh">
                <div class="row align-center justify-center">
                  <div class="text-center col-md-10 col-12">
                    <h1 class="display-4">${escapeHtml(data.full_name)}</h1>
                    <h2>${escapeHtml(data.title)}</h2>
                  </div>
                  <div class="text-center col-md-5 col-12">${paragraphize(data.about)}</div>
                </div>
              </header>
              <main>
                <section>
                  <div class="container fill-height" id="skills" style="height: auto; min-height: 100vh">
                    <div class="row justify-center">
                      <div class="text-center col-md-10 col-12"><h1>#Skills</h1></div>
                      ${data.skills
                        .map(
                          (skill) => `
                            <div class="text-center col-sm-6 col-md-4 col-12">
                              <div class="v-card v-card--hover v-sheet theme--light" style="height: 100%">
                                <div class="v-card__text">
                                  <h2>${escapeHtml(skill.name)}</h2>
                                  <br />
                                  <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                                </div>
                              </div>
                            </div>
                          `
                        )
                        .join('')}
                    </div>
                  </div>
                </section>
                <section>
                  <div class="container fill-height" id="works" style="height: auto; min-height: 100vh">
                    <div class="row justify-center">
                      <div class="text-center col-md-10 col-12"><h1>#Recent Works</h1></div>
                      ${data.projects
                        .map(
                          (project) => `
                            <div class="text-center col-sm-6 col-md-4 col-12">
                              <div class="v-card v-card--hover v-sheet theme--light" style="height: 100%">
                                ${project.image ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">` : ''}
                                <div class="v-card__text">
                                  <h2>${escapeHtml(project.title)}</h2>
                                  <br />
                                  <p>${escapeHtml(project.description)}</p>
                                </div>
                              </div>
                            </div>
                          `
                        )
                        .join('')}
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      `;
    case 'freefolio-simple':
      return `
        <header>
          <nav class="desktop-nav">
            <ul class="links">
              <li><a href="#about">About me</a><div class="Line"></div></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section class="Hero">
            <h1>I am <span>${escapeHtml(data.full_name)}</span></h1>
            <p>${escapeHtml(data.title)}</p>
            <div class="mt-4">${paragraphize(data.about)}</div>
          </section>
          <section class="illustration"><img src="./pictures/illustration.svg" alt=""></section>
          <section class="Hero" id="skills">
            <h1>Skills</h1>
            <div class="cards">
              ${data.skills
                .map(
                  (skill) => `
                    <article class="card">
                      <h3>${escapeHtml(skill.name)}</h3>
                      <p>${escapeHtml(`${skill.level}% proficiency`)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
          <section class="Hero" id="projects">
            <h1>Projects</h1>
            <div class="cards">
              ${data.projects
                .map(
                  (project) => `
                    <article class="card">
                      <h3>${escapeHtml(project.title)}</h3>
                      <p>${escapeHtml(project.description)}</p>
                    </article>
                  `
                )
                .join('')}
            </div>
          </section>
        </main>
      `;
  }
}

export function buildFreefolioDocument(themeId: FreefolioThemeId, sourceHtml: string, data: FreefolioThemeData) {
  const meta = getFreefolioThemeMeta(themeId);
  const headMatch = sourceHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch?.[1] ?? '';
  const body = extractBodyMarkup(sourceHtml);
  const sanitizedHead = normalizeFreefolioAssetUrls(
    head.replace(/<title[\s\S]*?<\/title>/gi, ''),
    meta.folder
  );
  const renderedBody = normalizeFreefolioAssetUrls(body, meta.folder);
  const hydrationScript = buildFreefolioHydrationScript(themeId, data);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    ${sanitizedHead}
    <title>${escapeHtml(meta.name)}</title>
    <style>
      body { margin: 0; }
      section#home,
      section#hero,
      section#hero__section,
      .hero-header,
      .header__container,
      .hero,
      .home,
      header.container.fill-height,
      [style*="min-height: 100vh"] {
        min-height: auto !important;
        height: auto !important;
      }
      section#home,
      section#hero,
      section#hero__section,
      .hero,
      .home,
      .header__container {
        padding-top: clamp(5rem, 8vw, 7rem) !important;
        padding-bottom: clamp(3rem, 6vw, 5rem) !important;
      }
      .home__container {
        min-height: 72vh !important;
        height: auto !important;
        align-content: center !important;
      }
      .home__data {
        max-width: 42rem;
      }
      .home__title h1,
      .home__career p,
      .home__description p,
      .home__greeting span {
        color: inherit;
      }
      nav.fixed + section#home,
      nav.fixed + section#hero,
      nav.fixed + section#hero__section {
        margin-top: 0 !important;
      }
    </style>
  </head>
  <body>
    ${renderedBody}
    ${hydrationScript}
  </body>
</html>`;
}
