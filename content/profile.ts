/* Content is INERT. Nothing in this folder knows corruption exists — the
   rendering layer applies it. That separation is what lets the LLM guide be
   grounded on clean text later, however rotted the screen looks. */

export const profile = {
  name: 'Kirtan Kunwar',
  /* The lede claims a BACKGROUND, not a title, and since the audience went
     broad (2026-09-21) it shows range instead of arguing for one programme.
     Every clause is checkable against the sections below it. */
  lede:
    "Software engineer in Kathmandu. I write engines and runtimes in C++, and I work with Nepal's healthcare systems.",
  stack: ['Keycloak', 'OAuth2 / OIDC', 'PostgreSQL', 'Django', 'Linux', 'C++20', 'Docker'],
  email: 'kunwarkirtan36@gmail.com',
  github: 'https://github.com/kiyotone',
  linkedin: 'https://www.linkedin.com/in/kirtan-kunwar',
} as const;

export const paper = {
  title: 'Wavelet-Space Representations for Neural Super-Resolution in Rendering Pipelines',
  venue: 'Elsevier Computers & Graphics',
  year: 2026,
  doi: 'https://doi.org/10.1016/j.cag.2026.104591',
  authors: 'Prateek Poudel, Prashant Aryal, Kirtan Kunwar, Navin Nepal, Dinesh Baniya Kshatri',
  contribution:
    'I built the Unreal Engine C++ plugin that extracted G-buffers and temporal features to construct the training dataset.',
  /* The paper's result, kept as the paper's — not as a portfolio stat. */
  result: 'The method reported +1.5 dB PSNR and ~17% lower LPIPS for roughly 14% more runtime.',
  code: 'https://github.com/Prateek61/WDSS',
} as const;

/* These are HIS engine numbers, measured in his own repos.

   The wavelet-space paper's results (+1.5 dB PSNR, −17% LPIPS, ~14% runtime)
   deliberately do NOT appear here. They belong to WDSS — a four-author paper —
   and a stat tile on a personal site reads as a personal result. They stay in
   the paper's own paragraph, attributed, where they are true.

   Every figure is the author's own and is marked for verification against
   source logs before this site goes public. Do not add a number that has not
   been re-run. */
export const numbers = [
  { v: '223 fps', k: 'at 268M voxels', note: 'SVDAG + GI — 1.84× cost for 8× the voxels' },
  { v: '51×', k: 'cheaper subtree rebuild', note: 'chunked vs. full SVDAG rebuild' },
  { v: '752 → 30 ms', k: 'worst streaming pass', note: 'root-caused to GI incremental re-prime' },
  { v: '3.8–10.6×', k: 'closer to ground truth', note: 'GI vs. direct, against Mitsuba 3' },
  { v: '144×', k: 'separation FLIP found', note: 'on a bad pair SSIM scored as fine' },
  { v: 'p50 / p95 / p99', k: 'reported, never averages', note: 'vsync off, fixed camera path' },
] as const;
