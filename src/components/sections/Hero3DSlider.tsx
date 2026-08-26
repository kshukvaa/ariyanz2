'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ──────────────────────────────────────────────────────────────
   Hero3DSlider — the 3D hero section.

   A three-slide carousel where the copy column is React-rendered
   and the left stage is a live three.js scene:
     0 · the spiral climb  (rigged learner walking a helix, dancing at the top)
     1 · capability podium (gesturing figure turning a ring of capabilities)
     2 · the assistant     (waving robot)

   The floating cards over the canvas are plain DOM in CSS 3D, so
   they stay crisp and selectable; they ride the same parallax as
   the camera. three.js is imported lazily on the client and the
   whole scene is torn down on unmount.
────────────────────────────────────────────────────────────── */

const ICONS: Record<string, string> = {
  cap: '<path d="M12 3.5 22 8l-10 4.5L2 8z"/><path d="M6 10.2V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8"/><path d="M22 8v5"/>',
  users:
    '<circle cx="12" cy="7" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="4.6" cy="10" r="2.2"/><circle cx="19.4" cy="10" r="2.2"/>',
  chart:
    '<path d="M3 20h18"/><rect x="4" y="13" width="3.4" height="5" rx="1"/><rect x="9.8" y="9.5" width="3.4" height="8.5" rx="1"/><path d="M16.5 18v-6"/><path d="M15 8.5 20.5 3M20.5 3H17M20.5 3v3.4"/>',
  chat: '<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h9A1.5 1.5 0 0 1 15 5.5v6A1.5 1.5 0 0 1 13.5 13H8l-3.6 2.6V13h-.9A1.5 1.5 0 0 1 3 11.5z"/><path d="M18 9h1.5A1.5 1.5 0 0 1 21 10.5v5A1.5 1.5 0 0 1 19.5 17h-.6v2.4L15.6 17h-2.1"/>',
  shield: '<path d="M12 3 20 6v6c0 4.4-3.3 7.9-8 9-4.7-1.1-8-4.6-8-9V6z"/><path d="m8.6 12.2 2.3 2.3 4.5-4.5"/>',
  bolt: '<path d="M13.2 2 4.8 13.4h5.4L9.8 22l8.6-11.6h-5.6z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.6 2.2"/>',
  puzzle:
    '<path d="M9.5 3.5h5v2.2a1.9 1.9 0 1 0 3.8 0V3.5h2.2v5h-2.2a1.9 1.9 0 1 0 0 3.8h2.2v5h-5v-2.2a1.9 1.9 0 1 0-3.8 0v2.2h-5v-5H5a1.9 1.9 0 1 0 0-3.8H3.7v-5H9.5z"/>',
};

type Slide = {
  l1: string;
  l2: string;
  accentLine: 1 | 2;
  subtitle?: string;
  rule?: boolean;
  body: string;
  primary: { label: string; href: string };
  ghost: { label: string; href: string };
  pills: { icon: keyof typeof ICONS; label: string }[];
};

const SLIDES: Slide[] = [
  {
    l1: 'مسیر رشد',
    l2: 'حرفه‌ای خود را بسازید',
    accentLine: 2,
    body: 'با مسیرهای یادگیری، دوره‌های تخصصی، کوچینگ و ابزارهای توسعه فردی، توانمندی‌های خود را مرحله‌به‌مرحله ارتقا دهید.',
    primary: { label: 'شروع مسیر یادگیری', href: '/learning-paths' },
    ghost: { label: 'مشاهده دوره‌ها', href: '/courses' },
    pills: [
      { icon: 'cap', label: 'دوره‌های<br>تخصصی' },
      { icon: 'users', label: 'مهارت‌های<br>نرم' },
      { icon: 'chart', label: 'رهبری و<br>مدیریت' },
      { icon: 'chat', label: 'کوچینگ و<br>منتورینگ' },
    ],
  },
  {
    l1: 'رشد انسان‌ها،',
    l2: 'توانمندسازی سازمان‌ها',
    accentLine: 1,
    subtitle: 'پلتفرم یکپارچه توسعه منابع انسانی، رهبری، مهارت‌های نرم و تحول سازمانی',
    rule: true,
    body: 'یادگیری، توسعه، ابزارهای حرفه‌ای، کوچینگ و راهکارهای سازمانی؛ همه در یک اکوسیستم هوشمند.',
    primary: { label: 'درخواست مشاوره سازمانی', href: '/org' },
    ghost: { label: 'شروع یادگیری', href: '/learning-paths' },
    pills: [],
  },
  {
    l1: 'ایجنت‌های هوشمند آریاز؛',
    l2: 'دستیاران دیجیتال شما',
    accentLine: 2,
    body: 'از کارهای روزمره سازمان تا فرآیندهای منابع انسانی و توسعه مهارت‌ها: ایجنت‌های آریاز کنار شما هستند تا سریع‌تر، دقیق‌تر و هوشمندانه‌تر عمل کنید.',
    primary: { label: 'درخواست ایجنت سفارشی', href: '/org' },
    ghost: { label: 'مشاهده ایجنت‌ها', href: '/agents' },
    pills: [
      { icon: 'shield', label: 'امن و<br>قابل اعتماد' },
      { icon: 'bolt', label: 'سریع و<br>دقیق' },
      { icon: 'clock', label: '۲۴/۷<br>در دسترس' },
      { icon: 'puzzle', label: 'قابل<br>سفارشی‌سازی' },
    ],
  },
];

const AUTOPLAY_MS = 9000;
const ASSETS = '/models/hero3d';

/** Persian digits, so screen readers announce numbers in the page's own script. */
const fa = (n: number | string) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

/* The overlays are driven imperatively by the render loop (transform, opacity,
   `hidden`), so they must never be re-rendered by React — memo with no props
   keeps this subtree mounted and untouched for the lifetime of the section. */
const StageOverlays = memo(function StageOverlays() {
  return (
    <>
      {/* ── slide 1: milestones climbing the staircase ── */}
      <div className="milestones overlay" data-slide="0">
        <article className="m-card m1" data-depth="26">
          <div className="m-head">
            <svg className="m-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z" />
              <path d="M22 5.5A2.5 2.5 0 0 0 19.5 3H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z" />
            </svg>
            <div className="m-title">مهارت‌های پایه</div>
            <div className="m-num">01</div>
          </div>
          <p className="m-desc">یادگیری اصول و مفاهیم کلیدی</p>
        </article>

        <article className="m-card m2" data-depth="46">
          <div className="m-head">
            <svg className="m-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" />
              <circle cx="17.5" cy="9.5" r="2.4" />
              <path d="M16 15.2a5.6 5.6 0 0 1 5.5 4.3" />
            </svg>
            <div className="m-title">مدیریت</div>
            <div className="m-num">02</div>
          </div>
          <p className="m-desc">مدیریت تیم و ارتقای عملکرد</p>
        </article>

        <article className="m-card m3" data-depth="66">
          <div className="m-head">
            <svg className="m-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7.5l4.5 3.2L12 5l4.5 5.7L21 7.5 19.2 18H4.8z" />
              <path d="M4.8 20.5h14.4" />
            </svg>
            <div className="m-title">رهبری</div>
            <div className="m-num">03</div>
          </div>
          <p className="m-desc">رهبری موثر و تصمیم‌سازی</p>
        </article>

        <article className="m-card m4" data-depth="88">
          <div className="m-head">
            <svg className="m-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3.5c2 0 3.6 1.6 3.6 3.6 0 1.6-1 2.5-1.9 3.5-.7.8-1.1 1.5-1.2 2.4h-1c-.1-1.2.4-2.1 1.2-3 .8-.9 1.4-1.5 1.4-2.6A2.1 2.1 0 0 0 12 5.3" />
              <path d="M8.4 14.6 5.6 21l3.3-1.6L10.4 22l2-5.6" />
              <path d="M15.6 14.6 18.4 21l-3.3-1.6L13.6 22" />
              <circle cx="12" cy="8" r="6.4" opacity=".35" />
            </svg>
            <div className="m-title">تسلط حرفه‌ای</div>
            <div className="m-num">04</div>
          </div>
          <p className="m-desc">تخصص عمیق و تاثیرگذاری ماندگار</p>
        </article>
      </div>

      {/* ── slide 2: capability ring around the podium ── */}
      <div className="milestones overlay" data-slide="1" hidden>
        <article className="node n1" data-slot="0" data-depth="70">
          <span className="node-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3.5 22 8l-10 4.5L2 8z" />
              <path d="M6 10.2V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8" />
              <path d="M22 8v5" />
            </svg>
          </span>
          <b>یادگیری</b>
          <i>دوره‌ها و مسیرهای توسعه فردی</i>
        </article>
        <article className="node n2" data-slot="1" data-depth="58">
          <span className="node-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.2 2.2c3.4.7 6.4 3.4 7.2 6.9.7 3.2-.6 6.2-2.6 8.2l-3.4 3.4-2.9-2.9 3.4-3.4" />
              <path d="M10.6 12.2 7.2 15.6l-2.9-2.9 3.4-3.4C9.7 7.3 12.7 6 15.9 6.7" />
              <circle cx="14.6" cy="9.4" r="1.6" />
              <path d="m5.4 18.6-1.8 1.8" />
            </svg>
          </span>
          <b>توسعه</b>
          <i>مهارت‌های نرم، رهبری و حرفه‌ای</i>
        </article>
        <article className="node n3" data-slot="2" data-depth="62">
          <span className="node-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="7.5" width="16" height="12" rx="4" />
              <circle cx="9.2" cy="13.5" r="1.5" />
              <circle cx="14.8" cy="13.5" r="1.5" />
              <path d="M12 7.5V4M12 4h-1.6" />
              <path d="M2 12v3M22 12v3" />
            </svg>
          </span>
          <b>هوشمندی</b>
          <i>دستیار هوشمند و هوش مصنوعی</i>
        </article>
        <article className="node n4" data-slot="3" data-depth="52">
          <span className="node-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="7" width="19" height="12.5" rx="2.5" />
              <path d="M8.5 7V5.4A1.9 1.9 0 0 1 10.4 3.5h3.2A1.9 1.9 0 0 1 15.5 5.4V7" />
              <path d="M2.5 12.5h19" />
            </svg>
          </span>
          <b>توانمندسازی</b>
          <i>ابزارها و راهکارهای عملیاتی</i>
        </article>
        <article className="node n5" data-slot="4" data-depth="46">
          <span className="node-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="5" width="9" height="15" rx="1.6" />
              <path d="M6.2 8.6h3.6M6.2 12h3.6M6.2 15.4h3.6" />
              <path d="M12.5 20v-5.5a3.5 3.5 0 0 1 7 0V20" />
              <path d="M16 11V8.5" />
            </svg>
          </span>
          <b>تحول سازمانی</b>
          <i>استراتژی، سیستم‌ها و فرهنگ سازمانی</i>
        </article>
      </div>

      {/* ── slide 3: agent cards around the assistant ── */}
      <div className="milestones overlay" data-slide="2" hidden>
        <article className="agent a1" data-depth="72">
          <span className="agent-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3.5" width="11" height="17" rx="1.6" />
              <path d="M7 7.4h5M7 11h5M7 14.6h5" />
              <path d="M15 20.5v-8h4.5v8" />
            </svg>
          </span>
          <b>ایجنت‌های عمومی سازمان</b>
          <ul>
            <li>تحلیل اطلاعات و داده‌ها</li>
            <li>گزارش‌گیری هوشمند</li>
            <li>دستیار تصمیم‌گیری</li>
          </ul>
        </article>
        <article className="agent a2" data-depth="56">
          <span className="agent-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" />
              <circle cx="17.5" cy="9.5" r="2.4" />
              <path d="M16 15.2a5.6 5.6 0 0 1 5.5 4.3" />
            </svg>
          </span>
          <b>ایجنت‌های منابع انسانی</b>
          <ul>
            <li>جذب و استخدام</li>
            <li>مدیریت عملکرد</li>
            <li>آموزش و توسعه</li>
          </ul>
        </article>
        <article className="agent a3" data-depth="64">
          <span className="agent-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3.5c2.6 1.4 4.4 4 4.4 7.1 0 2.3-1 4-2.2 5.4H9.8C8.6 14.6 7.6 12.9 7.6 10.6c0-3.1 1.8-5.7 4.4-7.1z" />
              <circle cx="12" cy="10" r="1.8" />
              <path d="M9.8 19.2h4.4M10.6 21.6h2.8" />
            </svg>
          </span>
          <b>ایجنت‌های توسعه مهارت نرم</b>
          <ul>
            <li>کوچینگ هوشمند</li>
            <li>رهبری و مدیریت</li>
            <li>مسیرهای یادگیری</li>
          </ul>
        </article>
        <article className="agent a4" data-depth="44">
          <span className="agent-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 3.5h5v2.2a1.9 1.9 0 1 0 3.8 0V3.5h2.2v5h-2.2a1.9 1.9 0 1 0 0 3.8h2.2v5h-5v-2.2a1.9 1.9 0 1 0-3.8 0v2.2h-5v-5H5a1.9 1.9 0 1 0 0-3.8h1.3v-5H9.5z" />
            </svg>
          </span>
          <b>ایجنت‌های سفارشی سازمانی</b>
          <ul>
            <li>طراحی و پیاده‌سازی ایجنت متناسب با نیاز سازمان شما</li>
          </ul>
        </article>
      </div>
    </>
  );
});

type SceneAPI = { focus: (i: number) => void };

export default function Hero3DSlider() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneAPI | null>(null);

  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0); // the slide whose copy is on screen
  const [out, setOut] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [docHidden, setDocHidden] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      const next = (i + SLIDES.length) % SLIDES.length;
      return next === prev ? prev : next;
    });
  }, []);

  /* ── reduced motion ── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* ── copy swap: fade out, replace, fade back in ── */
  useEffect(() => {
    if (reduced) {
      setShown(index);
      setOut(false);
      return;
    }
    setOut(true);
    const id = setTimeout(() => {
      setShown(index);
      setOut(false);
    }, 320);
    return () => clearTimeout(id);
  }, [index, reduced]);

  /* ── reframe the 3D scene for the active slide ── */
  useEffect(() => {
    sceneRef.current?.focus(index);
  }, [index]);

  /* ── visibility: only run while the section is actually on screen ── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setDocHidden(document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  /* ── autoplay. `index` is a dependency on purpose: any manual navigation
        restarts the clock, so a click never fights a half-elapsed timer. ── */
  useEffect(() => {
    if (reduced || userPaused || hoverPaused || docHidden || !onScreen) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, userPaused, hoverPaused, docHidden, onScreen, index]);

  /* ── the three.js stage ── */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const fallback = fallbackRef.current;
    if (!root || !stage || !fallback) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const note = fallback.querySelector<HTMLElement>('.fallback-note');
    const spinner = fallback.querySelector<HTMLElement>('.spinner');

    const hasWebGL = () => {
      try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
      } catch {
        return false;
      }
    };

    if (!hasWebGL()) {
      spinner?.remove();
      if (note) note.textContent = 'مرورگر شما از نمایش سه‌بعدی پشتیبانی نمی‌کند — نمای ساده نمایش داده می‌شود.';
      return;
    }

    (async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const SkeletonUtils = await import('three/examples/jsm/utils/SkeletonUtils.js');
      if (disposed) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
      const ac = new AbortController();

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xeef2fa, 14, 30);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 2.9, 12.2);
      camera.lookAt(0, 1.6, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = !isMobile;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      stage.appendChild(renderer.domElement);

      /* ---------------- lighting ---------------- */
      scene.add(new THREE.HemisphereLight(0xffffff, 0xc3d0e6, 1.05));

      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(4.5, 9, 6);
      if (!isMobile) {
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 1;
        key.shadow.camera.far = 28;
        key.shadow.camera.left = -8;
        key.shadow.camera.right = 8;
        key.shadow.camera.top = 8;
        key.shadow.camera.bottom = -8;
        key.shadow.bias = -0.0008;
      }
      scene.add(key);

      const rim = new THREE.DirectionalLight(0xbcd0f0, 0.7);
      rim.position.set(-6, 4, -5);
      scene.add(rim);

      // warm bounce low in the scene, keeps the white geometry from going grey
      const warm = new THREE.PointLight(0xffc38a, 2.2, 12, 2);
      warm.position.set(1.6, -0.6, 3.4);
      scene.add(warm);

      /* ---------------- materials ---------------- */
      const matStep = new THREE.MeshStandardMaterial({ color: 0xf4f7fd, roughness: 0.55, metalness: 0.04 });
      const matRail = new THREE.MeshStandardMaterial({ color: 0xcdd9ee, roughness: 0.35, metalness: 0.12 });
      const matCore = new THREE.MeshStandardMaterial({ color: 0xdfe7f5, roughness: 0.6, metalness: 0.03 });

      /* one switchable group per slide */
      const stageA = new THREE.Group(); // 0: the climb
      const stageB = new THREE.Group(); // 1: capability podium
      const stageC = new THREE.Group(); // 2: the assistant
      stageB.visible = false;
      stageC.visible = false;
      scene.add(stageA, stageB, stageC);

      /* ---------------- the spiral staircase ---------------- */
      const stair = new THREE.Group();
      stair.position.y = -1.9;
      stageA.add(stair);

      const TURNS = 1.85;
      const STEPS = isMobile ? 46 : 72;
      const R = 2.2;
      const RISE = 5.0; // taller + tighter reads as a climb, not a coil
      const angleOf = (t: number) => t * Math.PI * 2 * TURNS + Math.PI * 0.15;
      const yOf = (t: number) => t * RISE;

      // steps as one InstancedMesh — 1 draw call
      const stepGeo = new THREE.BoxGeometry(1.35, 0.08, 0.4);
      const steps = new THREE.InstancedMesh(stepGeo, matStep, STEPS);
      steps.castShadow = steps.receiveShadow = !isMobile;
      const dummy = new THREE.Object3D();
      for (let i = 0; i < STEPS; i++) {
        const t = i / (STEPS - 1);
        const a = angleOf(t);
        dummy.position.set(Math.cos(a) * R, yOf(t), Math.sin(a) * R);
        dummy.rotation.set(0, -a, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        steps.setMatrixAt(i, dummy.matrix);
      }
      stair.add(steps);

      // the flowing outer ribbon / handrail
      const railPts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const a = angleOf(t);
        railPts.push(new THREE.Vector3(Math.cos(a) * (R + 0.72), yOf(t) + 0.62, Math.sin(a) * (R + 0.72)));
      }
      const railCurve = new THREE.CatmullRomCurve3(railPts);
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, isMobile ? 90 : 180, 0.075, 8, false), matRail);
      rail.castShadow = !isMobile;
      stair.add(rail);

      // wide sculpted band that reads as the staircase body
      const bandPts: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const a = angleOf(t);
        bandPts.push(new THREE.Vector3(Math.cos(a) * (R + 0.28), yOf(t) - 0.22, Math.sin(a) * (R + 0.28)));
      }
      const band = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(bandPts), isMobile ? 80 : 160, 0.17, 4, false),
        matCore
      );
      band.castShadow = !isMobile;
      stair.add(band);

      // central column
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.54, RISE + 0.4, 28), matCore);
      column.position.y = (RISE + 0.4) / 2 - 0.2;
      column.castShadow = column.receiveShadow = !isMobile;
      stair.add(column);

      /* ---------------- summit banner (pole + flag, carried at the top) ---------------- */
      const flagGroup = new THREE.Group();
      const topA = angleOf(1);
      flagGroup.position.set(Math.cos(topA) * R, yOf(1) + 0.05, Math.sin(topA) * R);
      stair.add(flagGroup);
      const bannerRest = flagGroup.position.clone();

      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 1.05, 10),
        new THREE.MeshStandardMaterial({ color: 0xb9c6dd, roughness: 0.4, metalness: 0.3 })
      );
      pole.position.y = 0.52;
      pole.castShadow = !isMobile;
      flagGroup.add(pole);

      const flagGeo = new THREE.PlaneGeometry(0.5, 0.3, 18, 6);
      const flag = new THREE.Mesh(
        flagGeo,
        new THREE.MeshStandardMaterial({
          color: 0xf36b1c,
          roughness: 0.55,
          metalness: 0.05,
          side: THREE.DoubleSide,
          emissive: 0x8a3505,
          emissiveIntensity: 0.18,
        })
      );
      flag.position.set(0.25, 0.88, 0);
      flag.castShadow = !isMobile;
      flagGroup.add(flag);
      const flagBase = (flagGeo.attributes.position.array as Float32Array).slice();

      /* ---------------- cast: learner + props ---------------- */
      const cast = new THREE.Group(); // outside `stair` so it never spins
      cast.position.y = -2.0; // stands on the ground plane
      stageA.add(cast);

      const shade = (hex: number, rough = 0.6, metal = 0.02) =>
        new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: metal });

      const addPart = (
        geo: InstanceType<typeof THREE.BufferGeometry>,
        mat: InstanceType<typeof THREE.Material>,
        x: number,
        y: number,
        z: number,
        parent: InstanceType<typeof THREE.Object3D>
      ) => {
        const m = new THREE.Mesh(geo as never, mat as never);
        m.position.set(x, y, z);
        m.castShadow = !isMobile;
        parent.add(m);
        return m;
      };

      /* --- the learner: a real scanned figure, parented to `stair` so he rides its rotation --- */
      const learner = new THREE.Group();
      stair.add(learner);

      const MAN_HEIGHT = 1.62; // scene units; step tread is 0.4, riser ~0.07

      /* climb → celebrate → fade out → restart at the bottom.
         The climb dominates the cycle so the section reads as continuous ascent. */
      const CLIMB_T = 14;
      const SUMMIT_T = 3.5;
      const RESET_T = 1.2;
      const ORBIT_SPEED = 0.16; // rad/s — one full 360° lap of the podium ≈ 39s
      /** Reduced motion keeps the climb and the orbit, at this fraction of the pace. */
      const SLOW_FACTOR = 2;
      const WALK_RATE = 1.1; // clip playback vs. wall clock
      const CYCLE = CLIMB_T + SUMMIT_T + RESET_T;

      let manReady = false;
      const manMats: InstanceType<typeof THREE.Material>[] = []; // collected so the loop boundary can fade him
      // driven by the rigged avatar's animation clips once they load
      let mixer: InstanceType<typeof THREE.AnimationMixer> | null = null;
      let mixerB: InstanceType<typeof THREE.AnimationMixer> | null = null;
      let actWalk: InstanceType<typeof THREE.AnimationAction> | null = null;
      /* Podium gestures: one of the three is chosen per swap. */
      let actsPresent: InstanceType<typeof THREE.AnimationAction>[] = [];
      let presentIdx = 0;

      /** Pick a different clip from `list`, avoiding an immediate repeat. */
      function pickOther(count: number, current: number) {
        if (count < 2) return 0;
        const n = Math.floor(Math.random() * (count - 1));
        return n >= current ? n + 1 : n;
      }
      function pickPresent() {
        presentIdx = pickOther(actsPresent.length, presentIdx);
      }

      /* ---- summit pose ----
         Reaching the top is held as a single proud stand rather than a
         dance, so the moment reads as arrival instead of celebration. */
      let actProud: InstanceType<typeof THREE.AnimationAction> | null = null;

      // place him on the helix at progress t0, facing along the tangent
      // YXZ so the lean (x) and sway (z) are applied in his own frame, after the heading
      learner.rotation.order = 'YXZ';

      function placeAt(t0: number) {
        const a = angleOf(t0);
        learner.position.set(Math.cos(a) * R, yOf(t0) + 0.04, Math.sin(a) * R);
        // model faces +z (verified from sole geometry); helix tangent gives the heading
        learner.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
      }
      placeAt(0.12);

      /* The supplied characters are rigged with numbered bone names
         (Hips_01, Spine_02, …) while every clip targets the plain Mixamo
         names, so the tracks have to be rebound before they will play.
         Built once the model is in, from its own skeleton. */
      let boneMap = new Map<string, string>();

      function buildBoneMap(rootObj: InstanceType<typeof THREE.Object3D>) {
        const map = new Map<string, string>();
        rootObj.traverse((o) => {
          const base = o.name.replace(/_\d+$/, '');
          if (base !== o.name && !map.has(base)) map.set(base, o.name);
        });
        return map;
      }

      function retarget(clip: InstanceType<typeof THREE.AnimationClip>) {
        if (!boneMap.size) return clip;
        const c = clip.clone();
        for (const track of c.tracks) {
          const dot = track.name.indexOf('.');
          if (dot < 0) continue;
          const hit = boneMap.get(track.name.slice(0, dot));
          if (hit) track.name = hit + track.name.slice(dot);
        }
        return c;
      }

      // drop horizontal hip translation, keeping the vertical bob
      function inPlace(clip: InstanceType<typeof THREE.AnimationClip>) {
        const c = clip.clone();
        for (const track of c.tracks) {
          if (!/Hips(_\d+)?\.position$/.test(track.name)) continue;
          for (let i = 0; i < track.values.length; i += 3) {
            track.values[i] = 0; // x
            track.values[i + 2] = 0; // z
          }
        }
        return c;
      }

      /** Rebind a clip to the loaded rig, then strip its root travel. */
      const prep = (clip: InstanceType<typeof THREE.AnimationClip>) => inPlace(retarget(clip));

      /* ---------------- stage B: capability podium ---------------- */
      /* shared podium */
      function makePodium() {
        const g = new THREE.Group();
        const tiers: [number, number, number][] = [
          [1.95, 0.18, 0.0],
          [1.52, 0.2, 0.18],
          [1.15, 0.22, 0.38],
        ];
        for (const [r, h, y] of tiers) {
          const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.05, h, 48), shade(0xf3f7fd, 0.5));
          m.position.y = y + h / 2;
          m.castShadow = m.receiveShadow = !isMobile;
          g.add(m);
        }
        // orange inlay ring on the top face
        const inlay = new THREE.Mesh(
          new THREE.RingGeometry(0.95, 1.02, 56),
          new THREE.MeshBasicMaterial({ color: 0xf36b1c, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
        );
        inlay.rotation.x = -Math.PI / 2;
        inlay.position.y = 0.605;
        g.add(inlay);
        return g;
      }

      // the big soft disc + ring that sits behind each podium subject
      function makeHalo(radius: number) {
        const g = new THREE.Group();
        const disc = new THREE.Mesh(
          new THREE.CircleGeometry(radius, 64),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
        );
        g.add(disc);
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(radius * 1.02, radius * 1.06, 64),
          new THREE.MeshBasicMaterial({ color: 0xd8e3f4, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
        );
        g.add(ring);
        return g;
      }

      stageB.position.y = -2.0;
      stageB.add(makePodium());

      const haloB = makeHalo(1.55);
      haloB.position.set(0, 1.95, -1.15);
      stageB.add(haloB);

      const orbitB = new THREE.Mesh(
        new THREE.TorusGeometry(2.55, 0.012, 8, 90),
        new THREE.MeshBasicMaterial({ color: 0xc3d2e9, transparent: true, opacity: 0.85 })
      );
      orbitB.position.y = 1.95;
      stageB.add(orbitB);

      // small markers riding the orbit, matching the dots between the icon nodes
      const beads: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < 6; i++) {
        const b = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 10),
          new THREE.MeshBasicMaterial({ color: i % 2 ? 0xf36b1c : 0x9db2d2 })
        );
        stageB.add(b);
        beads.push(b);
      }

      const manB = new THREE.Group(); // filled once the GLB arrives
      manB.position.y = 0.6;
      stageB.add(manB);

      /* --- load the rigged avatar + name-matched animation-only clips --- */
      const loader = new GLTFLoader();
      const load = (url: string) =>
        new Promise<{ scene: InstanceType<typeof THREE.Group>; animations: InstanceType<typeof THREE.AnimationClip>[] }>(
          (res, rej) => loader.load(url, res as never, undefined, rej)
        );

      /* One of the two supplied characters per visit, so a refresh swaps
         who is on stage. Chosen inside the effect, which only ever runs on
         the client — picking during render would break hydration. */
      const CHARACTERS = ['char-male', 'char-female'];
      const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

      Promise.all([
        load(`${ASSETS}/${character}.glb`),
        load(`${ASSETS}/anim-walk.glb`),
        load(`${ASSETS}/anim-present-1.glb`),
        load(`${ASSETS}/anim-present-2.glb`),
        load(`${ASSETS}/anim-present-3.glb`),
      ])
        .then(([av, walk, pre1, pre2, pre3]) => {
          if (disposed) return;
          const model = av.scene;
          boneMap = buildBoneMap(model);

          const fitFigure = (rootObj: InstanceType<typeof THREE.Object3D>) => {
            const box = new THREE.Box3().setFromObject(rootObj);
            const size = new THREE.Vector3();
            box.getSize(size);
            const mid = new THREE.Vector3();
            box.getCenter(mid);
            const k = MAN_HEIGHT / size.y;
            rootObj.scale.setScalar(k);
            rootObj.position.set(-mid.x * k, -box.min.y * k, -mid.z * k); // feet on the tread
          };

          const dress = (rootObj: InstanceType<typeof THREE.Object3D>) =>
            rootObj.traverse((o) => {
              const mesh = o as unknown as InstanceType<typeof THREE.Mesh> & {
                isMesh?: boolean;
                isSkinnedMesh?: boolean;
              };
              if (!mesh.isMesh && !mesh.isSkinnedMesh) return;
              mesh.castShadow = !isMobile;
              mesh.frustumCulled = false; // skinned bounds go stale while animating
              const mat = (mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>).clone();
              mat.transparent = true; // needed for the loop-boundary fade
              if (mat.map) mat.map.anisotropy = isMobile ? 1 : 4;
              mesh.material = mat;
              manMats.push(mat);
            });

          // the podium copy needs its own skeleton, so clone through SkeletonUtils
          const twin = SkeletonUtils.clone(model);
          fitFigure(twin);
          twin.rotation.y = Math.PI; // seen from behind, as in the reference
          dress(twin);
          manB.add(twin);
          mixerB = new THREE.AnimationMixer(twin);
          /* Podium: three standing gestures, one picked per pass. Playing all
             three at zero weight lets `pickPresent` cross-fade without a
             restart, which would pop the skeleton back to its bind pose. */
          actsPresent = [pre1, pre2, pre3].map((g) => {
            const a = mixerB!.clipAction(prep(g.animations[0]));
            a.setEffectiveWeight(0);
            a.play();
            return a;
          });
          pickPresent();

          fitFigure(model);
          dress(model);
          learner.add(model);

          mixer = new THREE.AnimationMixer(model);
          // in-place clips: strip root translation so the helix alone moves him
          actWalk = mixer.clipAction(prep(walk.animations[0]));
          actWalk.play();

          /* Held at the summit. Zero weight until the climb ends, so the
             cross-fade never restarts it back to the bind pose. */
          actProud = mixer.clipAction(prep(pre1.animations[0]));
          actProud.setEffectiveWeight(0);
          actProud.play();

          manReady = true;
        })
        .catch((err) => {
          // a missing model must not take the whole scene down
          console.warn('character/clips failed to load — scene continues without the figure.', err);
        });

      // --- plant + book stack, bottom left ---
      const props = new THREE.Group();
      props.position.set(-3.05, 0, 3.5);
      cast.add(props);

      const pot = addPart(new THREE.CylinderGeometry(0.16, 0.12, 0.24, 18), shade(0xdfe7f4, 0.6), 0, 0.12, 0, props);
      pot.receiveShadow = !isMobile;
      const leafMat = shade(0x4f9b6a, 0.65);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const leaf = addPart(
          new THREE.SphereGeometry(0.1, 12, 10),
          leafMat,
          Math.cos(a) * 0.11,
          0.31 + Math.sin(i * 1.7) * 0.06,
          Math.sin(a) * 0.11,
          props
        );
        leaf.scale.set(0.7, 1.5, 0.5);
        leaf.rotation.set(0, -a, Math.cos(a) * 0.45);
      }

      const bookCols = [0xf36b1c, 0xdbe4f2, 0x4f7dc2];
      bookCols.forEach((col, i) => {
        const b = addPart(
          new THREE.BoxGeometry(0.52, 0.075, 0.36),
          shade(col, 0.6),
          0.58,
          0.04 + i * 0.08,
          0.05 + i * 0.02,
          props
        );
        b.rotation.y = (i - 1) * 0.16;
      });

      /* ---------------- stage C: the assistant ---------------- */
      stageC.position.y = -2.0;
      stageC.add(makePodium());

      const haloC = makeHalo(1.45);
      haloC.position.set(0, 2.05, -1.2);
      stageC.add(haloC);

      const robot = new THREE.Group();
      robot.position.y = 0.6;
      robot.scale.setScalar(2.15); // the assistant is the subject of this slide
      stageC.add(robot);

      const mBot = shade(0xf6f9ff, 0.35, 0.08);
      const mBotDim = shade(0xc9d8ef, 0.4, 0.12);
      const mEye = new THREE.MeshStandardMaterial({
        color: 0x49b6ff,
        emissive: 0x2a9bf0,
        emissiveIntensity: 1.6,
        roughness: 0.3,
      });

      addPart(new THREE.SphereGeometry(0.3, 30, 22), mBot, 0, 0.6, 0, robot); // head
      addPart(new THREE.SphereGeometry(0.272, 30, 22, -0.95, 1.9, 0.65, 0.95), shade(0x22304d, 0.25, 0.2), 0, 0.6, 0.035, robot);
      addPart(new THREE.SphereGeometry(0.052, 16, 14), mEye, -0.098, 0.625, 0.248, robot); // eyes
      addPart(new THREE.SphereGeometry(0.052, 16, 14), mEye, 0.098, 0.625, 0.248, robot);
      addPart(new THREE.CapsuleGeometry(0.088, 0.1, 5, 14), mBotDim, -0.3, 0.6, 0, robot); // ear cups
      addPart(new THREE.CapsuleGeometry(0.088, 0.1, 5, 14), mBotDim, 0.3, 0.6, 0, robot);
      addPart(new THREE.CapsuleGeometry(0.215, 0.18, 6, 18), mBot, 0, 0.22, 0, robot); // body
      addPart(new THREE.TorusGeometry(0.23, 0.022, 8, 30), mBotDim, 0, 0.15, 0, robot).rotation.x = Math.PI / 2;
      const armL = addPart(new THREE.CapsuleGeometry(0.048, 0.15, 4, 12), mBotDim, -0.285, 0.28, 0, robot);
      const armR = addPart(new THREE.CapsuleGeometry(0.048, 0.15, 4, 12), mBotDim, 0.285, 0.28, 0, robot);
      addPart(new THREE.CapsuleGeometry(0.055, 0.06, 4, 12), mBotDim, -0.1, -0.02, 0.02, robot); // feet
      addPart(new THREE.CapsuleGeometry(0.055, 0.06, 4, 12), mBotDim, 0.1, -0.02, 0.02, robot);

      const botGlow = new THREE.Mesh(
        new THREE.RingGeometry(0.34, 0.42, 40),
        new THREE.MeshBasicMaterial({ color: 0xf36b1c, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      );
      botGlow.rotation.x = -Math.PI / 2;
      botGlow.position.y = -0.05;
      robot.add(botGlow);

      /* --- the Ariyaz 3D wordmark: in the halo on slide 2, on the assistant on slide 3 --- */
      const logoHalo = new THREE.Group(); // behind the figure, inside the white disc
      const logoChest = new THREE.Group(); // decal on the robot's body
      logoHalo.position.set(0, 0, 0.06);
      logoChest.position.set(0, 0.22, 0.205);
      haloB.add(logoHalo);
      robot.add(logoChest);

      new GLTFLoader().load(
        `${ASSETS}/logo.glb`,
        (gltf) => {
          if (disposed) return;
          const logo = gltf.scene;
          const box = new THREE.Box3().setFromObject(logo);
          const size = new THREE.Vector3();
          box.getSize(size);
          const mid = new THREE.Vector3();
          box.getCenter(mid);

          // the export sits off-origin, so recentre before scaling to a target width
          const fit = (target: InstanceType<typeof THREE.Object3D>, width: number) => {
            const inst = logo.clone();
            const k = width / size.x;
            inst.scale.setScalar(k);
            inst.position.set(-mid.x * k, -mid.y * k, -mid.z * k);
            inst.traverse((o) => {
              const mesh = o as unknown as InstanceType<typeof THREE.Mesh>;
              if (!(mesh as never as { isMesh?: boolean }).isMesh) return;
              mesh.castShadow = false;
              const mat = (mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>).clone();
              mat.roughness = 0.35;
              mat.metalness = 0.05;
              mesh.material = mat;
            });
            target.add(inst);
          };

          fit(logoHalo, 2.05);
          fit(logoChest, 0.3);
        },
        undefined,
        (err) => {
          console.warn('logo.glb failed to load — scenes continue unbranded.', err);
        }
      );

      /* ---------------- ambient dust ---------------- */
      const COUNT = isMobile ? 160 : 420;
      const pPos = new Float32Array(COUNT * 3);
      const pSeed = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 12;
        pPos[i * 3 + 1] = Math.random() * 7 - 1.5;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
        pSeed[i] = Math.random() * Math.PI * 2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const dust = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          color: 0xf6a259,
          size: 0.055,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      scene.add(dust);

      /* ---------------- ground / contact shadow ---------------- */
      const ground = new THREE.Mesh(new THREE.CircleGeometry(9, 48), new THREE.ShadowMaterial({ opacity: 0.16 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2.0;
      ground.receiveShadow = true;
      scene.add(ground);

      /* ---------------- resize ---------------- */
      function resize() {
        const w = stage!.clientWidth;
        const h = stage!.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.fov = w < 700 ? 46 : 38;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(stage);

      /* ---------------- pointer parallax (shared with the CSS cards) ---------------- */
      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };

      /* per-slide camera framing, eased in the render loop.
         Podium subjects stand at world y -1.4 .. 0.5, so those slides sit the
         camera low and aim near the figure's chest instead of above its head. */
      const FRAMES = [
        { x: 0, y: 0.0, rot: 0, z: 0.0 },
        { x: 0, y: -1.55, rot: 0, z: -3.1 },
        { x: 0, y: -1.45, rot: 0, z: -3.6 },
      ];
      const LOOK_Y = [1.6, -0.15, -0.05];
      const frame = { ...FRAMES[0] };
      const frameCur = { ...FRAMES[0] };

      const stages = [stageA, stageB, stageC];
      const overlays = [0, 1, 2].map((n) => root!.querySelector<HTMLElement>(`.overlay[data-slide="${n}"]`)!);
      let activeStage = 0;

      const cards = [...root!.querySelectorAll<HTMLElement>('.m-card, .node, .agent')];
      const mCards = [...overlays[0].querySelectorAll<HTMLElement>('.m-card')];
      // grouped per slide so the render loop only writes to the overlay on screen
      const cardsByStage = overlays.map((ov) => [...ov.querySelectorAll<HTMLElement>('.m-card, .node, .agent')]);
      const CARD_AT = [0.1, 0.36, 0.62, 0.9]; // where each milestone sits on the climb
      let activeCard = -2; // -2 forces the first sync

      // the milestone the climber has just reached comes forward; the rest recede
      function syncCards(walkT: number) {
        const reached = CARD_AT.reduce((acc, stop, n) => (walkT >= stop ? n : acc), -1);
        if (reached === activeCard) return;
        activeCard = reached;
        mCards.forEach((c, n) => {
          c.classList.toggle('is-active', n === reached);
          // recorded on the element so the entry animation can settle back to it
          c.dataset.targetOpacity = reached === -1 || n === reached ? '1' : '0.62';
          c.style.opacity = c.dataset.targetOpacity;
        });
      }
      syncCards(0.12); // matches the opening pose, so the static view isn't blank

      /* Release the entry animation once it finishes, settling to whatever opacity
         the card is supposed to hold — a filled animation would otherwise pin
         transform:none and opacity:1, overriding both parallax and dimming. */
      function settle(el: HTMLElement) {
        el.addEventListener(
          'animationend',
          () => {
            el.style.animation = 'none';
            el.style.opacity = el.dataset.targetOpacity || '1';
          },
          { once: true }
        );
      }
      for (const c of cards) settle(c);

      // re-run the staggered entry animation whenever an overlay comes back
      function replayEntry(rootEl: HTMLElement) {
        for (const el of rootEl.querySelectorAll<HTMLElement>('.m-card, .node, .agent')) {
          if (reducedMotion) {
            // no animation runs here, so animationend would never fire to restore
            // the opacity — apply the resting value directly instead
            el.style.opacity = el.dataset.targetOpacity || '1';
            continue;
          }
          el.style.animation = 'none';
          el.style.opacity = '';
          void el.offsetWidth; // reflow, so the animation restarts
          el.style.animation = '';
          settle(el);
        }
      }

      sceneRef.current = {
        focus(i: number) {
          Object.assign(frame, FRAMES[i] || FRAMES[0]);
          activeStage = i;
          stages.forEach((g, n) => {
            g.visible = n === i;
          });
          overlays.forEach((el, n) => {
            el.hidden = n !== i;
          });
          // the climber's fade is driven by stage A only; anywhere else he is solid
          if (i !== 0) for (const m of manMats) (m as { opacity: number }).opacity = 1;
          // force a full restyle: activeCard survives the slide change, so without
          // this the other cards keep whatever dimming they had when we left
          if (i === 0) {
            activeCard = -2;
            syncCards(0.12);
          }
          replayEntry(overlays[i]);
        },
      };

      if (!isMobile) {
        root!.addEventListener(
          'pointermove',
          (e) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
          },
          { signal: ac.signal }
        );
        root!.addEventListener(
          'pointerleave',
          () => {
            target.x = target.y = 0;
          },
          { signal: ac.signal }
        );
      }

      /* ---------------- render loop (pauses off-screen) ---------------- */
      let visible = true;
      const vio = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      }, { threshold: 0 });
      vio.observe(stage);

      /* Slide 2's capability ring steps round one node at a time rather than
         drifting, so each move lands with a gesture. */
      const NODE_COUNT = 5;
      const SLOT_ARC = (Math.PI * 2) / NODE_COUNT;
      /* Ellipse the nodes travel on, in % of the stage box. The narrow stage
         needs its own, tighter ring — the same one the old fixed positions
         described — or the nodes ride off the edge. */
      const [RING_CX, RING_CY, RING_RX, RING_RY] = isMobile
        ? [35.5, 28.5, 30.5, 28.5]
        : [38.5, 32, 25.5, 28];
      const SWAP_EVERY = 3.2; // seconds between swaps
      const SWAP_TURN = 1.1; // seconds the turn itself takes
      const ease = (p: number) => {
        const c = Math.max(0, Math.min(1, p));
        return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
      };
      let ringSlot = 0;
      let lastSwapSlot = -1;

      const started = performance.now();
      let camAngle = 0;
      let camRadius = 12.2; // camera in polar coords around the scene
      let lookY = 1.6;
      let raf = 0;

      function tick() {
        raf = requestAnimationFrame(tick);
        if (!visible) return;

        const t = (performance.now() - started) / 1000;
        cur.x += (target.x - cur.x) * 0.055;
        cur.y += (target.y - cur.y) * 0.055;
        for (const k of ['x', 'y', 'rot', 'z'] as const) frameCur[k] += (frame[k] - frameCur[k]) * 0.045;

        if (activeStage === 1) {
          /* The podium figure gestures, and the capability ring advances one
             slot per gesture — so each sweep of his hands reads as him moving
             the next capability into place. */
          const slot = Math.floor(t / SWAP_EVERY);
          const intoSlot = ease((t % SWAP_EVERY) / SWAP_TURN); // 0→1 across the turn
          ringSlot = slot + intoSlot;

          if (slot !== lastSwapSlot) {
            lastSwapSlot = slot;
            pickPresent(); // a different gesture accompanies each swap
          }

          if (mixerB) {
            actsPresent.forEach((a, i) => a.setEffectiveWeight(i === presentIdx ? 1 : 0));
            mixerB.setTime(t);
          }
          manB.position.y = 0.6;

          if (!reducedMotion) {
            // the 3D ring and its beads ride the same rotation
            const ringA = ringSlot * SLOT_ARC;
            orbitB.rotation.z = ringA;
            beads.forEach((b, i) => {
              const a = ringA + (i / beads.length) * Math.PI * 2;
              b.position.set(Math.cos(a) * 2.55, 1.95 + Math.sin(t * 0.9 + i) * 0.05, Math.sin(a) * 2.55);
            });
          }
        }

        if (!reducedMotion) {
          if (activeStage === 2) {
            robot.position.y = 0.6 + Math.sin(t * 1.6) * 0.06;
            robot.rotation.y = Math.sin(t * 0.45) * 0.16;
            robot.rotation.z = Math.sin(t * 1.6) * 0.03;
            armR.rotation.z = -0.45 - Math.max(0, Math.sin(t * 5.2)) * 0.7; // waves
            armL.rotation.z = 0.2;
            (botGlow.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity =
              0.38 + Math.sin(t * 2.4) * 0.16;
          }
        }

        if (activeStage === 0) {
          // no autonomous spin: the camera orbit supplies the movement now
          stair.rotation.y = cur.x * 0.22 + frameCur.rot;
          stair.position.y = -1.9 + (reducedMotion ? 0 : Math.sin(t * 0.7) * 0.045);

          /* --- climb → summit celebration → fade → restart ---
             The ascent is the point of the slide, so it runs even for
             reduced-motion viewers — just slower, and without the hops,
             sway and cloth flutter layered on top. */
          const cycle = reducedMotion ? CYCLE * SLOW_FACTOR : CYCLE;
          const climbT = reducedMotion ? CLIMB_T * SLOW_FACTOR : CLIMB_T;
          const ct = t % cycle;
          const climbing = ct < climbT;
          const walkT = climbing ? ct / climbT : 1;
          const summitS = climbing ? 0 : ct - climbT; // seconds spent at the top

          placeAt(walkT);
          // the walk clip supplies the gait; only the lean into the slope is ours
          learner.rotation.x = climbing ? -0.09 : 0;

          if (mixer && actWalk) {
            // cross-weight walk → the proud stand held at the top
            const toProud = climbing || !actProud ? 0 : Math.min(1, summitS / 0.35);
            actWalk.setEffectiveWeight(1 - toProud);
            actProud?.setEffectiveWeight(toProud);
            // the gait keeps pace with the (slower) reduced-motion ascent
            mixer.setTime(t * (reducedMotion ? WALK_RATE / SLOW_FACTOR : WALK_RATE));
          }

          /* No hops or show-off turn at the top any more — the arrival is
             carried by the standing pose alone, so the figure simply
             squares up and holds the banner. */
          if (!climbing) learner.rotation.z = 0;

          // he picks the banner up on arrival and carries it aloft
          const holding = !climbing && summitS > 0.3;
          if (holding) {
            const heading = learner.rotation.y;
            flagGroup.position.set(
              learner.position.x + Math.cos(heading) * 0.34,
              learner.position.y + 0.42,
              learner.position.z - Math.sin(heading) * 0.34
            );
            flagGroup.rotation.set(0, heading, 0.2);
          } else {
            flagGroup.position.copy(bannerRest);
            flagGroup.rotation.set(0, 0, 0);
          }

          // fade him out at the end of the loop and back in at the bottom
          if (manReady) {
            const alpha =
              ct < 0.7 ? ct / 0.7 : ct > cycle - RESET_T ? Math.max(0, (cycle - ct) / RESET_T) : 1;
            for (const m of manMats) (m as { opacity: number }).opacity = alpha;
          }

          syncCards(walkT);

          if (!reducedMotion) {
            // cloth-ish flag wave
            const pos = flagGeo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
              const x = flagBase[i * 3];
              const y = flagBase[i * 3 + 1];
              const k = (x + 0.25) / 0.5; // 0 at the pole, 1 at the free edge
              pos.setZ(i, Math.sin(x * 10 - t * 4.5) * 0.06 * k + Math.cos(y * 7 + t * 2.4) * 0.015 * k);
            }
            pos.needsUpdate = true;

            const dp = pGeo.attributes.position;
            const arr = dp.array as Float32Array;
            for (let i = 0; i < COUNT; i++) {
              arr[i * 3 + 1] += 0.0032 + Math.sin(pSeed[i] + t) * 0.0009;
              if (arr[i * 3 + 1] > 5.6) arr[i * 3 + 1] = -1.8;
            }
            dp.needsUpdate = true;
          }
        }

        /* The camera orbits continuously on every slide, a full 360° and never
           stopping — driven by absolute time, so switching slides doesn't reset
           or pause it. Reduced-motion viewers get the same lap at a gentler
           rate rather than a parked camera. Eased in polar coordinates on
           purpose: lerping x/z straight would send it through the scene. */
        camAngle = t * (reducedMotion ? ORBIT_SPEED / SLOW_FACTOR : ORBIT_SPEED);
        camRadius += (12.2 + frameCur.z - camRadius) * 0.06;

        const camX = Math.sin(camAngle) * camRadius + cur.x * 0.5;
        const camZ = Math.cos(camAngle) * camRadius;

        camera.position.x += (camX - camera.position.x) * 0.06;
        camera.position.y += (2.9 - cur.y * 0.7 + frameCur.y - camera.position.y) * 0.06;
        camera.position.z += (camZ - camera.position.z) * 0.06;

        lookY += (LOOK_Y[activeStage] - lookY) * 0.06; // eased, so slide swaps don't snap
        camera.lookAt(0, lookY, 0);

        // DOM cards ride the same parallax, each at its own depth
        for (const c of cardsByStage[activeStage]) {
          const d = +(c.dataset.depth || 0);
          const active = c.classList.contains('is-active');
          /* Capability nodes are laid out from the ring angle instead of fixed
             CSS coordinates, so they travel with the 3D ring below them. */
          const slotAttr = c.dataset.slot;
          if (slotAttr !== undefined) {
            const a = (ringSlot + +slotAttr) * SLOT_ARC - Math.PI / 2;
            c.style.left = `${RING_CX + Math.cos(a) * RING_RX}%`;
            c.style.top = `${RING_CY + Math.sin(a) * RING_RY}%`;
          }
          /* translateZ magnifies an element outward from the perspective origin,
             which pushes cards past the stage edge on small screens. Parallax is
             off on mobile anyway, so drop the depth entirely there. */
          const z = isMobile ? 0 : d + (active ? 80 : 0);
          const s = active ? (isMobile ? 1.03 : 1.07) : 1;
          c.style.transform =
            `translate3d(${-cur.x * d * 0.34}px, ${-cur.y * d * 0.2}px, ${z}px)` +
            ` rotateY(${cur.x * 5}deg) rotateX(${-cur.y * 3.5}deg) scale(${s})`;
        }

        renderer.render(scene, camera);
      }

      // reveal on the first synchronous frame — waiting on rAF would stall in a
      // background tab, where rAF never fires and the loader would spin forever
      renderer.render(scene, camera);
      fallback.hidden = true;
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ac.abort();
        ro.disconnect();
        vio.disconnect();
        sceneRef.current = null;
        renderer.domElement.remove();
        renderer.dispose();
        scene.traverse((o) => {
          const mesh = o as unknown as InstanceType<typeof THREE.Mesh>;
          if (!(mesh as never as { isMesh?: boolean }).isMesh) return;
          mesh.geometry?.dispose();
          const mat = mesh.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        });
      };
    })().catch((err) => {
      // never leave the loader spinning on a silent failure
      console.error('3D scene failed to start:', err);
      spinner?.remove();
      if (note) note.textContent = 'نمایش سه‌بعدی بارگذاری نشد.';
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  const slide = SLIDES[shown];

  return (
    <section
      ref={rootRef}
      className="a3d-hero"
      role="region"
      aria-roledescription="اسلایدر"
      aria-label="معرفی پلتفرم آریاز"
      tabIndex={0}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
      onKeyDown={(e) => {
        // mirrored for RTL reading order
        if (e.key === 'ArrowLeft') goTo(index + 1);
        if (e.key === 'ArrowRight') goTo(index - 1);
      }}
    >
      {/* ================= 3D STAGE ================= */}
      <div className="stage" ref={stageRef}>
        <div className="stage-fallback" ref={fallbackRef}>
          <div>
            <div className="spinner" />
            <div className="fallback-note">در حال آماده‌سازی صحنه سه‌بعدی…</div>
          </div>
        </div>
        <StageOverlays />
      </div>

      {/* ================= COPY ================= */}
      <div className="copy">
        <div
          className={`slide${out ? ' is-out' : ''}`}
          role="group"
          aria-roledescription="اسلاید"
          aria-label={`${fa(index + 1)} از ${fa(SLIDES.length)}`}
          aria-live="polite"
        >
          <h1>
            <span className={`l1${slide.accentLine === 1 ? ' accent' : ''}`}>{slide.l1}</span>
            <span className={`l2${slide.accentLine === 2 ? ' accent' : ''}`}>{slide.l2}</span>
          </h1>
          <p className="subtitle">{slide.subtitle || ''}</p>
          {slide.rule && <span className="rule" />}
          <p className="body">{slide.body}</p>

          <div className="pills">
            {slide.pills.map((p) => (
              <div className="pill" key={p.label}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: ICONS[p.icon] }}
                />
                <span dangerouslySetInnerHTML={{ __html: p.label }} />
              </div>
            ))}
          </div>

          <div className="cta">
            <Link className="btn btn-primary" href={slide.primary.href} data-ripple>
              <span className="lbl">{slide.primary.label}</span>
              <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" href={slide.ghost.href}>
              <span className="lbl">{slide.ghost.label}</span>
              <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* in RTL, "next" (the left chevron on screen) advances the deck */}
      <button className="nav nav-prev" aria-label="قبلی" onClick={() => goTo(index - 1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button className="nav nav-next" aria-label="بعدی" onClick={() => goTo(index + 1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* WCAG 2.2.2: auto-advancing content needs an explicit pause control */}
      <button
        className="playpause"
        type="button"
        hidden={reduced}
        data-paused={String(userPaused)}
        aria-label={userPaused ? 'اجرای نمایش خودکار' : 'توقف نمایش خودکار'}
        onClick={() => setUserPaused((p) => !p)}
      >
        <svg className="ic-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="7" y="5" width="3.6" height="14" rx="1.2" />
          <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" />
        </svg>
        <svg className="ic-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.2v13.6L19 12z" />
        </svg>
      </button>

      <div className="dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.l1}
            className="dot"
            aria-current={index === i ? 'true' : undefined}
            aria-label={`اسلاید ${fa(i + 1)}: ${s.l1} ${s.l2}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <style jsx global>{`
        .a3d-hero {
          --ink: #0f2557;
          --ink-soft: #4a5a7a;
          --orange: #f36b1c;
          --orange-deep: #e2580c;
          --card: #ffffff;
          --stroke: #e2e8f2;
          --shadow-sm: 0 4px 14px rgba(20, 40, 90, 0.06);
          --shadow-md: 0 18px 40px rgba(20, 40, 90, 0.1);
          --shadow-lg: 0 30px 70px rgba(20, 40, 90, 0.16);
          --r: 18px;

          position: relative;
          max-width: 1320px;
          margin: 0 auto;
          min-height: clamp(560px, 78vh, 780px);
          display: grid;
          /* dir=rtl: track 1 is the RIGHT column (copy), track 2 is the LEFT (3D stage) */
          grid-template-columns: 0.92fr 1.08fr;
          align-items: center;
          gap: 24px;
          padding: 48px 56px;
          overflow: hidden;
          color: var(--ink);
          background: radial-gradient(120% 90% at 18% 30%, #ffffff 0%, #eef2f9 45%, #e9eef7 100%);
        }
        .a3d-hero *,
        .a3d-hero *::before,
        .a3d-hero *::after {
          box-sizing: border-box;
        }
        .a3d-hero::after {
          /* soft vignette so the 3D melts into the page */
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(75% 60% at 30% 45%, transparent 55%, rgba(233, 238, 247, 0.85) 100%);
        }

        /* ---------- 3D stage (left) ---------- */
        .a3d-hero .stage {
          position: absolute;
          inset: 0 42% 0 0;
          perspective: 1400px;
          perspective-origin: 38% 48%;
        }
        .a3d-hero .stage canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .a3d-hero .stage-fallback {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: linear-gradient(160deg, #eef2fa, #dfe7f5);
        }
        .a3d-hero .stage-fallback[hidden] {
          display: none;
        }
        .a3d-hero .spinner {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid rgba(15, 37, 87, 0.12);
          border-top-color: var(--orange);
          animation: a3dSpin 0.8s linear infinite;
        }
        .a3d-hero .fallback-note {
          font-size: 13px;
          color: var(--ink-soft);
          margin-top: 12px;
          text-align: center;
        }
        @keyframes a3dSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---------- floating cards (CSS 3D over the canvas) ---------- */
        .a3d-hero .milestones {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        .a3d-hero .m-card {
          position: absolute;
          width: 190px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-md);
          transform-style: preserve-3d;
          pointer-events: auto;
          transition: box-shadow 0.3s ease;
          opacity: 0;
          animation: a3dCardIn 0.7s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
        }
        .a3d-hero .m-card:hover {
          box-shadow: var(--shadow-lg);
        }
        /* the step the climber has just reached */
        .a3d-hero .m-card.is-active {
          background: rgba(255, 255, 255, 0.97);
          border-color: rgba(243, 107, 28, 0.55);
          box-shadow: 0 26px 60px rgba(243, 107, 28, 0.22), var(--shadow-md);
        }
        .a3d-hero .m-card.is-active .m-icon {
          color: var(--orange);
        }
        .a3d-hero .pills:empty {
          display: none;
        }
        @keyframes a3dCardIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .a3d-hero .m-head {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-start;
        }
        /* reference order (reading RTL): number, icon, title */
        .a3d-hero .m-num {
          order: -1;
          font-size: 15px;
          font-weight: 800;
          color: var(--orange);
          letter-spacing: 0.5px;
        }
        .a3d-hero .m-icon {
          width: 26px;
          height: 26px;
          flex: 0 0 26px;
          color: var(--ink);
        }
        .a3d-hero .m-title {
          flex: 1 1 auto;
          font-size: 14px;
          font-weight: 800;
          color: var(--ink);
        }
        .a3d-hero .m-desc {
          margin: 6px 0 0;
          font-size: 11.5px;
          line-height: 1.75;
          color: var(--ink-soft);
        }

        .a3d-hero .overlay[hidden] {
          display: none;
        }

        /* ---- slide 2: circular capability nodes ---- */
        .a3d-hero .node {
          position: absolute;
          width: 138px;
          text-align: center;
          transform-style: preserve-3d;
          pointer-events: auto;
          opacity: 0;
          animation: a3dCardIn 0.7s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
        }
        .a3d-hero .node-ic {
          display: grid;
          place-items: center;
          width: 74px;
          height: 74px;
          margin: 0 auto 10px;
          border-radius: 50%;
          background: linear-gradient(180deg, #fff, #f2f6fd);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-md);
        }
        .a3d-hero .node-ic svg {
          width: 34px;
          height: 34px;
          color: var(--ink);
        }
        .a3d-hero .node b {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: var(--ink);
          line-height: 1.7;
        }
        .a3d-hero .node i {
          display: block;
          font-style: normal;
          font-size: 10.5px;
          line-height: 1.75;
          color: var(--ink-soft);
          margin-top: 2px;
        }
        /* left/top are written each frame from the ring angle; only the
           staggered entry delay lives here now. */
        .a3d-hero .n1 { left: 41%; top: 4%;  animation-delay: 0.1s; }
        .a3d-hero .n2 { left: 64%; top: 26%; animation-delay: 0.2s; }
        .a3d-hero .n3 { left: 58%; top: 60%; animation-delay: 0.3s; }
        .a3d-hero .n4 { left: 19%; top: 60%; animation-delay: 0.4s; }
        .a3d-hero .n5 { left: 13%; top: 26%; animation-delay: 0.5s; }

        /* ---- slide 3: agent cards ---- */
        .a3d-hero .agent {
          position: absolute;
          width: 216px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px) saturate(1.2);
          -webkit-backdrop-filter: blur(10px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: var(--shadow-md);
          transform-style: preserve-3d;
          pointer-events: auto;
          opacity: 0;
          animation: a3dCardIn 0.7s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
        }
        .a3d-hero .agent-ic {
          position: absolute;
          top: -26px;
          inset-inline-start: 16px;
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(180deg, #fff, #f2f6fd);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: var(--shadow-sm);
        }
        .a3d-hero .agent-ic svg {
          width: 26px;
          height: 26px;
          color: var(--ink);
        }
        .a3d-hero .agent b {
          display: block;
          margin-top: 16px;
          font-size: 13px;
          font-weight: 800;
          color: var(--ink);
        }
        .a3d-hero .agent ul {
          margin: 8px 0 0;
          padding: 0;
          list-style: none;
        }
        .a3d-hero .agent li {
          position: relative;
          font-size: 11px;
          line-height: 1.95;
          color: var(--ink-soft);
          padding-inline-start: 14px;
        }
        .a3d-hero .agent li::before {
          content: '';
          position: absolute;
          inset-inline-start: 0;
          top: 0.75em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--orange);
        }
        .a3d-hero .a1 { left: 30%; top: 3%;  animation-delay: 0.1s; }
        .a3d-hero .a2 { left: 4%;  top: 33%; animation-delay: 0.22s; }
        .a3d-hero .a3 { left: 53%; top: 30%; animation-delay: 0.34s; }
        .a3d-hero .a4 { left: 20%; top: 68%; animation-delay: 0.46s; }

        /* 5% not 2%: when active this card scales and pops in Z, and the
           perspective magnification would otherwise clip it against overflow:hidden */
        .a3d-hero .m1 { left: 5%;  top: 60%; animation-delay: 0.15s; }
        .a3d-hero .m2 { left: 24%; top: 47%; animation-delay: 0.3s; }
        .a3d-hero .m3 { left: 41%; top: 31%; animation-delay: 0.45s; }
        .a3d-hero .m4 { left: 58%; top: 14%; animation-delay: 0.6s; }

        /* ---------- copy (right) ---------- */
        .a3d-hero .copy {
          grid-column: 1;
          position: relative;
          z-index: 3;
          text-align: right;
          padding-inline-start: 12px;
        }
        .a3d-hero .slide {
          min-height: 500px; /* tallest slide, so swapping never jolts the layout */
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.2, 0.8, 0.25, 1);
        }
        .a3d-hero .slide.is-out {
          opacity: 0;
          transform: translateX(-18px);
        }
        .a3d-hero .copy h1 {
          margin: 0;
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1.42;
          font-weight: 900;
          letter-spacing: -0.5px;
        }
        .a3d-hero .copy h1 .l1,
        .a3d-hero .copy h1 .l2 {
          display: block;
        }
        .a3d-hero .copy h1 .accent {
          color: var(--orange);
          display: block;
        }
        .a3d-hero .subtitle {
          margin: 22px 0 0;
          font-size: clamp(15px, 1.35vw, 19px);
          line-height: 2;
          font-weight: 700;
          color: var(--ink);
          max-width: 44ch;
          margin-inline-start: auto;
        }
        .a3d-hero .subtitle:empty {
          display: none;
        }
        .a3d-hero .rule {
          display: block;
          width: 64px;
          height: 4px;
          border-radius: 2px;
          background: var(--orange);
          margin: 18px 0 0 auto;
        }
        .a3d-hero .copy p.body {
          margin: 22px 0 0;
          font-size: clamp(14px, 1.15vw, 16.5px);
          line-height: 2.1;
          color: var(--ink-soft);
          max-width: 52ch;
          margin-inline-start: auto;
        }

        .a3d-hero .pills {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          transform-style: preserve-3d;
        }
        .a3d-hero .pill {
          background: var(--card);
          border: 1px solid var(--stroke);
          border-radius: var(--r);
          padding: 18px 10px 16px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transform-style: preserve-3d;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.25, 1), box-shadow 0.25s ease;
          will-change: transform;
        }
        .a3d-hero .pill:hover {
          box-shadow: var(--shadow-md);
          transform: perspective(600px) translateZ(10px);
        }
        .a3d-hero .pill svg {
          width: 38px;
          height: 38px;
          color: var(--ink);
          display: block;
          margin: 0 auto 12px;
        }
        .a3d-hero .pill span {
          display: block;
          font-size: 12.5px;
          font-weight: 700;
          line-height: 1.8;
          color: var(--ink);
        }

        .a3d-hero .cta {
          margin-top: 34px;
          display: flex;
          gap: 14px;
          flex-direction: row-reverse;
          justify-content: flex-start;
        }
        .a3d-hero .btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border-radius: 14px;
          padding: 16px 28px;
          font-size: 15px;
          font-weight: 800;
          font-family: inherit;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .a3d-hero .btn:active {
          transform: translateY(1px);
        }
        .a3d-hero .btn-primary {
          background: linear-gradient(180deg, var(--orange), var(--orange-deep));
          color: #fff;
          box-shadow: 0 12px 26px rgba(243, 107, 28, 0.34);
        }
        .a3d-hero .btn-primary:hover {
          box-shadow: 0 18px 34px rgba(243, 107, 28, 0.42);
          transform: translateY(-2px);
        }
        .a3d-hero .btn-ghost {
          background: transparent;
          color: var(--ink);
          border-color: #c9d3e6;
        }
        .a3d-hero .btn-ghost:hover {
          background: #fff;
          transform: translateY(-2px);
        }
        .a3d-hero .btn .arrow {
          transition: transform 0.2s ease;
        }
        .a3d-hero .btn:hover .arrow {
          transform: translateX(-4px);
        }

        /* ---------- carousel chrome ---------- */
        .a3d-hero .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid var(--stroke);
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          z-index: 5;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .a3d-hero .nav:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-50%) scale(1.05);
        }
        .a3d-hero .nav svg {
          width: 20px;
          height: 20px;
          color: var(--ink);
        }
        /* kept inside the box — the section has overflow:hidden */
        .a3d-hero .nav-prev { inset-inline-end: 14px; }
        .a3d-hero .nav-next { inset-inline-start: 14px; }
        .a3d-hero .nav:focus-visible,
        .a3d-hero .dot:focus-visible,
        .a3d-hero .playpause:focus-visible {
          outline: 3px solid var(--orange);
          outline-offset: 3px;
        }
        /* the section is focusable so arrow keys are reachable by keyboard */
        .a3d-hero:focus-visible {
          outline: 3px solid var(--orange);
          outline-offset: -3px;
        }

        .a3d-hero .dots {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 9px;
          z-index: 5;
        }
        .a3d-hero .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #cfd8e8;
          border: 0;
          padding: 0;
          cursor: pointer;
        }
        .a3d-hero .dot[aria-current='true'] {
          background: var(--orange);
          width: 11px;
          height: 11px;
        }
        .a3d-hero .playpause {
          position: absolute;
          bottom: 15px;
          left: calc(50% + 44px);
          width: 26px;
          height: 26px;
          padding: 0;
          display: grid;
          place-items: center;
          border-radius: 50%;
          cursor: pointer;
          background: #fff;
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow-sm);
          color: var(--ink-soft);
          z-index: 5;
        }
        .a3d-hero .playpause[hidden] {
          display: none;
        }
        .a3d-hero .playpause:hover {
          color: var(--ink);
        }
        .a3d-hero .playpause svg {
          width: 13px;
          height: 13px;
        }
        .a3d-hero .playpause .ic-play {
          display: none;
        }
        .a3d-hero .playpause[data-paused='true'] .ic-pause {
          display: none;
        }
        .a3d-hero .playpause[data-paused='true'] .ic-play {
          display: block;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1080px) {
          .a3d-hero {
            grid-template-columns: 1fr;
            padding: 36px 28px 72px;
            min-height: auto;
          }
          .a3d-hero .stage {
            position: relative;
            inset: auto;
            height: 420px;
            margin-bottom: 8px;
            order: -1;
          }
          .a3d-hero .slide {
            min-height: 0;
          }
          .a3d-hero .rule {
            margin-inline: auto;
          }
          .a3d-hero .copy {
            grid-column: 1;
            text-align: center;
          }
          .a3d-hero .copy p.body {
            margin-inline: auto;
          }
          .a3d-hero .cta {
            justify-content: center;
          }
          .a3d-hero .nav {
            display: none;
          }
          .a3d-hero .m-card {
            width: 150px;
            padding: 10px 12px;
          }
          .a3d-hero .m1 { left: 1%;  top: 62%; }
          .a3d-hero .m2 { left: 22%; top: 44%; }
          .a3d-hero .m3 { left: 44%; top: 26%; }
          .a3d-hero .m4 { left: 64%; top: 8%; }
        }
        @media (max-width: 640px) {
          .a3d-hero .pills {
            grid-template-columns: repeat(2, 1fr);
          }
          .a3d-hero .cta {
            flex-wrap: wrap;
          }
          .a3d-hero .btn {
            flex: 1 1 100%;
            justify-content: center;
          }
          /* the stage is ~320px wide here, so every overlay has to be re-pitched
             to stay inside it and off its neighbours */
          .a3d-hero .stage {
            height: 440px;
          }
          .a3d-hero .m-card {
            width: 124px;
          }
          .a3d-hero .m-desc {
            display: none;
          }
          .a3d-hero .m1 { left: 0; }
          .a3d-hero .m2 { left: 19%; }
          .a3d-hero .m3 { left: 38%; }
          .a3d-hero .m4 { left: 56%; }

          .a3d-hero .node {
            width: 86px;
          }
          .a3d-hero .n1 { left: 37%; top: 0; }
          .a3d-hero .n2 { left: 66%; top: 21%; }
          .a3d-hero .n3 { left: 58%; top: 57%; }
          .a3d-hero .n4 { left: 13%; top: 57%; }
          .a3d-hero .n5 { left: 5%;  top: 21%; }

          .a3d-hero .agent {
            width: 130px;
            padding: 9px 11px;
          }
          .a3d-hero .agent ul {
            display: none; /* bullets are unreadable at this size */
          }
          .a3d-hero .agent b {
            font-size: 10.5px;
            margin-top: 13px;
            line-height: 1.6;
          }
          .a3d-hero .agent-ic {
            width: 42px;
            height: 42px;
            top: -20px;
          }
          .a3d-hero .agent-ic svg {
            width: 21px;
            height: 21px;
          }
          .a3d-hero .a1 { left: 33%; top: 1%; }
          .a3d-hero .a2 { left: 1%;  top: 29%; }
          .a3d-hero .a3 { left: 45%; top: 50%; }
          .a3d-hero .a4 { left: 5%;  top: 73%; }

          .a3d-hero .node-ic {
            width: 52px;
            height: 52px;
          }
          .a3d-hero .node-ic svg {
            width: 24px;
            height: 24px;
          }
          .a3d-hero .node i {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .a3d-hero .m-card,
          .a3d-hero .node,
          .a3d-hero .agent {
            animation: none;
            opacity: 1;
          }
          .a3d-hero .btn,
          .a3d-hero .pill,
          .a3d-hero .nav {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
