import type { Config } from 'tailwindcss';

/* Colours are NOT defined here. They are declared once as CSS custom
   properties in app/globals.css; Tailwind only names them. A literal colour
   in this file would be a second source of truth. */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { night: 'var(--night)', osd: 'var(--osd)', bone: 'var(--bone)', dust: 'var(--dust)', rec: 'var(--rec)', paper: 'var(--paper)', ink: 'var(--ink)' },
      fontFamily: {
        title: ['var(--f-title)'],
        type: ['var(--f-type)'],
        osd: ['var(--f-osd)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
