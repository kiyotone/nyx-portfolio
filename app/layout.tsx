import type { Metadata, Viewport } from 'next';
import { SECTIONS } from '@/content/sections';
import './globals.css';

/* The site's public origin. It is only used to make the Open Graph image URL
   absolute, which crawlers require — relative ones are ignored and the link
   preview comes back blank. On Vercel it follows the production domain on its
   own; NEXT_PUBLIC_SITE_URL overrides it anywhere else. */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://kirtankunwar.com');

const DESCRIPTION =
  "Software engineer in Kathmandu: C++ engines and runtimes, and work on Nepal's healthcare systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Kirtan Kunwar',
  description: DESCRIPTION,
  applicationName: 'Kirtan Kunwar',
  authors: [{ name: 'Kirtan Kunwar' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Kirtan Kunwar',
    title: 'Kirtan Kunwar',
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Kirtan Kunwar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kirtan Kunwar',
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  /* the browser chrome takes the green-black of the footage */
  themeColor: '#0b0d0a',
  colorScheme: 'dark',
};

/* Runs before first paint, so a deep link opens on its file and calm mode
   never flashes the footage. Without it (or without JavaScript) there is no
   data-ui on the root, and the stylesheet lays the site out as a plain
   document. */
const BOOT = `(function(){try{var d=document.documentElement,ids=${JSON.stringify(SECTIONS.map((s) => s.id))};d.dataset.ui='1';if(localStorage.getItem('nyx-calm')==='1')d.classList.add('calm');var h=decodeURIComponent(location.hash.slice(1));if(ids.indexOf(h)>-1){d.dataset.route='file';d.dataset.file=h}else d.dataset.route='menu'}catch(e){}})()`;

/* TYPE is self-hosted from public/fonts and declared in app/globals.css:
 * IM Fell English SC (the name, the menu, file titles), Courier Prime (every
 * typed page, and the lede), VT323 (the camcorder's on-screen display). The
 * two faces the first viewport sets are preloaded.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <link rel="preload" href="/fonts/im-fell-english-sc-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/courier-prime-400.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
