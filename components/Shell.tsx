'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Footage } from './Footage';
import { Osd } from './Osd';
import { Files } from './Files';
import { profile } from '@/content/profile';
import { SECTIONS } from '@/content/sections';

/* THE TAPE AND ITS MENU.

   The footage runs full-bleed. Over it, on the left, the name, one line about
   the person, and the menu: the only things the title screen carries. Every
   menu item is a real #link to a real section, so the site works without a
   mouse, without JavaScript and without the footage.

   Routes (the URL hash): nothing = the menu, the tape playing; #<section> =
   that file, the tape paused under it. Esc always comes back. */

const IDS = new Set<string>(SECTIONS.map((s) => s.id));
const readRoute = () => {
  const h = decodeURIComponent(location.hash.slice(1));
  return IDS.has(h) ? h : '';
};

function Arrows() {
  return (
    <svg className="kbd__glyph" viewBox="0 0 12 14" aria-hidden="true">
      <path d="M6 1 10.5 5.5h-9zM6 13 1.5 8.5h9z" fill="currentColor" />
    </svg>
  );
}

export default function Shell() {
  const [route, setRoute] = useState('');
  const [calm, setCalm] = useState(false);
  const [sel, setSel] = useState(0);
  const [cut, setCut] = useState(0);
  const menu = useRef<HTMLUListElement>(null);
  const last = useRef('');

  /* the route and calm mode, read once the page is live, then kept in sync */
  useEffect(() => {
    setCalm(document.documentElement.classList.contains('calm'));
    setRoute(readRoute());
    const onHash = () => { setRoute(readRoute()); setCut((c) => c + 1); };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.route = route ? 'file' : 'menu';
    if (route) r.dataset.file = route; else delete r.dataset.file;
    if (route) {
      document.getElementById(`${route}-h`)?.focus({ preventScroll: true });
      setSel(SECTIONS.findIndex((s) => s.id === route));
    } else if (last.current) {
      menu.current?.querySelector<HTMLAnchorElement>(`a[href="#${last.current}"]`)?.focus({ preventScroll: true });
    }
    last.current = route;
  }, [route]);

  const toMenu = useCallback(() => {
    if (!location.hash) return;
    history.pushState(null, '', location.pathname + location.search);
    setRoute('');
    setCut((c) => c + 1);
  }, []);

  /* Esc always comes back; on the menu, the arrow keys pick up the cursor
     from wherever focus is, the way a game menu does */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { toMenu(); return; }
      if (route || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      if (menu.current?.contains(document.activeElement)) return;
      e.preventDefault();
      menu.current?.querySelectorAll('a')[sel]?.focus();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [toMenu, route, sel]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const n = (sel + (e.key === 'ArrowDown' ? 1 : -1) + SECTIONS.length) % SECTIONS.length;
    setSel(n);
    menu.current?.querySelectorAll('a')[n]?.focus();
  };

  const toggleCalm = () => {
    const next = !calm;
    setCalm(next);
    document.documentElement.classList.toggle('calm', next);
    try { localStorage.setItem('nyx-calm', next ? '1' : '0'); } catch {}
  };

  return (
    <>
      {!calm && <Footage paused={!!route} cut={cut} />}
      <div className="scrim" aria-hidden="true" />
      <Osd paused={!!route} calm={calm} onCalm={toggleCalm} />

      <main className="site">
        <div className="title-screen">
          <h1 className="logo">{profile.name}</h1>
          <p className="lede">{profile.lede}</p>
          <nav className="menu" aria-label="Sections">
            <ul ref={menu} onKeyDown={onMenuKey}>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="menu__item" data-sel={sel === i || undefined}
                     onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}>
                    <span className="menu__mark" aria-hidden="true" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Files onBack={toMenu} />
      </main>

      <p className="prompts" aria-hidden="true">
        {route
          ? <><span><kbd><Arrows /></kbd> Entry</span><span><kbd>Esc</kbd> Back</span></>
          : <><span><kbd><Arrows /></kbd> Select</span><span><kbd>Enter</kbd> Open</span><span className="prompts__move">Move the pointer to aim the light</span></>}
      </p>
    </>
  );
}
