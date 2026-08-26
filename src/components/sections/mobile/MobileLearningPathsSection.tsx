'use client';

/* ──────────────────────────────────────────────────────────────
   MobileLearningPathsSection — index 04, LIGHT (#F5F6FA)
   "Immersive App" mobile variant of LearningPathsSection.
   Same data, different design: vertical feature list + horizontal
   snap rail of solid cards with a LINEAR progress bar (not the
   desktop's SVG ring) + a stats band.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import {
  pathsHeading,
  pathFeatures,
  pathsSubheading,
  pathsAllCta,
  pathCardCta,
  learningPaths,
  pathsBand,
  pathStepsLabel,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SnapItem,
  SolidCard,
  GradientCTA,
  MORANGE,
  SnapProgress,
  useSnapActive,
  useAutoplay,
  useDragScroll,
  Reveal,
} from './_kit';

const BAND_TONES: Record<string, string> = {
  blue: 'bg-amber-50 text-amber-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-500',
};

export default function MobileLearningPathsSection() {
  const { ref, active: railActive, scrollTo } = useSnapActive(learningPaths.length);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-paths') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  return (
    <MobileSectionShell bg="bg-[#F5F6FA]" id="mobile-paths">
      <MobileHeading
        index={4}
        pulse={pulse}
        kicker={pathsHeading.kicker}
        title={pathsHeading.title}
        desc={pathsHeading.desc}
        accentIcon="lucide:route"
      />

      {/* Features — vertical list with hairline dividers */}
      <Reveal>
        <SolidCard accent={MORANGE} className="mb-7 p-0">
          <ul className="divide-y divide-gray-100">
            {pathFeatures.map((f) => (
              <li key={f.title} className="flex items-start gap-3 px-4 py-3.5">
                <span className="w-10 h-10 rounded-xl bg-[#F2F3F8] flex items-center justify-center shrink-0">
                  <Icon name={f.icon} size={20} className="text-[#1C1816]" />
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-black text-[#1C1816] leading-6 mb-0.5">
                    {f.title}
                  </h4>
                  <p className="text-[11.5px] text-gray-500 leading-6 whitespace-pre-line">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SolidCard>
      </Reveal>

      {/* Sub-heading row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 text-[15px] font-black text-[#1C1816] leading-7">
          <span className="h-[3px] w-6 rounded-full bg-orange-400" />
          {pathsSubheading}
        </h3>
        <Link
          href={pathsAllCta.href}
          className="inline-flex items-center gap-1.5 border border-orange-300 text-orange-500 px-3 py-2 rounded-xl text-[11.5px] font-bold shrink-0 transition-all active:scale-[0.97]"
        >
          <span>{pathsAllCta.label}</span>
          <Icon name="lucide:arrow-left" size={13} className="text-orange-500" />
        </Link>
      </div>

      {/* Path rail */}
      <div
        ref={ref}
        onMouseEnter={autoplay.onPause}
        onMouseLeave={autoplay.onResume}
        onTouchStart={autoplay.onPause}
        onTouchEnd={autoplay.onResume}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2"
      >
        {learningPaths.map((p, i) => (
          <SnapItem key={p.title} width="w-[78%]">
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
              className="h-full"
            >
              <Link href="/learning-paths" className="block h-full active:scale-[0.98] transition-transform">
                <SolidCard
                  accent={p.featured ? MORANGE : '#E5E7EB'}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-[#EEF2FA] text-[#1C1816]">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                        <Icon name="lucide:flame" size={12} className="text-orange-500" />
                        منتخب
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${p.color}1A` }}
                    >
                      <Icon name={p.icon} size={24} style={{ backgroundColor: p.color }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[14px] font-black text-[#1C1816] leading-6">
                        {p.title}
                      </h4>
                      <p className="text-[11.5px] text-gray-400 leading-5 mt-0.5">
                        {p.steps} {pathStepsLabel}
                      </p>
                    </div>
                  </div>

                  {/* Linear progress bar (NOT the desktop SVG ring) */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10.5px] font-bold text-gray-500">پیشرفت</span>
                      <span
                        className="text-[12px] font-black tabular-nums"
                        style={{ color: p.color }}
                      >
                        {p.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full transition-[width] duration-700"
                        style={{ background: p.color }}
                      />
                    </div>
                  </div>

                  <span
                    className={`mt-auto w-full flex items-center justify-center gap-1.5 rounded-xl py-3 text-[12.5px] font-bold transition-all ${
                      p.featured
                        ? 'bg-orange-500 text-white'
                        : 'border border-orange-300 text-orange-500'
                    }`}
                  >
                    <span>{p.started ? pathCardCta.started : pathCardCta.fresh}</span>
                    <Icon
                      name="lucide:arrow-left"
                      size={14}
                      className={p.featured ? 'text-white' : 'text-orange-500'}
                    />
                  </span>
                </SolidCard>
              </Link>
            </motion.div>
          </SnapItem>
        ))}
      </div>
      <SnapProgress
        count={learningPaths.length}
        active={railActive}
        onDot={scrollTo}
      />

      {/* Band */}
      <SolidCard accent={MORANGE} className="mt-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="w-11 h-11 rounded-2xl bg-[#F2F3F8] flex items-center justify-center shrink-0">
            <Icon name={pathsBand.icon} size={22} className="text-[#1C1816]" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-black text-[#1C1816] leading-7 mb-1">
              {pathsBand.title}
            </h3>
            <p className="text-[12px] text-gray-500 leading-7">{pathsBand.desc}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
          {pathsBand.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${BAND_TONES[s.tone]}`}
              >
                <Icon name={s.icon} size={18} />
              </span>
              <span className="text-[14px] font-black text-[#1C1816] leading-6">{s.value}</span>
              <span className="text-[10.5px] text-gray-500 leading-4 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </SolidCard>

      {/* Bottom CTA */}
      <div className="mt-6">
        <GradientCTA href={pathsAllCta.href} label={pathsAllCta.label} icon="lucide:arrow-left" />
      </div>
    </MobileSectionShell>
  );
}
