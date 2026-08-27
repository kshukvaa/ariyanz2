'use client';

import React, { useEffect, useRef, useState } from 'react';
import type * as ThreeNS from 'three';

/* ──────────────────────────────────────────────────────────────
   Logo3D — the bilingual Ariyaz mark as an extruded 3D solid.

   Ported from the "Ariyaz Logo 3D" design component: the same
   traced outlines (logo-shapes.js), the same studio lighting, and
   all six language transitions — flip, fold, slide, melt, vortex,
   scatter — which the header cycles through on a timer.

   three.js loads lazily on the client and the whole scene is torn
   down on unmount. Reduced-motion viewers get the still Latin face.
────────────────────────────────────────────────────────────── */

export const ANIMS = ['flip', 'fold', 'slide', 'melt', 'vortex', 'scatter'] as const;
export type Anim = (typeof ANIMS)[number];

/** Per-part launch vectors for the scatter transition. */
const SCATTER = [
  [-1.05, 0.45, 0.7],
  [0.35, 1.15, -0.5],
  [1.15, -0.35, 0.8],
  [-0.5, -1.05, -0.6],
];

interface Logo3DProps {
  className?: string;
  /** Seconds between language transitions. */
  intervalSec?: number;
  /** Extrusion depth as a percentage of the mark's height. */
  depthPct?: number;
  bevel?: boolean;
  /** Cycle through every transition, or stick to one. */
  cycleAnims?: boolean;
  anim?: Anim;
  /** Extra camera pull-back so flying parts stay in frame. */
  roomFactor?: number;
  /** Flat logo shown until the 3D scene is live (and if WebGL is unavailable). */
  fallbackSrc?: string;
  alt?: string;
}

export default function Logo3D({
  className = '',
  intervalSec = 9,
  depthPct = 10,
  bevel = false,
  cycleAnims = true,
  anim = 'scatter',
  roomFactor = 1.18,
  fallbackSrc,
  alt = 'Ariyaz',
}: Logo3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [THREE, shapesMod, artMod] = await Promise.all([
        import('three'),
        import('@/lib/logo-shapes.js'),
        import('@/lib/logo-farsi-art.js'),
      ]);
      if (disposed || !mount) return;

      const L = (shapesMod as { LOGO: any }).LOGO;
      const FARSI_ART = (artMod as { FARSI_ART: any }).FARSI_ART;
      const U = L.layout.unit;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* ── Stage: renderer, camera, studio lights ──
         Ported from three-d-stage.js. No ground plane and no orbit
         controls: the mark sits on the header background and the
         whole thing is a link, so it must not swallow clicks. */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearAlpha(0);
      renderer.domElement.style.pointerEvents = 'none';
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);

      scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c4, 1.0));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 7, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xfff4e6, 0.5);
      fill.position.set(-5, 3, -4);
      scene.add(fill);

      /* ── Materials ── */
      const mk = (hex: string, name: string) => {
        const m = new THREE.MeshStandardMaterial({
          color: hex,
          roughness: 0.46,
          metalness: 0.04,
        });
        m.name = name;
        m.transparent = true;
        m.opacity = 1;
        return m;
      };
      /* Each language needs its OWN materials: the crossfade drives
         opacity per group, and shared materials would cancel out. */
      const matsEn = {
        o: mk(L.colors.orange, 'Ariyaz-Orange'),
        b: mk(L.colors.blue, 'Ariyaz-Blue'),
      };
      const matsFa = {
        o: mk(L.colors.orange, 'Ariyaz-Orange-fa'),
        b: mk(L.colors.blue, 'Ariyaz-Blue-fa'),
      };

      /* ── Geometry helpers ── */
      type Pt = [number, number];
      type Outline = { outer: Pt[]; holes?: Pt[][] };

      const buildShapes = (list: Outline[], xf: (p: Pt) => Pt) => {
        const run = (pts: Pt[], obj: ThreeNS.Shape | ThreeNS.Path) => {
          pts.forEach((p, i) => {
            const q = xf(p);
            if (i) obj.lineTo(q[0], q[1]);
            else obj.moveTo(q[0], q[1]);
          });
          obj.closePath();
        };
        return list.map((s) => {
          const sh = new THREE.Shape();
          run(s.outer, sh);
          (s.holes || []).forEach((h) => {
            const pp = new THREE.Path();
            run(h, pp);
            sh.holes.push(pp);
          });
          return sh;
        });
      };

      const circle = (cx: number, cy: number, r: number, seg: number): Outline[] => {
        const pts: Pt[] = [];
        for (let i = 0; i < seg; i++) {
          const a = (i / seg) * Math.PI * 2;
          pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }
        return [{ outer: pts, holes: [] }];
      };

      const mesh = (
        list: Outline[],
        xf: (p: Pt) => Pt,
        depthPx: number,
        mat: ThreeNS.Material,
        name: string
      ) => {
        const geo = new THREE.ExtrudeGeometry(buildShapes(list, xf), {
          depth: depthPx * U,
          steps: 1,
          curveSegments: 1,
          bevelEnabled: bevel,
          bevelThickness: 4.5 * U,
          bevelSize: 3.5 * U,
          bevelOffset: 0,
          bevelSegments: 2,
        });
        const m = new THREE.Mesh(geo, mat);
        m.name = name;
        return m;
      };

      const centerXY = (g: ThreeNS.Group) => {
        const c = new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3());
        g.children.forEach((m) => {
          m.position.x -= c.x;
          m.position.y -= c.y;
        });
        return g;
      };

      const d = 259 * (depthPct / 100);
      const dz = L.layout.en;

      /* ── Latin lockup ── */
      const xi = (p: Pt): Pt => [p[0] * U, -p[1] * U];
      const en = new THREE.Group();
      en.name = 'Ariyaz-Latin';
      en.add(
        mesh(
          circle(L.english.disc.cx, L.english.disc.cy, L.english.disc.r, 88),
          xi,
          d * dz.discZ,
          matsEn.b,
          'Latin-dot'
        )
      );
      en.add(mesh(L.english.letters, xi, d * dz.letterZ, matsEn.b, 'Latin-wordmark'));
      en.add(mesh(L.english.orange, xi, d * dz.orangeZ, matsEn.o, 'Latin-A-swoosh'));
      centerXY(en);

      /* ── Persian lockup ──
         Traced straight from the supplied Persian artwork (logo-farsi-art.js,
         generated by trace-logo.mjs) rather than assembled from a font, so the
         extruded solid matches the real mark exactly — the disc and its slash,
         the letterforms, the madda and the alef, all as drawn.

         The outlines already live in the shared 1350x666 logo space, so the
         same identity transform the Latin face uses applies unchanged. */
      const fa = new THREE.Group();
      fa.name = 'Ariyaz-Farsi';
      fa.add(mesh(FARSI_ART.blue, xi, d * dz.letterZ, matsFa.b, 'Farsi-blue'));
      fa.add(mesh(FARSI_ART.orange, xi, d * dz.orangeZ, matsFa.o, 'Farsi-orange'));
      centerXY(fa);

      /* Match the Persian cap height to the Latin one. */
      const H = (g: ThreeNS.Group) => {
        const bb = new THREE.Box3().setFromObject(g);
        return bb.max.y - bb.min.y;
      };
      const k = H(en) / H(fa);
      fa.scale.set(k, k, 1);

      en.children.forEach((m, i) => {
        m.userData.base = m.position.clone();
        m.userData.dir = SCATTER[i % 4];
      });
      fa.children.forEach((m, i) => {
        m.userData.base = m.position.clone();
        m.userData.dir = SCATTER[(i + 2) % 4];
      });

      const span = new THREE.Box3().setFromObject(en).getSize(new THREE.Vector3()).x;

      const root = new THREE.Group();
      root.name = 'Ariyaz-logo';
      root.add(en, fa);
      scene.add(root);

      /* ── Framing ──
         The mark is far wider than it is tall, so a bounding-sphere fit
         (what the full-page stage uses) would leave it tiny in a header
         strip. Fit the box to whichever axis binds.

         The camera sits dead-on: the mark reads as a logo first and a solid
         second, and the scroll spin below supplies all the dimensionality
         the header needs. */
      const box = new THREE.Box3().setFromObject(en);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const viewDir = new THREE.Vector3(0, 0, 1);

      const fitCamera = () => {
        const aspect = camera.aspect || 1;
        const tan = Math.tan((camera.fov * Math.PI) / 360);
        const distH = (size.y / 2) / tan;
        const distW = (size.x / 2) / (tan * aspect);
        const dist = Math.max(distH, distW) * roomFactor;
        camera.position.copy(center).add(viewDir.clone().multiplyScalar(dist));
        camera.near = Math.max(dist / 100, 0.01);
        camera.far = dist * 100;
        camera.lookAt(center);
        camera.updateProjectionMatrix();
      };

      /* ── Transitions ── */
      const setOpacity = (g: ThreeNS.Group, v: number) => {
        g.visible = v > 0.02;
        g.children.forEach((m) => {
          const mat = (m as ThreeNS.Mesh).material as ThreeNS.MeshStandardMaterial;
          mat.opacity = v;
          mat.depthWrite = v > 0.95;
        });
      };

      /* Puts both lockups back to rest. Every transition displaces, rotates
         or rescales the groups (and `scatter` the individual parts), so any
         driver that wants a clean mark has to run this first — the scroll
         drive included, which is why it lives outside `pose`. */
      const neutral = () => {
        root.rotation.set(0, 0, 0);
        root.position.y = 0;
        en.position.set(0, 0, 0);
        en.rotation.set(0, 0, 0);
        en.scale.set(1, 1, 1);
        fa.position.set(0, 0, 0);
        fa.rotation.set(0, 0, 0);
        fa.scale.set(k, k, 1);
        en.children.forEach((m) => m.position.copy(m.userData.base));
        fa.children.forEach((m) => m.position.copy(m.userData.base));
      };

      /** t = 0 shows Latin, t = 1 shows Persian. */
      const pose = (t: number, A: Anim) => {
        const cl = (v: number) => Math.max(0, Math.min(1, v));
        const W = span || 3;

        neutral();

        let oe = 1 - cl(t * 2);
        let of = cl((t - 0.5) * 2);

        if (A === 'flip') {
          root.rotation.y = t * Math.PI;
          root.position.y = Math.sin(Math.PI * t) * W * 0.08;
          fa.rotation.y = Math.PI;
          oe = t < 0.5 ? 1 : 0;
          of = t < 0.5 ? 0 : 1;
        } else if (A === 'fold') {
          en.rotation.x = -t * Math.PI * 0.5;
          fa.rotation.x = (1 - t) * Math.PI * 0.5;
          en.position.y = -Math.sin(t * Math.PI * 0.5) * W * 0.06;
          fa.position.y = Math.sin((1 - t) * Math.PI * 0.5) * W * 0.06;
          oe = 1 - cl((t - 0.35) * 4);
          of = cl((t - 0.5) * 4);
        } else if (A === 'slide') {
          en.position.x = -t * W * 1.35;
          fa.position.x = (1 - t) * W * 1.35;
          oe = 1 - cl((t - 0.45) * 3.2);
          of = cl((t - 0.3) * 3.2);
        } else if (A === 'melt') {
          const a = cl(t * 2);
          const bb = cl((t - 0.5) * 2);
          en.scale.z = Math.max(0.02, 1 - a);
          fa.scale.z = Math.max(0.02, bb);
          root.rotation.y = Math.sin(t * Math.PI) * 0.55;
          oe = 1 - cl((t - 0.42) * 8);
          of = cl((t - 0.5) * 8);
        } else if (A === 'vortex') {
          const a = cl(t * 1.35);
          const bb = cl((t - 0.28) / 0.72);
          en.rotation.y = a * Math.PI * 1.6;
          en.scale.setScalar(Math.max(0.02, 1 - a));
          fa.rotation.y = -(1 - bb) * Math.PI * 1.6;
          const s = Math.max(0.02, bb) * k;
          fa.scale.set(s, s, bb > 0.02 ? bb : 0.02);
          oe = 1 - a;
          of = bb;
        } else if (A === 'scatter') {
          const a = cl(t * 1.5);
          const bb = cl((t - 0.3) / 0.7);
          en.children.forEach((m) => {
            const v = m.userData.dir;
            const e = a * a * W * 0.55;
            m.position.set(
              m.userData.base.x + v[0] * e,
              m.userData.base.y + v[1] * e,
              m.userData.base.z + v[2] * e * 0.5
            );
          });
          en.rotation.z = a * 0.12;
          fa.children.forEach((m) => {
            const v = m.userData.dir;
            const e = (1 - bb) * (1 - bb) * W * 0.55;
            m.position.set(
              m.userData.base.x + v[0] * e,
              m.userData.base.y + v[1] * e,
              m.userData.base.z + v[2] * e * 0.5
            );
          });
          fa.rotation.z = -(1 - bb) * 0.12;
          oe = 1 - a;
          of = bb;
        }

        setOpacity(en, oe);
        setOpacity(fa, of);
      };

      /* ── Drive ── */
      let frame = 0;
      let animIndex = Math.max(0, ANIMS.indexOf(anim));
      let facing = 0; // 0 = Latin, 1 = Persian
      let busy = false;
      /* Reduced motion keeps the language swap — it is the mark's whole point —
         but at half the cadence and only via `fold`, the calmest of the six.
         Matches how the hero stage treats the same preference. */
      const SLOW = reduced ? 2 : 1;
      const waitMs = () => Math.max(3, intervalSec) * SLOW * 1000;
      let nextAt = performance.now() + waitMs();

      pose(0, ANIMS[animIndex]);

      const transition = () => {
        busy = true;
        const from = facing;
        const to = facing === 0 ? 1 : 0;
        const A = reduced ? 'fold' : ANIMS[animIndex];
        const t0 = performance.now();
        const dur = 1250;
        const step = () => {
          /* The scroll drive has taken over — abandon this transition rather
             than fight it for the same transforms. */
          if (scrolled) {
            busy = false;
            return;
          }
          const p = Math.min(1, (performance.now() - t0) / dur);
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          pose(from + (to - from) * e, A);
          if (p < 1) requestAnimationFrame(step);
          else {
            facing = to;
            busy = false;
            if (cycleAnims) animIndex = (animIndex + 1) % ANIMS.length;
            nextAt = performance.now() + waitMs();
          }
        };
        requestAnimationFrame(step);
      };

      /* ── Scroll drive ──
         Scrolling rolls the mark on its Y axis. Every half turn lands on the
         other language, so the bilingual swap stops being an arbitrary timer
         event and becomes the physical consequence of the spin: scroll down
         and the wordmark literally turns over to read Persian.

         The faces cross over while the mark is edge-on, where an extrusion
         this thin is all but invisible, so the swap is never caught mid-way.
         When scrolling stops the spin settles to the nearest half turn, so
         the logo always comes to rest facing front. */
      const SPIN_PER_PX = Math.PI / 900; // one language flip per ~900px scrolled
      let spinTarget = 0;
      let spinCur = 0;
      let settleAt = 0;
      let scrolled = false;

      const onScroll = () => {
        scrolled = true;
        spinTarget = window.scrollY * SPIN_PER_PX;
        settleAt = performance.now() + 180; // snap once the gesture ends
      };
      /* Reduced motion opts out of the spin entirely and keeps the calm,
         timed `fold` swap the component already shipped. */
      if (!reduced) window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      spinCur = spinTarget;

      let shown = false;
      const loop = () => {
        if (reduced || !scrolled) {
          /* Nothing to scroll (short page, or the visitor hasn't yet) — fall
             back to the timed transition so the mark is never inert. */
          if (!busy && performance.now() >= nextAt) transition();
        } else {
          if (settleAt && performance.now() >= settleAt) {
            spinTarget = Math.round(spinTarget / Math.PI) * Math.PI;
            settleAt = 0;
          }
          /* Clear whatever pose the last timed transition left behind before
             applying the spin. Without this the mark keeps a stale offset —
             `slide` parks a lockup a full width off-centre, `scatter` leaves
             its parts thrown apart — and the scroll spin then rotates that
             displaced group, swinging it out of the header entirely. */
          neutral();
          spinCur += (spinTarget - spinCur) * 0.12;
          root.rotation.y = spinCur;
          /* Nearest half turn decides the language; even = Latin, odd = Persian. */
          const half = Math.round(spinCur / Math.PI);
          const showFa = Math.abs(half % 2) === 1;
          fa.rotation.y = Math.PI; // so the Persian face reads the right way round
          setOpacity(en, showFa ? 0 : 1);
          setOpacity(fa, showFa ? 1 : 0);
          facing = showFa ? 1 : 0;
          nextAt = performance.now() + waitMs(); // keep the idle timer parked
        }
        renderer.render(scene, camera);
        if (!shown) {
          shown = true;
          setLive(true); // first frame is on screen — retire the flat fallback
        }
        frame = requestAnimationFrame(loop);
      };
      loop();

      /* ── Resize ── */
      const resize = () => {
        const w = mount.clientWidth || 1;
        const h = mount.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        fitCamera();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', onScroll);
        ro.disconnect();
        scene.traverse((obj) => {
          const m = obj as ThreeNS.Mesh;
          if (m.geometry) m.geometry.dispose();
        });
        matsEn.o.dispose();
        matsEn.b.dispose();
        matsFa.o.dispose();
        matsFa.b.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    })().catch((err) => {
      /* No WebGL, or three failed to load — the flat logo stays. */
      console.error('[Logo3D] scene failed:', err);
      setLive(false);
    });

    return () => {
      disposed = true;
      setLive(false);
      cleanup?.();
    };
  }, [intervalSec, depthPct, bevel, cycleAnims, anim, roomFactor]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
      {fallbackSrc && !live && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </div>
  );
}
