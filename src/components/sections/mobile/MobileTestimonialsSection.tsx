'use client';

/* ──────────────────────────────────────────────────────────────
   MobileTestimonialsSection — index 07, LIGHT warm (#FDF4EE)
   "Immersive App" mobile variant of TestimonialsSection.
   via the shared useAutoplay hook (3s, no ease) for consistency
   with the other snap-rail sections.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import { AnimatedCounter } from '@/components/ScrollAnimator';
import { slotImages } from '@/data/slotImages';
import {
  testimonialsHeading,
  testimonialTabs,
  testimonials,
  testimonialStats,
  testimonialsClosing,
  type Testimonial,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SnapItem,
  SolidCard,
  PillTabs,
  MORANGE,
  Reveal,
  useSnapActive,
  useAutoplay,
  useDragScroll,
} from './_kit';

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label="۵ از ۵">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="mdi:star" size={size} className="text-orange-500" />
      ))}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const hasLogo = t.logoSlot ? Boolean(slotImages[t.logoSlot]) : false;
  return (
    <SolidCard accent={MORANGE} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <Stars />
        <Icon
          name="mdi:format-quote-close"
          size={28}
          className="text-orange-200"
        />
      </div>

      <blockquote className="text-[13px] font-bold text-[#1C1816] leading-[2] mb-4 flex-1">
        {t.quote}
      </blockquote>

      <div className="flex items-center gap-3 border-t border-gray-100 pt-3 mt-3">
        <span className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-orange-100 shrink-0">
          <ImageSlot
            id={t.avatarSlot}
            label={t.name}
            ratio="aspect-square"
            rounded="rounded-full"
            icon="mdi:account-tie-outline"
            className="!h-full"
          />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-black text-[#1C1816] leading-6 truncate">
            {t.name}
          </p>
          <p className="text-[10.5px] text-gray-500 leading-5 mt-0.5 truncate">
            {t.role}
          </p>
          {t.org && (
            <p className="text-[10.5px] text-gray-400 leading-5 truncate">
              {t.org}
            </p>
          )}
        </div>
        {hasLogo && (
          <span className="w-12 h-12 rounded-xl bg-[#FDF7F0] overflow-hidden flex items-center justify-center shrink-0">
            <ImageSlot
              id={t.logoSlot!}
              label={t.org || t.name}
              ratio="aspect-square"
              rounded="rounded-xl"
              fit="contain"
              icon="lucide:building-2"
              className="!h-full"
            />
          </span>
        )}
      </div>
    </SolidCard>
  );
}

export default function MobileTestimonialsSection() {
  const [tab, setTab] = useState<string>(testimonialTabs[0].id);
  const [pulse, setPulse] = useState(false);

  // Pulse the heading briefly when the user jumps to this section.
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-testimonials') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);

  const list = testimonials.filter((t) => t.kind === tab);
  const N = list.length;
  const { ref, active, scrollTo } = useSnapActive(N);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);

  return (
    <MobileSectionShell bg="bg-[#FDF4EE]" id="mobile-testimonials">
      <MobileHeading
        index={7}
        pulse={pulse}
        title={testimonialsHeading.title}
        desc={testimonialsHeading.desc}
        accentIcon="mdi:comment-quote"
      />

      <PillTabs
        tabs={testimonialTabs}
        active={tab}
        onChange={(id) => {
          setTab(id);
        }}
      />

      {/* Snap rail of testimonial cards — plain div + useSnapActive so the
          dots below track the actual scroll position (manual scroll updates). */}
      <div
        key={tab}
        ref={ref}
        onMouseEnter={autoplay.onPause}
        onMouseLeave={autoplay.onResume}
        onTouchStart={autoplay.onPause}
        onTouchEnd={autoplay.onResume}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 animate-fade-in"
      >
        {list.map((t) => (
          <SnapItem key={t.name} width="w-[85%]">
            <div className="h-full animate-fade-in">
              <TestimonialCard t={t} />
            </div>
          </SnapItem>
        ))}
      </div>

      {/* Dots — driven by useSnapActive's `active` so manual scroll updates them. */}
      <div className="flex items-center justify-center gap-1.5 mt-5 mb-7">
        {list.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`نظر ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === active
                ? 'w-6 bg-orange-500'
                : 'w-2.5 bg-orange-200 active:bg-orange-300'
            }`}
          />
        ))}
      </div>

      {/* Stats — single SolidCard with 3 rows */}
      <Reveal>
        <SolidCard accent={MORANGE} className="p-0 mb-6">
        <ul className="divide-y divide-gray-100">
          {testimonialStats.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-4 px-5 py-4"
            >
              <span className="w-12 h-12 rounded-2xl bg-[#FDF0E4] flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={24} className="text-orange-500" />
              </span>
              <div className="flex-1 min-w-0">
                <AnimatedCounter
                  value={s.value}
                  className="block text-[19px] font-black text-[#1C1816] leading-7"
                />
                <p className="text-[12px] font-bold text-[#1C1816] leading-5 mt-0.5">
                  {s.label}
                </p>
                <p className="text-[10.5px] text-gray-400 leading-5">{s.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </SolidCard>
      </Reveal>

      {/* Closing line */}
      <p className="flex items-center justify-center gap-2 text-center text-[12.5px] text-gray-600 leading-7">
        <Icon name="mdi:format-quote-close" size={18} className="text-orange-400" />
        <span>{testimonialsClosing}</span>
        <Icon name="mdi:format-quote-open" size={18} className="text-orange-400" />
      </p>
    </MobileSectionShell>
  );
}
