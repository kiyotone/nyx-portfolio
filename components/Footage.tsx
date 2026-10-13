'use client';
import { useEffect, useRef } from 'react';

/* THE FOOTAGE.

   A hallway in a house nobody has lived in for a while, filmed on a camcorder
   and played back off tape. Nothing here is video: the hall is drawn live by a
   fragment shader, in two passes.

   1. SCENE — the corridor at roughly tape resolution (~320 lines across). It
      is a box, so every ray is solved with plane intersections rather than
      marched, which keeps it cheap enough for a phone. The only light is the
      flashlight in the cameraman's hand, which follows the pointer, and what
      leaks round the door left ajar at the far end.
   2. TAPE — the scene read back the way VHS reads it: chroma smeared and
      offset, lines jittering, a tracking band rolling down, head-switch noise
      at the foot of the frame, lifted green-black shadows, grain.

   Opening a file PAUSES the tape: the scene stops being redrawn (the frame
   freezes) and the tape pass adds the paused-deck jitter and noise bar. A cut
   between menu and file is a burst of tracking loss.

   Every so often, while the tape plays, the flashlight fails — and for as
   long as it is out there is someone standing in the doorway. Not under
   reduced motion: there the hall is still, the beam only moves when the
   pointer does, and nothing appears. */

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const HEAD = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vn(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
`;

const SCENE = HEAD + `
uniform vec2 uRes;
uniform float uT;
uniform vec2 uLook;    // where the beam points, -1..1 across the frame
uniform float uBeam;   // flashlight output, 0 = dead
uniform float uScare;  // the figure in the doorway, 0..1
uniform float uDoor;   // how far the end door has swung, 0..1
uniform vec2 uShift;   // lens shift: where the end of the hall sits in the frame
uniform float uFocal;  // lens length: shorter on a tall frame, so the hall still reads

const float W = 1.05;    // half-width of the hall
const float FL = -1.3;   // floor
const float CE = 1.42;   // ceiling
const float END = -8.6;  // the far wall

/* ---- materials. q is a surface coordinate in metres. ---- */

vec3 wood(vec2 q, float tone){
  float grain = vn(vec2(q.x * 3.0, q.y * 40.0)) * 0.5 + vn(vec2(q.x * 9.0, q.y * 90.0)) * 0.25;
  return vec3(0.21, 0.135, 0.08) * tone * (0.75 + grain * 0.5);
}

vec3 wallpaper(vec2 q){
  vec3 base = vec3(0.29, 0.30, 0.23);
  vec2 g = vec2(q.x * 2.6, q.y * 1.9 + floor(q.x * 2.6) * 0.5);
  vec2 f = fract(g) - 0.5;
  float d = abs(f.x) + abs(f.y) * 1.25;
  float motif = smoothstep(0.38, 0.33, d) - smoothstep(0.24, 0.19, d) * 0.7 + smoothstep(0.08, 0.04, d) * 0.6;
  float stripe = smoothstep(0.47, 0.5, abs(fract(q.x * 1.3 + 0.5) - 0.5) * 1.0 + 0.03);
  vec3 c = base * (0.92 + motif * 0.2 - stripe * 0.12);
  c *= mix(1.0, 0.5, smoothstep(0.5, 0.78, fbm(q * vec2(0.7, 1.3) + 3.1)));         // damp
  float run = smoothstep(0.62, 0.95, fbm(vec2(q.x * 3.4, q.y * 0.22))) * smoothstep(-0.2, 1.4, q.y);
  c *= 1.0 - run * 0.55;                                                               // water from the ceiling
  float peel = smoothstep(0.68, 0.70, fbm(q * 1.6 + 11.0));
  c = mix(c, vec3(0.43, 0.40, 0.33) * (0.75 + 0.35 * vn(q * 24.0)), peel);           // plaster under it
  float edge = smoothstep(0.66, 0.68, fbm(q * 1.6 + 11.0)) - peel;
  return c * (1.0 - edge * 0.6);
}

/* the lower part of every wall: panelled wood under a chair rail */
vec3 wallLower(vec2 q){
  if (q.y > -0.30) return wallpaper(q);
  if (q.y > -0.38) return wood(q, 1.25);                                               // chair rail
  if (q.y < FL + 0.16) return wood(q, 0.6);                                            // skirting
  vec2 p = vec2(fract(q.x / 0.9) * 0.9, q.y);
  float frame = step(0.06, p.x) * step(p.x, 0.84) * step(FL + 0.24, q.y) * step(q.y, -0.46);
  vec3 c = wood(q, mix(0.75, 0.95, frame));
  return c * (1.0 - 0.35 * smoothstep(0.55, 0.85, fbm(q * 2.0 + 5.0)));
}

/* a closed door set in a side wall at s along the hall */
vec3 sideDoor(vec2 q, float s, vec3 under){
  float dx = q.x - s;
  if (abs(dx) > 0.52 || q.y > 0.98) return under;
  if (abs(dx) > 0.45 || q.y > 0.9) return wood(q, 1.05);                               // frame
  vec2 p = vec2(dx, q.y);
  float inset = step(abs(p.x), 0.33) * (step(abs(p.y - 0.42), 0.36) + step(abs(p.y + 0.7), 0.42));
  vec3 c = wood(q * vec2(1.0, 0.3), mix(0.55, 0.7, inset));
  float knob = smoothstep(0.035, 0.02, length(p - vec2(0.36, -0.15)));
  return mix(c, vec3(0.32, 0.27, 0.18), knob);
}

/* a portrait hung crooked, too dark to make out */
vec3 picture(vec2 q, vec2 at, vec3 under){
  vec2 p = q - at;
  float a = 0.07; p = mat2(cos(a), -sin(a), sin(a), cos(a)) * p;
  if (abs(p.x) > 0.3 || abs(p.y) > 0.4) return under;
  if (abs(p.x) > 0.25 || abs(p.y) > 0.35) return vec3(0.25, 0.19, 0.1) * (0.7 + 0.4 * vn(p * 30.0));
  float head = smoothstep(0.12, 0.1, length((p - vec2(0.0, 0.08)) * vec2(1.0, 0.8)));
  float body = smoothstep(0.2, 0.18, length((p - vec2(0.0, -0.3)) * vec2(0.8, 1.4)));
  vec3 c = vec3(0.12, 0.11, 0.08) * (0.6 + 0.6 * fbm(p * 6.0));
  return mix(c, vec3(0.05, 0.04, 0.03), max(head, body) * 0.8);
}

vec3 floorMat(vec2 q){                     // q = (x, z)
  float id = floor(q.x / 0.21);
  float r = h21(vec2(id, 3.0));
  float along = fract((q.y + r * 3.7) / 2.4);
  vec3 c = wood(vec2(q.y, q.x * 4.0), 0.75 + r * 0.45);
  c *= smoothstep(0.0, 0.05, fract(q.x / 0.21)) * smoothstep(0.0, 0.01, along);       // seams
  if (abs(q.x) < 0.44){                                                                // the runner
    float b = abs(q.x);
    vec3 rug = vec3(0.24, 0.065, 0.055) * (0.8 + 0.3 * vn(q * 14.0));
    rug = mix(rug, vec3(0.3, 0.22, 0.12), step(0.33, b) * step(b, 0.37));
    rug = mix(rug, rug * 0.6, step(abs(fract(q.y * 1.2) - 0.5), 0.06) * step(b, 0.28));
    float worn = smoothstep(0.45, 0.75, fbm(q * vec2(3.0, 0.8)));
    c = mix(rug, c, worn * 0.5);
  }
  return c * (1.0 - 0.45 * smoothstep(0.5, 0.8, fbm(q * 0.9 + 2.0)));
}

vec3 ceilingMat(vec2 q){
  vec3 c = vec3(0.33, 0.32, 0.27) * (0.7 + 0.4 * fbm(q * 1.5));
  return c * (1.0 - 0.6 * smoothstep(0.55, 0.85, fbm(q * 0.6 + 9.0)));
}

/* where the light through the gap ends, for the leaf of the end door */
float gapLeft(){ return -0.5 + 0.62 - uDoor * 0.26; }

/* the far wall: the door that was left open */
vec3 endWall(vec2 q, out vec3 glow){
  glow = vec3(0.0);
  if (abs(q.x) > 0.6 || q.y > 1.04) return q.y < -0.30 ? wallLower(vec2(q.x * 1.0 + 20.0, q.y)) : wallpaper(q + vec2(20.0, 0.0));
  if (abs(q.x) > 0.5 || q.y > 0.95) return wood(q, 1.05);
  float g = gapLeft();
  if (q.x < g) {                                                                       // the leaf, swung inward
    float shade = 0.45 + 0.35 * (q.x + 0.5) / 0.62;
    return wood(q * vec2(1.0, 0.3), shade) * 0.6;
  }
  float flick = 0.86 + 0.14 * vn(vec2(uT * 9.0, 1.0));
  vec3 room = vec3(1.0, 0.6, 0.27) * (0.45 + 0.35 * smoothstep(0.95, -1.3, q.y)) * flick;
  /* the figure: stands in the gap, lit from behind, so it is only ever an outline */
  vec2 p = q - vec2(0.2, 0.0);
  float head = length((p - vec2(0.0, 0.52)) * vec2(1.0, 0.86)) - 0.1;
  float neck = max(abs(p.x) - 0.04, abs(p.y - 0.38) - 0.08);
  float body = max(abs(p.x) - (0.15 - 0.03 * smoothstep(0.3, -1.3, p.y)), abs(p.y + 0.45) - 0.82);
  float fig = min(min(head, neck), body - 0.03);
  float shape = smoothstep(0.012, -0.012, fig) * uScare;
  room *= (1.0 + uScare * 0.7) * (1.0 - shape);
  glow = room;
  return vec3(0.0);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uT;

  /* a hand holding a camera */
  vec2 sway = vec2(sin(t * 0.7) * 0.018 + sin(t * 1.9) * 0.006, sin(t * 1.4) * 0.012 + sin(t * 0.43) * 0.01);
  float yaw = uLook.x * 0.1 + sway.x * 2.0;
  float pitch = uLook.y * 0.06 + sway.y * 2.0 - 0.035;
  float roll = sin(t * 0.5) * 0.012;
  uv = mat2(cos(roll), -sin(roll), sin(roll), cos(roll)) * uv;

  vec3 ro = vec3(0.05 + sway.x * 0.6, 0.05 + sway.y * 0.5, 0.0);
  vec3 f = normalize(vec3(sin(yaw), sin(pitch), -cos(yaw)));
  vec3 r = normalize(cross(f, vec3(0.0, 1.0, 0.0)));
  vec3 u = cross(r, f);
  vec3 rd = normalize(f * uFocal + r * (uv.x - uShift.x) + u * (uv.y - uShift.y));

  /* the hall is a box: solve the walls, floor, ceiling and end wall directly */
  float tx = rd.x > 0.0 ? (W - ro.x) / rd.x : (-W - ro.x) / rd.x;
  float ty = rd.y < 0.0 ? (FL - ro.y) / rd.y : (CE - ro.y) / rd.y;
  float tz = rd.z < 0.0 ? (END - ro.z) / rd.z : 1e5;
  float th = min(tx, min(ty, tz));
  vec3 p = ro + rd * th;

  vec3 n, alb, glow = vec3(0.0);
  if (th == tz) {
    n = vec3(0.0, 0.0, 1.0);
    alb = endWall(p.xy, glow);
  } else if (th == tx) {
    n = vec3(-sign(rd.x), 0.0, 0.0);
    vec2 q = vec2(-p.z * sign(rd.x), p.y);
    alb = wallLower(q);
    if (rd.x < 0.0) { alb = sideDoor(vec2(-p.z, p.y), 2.9, alb); alb = sideDoor(vec2(-p.z, p.y), 6.9, alb); }
    else { alb = sideDoor(vec2(-p.z, p.y), 5.1, alb); alb = picture(vec2(-p.z, p.y), vec2(2.5, 0.42), alb); }
  } else if (rd.y < 0.0) {
    n = vec3(0.0, 1.0, 0.0);
    alb = floorMat(p.xz);
  } else {
    n = vec3(0.0, -1.0, 0.0);
    alb = ceilingMat(p.xz);
  }

  /* the flashlight, held low and to the right; the beam leads the camera */
  vec3 lp = ro + r * 0.18 - u * 0.12;
  vec2 aim = uLook * vec2(0.5 * uRes.x / uRes.y, 0.5) - uShift;  // the pointer, in the frame
  vec3 bd = normalize(f * uFocal + r * aim.x + u * aim.y);
  vec3 tp = p - lp; float dist = length(tp); vec3 ld = tp / dist;
  float cs = dot(ld, bd);
  float cone = smoothstep(0.82, 0.95, cs) * (0.55 + 0.75 * smoothstep(0.95, 0.993, cs));
  cone *= 0.9 + 0.1 * sin(acos(clamp(cs, -1.0, 1.0)) * 90.0);
  float lam = max(dot(n, -ld), 0.0);
  vec3 beam = vec3(1.0, 0.94, 0.8) * cone * lam * 3.6 / (1.0 + 0.035 * dist * dist) * uBeam;

  /* light from the room beyond the door, spilling down the hall floor */
  float dz = p.z - END;
  vec3 spill = vec3(0.0);
  if (n.y > 0.5) {
    float g = gapLeft();
    float c0 = (g + 0.5) * 0.5;
    float half_ = (0.5 - g) * 0.5 + dz * 0.3;
    float wedge = smoothstep(half_ + 0.05, half_ - 0.12, abs(p.x - c0 - dz * 0.06));
    float shadow = 1.0 - uScare * smoothstep(0.1 + dz * 0.03, 0.04 + dz * 0.02, abs(p.x - 0.2 - dz * 0.08));
    spill = vec3(1.0, 0.58, 0.25) * wedge * 0.55 * exp(-dz * 0.32) * shadow;
  }
  vec3 near = vec3(1.0, 0.6, 0.3) * 0.18 * exp(-dz * 0.55) * (n.z > 0.5 ? 0.0 : 1.0);
  vec3 col = alb * (beam + spill + near + 0.04) + glow;

  /* dust hanging in the beam */
  float fog = 0.0;
  float tmax = min(th, 9.0);
  for (int i = 0; i < 8; i++) {
    float s = (float(i) + h21(gl_FragCoord.xy + t)) / 8.0 * tmax;
    vec3 q = ro + rd * s - lp;
    float qd = length(q);
    fog += smoothstep(0.84, 0.97, dot(q / qd, bd)) / (1.0 + 0.12 * qd * qd);
  }
  col += vec3(0.9, 0.85, 0.7) * fog * tmax / 8.0 * 0.08 * uBeam;
  col *= exp(-0.04 * th);
  gl_FragColor = vec4(col, 1.0);
}
`;

const TAPE = HEAD + `
uniform sampler2D uScene;
uniform vec2 uRes;
uniform float uT;
uniform float uGlitch;  // tracking loss on a cut, 1 -> 0
uniform float uPause;   // the deck is paused
uniform float uLines;   // scanline count for the frame

vec3 tap(vec2 uv){ return texture2D(uScene, clamp(uv, vec2(0.001), vec2(0.999))).rgb; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float t = uT;
  float line = floor(uv.y * 240.0);
  float fr = floor(t * 29.97);

  /* a paused deck cannot hold the frame still */
  uv.y += uPause * (step(0.82, h21(vec2(fr * 0.37, 2.0))) * 0.006 - 0.002);

  float j = (h21(vec2(line, fr)) - 0.5) * 0.0022;
  float bandY = 1.0 - fract(t * 0.06 + 0.3);
  float band = smoothstep(0.045, 0.0, abs(uv.y - bandY)) * (1.0 - uPause);
  j += band * (h21(vec2(line * 1.7, fr)) - 0.5) * 0.035;
  float hs = smoothstep(0.04, 0.0, uv.y);
  j += hs * (0.03 + 0.04 * h21(vec2(line, fr * 1.3)));
  float tear = step(0.55, h21(vec2(floor(uv.y * 26.0), floor(t * 30.0))));
  j += uGlitch * (h21(vec2(line * 3.1, fr)) - 0.5) * 0.22 * tear;
  uv.x += j;

  /* luma softly, chroma smeared wider and offset */
  vec2 px = vec2(1.0 / uRes.x, 0.0);
  vec3 c0 = tap(uv), c1 = tap(uv - px * 1.5), c2 = tap(uv + px * 1.5);
  vec3 sharp = c0 * 0.5 + (c1 + c2) * 0.25;
  float shift = 0.0035 + uGlitch * 0.012;
  vec3 smear = (tap(uv + vec2(shift, 0.0)) + tap(uv + vec2(shift * 2.0, 0.0))) * 0.5;
  vec3 smearB = (tap(uv - vec2(shift * 0.8, 0.0)) + tap(uv - vec2(shift * 1.8, 0.0))) * 0.5;
  float Y = dot(sharp, vec3(0.299, 0.587, 0.114));
  vec3 chroma = vec3(smear.r, sharp.g, smearB.b) - vec3(dot(vec3(smear.r, sharp.g, smearB.b), vec3(0.299, 0.587, 0.114)));
  vec3 c = vec3(Y) + chroma * 0.78;

  /* the grade: shadows pulled to green-black, warmth kept for the highlights */
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  float sh = 1.0 - smoothstep(0.02, 0.38, lum);
  c *= mix(vec3(1.02, 0.97, 0.82), vec3(0.78, 1.0, 0.86), sh);
  c = mix(c, c * c * 1.6, 0.15);
  vec2 vg = gl_FragCoord.xy / uRes - 0.5;
  c *= 1.0 - dot(vg, vg) * 1.1;

  float sn = h21(gl_FragCoord.xy * 0.73 + fract(t * 7.3) * 91.0);
  c += (sn - 0.5) * 0.075;
  c = mix(c, vec3(sn * 0.8), band * 0.28 + hs * 0.55);
  float bar = uPause * smoothstep(0.022, 0.0, abs(uv.y - 0.21 - 0.012 * sin(t * 2.3)));
  c = mix(c, vec3(h21(vec2(floor(gl_FragCoord.x * 0.5), fr)) * 0.85), bar * 0.75);
  c = mix(c, vec3(sn), uGlitch * 0.5 * tear);
  c *= 0.92 + 0.08 * sin(gl_FragCoord.y / uRes.y * uLines * 6.2832);
  /* the floor: tape black is lifted and green, never true black */
  c = vec3(0.043, 0.051, 0.039) + c * 0.96;
  gl_FragColor = vec4(c, 1.0);
}
`;

function shader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || (gl.isContextLost() ? 'context lost' : 'shader'));
  return s;
}
function program(gl: WebGLRenderingContext, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, shader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, shader(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link');
  const u = (n: string) => gl.getUniformLocation(p, n);
  return { p, u };
}

export function Footage({ paused, cut }: { paused: boolean; cut: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ paused, glitchAt: -10 });

  useEffect(() => { state.current.paused = paused; }, [paused]);
  useEffect(() => { if (cut > 0) state.current.glitchAt = performance.now() / 1000; }, [cut]);

  useEffect(() => {
    const cv = canvas.current!;
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) { cv.dataset.dead = '1'; return; }
    let scene: ReturnType<typeof program>, tape: ReturnType<typeof program>;
    try { scene = program(gl, SCENE); tape = program(gl, TAPE); }
    catch (e) { console.warn('footage unavailable', e); cv.dataset.dead = '1'; return; }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    let sw = 0, sh = 0;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => {
      const w = innerWidth, h = innerHeight;
      const k = Math.min(1, 960 / Math.max(w, h));
      cv.width = Math.round(w * k); cv.height = Math.round(h * k);
      const s = 340 / Math.max(w, h);                       // tape resolution
      sw = Math.max(2, Math.round(w * s)); sh = Math.max(2, Math.round(h * s));
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sw, sh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      dirty = true;
    };

    /* the beam follows the pointer, with a hand's lag; left alone it wanders */
    const look = { x: 0.35, y: -0.1, tx: 0.35, ty: -0.1, last: -99 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      look.tx = (e.clientX / innerWidth) * 2 - 1;
      look.ty = -((e.clientY / innerHeight) * 2 - 1);
      look.last = performance.now() / 1000;
      if (reduce) dirty = true;
    };

    /* the hall's far end sits clear of the menu: right of it on a wide frame,
       in the top half on a tall one */
    const shift = () => {
      const a = sw / sh;
      if (a <= 1) return { x: 0, y: 0.17 };
      /* paused under a file, the sheet takes the middle of a wide frame, so
         the cut that pauses the tape also swings the door into the margin */
      return state.current.paused && a > 1.25 ? { x: a * 0.42, y: 0 } : { x: Math.min(0.34, a * 0.19), y: 0 };
    };
    let wasPaused = state.current.paused;
    /* the pointer position (in uLook units) that aims the beam at the door */
    const homeLook = () => {
      const s = shift();
      return { x: s.x / (0.5 * sw / sh), y: s.y / 0.5 };
    };

    let dirty = true, raf = 0, prev = performance.now() / 1000, sceneT = 3, lastFrame = 0;
    let nextScare = 9 + Math.random() * 2, scareAt = -99, door = 0;

    const frame = (nowMs: number) => {
      raf = requestAnimationFrame(frame);
      const now = nowMs / 1000;
      if (now - lastFrame < 1 / 30 - 0.002) return;          // tape runs at thirty frames
      lastFrame = now;
      const dt = Math.min(0.1, now - prev); prev = now;
      const st = state.current;
      const playing = !st.paused;

      if (!reduce) {
        if (now - look.last > 4) {
          /* nobody holding the light (or a touch screen): it keeps going
             back to the door at the end of the hall */
          const home = homeLook();
          look.tx = home.x + Math.sin(now * 0.27) * 0.22;
          look.ty = home.y - 0.12 + Math.sin(now * 0.19) * 0.12;
        }
        const k = 1 - Math.exp(-dt * 3.2);
        look.x += (look.tx - look.x) * k; look.y += (look.ty - look.y) * k;
      } else { look.x = look.tx; look.y = look.ty; }

      let beam = 1, scare = 0;
      if (!reduce && playing) {
        sceneT += dt;
        if (sceneT > nextScare && scareAt < 0) scareAt = sceneT;
        if (scareAt > 0) {
          const s = sceneT - scareAt;
          const blink = Math.sin(s * 53) * Math.sin(s * 31) > 0.2 ? 1 : 0.15;
          if (s < 0.55) beam = blink;
          else if (s < 1.75) { beam = s > 1.3 && s < 1.38 ? 0.6 : 0.04; scare = 1; }
          else if (s < 2.1) beam = blink;
          else { scareAt = -99; nextScare = sceneT + 24 + Math.random() * 18; door = 1; }
          if (s > 0.25 && s < 1.75) door = Math.min(1, door + dt * 2.4);
        }
        door = Math.max(0, door - dt * 0.03);
      }

      const glitch = Math.max(0, 1 - (now - st.glitchAt) / 0.5);
      if (playing && !reduce) dirty = true;
      if (st.paused !== wasPaused) { wasPaused = st.paused; dirty = true; }
      /* under reduced motion the tape pass is a still too: draw it only when
         the scene under it changed */
      if (reduce && !dirty) return;
      if (dirty) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.viewport(0, 0, sw, sh);
        gl.useProgram(scene.p);
        gl.uniform2f(scene.u('uRes'), sw, sh);
        gl.uniform1f(scene.u('uT'), reduce ? 3 : sceneT);
        gl.uniform2f(scene.u('uLook'), look.x, look.y);
        gl.uniform1f(scene.u('uBeam'), beam);
        gl.uniform1f(scene.u('uScare'), scare);
        gl.uniform1f(scene.u('uDoor'), door);
        const sh2 = shift();
        gl.uniform2f(scene.u('uShift'), sh2.x, sh2.y);
        gl.uniform1f(scene.u('uFocal'), sw > sh ? 1.25 : 0.82);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        dirty = false;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.useProgram(tape.p);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(tape.u('uScene'), 0);
      gl.uniform2f(tape.u('uRes'), cv.width, cv.height);
      gl.uniform1f(tape.u('uT'), reduce ? 1 : now);
      gl.uniform1f(tape.u('uGlitch'), reduce ? 0 : glitch);
      gl.uniform1f(tape.u('uPause'), st.paused && !reduce ? 1 : 0);
      gl.uniform1f(tape.u('uLines'), innerHeight / 3);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onMove);
      /* free what this run made, but leave the context alive: a canvas hands
         back the same context on the next getContext, and a remount (strict
         mode, a fast refresh) has to be able to draw with it */
      gl.deleteProgram(scene.p); gl.deleteProgram(tape.p);
      gl.deleteTexture(tex); gl.deleteFramebuffer(fbo); gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvas} className="footage" aria-hidden="true" />;
}
