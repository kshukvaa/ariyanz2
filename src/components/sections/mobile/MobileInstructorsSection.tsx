'use client';

/* ──────────────────────────────────────────────────────────────
   MobileInstructorsSection — index 11, WARM CREAM (#FDF7F0)
   "Immersive App" mobile variant of InstructorsSection.
   v11: light theme — GlassCard is white, content uses dark text.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import {
  instructorsHeading,
  instructorTabs,
  instructors,
  instructorLabels,
  instructorsBand,
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

/** Badge tones — colored bg with white text (reads fine on light card). */
const BADGE_TONES: Record<string, string> = {
  orange: 'bg-orange-400 text-white',
  blue: 'bg-amber-400 text-white',
  purple: 'bg-purple-400 text-white',
  green: 'bg-emerald-400 text-white',
};

function InstructorCard({ p }: { p: (typeof instructors)[number] }) {
  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col h-full">
      {/* Header strip — badge (start) + rating pill (end) */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
            BADGE_TONES[p.tone] || BADGE_TONES.orange
          }`}
        >
          {p.badge}
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-2.5 py-1">
          <Icon name="mdi:star" size={13} className="text-amber-400" />
          <span className="text-[11px] font-black text-[#1C1816] leading-4">{p.rating}</span>
        </span>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center px-4 pt-1 pb-3">
        <span className="w-[108px] h-[108px] rounded-full overflow-hidden ring-4 ring-orange-100">
          <ImageSlot
            id={p.slot}
            label={p.name}
            ratio="aspect-square"
            rounded="rounded-full"
            icon="mdi:account-tie-outline"
            className="!h-full"
          />
        </span>
      </div>

      {/* Name + role + reviews */}
      <div className="px-4 mb-3 text-center">
        <h3 className="text-[15px] font-black text-[#1C1816] leading-7 mb-1">{p.name}</h3>
        <p className="text-[11px] text-gray-500 leading-6">{p.role}</p>
        <p className="text-[10px] text-gray-400 leading-4 mt-1">{p.reviews}</p>
      </div>

      {/* Stats grid — courses + students */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 mx-4 mb-4 rounded-2xl overflow-hidden">
        <div className="bg-white flex flex-col items-center gap-1 py-3">
          <Icon name="lucide:graduation-cap" size={16} className="text-orange-500" />
          <span className="text-[13px] font-black text-[#1C1816] leading-4">{p.courses}</span>
          <span className="text-[9.5px] text-gray-500 leading-3">
            {instructorLabels.courses}
          </span>
        </div>
        <div className="bg-white flex flex-col items-center gap-1 py-3">
          <Icon name="lucide:users-round" size={16} className="text-amber-500" />
          <span className="text-[13px] font-black text-[#1C1816] leading-4">{p.students}</span>
          <span className="text-[9.5px] text-gray-500 leading-3">
            {instructorLabels.students}
          </span>
        </div>
      </div>

      {/* Profile CTA */}
      <div className="px-4 pb-4 mt-auto">
        <OutlineCTA
          href="/agents"
          label={instructorLabels.profile}
          icon="lucide:arrow-left"
        />
      </div>
    </GlassCard>
  );
}

export default function MobileInstructorsSection() {
  const ready = useDelayedReady(500);
  const [tab, setTab] = useState<string>('all');
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-instructors') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  const list = tab === 'all' ? instructors : instructors.filter((i) => i.tab === tab);
  const { ref, active: railActive, scrollTo } = useSnapActive(list.length);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);

  return (
    <MobileSectionShell dark id="mobile-instructors">
      <MobileHeading
        index={11}
        pulse={pulse}
        kicker={instructorsHeading.kicker}
        title={instructorsHeading.title}
        desc={instructorsHeading.desc}
        accentIcon="lucide:users-round"
      />

      <PillTabs tabs={instructorTabs} active={tab} onChange={setTab} />

      {list.length === 0 && ready ? (
        <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="lucide:users-round" size={28} className="text-gray-300 mb-3" />
          <p className="text-[12.5px] text-gray-500 leading-7">
            در این دسته فعلاً مدرسی ثبت نشده است.
          </p>
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
              : list.map((p, i) => (
                  <SnapItem key={p.name} width="w-[78%]">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                      className="h-full"
                    >
                      <InstructorCard p={p} />
                    </motion.div>
                  </SnapItem>
                ))}
          </div>
          <SnapProgress
            count={list.length}
            active={railActive}
            onDot={scrollTo}
          />
        </>
      )}

      {/* Band — glass card with slot image, stats grid, and GradientCTA */}
      <Reveal>
        <GlassCard className="mt-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="w-[100px] shrink-0">
            <ImageSlot
              id={instructorsBand.slot}
              label={instructorsBand.title}
              ratio="aspect-[3/2]"
              rounded="rounded-xl"
              icon="lucide:graduation-cap"
              className="!bg-transparent !border-0"
            />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black text-[#1C1816] leading-7 mb-1">
              {instructorsBand.title}
            </p>
            <p className="text-[11.5px] text-gray-500 leading-6">{instructorsBand.text}</p>
          </div>
        </div>

        {/* Stats — 4-col grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {instructorsBand.stats.map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-2 text-center">
              <span className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-orange-100 flex items-center justify-center">
                <Icon name={s.icon} size={15} className="text-orange-500" />
              </span>
              <p className="text-[11px] font-black text-[#1C1816] leading-4">{s.value}</p>
              <p className="text-[8px] text-gray-500 leading-3 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <GradientCTA
          href={instructorsBand.cta.href}
          label={instructorsBand.cta.label}
          icon="lucide:arrow-left"
        />
      </GlassCard>
      </Reveal>
    </MobileSectionShell>
  );
}
