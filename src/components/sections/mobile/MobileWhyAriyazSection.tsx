'use client';

/* ──────────────────────────────────────────────────────────────
   MobileWhyAriyazSection — index 10, LIGHT (bg-[#FAFAFB])
   "Immersive App" mobile variant of WhyAriyazSection.
   Same data, different design: vertical numbered reason list with
   a connecting line (each reason in its own SolidCard with an
   orange number medallion straddling the line), a cream trust
   SolidCard with brand footer, a 2-col stat grid with
   AnimatedCounter, and a navy gradient closing band with CTA.
   The desktop's xl-only orbit diagram is replaced by this
   editorial vertical stack — works at any mobile width.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { logoSrc } from '@/data/slotImages';
import {
  whyHeading,
  whyReasons,
  whyTrust,
  whyStats,
  whyBand,
  brand,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SolidCard,
  GradientCTA,
  MORANGE,
  NumberMedallion,
  Reveal,
  StatBadge,
} from './_kit';

export default function MobileWhyAriyazSection() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-why') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  return (
    <MobileSectionShell bg="bg-[#FAFAFB]" id="mobile-why">
      <MobileHeading
        index={10}
        pulse={pulse}
        title={whyHeading.title}
        desc={whyHeading.desc}
        accentIcon="lucide:badge-check"
      />

      {/* Reasons — vertical numbered list with a connecting line on the RTL start (right) */}
      <div className="relative mb-6 pr-4">
        <span
          className="absolute right-[19px] top-3 bottom-3 w-px bg-orange-200"
          aria-hidden
        />
        <ol className="space-y-3">
          {whyReasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
              className="relative"
            >
              <SolidCard accent="#E5E7EB" className="!p-4">
                <div className="flex items-start gap-3">
                  {/* Number medallion — kit-standardised, flex-centered.
                      whyReasons[].n is a Persian-digit string, so drive the
                      medallion from the array index (1-based) instead. */}
                  <NumberMedallion n={i + 1} className="relative z-10/30" />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name={r.icon} size={16} className="text-orange-500 shrink-0" />
                      <h3 className="text-[14px] font-black text-[#1C1816] leading-6">
                        {r.title}
                      </h3>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-7">{r.desc}</p>
                  </div>
                </div>
              </SolidCard>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Trust block — cream SolidCard with brand footer */}
      <Reveal>
        <SolidCard accent={MORANGE} className="mb-6 !bg-[#FDF3EA]">
        <h3 className="text-[13.5px] font-black text-[#1C1816] mb-3 leading-6">
          {whyTrust.title}
        </h3>
        <ul className="grid grid-cols-2 gap-2.5 mb-4">
          {whyTrust.items.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 text-[12px] text-gray-700 leading-6"
            >
              <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <Icon name="lucide:circle-check" size={13} className="text-white" />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-orange-200/60">
          {/* logoSrc is a static local path — Next/Image isn't required here. */}
          <img src={logoSrc} alt={brand.name} className="h-6 w-auto shrink-0" />
          <p className="text-[10.5px] font-bold text-[#1C1816] leading-5 text-left">
            {brand.tagline}
          </p>
        </div>
      </SolidCard>
      </Reveal>

      {/* Stats — 2-col grid of StatBadges */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {whyStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.2) }}
          >
            <StatBadge
              icon={s.icon}
              value={s.value}
              label={s.label}
              sub={s.sub}
            />
          </motion.div>
        ))}
      </div>

      {/* Closing band — warm light card with orange accents (NO dark) */}
      <div className="relative bg-[#FDF7F0] border border-orange-100 rounded-3xl p-5 overflow-hidden">
        <span
          className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-orange-200/40 blur-2xl"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
              <Icon name="lucide:sparkles" size={22} className="text-orange-500" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-black text-[#1C1816] leading-7 mb-1">
                {whyBand.title}
              </p>
              <p className="text-[12px] text-gray-500 leading-6">{whyBand.text}</p>
            </div>
          </div>
          <GradientCTA
            href={whyBand.cta.href}
            label={whyBand.cta.label}
            icon="lucide:arrow-left"
          />
        </div>
      </div>
    </MobileSectionShell>
  );
}
