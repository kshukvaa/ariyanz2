'use client';

/* ──────────────────────────────────────────────────────────────
   MobileHomeEnhancer — mobile-only floating UX layer (v11):
   1. Reading-progress bar (fills as the visitor scrolls).
   2. Quick-jump section navigator (slides in past the hero):
      11 numbered chips, active-section highlight, auto-centre.
      A "read" dot on chips whose section was viewed ≥3s.
   3. Share button: copies a deep-link to the active section,
      fires confetti, morphs icon to a checkmark for ~1.4s.
   4. Pulse-on-jump: dispatches `mobile:section-pulse` after a tap.
   5. Scroll-restore (sessionStorage, hash-aware) + pull-to-refresh.
   6. "All 11 read" celebration + first-visit onboarding tooltip.

   All sections
   are now light (no dark backgrounds).
────────────────────────────────────────────────────────────── */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/Icon';
import {
  toFa,
  BackToTop,
  ScrollHint,
  PullToRefreshHint,
  useHaptic,
  useConfetti,
  useScrollRestore,
  useSectionRead,
  useReadTimestamps,
  ProgressRing,
} from './_kit';
import { t, READ_STORAGE_KEY, READ_TS_STORAGE_KEY } from './_i18n';

// Re-export so page.tsx can import the enhancer + companions from one module.
export { BackToTop, ScrollHint, PullToRefreshHint };

type SectionMeta = { id: string; index: number; title: string };

/** Read the 11 mobile sections from the live DOM. Returns [] on the server. */
function readSections(): SectionMeta[] {
  if (typeof document === 'undefined') return [];
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-section]'));
  return els.map((el, i) => {
    const h = el.querySelector('h2');
    const raw = h ? h.innerText.trim().replace(/\s+/g, ' ') : `بخش ${toFa(i + 1)}`;
    const short = raw.split(/[،.:\-|]/)[0].trim().slice(0, 18);
    return { id: el.id || `m-sec-${i}`, index: i + 1, title: short || raw };
  });
}

/** Dispatch a one-shot "pulse" event the target section can listen for. */
function pulseSection(id: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('mobile:section-pulse', { detail: { id } }));
}

export default function MobileHomeEnhancer() {
  const [progress, setProgress] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [celebrate, setCelebrate] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [sections, setSections] = useState<SectionMeta[]>(() => readSections());
  const railRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sharedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const celebratedRef = useRef(false);
  const haptic = useHaptic();
  const confetti = useConfetti();
  useScrollRestore('ariyaz:mobile-scroll');

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const { isRead } = useSectionRead(ids, READ_STORAGE_KEY);
  const readTs = useReadTimestamps(READ_TS_STORAGE_KEY);

  // Discover the 11 sections after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections((prev) => (prev.length > 0 ? prev : readSections()));
  }, []);

  // Clean up timers on unmount.
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (sharedTimer.current) clearTimeout(sharedTimer.current);
    },
    [],
  );

  // Reading progress + nav visibility + active-section tracking.
  useEffect(() => {
    if (sections.length === 0) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0);
      setShowNav(scrolled > window.innerHeight * 0.6);
      const probe = window.innerHeight * 0.3;
      let best: string | null = null;
      let bestDist = Infinity;
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const d = Math.abs(top - probe);
        if (d < bestDist) {
          bestDist = d;
          best = s.id;
        }
      });
      setActiveId(best);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  // Keep the active chip scrolled into view inside the rail.
  useEffect(() => {
    if (!activeId || !showNav) return;
    const chip = chipRefs.current[activeId];
    if (chip && railRef.current) {
      const r = railRef.current;
      const cLeft = chip.offsetLeft;
      const cWidth = chip.clientWidth;
      const target = cLeft - (r.clientWidth - cWidth) / 2;
      r.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }, [activeId, showNav]);

  // Record a timestamp whenever a section becomes read (idempotent).
  const tsRecordedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    sections.forEach((s) => {
      if (isRead(s.id) && !tsRecordedRef.current.has(s.id)) {
        tsRecordedRef.current.add(s.id);
        readTs.markRead(s.id);
      }
    });
  }, [sections, isRead, readTs]);

  // "All 11 read" celebration.
  const readCount = useMemo(
    () => sections.filter((s) => isRead(s.id)).length,
    [sections, isRead],
  );
  useEffect(() => {
    if (celebratedRef.current || sections.length === 0) return;
    if (readCount >= sections.length) {
      celebratedRef.current = true;
      haptic([10, 40, 10, 40, 20]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCelebrate(true);
      const w = window.innerWidth;
      confetti.fire(w * 0.25, 120);
      setTimeout(() => confetti.fire(w * 0.75, 120), 150);
      setTimeout(() => confetti.fire(w * 0.5, 80), 300);
      const timer = setTimeout(() => setCelebrate(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [readCount, sections.length, haptic, confetti]);

  // First-visit onboarding.
  useEffect(() => {
    if (sections.length === 0) return;
    let seen = false;
    try { seen = localStorage.getItem('ariyaz:mobile-onboarded') === '1'; } catch { /* ignore */ }
    if (seen) return;
    if (!showNav) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnboardingStep(1);
  }, [sections.length, showNav]);

  const dismissOnboarding = (next = false) => {
    haptic(8);
    if (next && onboardingStep === 1) {
      setOnboardingStep(2);
    } else {
      setOnboardingStep(0);
      try { localStorage.setItem('ariyaz:mobile-onboarded', '1'); } catch { /* ignore */ }
    }
  };

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    haptic(8);
    setSearchOpen(false);
    const y = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(() => pulseSection(id), 450);
  };

  // Section-content keyword index for global search.
  const searchIndex = useMemo(() => {
    const idx: Record<string, string> = {};
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) { idx[s.id] = s.title; return; }
      const parts: string[] = [s.title];
      el.querySelectorAll('h2, h3, h4, p, li, span').forEach((node) => {
        const text = node.textContent?.trim();
        if (text && text.length > 2) parts.push(text);
      });
      idx[s.id] = parts.join(' ');
    });
    return idx;
  }, [sections]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return null;
    return sections.filter((s) => {
      const hay = searchIndex[s.id] ?? s.title;
      return hay.includes(q) || s.id.includes(q);
    });
  }, [sections, searchQuery, searchIndex]);

  /** Copy a deep-link to the active section + confetti + checkmark morph. */
  const shareSection = async (id: string | null, originE?: { clientX: number; clientY: number }) => {
    const target = id || activeId;
    if (!target) return;
    haptic(12);
    const url = `${window.location.origin}${window.location.pathname}#${target}`;
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); ok = true; } catch { ok = false; }
      document.body.removeChild(ta);
    }
    setToast(ok ? t('linkCopied') : t('copyFailed'));
    if (ok) {
      setShared(true);
      if (sharedTimer.current) clearTimeout(sharedTimer.current);
      sharedTimer.current = setTimeout(() => setShared(false), 1400);
      confetti.fire(originE?.clientX, originE?.clientY);
    }
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  return (
    <>
      {/* Reading progress — thin orange bar pinned to the very top */}
      <div className="md:hidden fixed top-0 right-0 left-0 z-50 h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-l from-orange-500 to-orange-400 transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Quick-jump navigator — slides in once the hero is passed */}
      <div
        className={`md:hidden fixed top-2 right-0 left-0 z-40 transition-transform duration-300 ${
          showNav ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="max-w-md mx-auto px-3">
          <div className="flex items-center gap-1.5">
            {/* Share button — copies a deep-link; icon morphs to a checkmark */}
            <button
              onClick={(e) => shareSection(activeId, { clientX: e.clientX, clientY: e.clientY })}
              aria-label={t('shareLabel')}
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-colors ${
                shared
                  ? 'bg-emerald-500 text-white/30'
                  : 'bg-orange-500 text-white/30'
              }`}
            >
              <motion.span
                key={shared ? 'check' : 'share'}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon name={shared ? 'lucide:check' : 'lucide:share-2'} size={16} className="text-white" />
              </motion.span>
            </button>

            {/* Search button — opens a global search overlay */}
            <button
              onClick={() => { haptic(8); setSearchOpen(true); }}
              aria-label={t('searchPlaceholder')}
              className="shrink-0 w-9 h-9 rounded-full bg-[#1C1816] text-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <Icon name="lucide:search" size={16} className="text-white" />
            </button>

            {/* Chip rail */}
            <div
              ref={railRef}
              className="flex-1 flex gap-1.5 overflow-x-auto ar-no-scrollbar bg-white/90 backdrop-blur-md border border-gray-100 rounded-full px-2 py-1.5"
            >
              {sections.map((s) => {
                const on = s.id === activeId;
                const read = isRead(s.id);
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      chipRefs.current[s.id] = el;
                    }}
                    onClick={() => jumpTo(s.id)}
                    className={`flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
                      on
                        ? 'bg-orange-500 text-white/30'
                        : 'text-gray-500 hover:text-orange-500'
                    }`}
                  >
                    <span
                      className={`tabular-nums text-[9.5px] ${on ? 'text-white/80' : 'text-gray-400'}`}
                    >
                      {toFa(s.index)}
                    </span>
                    <span>{s.title}</span>
                    {read && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${on ? 'bg-white' : 'bg-emerald-500'}`}
                        aria-label="خوانده‌شده"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Read-progress ring + percentage (tappable jumps to first unread) */}
            {readCount > 0 && sections.length > 0 && (
              <div className="relative shrink-0 flex flex-col items-center">
                <button
                  onClick={() => {
                    const firstUnread = sections.find((s) => !isRead(s.id));
                    if (firstUnread) jumpTo(firstUnread.id);
                    else haptic(8);
                  }}
                  aria-label={t('tocOpen')}
                  className="relative w-9 h-9 rounded-full bg-[#1C1816] text-white flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Icon name="lucide:list" size={16} className="text-white" />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ProgressRing progress={readCount / sections.length} size={36} stroke={2.5} />
                  </span>
                </button>
                <span className="absolute top-full mt-0.5 text-[8px] font-black text-orange-500 tabular-nums whitespace-nowrap pointer-events-none">
                  {toFa(Math.round((readCount / sections.length) * 100))}٪
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast — confirms a copy action */}
      {toast && (
        <div className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#1C1816] text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full">
            <Icon name="lucide:check-circle-2" size={15} className="text-orange-400" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* "All 11 read" celebration overlay */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[65] flex items-center justify-center pointer-events-none px-8"
          >
            <motion.div
              initial={{ scale: 0.7, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="bg-white rounded-3xl px-8 py-7 text-center max-w-xs"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-4/30"
              >
                <Icon name="lucide:party-popper" size={30} className="text-white" />
              </motion.span>
              <h3 className="text-[18px] font-black text-[#1C1816] mb-1">{t('allReadTitle')}</h3>
              <p className="text-[13px] text-gray-500 leading-7">{t('allReadBody')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-visit onboarding tooltip */}
      <AnimatePresence>
        {onboardingStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[58]"
            onClick={() => dismissOnboarding(false)}
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-16 left-4 right-4 max-w-md mx-auto bg-white rounded-2xl p-5"
            >
              <span
                aria-hidden
                className="absolute -top-2 w-4 h-4 bg-white rotate-45"
                style={onboardingStep === 1 ? { left: '50%', transform: 'translateX(-50%) rotate(45deg)' } : { right: '24px' }}
              />
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon
                    name={onboardingStep === 1 ? 'lucide:compass' : 'lucide:share-2'}
                    size={20}
                    className="text-orange-500"
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-black text-[#1C1816] mb-1">
                    {onboardingStep === 1 ? t('onboardingNavTitle') : t('onboardingNavTitle')}
                  </h4>
                  <p className="text-[12.5px] text-gray-500 leading-6">
                    {onboardingStep === 1 ? t('onboardingNavBody') : t('onboardingNavBody')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] text-gray-400 font-bold tabular-nums">
                  {toFa(onboardingStep)} / ۲
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => dismissOnboarding(false)}
                    className="px-3 py-1.5 rounded-full text-[12px] font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    {t('onboardingDismiss')}
                  </button>
                  {onboardingStep === 1 && (
                    <button
                      onClick={() => dismissOnboarding(true)}
                      className="px-4 py-1.5 rounded-full text-[12px] font-bold bg-orange-500 text-white/30 active:scale-95 transition-transform"
                    >
                      {t('onboardingNext')}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[55] flex flex-col"
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-b-3xl max-h-[60vh] flex flex-col"
            >
              {/* Search input */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Icon name="lucide:search" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    autoFocus
                    className="w-full bg-gray-50 rounded-xl py-3 pr-10 pl-3 text-[14px] text-gray-700 placeholder:text-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    aria-label={t('onboardingDismiss')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Icon name="lucide:x" size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
              {/* Results */}
              <div className="flex-1 overflow-y-auto ar-no-scrollbar p-4">
                {searchResults === null ? (
                  <p className="text-[12px] text-gray-400 text-center py-8">{t('searchPlaceholder')}</p>
                ) : searchResults.length === 0 ? (
                  <p className="text-[13px] text-gray-400 text-center py-8">{t('searchNoResults')}</p>
                ) : (
                  <>
                    <p className="text-[11px] text-gray-400 font-bold mb-3">{t('searchAllSections')} ({toFa(searchResults.length)})</p>
                    <ul className="space-y-2">
                      {searchResults.map((s) => {
                        const read = isRead(s.id);
                        return (
                          <li key={s.id}>
                            <button
                              onClick={() => jumpTo(s.id)}
                              className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-2xl p-3 text-right transition-colors active:scale-95"
                            >
                              <span className={`shrink-0 w-8 h-8 rounded-full text-white text-[11px] font-black flex items-center justify-center tabular-nums ${read ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                                {toFa(s.index)}
                              </span>
                              <span className="flex-1 min-w-0 text-[13px] font-bold text-[#1C1816] truncate">{s.title}</span>
                              <Icon name="lucide:chevron-left" size={16} className="text-orange-400 shrink-0" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti overlay + overscroll spinner hint */}
      {confetti.node}
      <PullToRefreshHint />
    </>
  );
}
