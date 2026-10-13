export const experience = [
  {
    role: 'Software Engineer', org: 'eTech', place: 'Kathmandu',
    dates: '2026 — present',
    /* One honest line, pending the author's own wording. Do not invent scope. */
    lines: ['Backend and systems work on internal products.'],
    stack: [],
  },
  {
    role: 'Software Engineer', org: 'Medisha', place: 'Kathmandu',
    dates: '2025 — 2026',
    lines: [
      'Worked daily inside openIMIS — a large open-source modular health insurance platform — on a client deployment built from a vendor-maintained fork, rather than upstream contributions.',
      'Built and deployed the Keycloak identity provider for Nepal Health SSO, and wired OAuth2 / OIDC into the platform REST layer.',
      'Maintained the claims module across several releases spanning paired frontend and backend repositories.',
    ],
    stack: ['Python', 'Django', 'React', 'PostgreSQL', 'Keycloak'],
  },
  {
    role: 'Full-Stack Intern', org: 'Agragami Tech', place: 'Kathmandu',
    dates: '2024',
    lines: ['Geospatial data interfaces against backend APIs, and CI/CD with Docker and GitHub Actions.'],
    stack: ['Next.js', 'TanStack', 'Docker'],
  },
] as const;

export const education = {
  degree: 'B.E. Computer Engineering',
  school: 'Tribhuvan University — Thapathali Campus, Institute of Engineering',
  dates: '2022 — 2026',
} as const;

export const currently = [
  'Extending Mitsuba with neural spectral sampling for the differentiable path tracer',
  'Rebuilding NyxVoxLab\'s global illumination around radiance cascades',
  'Reading NeRF and Gaussian splatting papers, connecting them back to DDA and path tracing',
  'Working through OpenAI Spinning Up for reinforcement-learning foundations',
] as const;
