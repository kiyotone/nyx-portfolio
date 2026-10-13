'use client';
import { useEffect, useRef, useState } from 'react';

/* THE ON-SCREEN DISPLAY.

   What the camcorder burnt into the tape and what the deck lays over it: the
   deck's mode (PLAY, or PAUSE while a file is open), the camera's REC lamp and
   failing battery, the date and time — today's, because this is being
   recorded now — and the tape counter, which only runs while the tape does.

   All of it is decoration except the calm switch, which is a real control and
   the one thing here a screen reader is told about. */

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const pad = (n: number) => String(n).padStart(2, '0');

function Play() {
  return <svg className="osd__glyph" viewBox="0 0 10 12" aria-hidden="true"><path d="M1 1v10l8-5z" fill="currentColor" /></svg>;
}
function Pause() {
  return <svg className="osd__glyph" viewBox="0 0 10 12" aria-hidden="true"><path d="M1 1h3v10H1zM6 1h3v10H6z" fill="currentColor" /></svg>;
}
function Battery() {
  return (
    <svg className="osd__battery" viewBox="0 0 30 14" aria-hidden="true">
      <path d="M1 1h25v12H1z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M26 4.5h3v5h-3z" fill="currentColor" />
      <path className="osd__cell" d="M4 4h5v6H4z" fill="currentColor" />
    </svg>
  );
}

export function Osd({ paused, calm, onCalm }: { paused: boolean; calm: boolean; onCalm: () => void }) {
  const [now, setNow] = useState<Date | null>(null);
  const [tape, setTape] = useState(0);
  const run = useRef(!paused);
  useEffect(() => { run.current = !paused; }, [paused]);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => {
      setNow(new Date());
      if (run.current) setTape((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = now ? now.getHours() : 0;
  const date = now ? `${MONTHS[now.getMonth()]}. ${pad(now.getDate())} ${now.getFullYear()}` : '';
  const time = now ? `${h < 12 ? 'AM' : 'PM'} ${h % 12 || 12}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : '';
  const counter = `${Math.floor(tape / 3600)}:${pad(Math.floor(tape / 60) % 60)}:${pad(tape % 60)}`;

  return (
    <div className="osd">
      <div className="osd__corners" aria-hidden="true"><i /><i /><i /><i /></div>
      <p className="osd__tl" aria-hidden="true">
        <span className="osd__mode">{paused ? <>PAUSE <Pause /></> : <>PLAY <Play /></>}</span>
        <span className="osd__dim">SP</span>
      </p>
      <div className="osd__tr">
        <p className="osd__rec" aria-hidden="true"><i className="osd__lamp" />REC <Battery /></p>
        <button type="button" className="osd__calm" aria-pressed={calm} onClick={onCalm}>
          Calm mode <span className="osd__state" aria-hidden="true">{calm ? 'on' : 'off'}</span>
        </button>
      </div>
      <p className="osd__bl" aria-hidden="true"><span>{date}</span><span>{time}</span></p>
      <p className="osd__br" aria-hidden="true">{counter}</p>
    </div>
  );
}
