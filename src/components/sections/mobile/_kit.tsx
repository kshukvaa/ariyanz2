'use client';

/* ──────────────────────────────────────────────────────────────
   Mobile homepage kit — shared design tokens + primitives for the
   "Immersive App" mobile design language.

   This is mobile-only. Desktop sections stay untouched.

   v3 (webDevReview round 2) — additions:
   • Standardised CTA height: GradientCTA + new OutlineCTA now share
     `min-h-[48px]` and identical typography so every primary/secondary
     button across the 11 sections lines up.
   • New `Reveal` — a framer-motion wrapper for staggered entrance
     animations (fade + slide-up). Drop-in for any block.
   • SectionDivider gained an optional centered icon medallion that
     fades in on scroll for a richer seam.
   • StatBadge icon medallion + value alignment tightened.
   • New `ScrollHint` — a bouncing chevron overlaid on the hero's
     bottom edge (mobile only) that invites the user to scroll.
   • New `useInViewOnce` — tiny hook returning a ref + boolean for
     one-shot scroll reveal (used by Reveal + SectionDivider).
────────────────────────────────────────────────────────────── */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';

export const MNAV = '#1C1816';
export const MNAV_DEEP = '#0F0C0A';
export const MORANGE = '#F26A21';
/** Warm light background tones (no dark/blue) — used for "dark" sections
 *  which are now warm-light. Cycled for visual rhythm. */
export const WARM_BG_1 = 'bg-[#FDF7F0]'; // warm cream
export const WARM_BG_2 = 'bg-[#FDF4EE]'; // warm peach
export const WARM_BG_3 = 'bg-[#FAFAFB]'; // light gray

/** Standard primary/secondary button height for the mobile homepage. */
export const CTA_MIN_HEIGHT = 'min-h-[48px]';

/** Convert ASCII digits in a string/number to Persian digits. */
export function toFa(input: string | number): string {
  const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/[0-9]/g, (d) => fa[Number(d)]);
}

/** Zero-padded two-digit Persian index for the editorial numbered chip. */
export function faIndex(n: number): string {
  return toFa(String(n).padStart(2, '0'));
}

/* ── useInViewOnce — one-shot scroll reveal ── */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      options ?? { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);
  return { ref, inView };
}

/* ── Reveal — framer-motion fade + slide-up, fires once on scroll-in ── */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── useHaptic — light vibration on supported devices ──
   Returns a `tap(ms?)` function. No-op where `navigator.vibrate` is
   missing (desktop / iOS Safari) or when the user prefers reduced
   motion (accessibility). Always safe to call. */
export function useHaptic() {
  return useCallback((ms: number | number[] = 8) => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    // Respect the user's reduced-motion preference (also covers vibration).
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq?.matches) return;
    if (typeof navigator.vibrate === 'function') {
      try { navigator.vibrate(ms); } catch { /* ignore */ }
    }
  }, []);
}

/* ── usePrefersReducedMotion — boolean hook ── */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduce;
}

/* ── AmbientParticles — slow-floating dots for dark sections ──
   Pure CSS animation (no JS loop). Renders N absolutely-positioned
   dots with staggered delays. Pointer-events-none, aria-hidden.
   Disabled (renders nothing) when the user prefers reduced motion. */
export function AmbientParticles({ count = 6 }: { count?: number }) {
  const reduce = usePrefersReducedMotion();
  // Trim the count on low-end devices for performance.
  const n = typeof navigator !== 'undefined' && (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency
    ? Math.min(count, (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency! < 4 ? 3 : count)
    : count;
  const dots = Array.from({ length: reduce ? 0 : n });
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 17 + 11) % 100;
        const top = (i * 29 + 7) % 100;
        const size = 4 + ((i * 7) % 6);
        const dur = 9 + (i % 5) * 2;
        const delay = (i % 4) * 1.3;
        const orange = i % 2 === 0;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0], y: [0, -22, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: orange ? '#F26A21' : '#FBBF24',
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── useConfetti — a tiny one-shot confetti fired from a point ──
   Call `fire()` from a parent (e.g. on share-copy). Renders a
   fixed overlay; each piece is a small rotated div animated with
   framer-motion, removed after ~1s. No canvas, no deps. Disabled
   (fire is a no-op, node is null) when the user prefers reduced
   motion. */
export function useConfetti() {
  const reduce = usePrefersReducedMotion();
  const [pieces, setPieces] = useState<
    { id: number; x: number; y: number; dx: number; dy: number; rot: number; color: string }[]
  >([]);
  const idRef = useRef(0);
  const fire = useCallback((originX?: number, originY?: number) => {
    if (reduce) return;
    const colors = ['#F26A21', '#FBBF24', '#F59E0B', '#34D399', '#F472B6'];
    const ox = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const oy = originY ?? (typeof window !== 'undefined' ? window.innerHeight - 120 : 400);
    const next = Array.from({ length: 18 }).map(() => {
      const angle = (Math.random() * Math.PI) - Math.PI / 2; // upward fan
      const dist = 60 + Math.random() * 120;
      return {
        id: idRef.current++,
        x: ox,
        y: oy,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 40,
        rot: (Math.random() - 0.5) * 540,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setPieces(next);
    // Clear after the animation finishes (bounds duration to ~1.1s).
    setTimeout(() => setPieces([]), 1100);
  }, [reduce]);
  const node =
    pieces.length === 0 ? null : (
      <div aria-hidden className="md:hidden fixed inset-0 z-[60] pointer-events-none">
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: p.x + p.dx, y: p.y + p.dy + 120, opacity: 0, rotate: p.rot, scale: 0.6 }}
            transition={{ duration: 1, ease: [0.2, 0.6, 0.3, 1] }}
            className="absolute w-2 h-2.5 rounded-[2px]"
            style={{ background: p.color }}
          />
        ))}
      </div>
    );
  return { fire, node };
}

/* ── useScrollRestore — persist scrollY to sessionStorage ──
   Saves the page scroll position (throttled to every 400ms) under
   the given key, and restores it on mount — UNLESS a location hash
   is present (then the browser's native anchor jump wins). Returns
   nothing; just call it once near the top of a client component. */
export function useScrollRestore(key: string) {
  useEffect(() => {
    // Restore on mount, but defer to a deep-link hash if present (the
    // browser's native anchor jump should win in that case).
    const hasHash = typeof window !== 'undefined' && !!window.location.hash;
    if (!hasHash) {
      try {
        const saved = sessionStorage.getItem(key);
        if (saved) {
          const y = Number(saved);
          if (Number.isFinite(y) && y > 0) {
            // Defer until after paint so the page has height.
            requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'auto' }));
          }
        }
      } catch { /* sessionStorage may be unavailable */ }
    }

    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (t) return;
      t = setTimeout(() => {
        t = null;
        try { sessionStorage.setItem(key, String(window.scrollY)); } catch { /* ignore */ }
      }, 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (t) clearTimeout(t);
    };
  }, [key]);
}

/* ── useLocalStorage — generic typed localStorage state ──
   SSR-safe (returns the initial value on the server). Syncs across
   tabs via the `storage` event AND within the same tab via a custom
   window event (the native `storage` event only fires cross-tab).
   v6.1: the side effects (localStorage.setItem + event dispatch) are
   moved OUT of the setState updater — running them inside the updater
   caused a "Cannot update component A while rendering component B"
   warning because React invokes the updater during render and the
   dispatched event synchronously triggered other instances' setState.
   A ref now tracks the current value so `next` can be computed in the
   callback body (event-handler context), not in the render-phase updater. */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);
  // Keep a ref of the latest value so the setter can compute `next`
  // outside the render-phase updater (side effects must not run in render).
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        valueRef.current = parsed;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(parsed);
      }
    } catch { /* ignore */ }
    // Cross-tab sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsed = JSON.parse(e.newValue) as T;
          valueRef.current = parsed;
          setValue(parsed);
        } catch { /* ignore */ }
      }
    };
    // Same-tab sync: a custom event dispatched by the setter below.
    const onSameTab = (e: Event) => {
      const detail = (e as CustomEvent).detail as { key: string; value: T };
      if (detail && detail.key === key) {
        valueRef.current = detail.value;
        setValue(detail.value);
      }
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('mobile:local-storage', onSameTab as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('mobile:local-storage', onSameTab as EventListener);
    };
  }, [key]);
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      // Compute `next` in the callback body (event-handler context), NOT
      // inside the setValue updater, so side effects don't run during render.
      const next = typeof v === 'function' ? (v as (p: T) => T)(valueRef.current) : v;
      valueRef.current = next;
      setValue(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
        // Notify other hook instances in THIS tab.
        window.dispatchEvent(new CustomEvent('mobile:local-storage', { detail: { key, value: next } }));
      } catch { /* ignore */ }
    },
    [key]
  );
  return [value, set];
}

/* ── useSessionStorage — like useLocalStorage but for sessionStorage.
   Used for ephemeral per-session state (e.g. recently-viewed sections)
   that should survive a reload but not a new tab/session. Same-tab
   sync via a custom event so multiple instances stay consistent. */
export function useSessionStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as T;
        valueRef.current = parsed;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(parsed);
      }
    } catch { /* ignore */ }
    const onSameTab = (e: Event) => {
      const detail = (e as CustomEvent).detail as { key: string; value: T };
      if (detail && detail.key === key) {
        valueRef.current = detail.value;
        setValue(detail.value);
      }
    };
    window.addEventListener('mobile:session-storage', onSameTab as EventListener);
    return () => window.removeEventListener('mobile:session-storage', onSameTab as EventListener);
  }, [key]);
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(valueRef.current) : v;
      valueRef.current = next;
      setValue(next);
      try {
        sessionStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('mobile:session-storage', { detail: { key, value: next } }));
      } catch { /* ignore */ }
    },
    [key]
  );
  return [value, set];
}

export function useSectionRead(ids: string[], storageKey: string) {
  const [arr, setArr] = useLocalStorage<string[]>(storageKey, []);
  const readSet = useMemo(() => new Set(arr), [arr]);
  const elapsedRef = useRef<Record<string, number>>({});
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (ids.length === 0) return;
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!e) return;
          if (e.intersectionRatio >= 0.3) visibleRef.current.add(id);
          else visibleRef.current.delete(id);
        },
        { threshold: [0, 0.3, 0.6] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Accumulate 250ms per tick while visible; mark read at 3000ms.
    const READ_THRESHOLD_MS = 3000;
    const interval = setInterval(() => {
      const visible = visibleRef.current;
      if (visible.size === 0) return;
      const toAdd: string[] = [];
      visible.forEach((id) => {
        elapsedRef.current[id] = (elapsedRef.current[id] || 0) + 250;
        if (elapsedRef.current[id] >= READ_THRESHOLD_MS) {
          toAdd.push(id);
        }
      });
      if (toAdd.length > 0) {
        setArr((prev) => {
          const existing = new Set(prev);
          const next = [...prev];
          toAdd.forEach((id) => {
            if (!existing.has(id)) {
              next.push(id);
              delete elapsedRef.current[id];
              visibleRef.current.delete(id);
            }
          });
          return next.length === prev.length ? prev : next;
        });
      }
    }, 250);

    return () => {
      observers.forEach((o) => o.disconnect());
      clearInterval(interval);
    };
  }, [ids, setArr]);

  const isRead = useCallback((id: string) => readSet.has(id), [readSet]);
  return { read: readSet, isRead };
}

/* ── useReadTimestamps — tracks WHEN each section was read (epoch ms),
   persisted to localStorage. Used by the reading-streak indicator
   ("X بخش امروز"). Returns `{ timestamps, markRead, countToday, clear }`.
   `markRead(id)` records the current time for a section (idempotent —
   only records the FIRST read time). `countToday` returns how many
   sections were first-read today. `clear` wipes the timestamps. */
export function useReadTimestamps(storageKey: string) {
  const [map, setMap] = useLocalStorage<Record<string, number>>(storageKey, {});
  const markRead = useCallback(
    (id: string) => {
      setMap((prev) => (prev[id] ? prev : { ...prev, [id]: Date.now() }));
    },
    [setMap]
  );
  const clear = useCallback(() => setMap({}), [setMap]);
  const countToday = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return Object.values(map).filter((ts) => ts >= startOfToday).length;
  }, [map]);
  return { timestamps: map, markRead, countToday, clear };
}

/* ── ProgressRing — a small SVG ring showing a 0..1 progress.
   Used on the progress badge to show read-progress visually.
   v8: when progress is between 0 and 1 (exclusive), the ring gently
   "breathes" (scales 1 ↔ 1.06) to draw attention to progress. */
export function ProgressRing({
  progress,
  size = 18,
  stroke = 2.5,
  className = '',
}: {
  progress: number; // 0..1
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  const breathing = clamped > 0 && clamped < 1;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      animate={breathing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={breathing ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#F26A21"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - c * clamped}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </motion.svg>
  );
}

export function GradientText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-l from-orange-500 to-amber-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

/* ── useDelayedReady — returns `ready` after `ms` (default 600ms).
   Used by snap-rail sections to show a SkeletonCard placeholder
   briefly before the real cards, improving perceived performance. */
export function useDelayedReady(ms = 600) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return ready;
}

/* ── Skeleton — a single shimmering placeholder bar. ── */
export function Skeleton({
  className = '',
  rounded = 'rounded-md',
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block bg-gradient-to-l from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] ${rounded} ${className}`}
    />
  );
}

/* ── SkeletonCard — a full snap-rail card skeleton matching the
   shape of a typical product/instructor/news card. Use inside a
   SnapItem while `useDelayedReady` is false. `dark` switches the
   shimmer to the glass-on-navy palette. */
export function SkeletonCard({ dark = false }: { dark?: boolean }) {
  const bar = dark
    ? 'from-white/10 via-white/20 to-white/10'
    : 'from-gray-200 via-gray-100 to-gray-200';
  return (
    <div
      className={`h-full rounded-3xl p-5 overflow-hidden ${
        'bg-white'
      }`}
    >
      <span className={`block w-full aspect-[16/10] mb-4 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-2xl`} />
      <span className={`block h-3.5 w-2/3 mx-auto mb-3 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-full`} />
      <span className={`block h-3 w-1/3 mx-auto mb-5 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-full`} />
      <span className={`block h-2 w-full mb-2 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-full`} />
      <span className={`block h-2 w-5/6 mb-5 bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-full`} />
      <span className={`block h-9 w-full bg-[length:200%_100%] animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-l ${bar} rounded-2xl`} />
    </div>
  );
}

/* ── WaveDivider — an organic S-curve wave that transitions between
   two section backgrounds. Uses an inline SVG path so it scales to
   any width. `fromColor` is the upper section's bg, `toColor` is the
   lower section's bg. Mobile-only. */
export function WaveDivider({
  fromColor = '#ffffff',
  toColor = '#ffffff',
  flip = false,
  className = '',
}: {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <svg
        viewBox="0 0 390 60"
        preserveAspectRatio="none"
        className="block w-full h-[40px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0 L390,0 L390,20 C310,50 260,10 195,25 C130,40 80,55 0,30 Z" fill={fromColor} />
        <path d="M0,30 C80,55 130,40 195,25 C260,10 310,50 390,20 L390,60 L0,60 Z" fill={toColor} />
      </svg>
    </div>
  );
}

/* ── ParallaxDivider — creative animated shape dividers with
   parallax scroll effects. 5 variants: wave, curve, triangles,
   dots, organic-blob. Each animates on scroll + has a subtle
   idle animation. Mobile + desktop. */
export function ParallaxDivider({
  fromColor = '#ffffff',
  toColor = '#FDF7F0',
  variant = 'wave',
  index = 0,
}: {
  fromColor?: string;
  toColor?: string;
  variant?: 'wave' | 'curve' | 'triangles' | 'dots' | 'blob';
  index?: number;
}) {
  const { ref, scrollY } = useParallaxScroll();
  const shapes = SHAPES[variant] || SHAPES.wave;

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden h-[60px]"
      style={{ backgroundColor: toColor }}
    >
      <svg
        viewBox="0 0 390 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Parallax shape layers — each moves at a different speed */}
        {shapes.map((shape, i) => (
          <path
            key={i}
            d={shape.d}
            fill={i === shapes.length - 1 ? fromColor : shape.color || fromColor}
            opacity={shape.opacity ?? (1 - i * 0.25)}
            style={{
              transform: `translateY(${scrollY * (i + 1) * 3}px)`,
              transition: 'transform 0.1s ease-out',
            }}
            className={shape.animate ? `animate-${shape.animate}` : ''}
          />
        ))}
        {/* Decorative floating dots */}
        {variant === 'dots' && (
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle
                key={i}
                cx={30 + i * 48}
                cy={20 + Math.sin(i * 2) * 15}
                r={2 + (i % 3)}
                fill="#F26A21"
                opacity={0.2 + (i % 3) * 0.1}
                style={{
                  transform: `translateY(${scrollY * (i % 3 + 1) * 4}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <animate
                  attributeName="cy"
                  values={`${20 + Math.sin(i * 2) * 15};${20 + Math.sin(i * 2) * 15 + 6};${20 + Math.sin(i * 2) * 15}`}
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
        {/* Decorative floating triangles */}
        {variant === 'triangles' && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <polygon
                key={i}
                points={`${50 + i * 80},${35} ${60 + i * 80},${15} ${70 + i * 80},${35}`}
                fill="#F26A21"
                opacity={0.1 + (i % 3) * 0.08}
                style={{
                  transform: `translateY(${scrollY * (i % 2 + 1) * 5}px) rotate(${i * 30}deg)`,
                  transformOrigin: `${60 + i * 80}px 25px`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${60 + i * 80} 25`}
                  to={`360 ${60 + i * 80} 25`}
                  dur={`${8 + i * 2}s`}
                  repeatCount="indefinite"
                />
              </polygon>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

/* Shape definitions for ParallaxDivider variants */
const SHAPES: Record<string, { d: string; color?: string; opacity?: number; animate?: string }[]> = {
  wave: [
    { d: 'M0,0 L390,0 L390,25 C320,50 260,5 195,20 C130,35 70,55 0,28 Z', opacity: 0.3 },
    { d: 'M0,5 L390,5 L390,30 C320,55 260,10 195,25 C130,40 70,60 0,33 Z', opacity: 0.5 },
    { d: 'M0,0 L390,0 L390,20 C310,45 255,8 190,22 C125,36 75,50 0,25 Z', opacity: 1 },
  ],
  curve: [
    { d: 'M0,0 L390,0 Q390,30 195,35 Q0,40 0,15 Z', opacity: 0.4 },
    { d: 'M0,0 L390,0 Q390,25 195,30 Q0,35 0,10 Z', opacity: 1 },
  ],
  triangles: [
    { d: 'M0,0 L390,0 L390,30 L260,30 L230,10 L200,30 L130,30 L100,10 L70,30 L0,30 Z', opacity: 1 },
  ],
  dots: [
    { d: 'M0,0 L390,0 L390,25 C300,45 200,10 100,30 C50,40 20,35 0,25 Z', opacity: 1 },
  ],
  blob: [
    { d: 'M0,0 L390,0 L390,30 C350,50 300,10 250,25 C200,40 150,15 100,30 C50,45 20,25 0,20 Z', opacity: 0.3 },
    { d: 'M0,0 L390,0 L390,25 C340,45 280,8 220,22 C160,36 100,15 50,28 C20,35 10,25 0,18 Z', opacity: 0.6 },
    { d: 'M0,0 L390,0 L390,22 C330,40 270,10 200,20 C130,30 70,12 0,15 Z', opacity: 1 },
  ],
};

/* Hook: tracks scroll position for parallax effect */
function useParallaxScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // -1 (below viewport) → 0 (centered) → 1 (above viewport)
      const progress = (viewportH / 2 - rect.top - rect.height / 2) / (viewportH / 2 + rect.height);
      setScrollY(Math.max(-1, Math.min(1, progress)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, scrollY };
}

/* ── ShimmerDivider — a SectionDivider variant with a moving
   shimmer line instead of (or beside) the icon medallion. Use
   where a richer seam is wanted. */
export function ShimmerDivider({
  variant = 'light-to-warm',
}: {
  variant?: 'light-to-warm' | 'warm-to-light';
}) {
  const map: Record<string, string> = {
    'light-to-warm': 'from-white via-[#FDF7F0]/40 to-[#FDF7F0]',
    'warm-to-light': 'from-[#FDF7F0] via-[#FDF7F0]/40 to-white',
  };
  return (
    <div aria-hidden className={`relative h-8 bg-gradient-to-b ${map[variant]}`}>
      <span className="absolute top-1/2 -translate-y-1/2 right-0 left-0 h-px bg-gradient-to-l from-transparent via-orange-400/60 to-transparent bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
    </div>
  );
}

/* ── Section shell ──
   v11: NO dark backgrounds. All sections use warm light tones.
   The `dark` prop is accepted for backward compat but now maps to
   a warm cream background with dark text (no more dark gradient,
   no blobs, no particles — those were dark-only decorations). */
export function MobileSectionShell({
  children,
  className = '',
  dark = false,
  bg,
  id,
  blobs = true,
  particles = true,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Override the background. */
  bg?: string;
  id?: string;
  /** Deprecated (dark-only decorations removed). Accepted for compat. */
  blobs?: boolean;
  particles?: boolean;
}) {
  // Default bg: subtle gradients for depth (no flat fills, no dark, no new colors).
  // `dark` (formerly dark sections) → warm cream gradient.
  // `bg` override takes priority. Default → white with a subtle warm tint.
  const baseBg = bg
    ? bg
    : dark
      ? 'bg-gradient-to-b from-[#FDF7F0] to-[#FDF4EE]'
      : 'bg-gradient-to-b from-white to-orange-50/20';
  return (
    <section
      id={id}
      data-mobile-section
      className={`relative py-14 px-4 overflow-hidden ${baseBg} text-gray-900 ${className}`}
    >
      {/* Soft top hairline glow for separation */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-orange-200/50 to-transparent"
      />
      <div className="relative z-10 max-w-md mx-auto">{children}</div>
    </section>
  );
}

/* ── Editorial heading — numbered chip + orange accent bar, start-aligned (right in RTL) ──
   v11: `dark` prop is accepted for backward compat but ignored — all sections
   are now light, so headings always use dark text on light bg. */
export function MobileHeading({
  index,
  title,
  desc,
  kicker,
  dark: _dark = false,
  accentIcon,
  pulse = false,
}: {
  index?: number;
  title: string;
  desc?: string;
  kicker?: string;
  dark?: boolean;
  accentIcon?: string;
  /** Briefly pulse the accent bar + chip (set true after a quick-jump arrival). */
  pulse?: boolean;
}) {
  return (
    <div className="mb-6">
      {kicker && (
        <div className="mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-orange-100 text-orange-600">
            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
            {kicker}
          </span>
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        {typeof index === 'number' && (
          <motion.span
            animate={pulse ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-black tabular-nums px-2.5 py-1 rounded-full bg-orange-100 text-orange-600"
          >
            {faIndex(index)}
          </motion.span>
        )}
        <motion.span
          animate={pulse ? { scaleY: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="h-5 w-1 rounded-full bg-orange-500 origin-center"
        />
        {accentIcon && (
          <Icon
            name={accentIcon}
            size={20}
            className="text-orange-500"
          />
        )}
      </div>
      <h2 className="text-[22px] leading-[2rem] font-black text-[#1C1816]">
        {title}
      </h2>
      {desc && (
        <p className="text-[13px] leading-[1.95rem] mt-2 text-gray-500">
          {desc}
        </p>
      )}
    </div>
  );
}

/* ── Horizontal snap rail ── */
export function SnapRail({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 ${className}`}
    >
      {children}
    </div>
  );
}

/** A snap-aligned rail item. Pass `width` like 'w-[78%]' or 'w-[60%]'. */
export function SnapItem({
  children,
  width = 'w-[78%]',
  className = '',
}: {
  children: React.ReactNode;
  width?: string;
  className?: string;
}) {
  return (
    <div className={`snap-center shrink-0 ${width} ${className}`}>{children}</div>
  );
}

/**
 * SnapProgress — dots that track the active card of a SnapRail.
 * Pass the rail's total item count, the active index, and an onDot
 * callback (e.g. scroll the rail). Renders nothing when count <= 1.
 */
export function SnapProgress({
  count,
  active,
  onDot,
  dark = false,
}: {
  count: number;
  active: number;
  onDot: (i: number) => void;
  dark?: boolean;
}) {
  const haptic = useHaptic();
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      {Array.from({ length: count }).map((_, i) => {
        const on = i === active;
        return (
          <button
            key={i}
            onClick={() => { haptic(6); onDot(i); }}
            aria-label={`کارت ${toFa(i + 1)}`}
            className={`rounded-full transition-all duration-300 ${
              on
                ? 'w-5 h-1.5 bg-orange-500'
                : `h-1.5 w-1.5 ${'bg-gray-300 hover:bg-gray-400'}`
            }`}
          />
        );
      })}
    </div>
  );
}

/* ── Glass card — v11: was for dark sections, now a light elevated card
   (white bg, soft shadow, orange hover glow). Same API, light styling. ── */
export function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative bg-white rounded-3xl border border-orange-100/50 p-5 transition-all duration-200 hover:border-orange-300 active:scale-[0.99] ${className}`}
    >
      {/* Hover glow ring (orange tint) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 0 1px rgba(242,106,33,0.15), 0 8px 24px -8px rgba(242,106,33,0.2)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ── Solid white card with a coloured top accent (use on light sections)
   v9: hover glow ring + orange-tinted shadow ── */
export function SolidCard({
  children,
  className = '',
  accent = MORANGE,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative bg-white rounded-3xl p-5 overflow-hidden ${
        hover ? 'transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]' : ''
      } ${className}`}
    >
      <span
        className="absolute top-0 right-0 left-0 h-1"
        style={{ background: accent }}
      />
      {children}
    </div>
  );
}

/* ── Full-width orange gradient CTA — standardised 48px height ──
   v5: multi-layer orange-tinted shadow for tactile depth. */
export function GradientCTA({
  href,
  label,
  icon = 'lucide:arrow-left',
  className = '',
}: {
  href: string;
  label: string;
  icon?: string;
  className?: string;
}) {
  const haptic = useHaptic();
  return (
    <Link
      href={href}
      onClick={() => haptic(10)}
      className={`group flex items-center justify-center gap-2 w-full ${CTA_MIN_HEIGHT} bg-gradient-to-l from-orange-500 to-orange-600 text-white rounded-2xl px-5 text-[14px] font-bold active:scale-[0.98] transition-all ${className}`}
    >
      <span>{label}</span>
      <Icon
        name={icon}
        size={17}
        className="text-white transition-transform group-hover:-translate-x-0.5"
      />
    </Link>
  );
}

/* ── Outline CTA — secondary button, same 48px height as GradientCTA ── */
export function OutlineCTA({
  href,
  label,
  icon = 'lucide:arrow-left',
  dark = false,
  className = '',
}: {
  href: string;
  label: string;
  icon?: string;
  /** On dark sections the outline + text use orange-300; on light, orange-500. */
  dark?: boolean;
  className?: string;
}) {
  const haptic = useHaptic();
  return (
    <Link
      href={href}
      onClick={() => haptic(8)}
      className={`group flex items-center justify-center gap-2 w-full ${CTA_MIN_HEIGHT} border-2 ${
        'border-orange-400 text-orange-500 hover:bg-orange-50'
      } rounded-2xl px-5 text-[14px] font-bold transition-colors active:scale-[0.98] ${className}`}
    >
      <span>{label}</span>
      <Icon
        name={icon}
        size={17}
        className={`transition-transform group-hover:-translate-x-0.5 ${'text-orange-500'}`}
      />
    </Link>
  );
}

/* ── Pill tab chips (horizontally scrollable) ── */
export function PillTabs<T extends string>({
  tabs,
  active,
  onChange,
  dark = false,
}: {
  tabs: { id: T; label: string; icon?: string }[];
  active: T;
  onChange: (id: T) => void;
  dark?: boolean;
}) {
  const haptic = useHaptic();
  return (
    <div className="flex gap-2 overflow-x-auto ar-no-scrollbar -mx-4 px-4 mb-5">
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => { haptic(6); onChange(t.id); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
              on
                ? 'bg-orange-500 text-white/30'
                : dark
                  ? 'bg-white/10 text-white/70'
                  : 'bg-gray-100 text-gray-500'
            }`}
          >
            {t.icon && <Icon name={t.icon} size={15} className={on ? 'text-white' : ''} />}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Number medallion — used by numbered lists; vertically centered ──
   v4: adds a subtle inner ring + drop shadow for depth. */
export function NumberMedallion({
  n,
  className = '',
}: {
  n: number;
  className?: string;
}) {
  return (
    <span
      className={`shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-[12px] font-black flex items-center justify-center tabular-nums ring-4 ring-white/30 ${className}`}
    >
      {toFa(n)}
    </span>
  );
}

/* ── Stat badge — compact icon + value + label, for stat grids ── */
export function StatBadge({
  icon,
  value,
  label,
  sub,
  dark = false,
}: {
  icon: string;
  value: string;
  label: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center px-2 py-3 rounded-2xl ${
        'bg-gray-50/80'
      }`}
    >
      <span
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
          'bg-orange-50'
        }`}
      >
        <Icon name={icon} size={20} className="text-orange-500" />
      </span>
      <span
        className={`text-[17px] font-black leading-none mb-1 ${'text-[#1C1816]'}`}
      >
        {value}
      </span>
      <span className={`text-[11px] font-bold leading-tight mb-0.5 ${'text-gray-700'}`}>
        {label}
      </span>
      {sub && <span className={`text-[10px] leading-tight ${'text-gray-400'}`}>{sub}</span>}
    </div>
  );
}

/* ── Chip list — horizontal scroll of small info chips ── */
export function ChipList({
  items,
  dark = false,
}: {
  items: { icon?: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto ar-no-scrollbar -mx-4 px-4">
      {items.map((c, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap shrink-0 ${
            'bg-gray-100 text-gray-600'
          }`}
        >
          {c.icon && <Icon name={c.icon} size={13} className="text-orange-400" />}
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* ── Section divider — a smooth gradient seam with an optional icon medallion.
   v12: NO dark colors — all transitions are between warm light tones. ── */
export function SectionDivider({
  variant = 'light-to-warm',
  icon,
}: {
  variant?: 'light-to-warm' | 'warm-to-light' | 'light-to-gray' | 'gray-to-light';
  /** Optional Iconify name rendered in a small medallion centred on the seam. */
  icon?: string;
}) {
  const map: Record<string, string> = {
    'light-to-warm': 'from-white via-[#FDF7F0]/40 to-[#FDF7F0]',
    'warm-to-light': 'from-[#FDF7F0] via-[#FDF7F0]/40 to-white',
    'light-to-gray': 'from-white via-[#FAFAFB]/40 to-[#FAFAFB]',
    'gray-to-light': 'from-[#FAFAFB] via-[#FAFAFB]/40 to-white',
  };
  // Hooks must be called unconditionally — always call, only USE the result
  // when an icon is provided.
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.5 });
  if (!icon) return <div aria-hidden className={`h-8 bg-gradient-to-b ${map[variant]}`} />;
  return (
    <div ref={ref} aria-hidden className={`relative h-8 bg-gradient-to-b ${map[variant]}`}>
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white flex items-center justify-center ring-1 ring-gray-100"
      >
        <Icon name={icon} size={14} className="text-orange-500" />
      </motion.span>
    </div>
  );
}

/* ── BackToTop — floating button shown after scrolling ── */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="بازگشت به بالا"
      className="md:hidden fixed bottom-24 left-4 z-40 w-11 h-11 rounded-full bg-[#1C1816] text-white flex items-center justify-center active:scale-90 transition-transform"
    >
      <Icon name="lucide:arrow-up" size={20} className="text-white" />
    </button>
  );
}

/* ── ScrollHint — bouncing chevron overlaid on the hero's bottom edge ──
   Mobile-only. Rendered as a fixed overlay (pointer-events-none) so it
   sits visually on top of the hero without touching the hero component.
   Fades out once the user scrolls past the first viewport. */
export function ScrollHint() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <div
      aria-hidden
      className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-bold text-white/90">
          اسکرول کنید
        </span>
        <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <Icon name="lucide:chevron-down" size={16} className="text-white" />
        </span>
      </motion.div>
    </div>
  );
}

/* ── PullToRefreshHint — a subtle spinner that appears when the user
   overscrolls at the very top of the page. Mobile-only, pure visual
   (does NOT actually refresh — it's a delightful hint that the page
   is "springy"). Fades in when document is at scrollTop 0 AND a
   touch-move pulls downward; fades out otherwise. Uses a scroll
   listener on the body's overscroll as a lightweight proxy. */
export function PullToRefreshHint() {
  const [pull, setPull] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Only meaningful at the very top: a negative scrollY (rubber-band)
        // or a touch overscroll. We approximate with scrollY <= 0.
        const y = window.scrollY;
        setPull(y <= 0 ? Math.min(1, (Math.abs(y) + 1) / 60) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  if (pull <= 0.02) return null;
  return (
    <div
      aria-hidden
      className="md:hidden fixed top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{ opacity: pull }}
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        className="block w-6 h-6 rounded-full border-2 border-orange-400/30 border-t-orange-500"
      />
    </div>
  );
}

/* ── useSnapActive — tracks which SnapRail card is centered ──
   Attach the returned ref to a SnapRail's inner scroll container.
   Returns the active index. */
export function useSnapActive(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const cCenter = c.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(cCenter - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, [count]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    // Defer the initial active-card computation to the next frame so we
    // don't call setState synchronously inside this effect (cascading render).
    const raf = requestAnimationFrame(onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [onScroll]);
  const scrollTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const child = el.children[i] as HTMLElement | undefined;
      if (!child) return;
      el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: 'smooth' });
    },
    []
  );
  return { ref, active, scrollTo };
}

/* ── useAutoplay — auto-advances a snap rail every `intervalMs`.
   Every tick: finds the currently-centered card, then jumps (NO ease —
   behavior:'auto') to the next card (wraps to 0 at the end). Pauses
   while `paused` is true (set via onPause/onResume — wire to the rail's
   onMouseEnter/onMouseLeave/onTouchStart/onTouchEnd). v11.1: fixed page
   scroll — uses scrollTo on the RAIL ONLY (not scrollIntoView which
   scrolled the whole page vertically). */
export function useAutoplay(ref: React.RefObject<HTMLDivElement>, intervalMs = 3000) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const el = ref.current;
    if (!el) return;
    const id = setInterval(() => {
      const rail = ref.current;
      if (!rail) return;
      const children = Array.from(rail.children) as HTMLElement[];
      if (children.length === 0) return;
      // Find the currently-centered card.
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let currentIdx = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < bestDist) { bestDist = d; currentIdx = i; }
      });
      const nextIdx = (currentIdx + 1) % children.length;
      const nextChild = children[nextIdx];
      // Scroll the RAIL ONLY (not the page). Temporarily disable CSS scroll-snap
      // so it doesn't override the instant jump, then re-enable it.
      // NOTE: in RTL, scrollLeft is negative — do NOT clamp to 0.
      const targetLeft = nextChild.offsetLeft - (rail.clientWidth - nextChild.clientWidth) / 2;
      rail.classList.remove('snap-x', 'snap-mandatory');
      rail.scrollTo({ left: targetLeft, behavior: 'auto' });
      // Re-enable snap on the next frame so manual scroll-snapping still works.
      requestAnimationFrame(() => {
        rail.classList.add('snap-x', 'snap-mandatory');
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [ref, intervalMs, paused]);
  const onPause = useCallback(() => setPaused(true), []);
  const onResume = useCallback(() => setPaused(false), []);
  return { onPause, onResume };
}

/* ── useDragScroll — enables click-and-drag horizontal scrolling on
   desktop (mouse) + enhanced touch swipe on mobile. Pauses autoplay
   while dragging, resumes on release. v12.1: added loop — when
   dragging past the last card, wraps to the first (and vice versa). */
export function useDragScroll(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let velocity = 0;
    let lastX = 0;
    let rafId = 0;

    /* Infinite mode. The rail is a native scroller, so the browser clamps
       any scrollLeft past the ends — reading it back can never tell us the
       swipe went further. So the wrap is applied to the *intended* position
       before it is written: carry it round to the opposite end and rebase
       the gesture's origin by the same amount, and the finger keeps its
       grip on the cards across the seam.

       RTL rails run from 0 down to -span; LTR from 0 up to +span. */
    const span = () => el.scrollWidth - el.clientWidth;
    const rtl = () => getComputedStyle(el).direction === 'rtl';

    /* The rail rests a pixel or so past its own bound (sub-pixel rounding),
       so the wrap waits for a deliberate pull rather than firing on a nudge
       at the first card. */
    const OVERSHOOT = 48;

    /** Wraps `x` into the rail's scroll range. Returns the carry applied. */
    const wrapOffset = (x: number) => {
      const s = span();
      if (s <= 0) return 0;
      const lo = rtl() ? -s : 0;
      const hi = rtl() ? 0 : s;
      if (x > hi + OVERSHOOT) return -s;
      if (x < lo - OVERSHOOT) return s;
      return 0;
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDown = true;
      el.classList.add('dragging');
      el.classList.remove('snap-x', 'snap-mandatory');
      startX = e.clientX;
      startScroll = el.scrollLeft;
      lastX = e.clientX;
      velocity = 0;
      el.setPointerCapture?.(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const delta = x - startX;
      const target = startScroll - delta;
      const carry = wrapOffset(target);
      startScroll += carry;
      el.scrollLeft = target + carry;
      velocity = x - lastX;
      lastX = x;
    };

    const onUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('dragging');
      el.releasePointerCapture?.(e.pointerId);

      // Momentum: apply velocity decay. A fling carries over the seam too.
      const momentum = () => {
        if (Math.abs(velocity) < 0.5) {
          el.classList.add('snap-x', 'snap-mandatory');
          return;
        }
        const target = el.scrollLeft - velocity;
        el.scrollLeft = target + wrapOffset(target);
        velocity *= 0.92;
        rafId = requestAnimationFrame(momentum);
      };
      rafId = requestAnimationFrame(momentum);
    };

    /* On a phone the browser usually takes the gesture over as a native
       pan (the pointer stream is cancelled), so the wrap above never runs.
       This is that case: a swipe that starts at an end and leaves the rail
       still sitting at the same end had nowhere to go — send it round. */
    const EDGE_PX = 2;
    const SWIPE_PX = 30;
    let touchX = 0;
    let startEdge: 'lo' | 'hi' | null = null;
    let settle: ReturnType<typeof setTimeout> | null = null;

    const edgeNow = (): 'lo' | 'hi' | null => {
      const s = span();
      if (s <= 0) return null;
      const lo = rtl() ? -s : 0;
      const hi = rtl() ? 0 : s;
      if (Math.abs(el.scrollLeft - lo) <= EDGE_PX) return 'lo';
      if (Math.abs(el.scrollLeft - hi) <= EDGE_PX) return 'hi';
      return null;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
      startEdge = edgeNow();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!startEdge) return;
      const edge = startEdge;
      if (Math.abs(e.changedTouches[0].clientX - touchX) < SWIPE_PX) return;
      if (settle) clearTimeout(settle);
      // Let any momentum finish before deciding the rail went nowhere.
      settle = setTimeout(() => {
        if (edgeNow() !== edge) return;
        const s = span();
        el.scrollLeft = edge === 'lo' ? (rtl() ? 0 : s) : rtl() ? -s : 0;
      }, 160);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('pointerleave', onUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (settle) clearTimeout(settle);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref]);
}
