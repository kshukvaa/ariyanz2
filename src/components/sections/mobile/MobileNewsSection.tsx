'use client';

/* ──────────────────────────────────────────────────────────────
   MobileNewsSection — index 06, WARM CREAM (#FDF7F0)
   "Immersive App" mobile variant of NewsSection.
   v11: light theme — GlassCard is white, content uses dark text.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import {
  newsHeading,
  newsTabs,
  newsTimeline,
  newsTimelineTitle,
  newsTimelineCta,
  newsCards,
  newsBand,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SnapItem,
  GlassCard,
  PillTabs,
  GradientCTA,
  OutlineCTA,
  Reveal,
  SnapProgress,
  useSnapActive,
  useAutoplay,
  useDragScroll,
  useDelayedReady,
  SkeletonCard,
} from './_kit';

function NewsCard({ c }: { c: (typeof newsCards)[number] }) {
  return (
    <GlassCard className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600">
          {c.badge}
        </span>
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${c.color}22` }}
        >
          <Icon name={c.icon} size={20} className="text-orange-500" />
        </span>
      </div>

      <h3 className="text-[14px] font-black text-[#1C1816] leading-7 mb-1.5">
        {c.title}
      </h3>
      <p className="text-[11.5px] text-gray-500 leading-7 mb-4 flex-1">
        {c.desc}
      </p>

      <div className="flex items-center gap-2 text-[10.5px] text-gray-500 border-t border-gray-100 pt-3 mb-3">
        <Icon name="lucide:calendar-days" size={13} className="text-gray-400 shrink-0" />
        <span className="leading-5">{c.date}</span>
      </div>

      <OutlineCTA
        href={c.href}
        label={c.cta}
        icon="lucide:arrow-left"
      />
    </GlassCard>
  );
}

export default function MobileNewsSection() {
  const ready = useDelayedReady(500);
  const [tab, setTab] = useState<string>('all');
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-news') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  const visible =
    tab === 'all' ? newsCards : newsCards.filter((c) => c.tab === tab);
  const { ref, active: railActive, scrollTo } = useSnapActive(visible.length);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);

  return (
    <MobileSectionShell dark id="mobile-news">
      <MobileHeading
        index={6}
        pulse={pulse}
        title={newsHeading.title}
        desc={newsHeading.desc}
        accentIcon="lucide:newspaper"
      />

      <PillTabs tabs={newsTabs} active={tab} onChange={setTab} />

      {visible.length === 0 && ready ? (
        <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="lucide:file-text" size={28} className="text-gray-300 mb-3" />
          <p className="text-[12.5px] text-gray-500 mb-4 leading-7">
            در این دسته فعلاً به‌روزرسانی تازه‌ای ثبت نشده است.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-orange-500"
          >
            <span>مشاهده همه مقالات</span>
            <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
          </Link>
        </GlassCard>
      ) : (
        <>
          <div
            key={tab}
            ref={ref}
            onMouseEnter={autoplay.onPause}
            onMouseLeave={autoplay.onResume}
            onTouchStart={autoplay.onPause}
            onTouchEnd={autoplay.onResume}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 animate-fade-in"
          >
            {!ready
              ? Array.from({ length: 2 }).map((_, i) => (
                  <SnapItem key={`sk-${i}`} width="w-[78%]">
                    <SkeletonCard />
                  </SnapItem>
                ))
              : visible.map((c, i) => (
                  <SnapItem key={c.title} width="w-[78%]">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                      className="h-full"
                    >
                      <NewsCard c={c} />
                    </motion.div>
                  </SnapItem>
                ))}
          </div>
          <SnapProgress
            count={visible.length}
            active={railActive}
            onDot={scrollTo}
          />
        </>
      )}

      {/* Timeline */}
      <h3 className="text-[15px] font-black text-[#1C1816] mt-7 mb-4 leading-7">
        {newsTimelineTitle}
      </h3>
      <Reveal>
        <GlassCard className="mb-4 p-0">
          <ol className="px-5 py-5">
            {newsTimeline.map((t, i) => (
              <li
                key={`${t.kind}-${t.date}`}
                className="relative pr-6 pb-5 last:pb-0"
              >
                {i < newsTimeline.length - 1 && (
                  <span className="absolute right-[5px] top-5 bottom-0 w-px bg-orange-200" />
                )}
                <span className="absolute right-0 top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-100" />
                <p className="text-[12.5px] font-black text-[#1C1816] leading-6">
                  {t.kind}
                </p>
                <p className="text-[11.5px] text-gray-600 leading-6 mt-1">
                  {t.title}
                </p>
                <p className="text-[10.5px] text-gray-400 mt-1">{t.date}</p>
              </li>
            ))}
          </ol>
        </GlassCard>
      </Reveal>

      <Link
        href={newsTimelineCta.href}
        className="inline-flex items-center gap-2 border border-orange-300 text-orange-500 rounded-xl px-4 py-2.5 text-[12.5px] font-bold mb-6 active:scale-[0.98] transition-transform"
      >
        <span>{newsTimelineCta.label}</span>
        <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
      </Link>

      {/* Band — newsletter signup */}
      <GlassCard>
        <div className="flex items-start gap-3 mb-4">
          <span className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <Icon name="lucide:bell-ring" size={22} className="text-orange-500" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black text-[#1C1816] leading-7 mb-1">
              {newsBand.title}
            </p>
            <p className="text-[11.5px] text-gray-500 leading-6">
              {newsBand.desc}
            </p>
          </div>
        </div>
        <GradientCTA
          href={newsBand.cta.href}
          label={newsBand.cta.label}
          icon="lucide:arrow-left"
        />
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
            <Icon name="lucide:mail" size={18} className="text-orange-500" />
          </span>
          <span className="text-[10.5px] text-gray-500 font-bold">
            خبرنامه آریاز
          </span>
        </div>
      </GlassCard>
    </MobileSectionShell>
  );
}
