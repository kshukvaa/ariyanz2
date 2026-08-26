'use client';

/* ──────────────────────────────────────────────────────────────
   MobileSpecialOffersSection — index 05, LIGHT warm (#FDF7F0)
   "Immersive App" mobile variant of SpecialOffersSection.
   v11: light theme throughout — no dark icon containers.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import {
  offersHeading,
  offersIntro,
  mainOffer,
  miniOffers,
  offersBand,
} from '@/data/landing';
import {
  MobileSectionShell,
  SnapItem,
  SolidCard,
  GradientCTA,
  OutlineCTA,
  Reveal,
  MORANGE,
  faIndex,
  SnapProgress,
  useSnapActive,
  useAutoplay,
  useDragScroll,
} from './_kit';

/* ── Centered mini-heading — sparkles + navy title + orange latin + desc ── */
function CenteredOffersHeading({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="text-center mb-7">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon name="lucide:sparkles" size={18} className="text-orange-500" />
        <h2 className="text-[22px] font-black text-[#1C1816] leading-8">
          {offersHeading.title}
        </h2>
      </div>
      <p
        dir="ltr"
        className="text-[13px] font-bold text-orange-500 mb-2 tracking-wide"
      >
        {offersHeading.latin}
      </p>
      <p className="text-[12.5px] text-gray-500 leading-7 max-w-xs mx-auto">
        {offersHeading.desc}
      </p>
      {/* editorial numbered chip — centered, for continuity with the kit */}
      <motion.span
        animate={pulse ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="inline-block mt-3 text-[10.5px] font-black tabular-nums px-2.5 py-1 rounded-full bg-orange-100 text-orange-600"
      >
        {faIndex(5)}
      </motion.span>
    </div>
  );
}

/* ── Compact orange gradient banner that replaces the desktop's inline GiftArt SVG ── */
function IntroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-orange-500 to-orange-600 p-5 mb-6/20">
      {/* decorative blobs */}
      <span className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
      <span className="absolute -bottom-8 -right-4 w-28 h-28 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-4">
        <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <Icon name="lucide:gift" size={26} className="text-white" />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-black text-white leading-7 mb-1">
            {offersIntro.title}
          </h3>
          {offersIntro.lines.map((l) => (
            <p key={l} className="text-[11.5px] text-white/85 leading-6">
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Big featured offer card with corner ribbon ── */
function MainOfferCard() {
  return (
    <SolidCard accent={MORANGE} className="pt-8 mb-6">
      {/* Corner ribbon — absolutely positioned top-left in RTL = visually top-left */}
      <div className="absolute top-0 left-0 bg-orange-500 text-white rounded-br-2xl rounded-tl-3xl px-3.5 py-2">
        <div className="flex flex-col items-center leading-none">
          <span className="text-[18px] font-black">{mainOffer.ribbonValue}</span>
          <span className="text-[9.5px] font-bold mt-0.5 opacity-95">
            {mainOffer.ribbonLabel}
          </span>
        </div>
      </div>

      {/* Badge with star */}
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full mb-3">
        <Icon name="lucide:star" size={12} className="text-orange-400" />
        {mainOffer.badge}
      </span>

      <h3 className="text-[18px] font-black text-[#1C1816] leading-8 mb-1.5">
        {mainOffer.title}
      </h3>
      <p className="text-[12px] text-gray-500 leading-7 mb-5">
        {mainOffer.subtitle}
      </p>

      {/* Includes — 2-col grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {mainOffer.includes.map((it) => (
          <div
            key={it.title}
            className="bg-[#FDF7F0] rounded-2xl p-3 flex flex-col items-center text-center"
          >
            <span className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-2">
              <Icon name={it.icon} size={18} className="text-orange-500" />
            </span>
            <p className="text-[11.5px] font-black text-[#1C1816] leading-5">
              {it.title}
            </p>
            <p className="text-[10px] text-gray-400 leading-5 mt-0.5">{it.sub}</p>
          </div>
        ))}
      </div>

      {/* Price row */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="text-[12.5px] text-gray-300 line-through">
          {mainOffer.oldPrice}
        </span>
        <span className="h-5 w-px bg-gray-200" />
        <span className="text-[19px] font-black text-orange-500">
          {mainOffer.price}
        </span>
      </div>

      <GradientCTA
        href={mainOffer.cta.href}
        label={mainOffer.cta.label}
        icon="lucide:arrow-left"
      />
    </SolidCard>
  );
}

/* ── Mini offer card — used inside the SnapRail ── */
function MiniOfferCard({
  o,
}: {
  o: (typeof miniOffers)[number];
}) {
  const green = o.tone === 'green';
  return (
    <SolidCard
      accent={green ? '#10B981' : MORANGE}
      className="h-full flex flex-col items-center text-center"
    >
      <span
        className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full mb-4 ${
          green ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-100/70 text-orange-600'
        }`}
      >
        <Icon
          name={o.badgeIcon}
          size={12}
          className={green ? 'text-emerald-500' : 'text-orange-500'}
        />
        {o.badge}
      </span>

      <span
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
          green ? 'bg-emerald-50' : 'bg-orange-50'
        }`}
      >
        <Icon
          name={o.icon}
          size={26}
          className={green ? 'text-emerald-500' : 'text-orange-500'}
        />
      </span>

      <h4 className="text-[13.5px] font-black text-[#1C1816] leading-6 mb-2">
        {o.title}
      </h4>
      <p className="text-[11px] text-gray-500 leading-6 mb-4 flex-1">{o.desc}</p>

      <span
        className={`inline-flex items-center gap-1 text-[12px] font-bold ${
          green ? 'text-emerald-600' : 'text-orange-500'
        }`}
      >
        <Icon name="lucide:chevron-left" size={14} />
        <span>{o.discount}</span>
      </span>
    </SolidCard>
  );
}

export default function MobileSpecialOffersSection() {
  const { ref, active: railActive, scrollTo } = useSnapActive(miniOffers.length);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-offers') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  return (
    <MobileSectionShell bg="bg-[#FDF7F0]" id="mobile-offers">
      <CenteredOffersHeading pulse={pulse} />

      {/* Intro banner (replaces desktop's heavy inline GiftArt SVG) */}
      <Reveal>
        <IntroBanner />
      </Reveal>

      {/* Featured offer */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
      >
        <MainOfferCard />
      </motion.div>

      {/* Mini offers — plain div + useSnapActive so SnapProgress tracks scroll */}
      <div
        ref={ref}
        onMouseEnter={autoplay.onPause}
        onMouseLeave={autoplay.onResume}
        onTouchStart={autoplay.onPause}
        onTouchEnd={autoplay.onResume}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 mb-4"
      >
        {miniOffers.map((o, i) => (
          <SnapItem key={o.title} width="w-[70%]">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
              className="h-full"
            >
              <Link href={o.href} className="block h-full active:scale-[0.98] transition-transform">
                <MiniOfferCard o={o} />
              </Link>
            </motion.div>
          </SnapItem>
        ))}
      </div>
      <SnapProgress
        count={miniOffers.length}
        active={railActive}
        onDot={scrollTo}
      />

      {/* Closing band — SolidCard with icon + title + text + orange outline CTA */}
      <SolidCard accent={MORANGE}>
        <div className="flex items-start gap-3 mb-4">
          <span className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <Icon name="lucide:tag" size={22} className="text-orange-500" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black text-[#1C1816] leading-7">
              {offersBand.title}
            </p>
            <p className="text-[12px] text-gray-500 leading-6 mt-0.5">
              {offersBand.text}
            </p>
          </div>
        </div>
        <OutlineCTA
          href={offersBand.cta.href}
          label={offersBand.cta.label}
          icon="lucide:arrow-left"
        />
      </SolidCard>
    </MobileSectionShell>
  );
}
