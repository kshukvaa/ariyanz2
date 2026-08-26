'use client';

/* ──────────────────────────────────────────────────────────────
   MobilePartnersSection — index 02, LIGHT (#FAFAFB)
   "Immersive App" mobile variant of PartnersSection.
   v11 redesign: a single autoplaying carousel where each slide IS
   a partner's case study (logo + case title + summary + meta + CTA)
   + 2-col stat grid + expertise list + warm light contact card.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import {
  partnersHeading,
  partners,
  caseStudyLabels,
  partnerStats,
  partnerStatsHeading,
  expertiseStrip,
  expertiseHeading,
  partnerContact,
  type Partner,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SnapItem,
  SolidCard,
  GradientCTA,
  MORANGE,
  StatBadge,
  SnapProgress,
  useSnapActive,
  useAutoplay,
  useDragScroll,
} from './_kit';

/* ── A single partner case-study slide. ── */
function CaseStudySlide({ p }: { p: Partner }) {
  const meta = [
    { ...caseStudyLabels.field, value: p.case.field },
    { ...caseStudyLabels.service, value: p.case.service },
    { ...caseStudyLabels.duration, value: p.case.duration },
    { ...caseStudyLabels.year, value: p.case.year },
  ];
  return (
    <SolidCard accent={MORANGE} className="h-full flex flex-col">
      {/* Logo strip — partner brand tile */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <span className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center shrink-0">
          <ImageSlot
            id={p.slot}
            label={p.label}
            ratio="aspect-square"
            icon="lucide:building-2"
            rounded="rounded-2xl"
            className="!h-full !bg-transparent !border-0"
          />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-black text-[#1C1816] leading-7 truncate">
            {p.label}
          </h3>
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-full mt-1">
            <Icon name="lucide:sparkles" size={11} className="text-orange-500" />
            {caseStudyLabels.badge}
          </span>
        </div>
      </div>

      {/* Case study image */}
      <ImageSlot
        id={p.case.slot}
        label={p.case.slotLabel}
        ratio="aspect-[16/10]"
        icon="lucide:building-2"
        rounded="rounded-2xl"
        className="mb-4"
      />

      {/* Case title + summary */}
      <p className="text-[13px] font-bold text-orange-500 mb-1.5 leading-6">
        {p.case.title}
      </p>
      <p className="text-[12px] text-gray-500 leading-7 mb-4">
        {p.case.summary}
      </p>

      {/* Meta — 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 pt-3 mt-auto border-t border-gray-100 mb-4">
        {meta.map((m) => (
          <div key={m.label} className="flex items-start gap-1.5">
            <Icon name={m.icon} size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <span className="min-w-0">
              <span className="block text-[10px] font-bold text-[#1C1816] leading-5">
                {m.label}
              </span>
              <span className="block text-[11px] text-gray-500 leading-5 mt-0.5">
                {m.value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={caseStudyLabels.cta.href}
        className="inline-flex items-center justify-center gap-1.5 border border-orange-300 text-orange-500 px-4 py-2.5 rounded-xl text-[12px] font-bold w-fit transition-all active:scale-[0.97]"
      >
        <span>{caseStudyLabels.cta.label}</span>
        <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
      </Link>
    </SolidCard>
  );
}

export default function MobilePartnersSection() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-partners') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  const { ref, active: railActive, scrollTo } = useSnapActive(Math.min(partners.length, 5));
  const autoplay = useAutoplay(ref, 5000);
  useDragScroll(ref);

  return (
    <MobileSectionShell bg="bg-[#FAFAFB]" id="mobile-partners">
      <MobileHeading
        index={2}
        pulse={pulse}
        title={partnersHeading.title}
        desc={partnersHeading.desc}
        accentIcon="lucide:handshake"
      />

      {/* Single autoplaying carousel — one partner case study per slide */}
      <div
        ref={ref}
        onMouseEnter={autoplay.onPause}
        onMouseLeave={autoplay.onResume}
        onTouchStart={autoplay.onPause}
        onTouchEnd={autoplay.onResume}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 mb-3"
      >
        {partners.slice(0, 5).map((p, i) => (
          <SnapItem key={p.id} width="w-[78%]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
              className="h-full"
            >
              <CaseStudySlide p={p} />
            </motion.div>
          </SnapItem>
        ))}
      </div>
      <SnapProgress
        count={Math.min(partners.length, 5)}
        active={railActive}
        onDot={scrollTo}
      />

      {/* Stats heading */}
      <h3 className="text-[16px] font-black text-[#1C1816] mt-6 mb-3 leading-7">
        {partnerStatsHeading}
      </h3>

      {/* Stats — 2-col grid of StatBadges */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {partnerStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.25) }}
          >
            <StatBadge
              icon={s.icon}
              value={s.value}
              label={s.label}
              sub={s.desc}
            />
          </motion.div>
        ))}
      </div>

      {/* Expertise */}
      <h3 className="text-[16px] font-black text-[#1C1816] mb-3 leading-7">
        {expertiseHeading}
      </h3>
      <SolidCard accent={MORANGE} className="mb-6 p-0">
        <ul className="divide-y divide-gray-100">
          {expertiseStrip.map((e) => (
            <li key={e.text} className="flex items-center gap-3 px-4 py-3.5">
              <span className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Icon name={e.icon} size={18} className="text-orange-500" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12.5px] font-bold text-[#1C1816] leading-6">
                  {e.text}
                </span>
                <span className="block text-[11px] text-gray-500 leading-5 mt-0.5">
                  {e.desc}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </SolidCard>

      {/* Contact — warm light card (NO dark backgrounds) */}
      <div className="bg-[#FDF7F0] rounded-3xl p-5 border border-orange-100">
        <Link
          href={partnerContact.meeting.href}
          className="flex items-center gap-3 py-3 border-b border-orange-100 active:opacity-80 transition-opacity"
        >
          <span className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <Icon name={partnerContact.meeting.icon} size={18} className="text-orange-500" />
          </span>
          <span className="flex-1 text-[13px] font-bold text-[#1C1816]">
            {partnerContact.meeting.label}
          </span>
          <Icon name="lucide:arrow-left" size={16} className="text-orange-400" />
        </Link>

        <a
          href="tel:02191017134"
          className="flex items-center gap-3 py-3 border-b border-orange-100 active:opacity-80 transition-opacity"
        >
          <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <Icon name={partnerContact.phone.icon} size={18} className="text-emerald-600" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[12px] text-gray-500 leading-5">
              {partnerContact.phone.label}
            </span>
            <span dir="ltr" className="block text-[13px] font-black text-[#1C1816]">
              {partnerContact.phone.value}
            </span>
          </span>
        </a>

        <div className="pt-4">
          <GradientCTA
            href={partnerContact.cta.href}
            label={partnerContact.cta.label}
            icon="lucide:arrow-left"
          />
        </div>
      </div>
    </MobileSectionShell>
  );
}
