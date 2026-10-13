/* Content is INERT. Nothing here knows the plate exists.

   EVERY LINE IN THIS FILE IS TRUE AND CONFIRMED BY KIRTAN.

   What is deliberately NOT here, and must never be added unless he does it
   and says so: CTF placements, HackTheBox or TryHackMe ranks, certifications,
   CVEs, bug-bounty findings, penetration tests, or any claim of offensive
   work. He has none of these yet. An admissions committee checks, and one
   invented line costs more than a thin section does. */

export const identity = {
  lines: [
    'Built and deployed the Keycloak identity provider for Nepal Health SSO, and wired OAuth2 / OIDC into the platform REST layer.',
    'Worked daily inside a national health insurance platform holding patient and claims data — access control, session handling and federation were the job, not a side concern.',
  ],
  stack: ['Keycloak', 'OAuth2', 'OIDC', 'PostgreSQL', 'Django', 'Linux'],
} as const;

/* The honest statement of direction. It claims an intention and a background,
   never an experience. If he later has labs, write-ups or tooling, they go
   BELOW this and this paragraph gets shorter. */
export const direction = {
  heading: 'Where I am going',
  body:
    'I am applying to study offensive security. I have not done professional penetration testing and I am not going to pretend otherwise. What I have is the other side of it: I have built and run the things red teams go looking at — a national single-sign-on, a health platform holding claims and patient records, C++ systems where memory layout is something I choose rather than something I inherit.',
  second:
    'The work on this tape is the argument: systems I built and ran, and numbers I measured myself. I would rather show that than claim a title I have not earned yet.',
} as const;
