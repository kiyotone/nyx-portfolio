'use client';
import { useRef, useState } from 'react';
import { profile, paper, numbers } from '@/content/profile';
import { identity, direction } from '@/content/security';
import { projects } from '@/content/projects';
import { experience, education, currently } from '@/content/experience';

/* THE FILES.

   Opening a section pauses the tape and lays a typed page over the frozen
   frame, the way these games hand you a note found in a drawer. A section
   with several entries keeps an index beside the page; choosing one swaps the
   page.

   Underneath, these are ordinary sections of an ordinary document: with no
   JavaScript, or in calm mode, every section and every entry is simply there,
   one after another. Nothing in here knows about the footage. */

type Entry = { key: string; label: string; body: React.ReactNode };

function Back({ onBack }: { onBack: () => void }) {
  return (
    <a className="back" href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>
      Back <kbd>Esc</kbd>
    </a>
  );
}

function File({ id, title, sub, entries, single, onBack }: {
  id: string; title: string; sub?: string; entries?: Entry[]; single?: React.ReactNode; onBack: () => void;
}) {
  const [cur, setCur] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const onKey = (e: React.KeyboardEvent) => {
    if (!entries || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    const n = (cur + (e.key === 'ArrowDown' ? 1 : -1) + entries.length) % entries.length;
    setCur(n);
    list.current?.querySelectorAll('button')[n]?.focus();
  };
  return (
    <section id={id} className="file" aria-labelledby={`${id}-h`}>
      <div className="file__frame">
        <div className="file__side">
          <div className="file__head">
            <h2 id={`${id}-h`} className="file__title" tabIndex={-1}>{title}</h2>
            <Back onBack={onBack} />
          </div>
          {sub && <p className="file__sub">{sub}</p>}
          {entries && (
            <ul ref={list} className="index" onKeyDown={onKey} aria-label={`${title}: entries`}>
              {entries.map((x, i) => (
                <li key={x.key}>
                  <button type="button" className="index__item" aria-current={i === cur}
                          aria-controls={`${id}-${x.key}`} onClick={() => setCur(i)}>
                    {x.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="file__page">
          <div className="sheet">
          <div className="paper">
            {entries
              ? entries.map((x, i) => (
                  <article key={x.key} id={`${id}-${x.key}`} className={`entry${i === cur ? ' is-current' : ''}`}>
                    {x.body}
                  </article>
                ))
              : <article className="entry is-current">{single}</article>}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="ink" href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export function Files({ onBack }: { onBack: () => void }) {
  const projectEntries: Entry[] = projects.map((p) => ({
    key: p.key,
    label: p.name,
    body: (
      <>
        <h3 className="doc__title">{p.name}</h3>
        <p className="doc__meta">{p.kind}{p.status ? ` · ${p.status}` : ''}</p>
        <p>{p.blurb}</p>
        <p className="doc__meta">{p.stack.join(' · ')}</p>
        {p.href && <p><Ext href={p.href}>Repository</Ext></p>}
      </>
    ),
  }));

  const recordEntries: Entry[] = [
    {
      key: 'built',
      label: 'What I built',
      body: (
        <>
          <h3 className="doc__title">What I built</h3>
          <ul className="ticks">{identity.lines.map((l) => <li key={l}>{l}</li>)}</ul>
          <p className="doc__meta">{identity.stack.join(' · ')}</p>
        </>
      ),
    },
    ...experience.map((r) => ({
      key: r.org,
      label: r.org,
      body: (
        <>
          <h3 className="doc__title">{r.role}, {r.org}</h3>
          <p className="doc__meta">{r.place} · {r.dates}</p>
          <ul className="ticks">{r.lines.map((l) => <li key={l}>{l}</li>)}</ul>
          {r.stack.length > 0 && <p className="doc__meta">{r.stack.join(' · ')}</p>}
        </>
      ),
    })),
    {
      key: 'education',
      label: 'Education',
      body: (
        <>
          <h3 className="doc__title">{education.degree}</h3>
          <p className="doc__meta">{education.dates}</p>
          <p>{education.school}</p>
        </>
      ),
    },
  ];

  return (
    <>
      <File id="projects" title="Projects" onBack={onBack} entries={projectEntries}
            sub="Engines and tools in C++, and a few things built with other people. Each one opens its repository where there is one to open." />

      <File id="numbers" title="Numbers" onBack={onBack}
            sub="From my own engines. Reported at p50, p95 and p99 over a fixed path, because an average hides exactly the cases that matter."
            single={
              <>
                <h3 className="doc__title">Numbers I stand behind</h3>
                <table className="log">
                  <tbody>
                    {numbers.map((x) => (
                      <tr key={x.k}>
                        <th scope="row">{x.v}</th>
                        <td>{x.k}<span className="log__note">{x.note}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="doc__meta">Pending verification against source logs.</p>
              </>
            } />

      <File id="paper" title="The paper" onBack={onBack}
            sub="Peer-reviewed, with four co-authors. My part was the tooling that built the training data."
            single={
              <>
                <h3 className="doc__title doc__title--long">{paper.title}</h3>
                <p className="doc__meta">{paper.venue}, {paper.year}</p>
                <p>{paper.contribution}</p>
                <p>{paper.result}</p>
                <p className="doc__meta">{paper.authors}</p>
                <p className="doc__links"><Ext href={paper.doi}>DOI</Ext><Ext href={paper.code}>Code</Ext></p>
              </>
            } />

      <File id="record" title="Record" onBack={onBack} entries={recordEntries}
            sub="Where I have worked and studied, and what I built while I was there." />

      <File id="next" title="Where next" onBack={onBack}
            single={
              <>
                <h3 className="doc__title">{direction.heading}</h3>
                <p>{direction.body}</p>
                <p>{direction.second}</p>
                <h4 className="doc__sub">Right now</h4>
                <ul className="ticks">{currently.map((c) => <li key={c}>{c}</li>)}</ul>
              </>
            } />

      <File id="contact" title="Contact" onBack={onBack} sub="Email is fastest."
            single={
              <>
                <h3 className="doc__title">Contact</h3>
                <p className="doc__links doc__links--big">
                  <a className="ink" href={`mailto:${profile.email}`}>{profile.email}</a>
                  <Ext href={profile.github}>GitHub</Ext>
                  <Ext href={profile.linkedin}>LinkedIn</Ext>
                </p>
                <p className="doc__meta">Built in Kathmandu. The hallway is drawn live by a shader; there is no video file.</p>
              </>
            } />
    </>
  );
}
